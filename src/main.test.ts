(global as any).IS_TESTING = true;
import request from 'supertest';
import { exec } from 'child_process';
import isArray from './helpers/is-array';
import app from './main';
import postgres from 'pg';
import { EndpointTest, EndpointTestMethod, makeEndpointTests } from './tests/endpoint-test';

const endpointsToTest = makeEndpointTests();

const checkResponse = (response: any, expectedResponse: any) => {
  if (isArray(expectedResponse)) {
    if (!isArray(response)) {
      throw { msg: 'Isnt equals', response, expectedResponse };
    }
    (response as any[]).forEach((responsItem, index) => checkResponse(responsItem, response[index]));
    return;
  }
  const props = Object.keys(expectedResponse);
  for (const prop of props) {
    console.log(`Prop: ${prop}`, expectedResponse, response);
    expect(response[prop]).toBe(expectedResponse[prop]);
  }
};

describe('Api status tests', () => {
  const client = new postgres.Client({
    connectionString: (process.env as any).DATABASE_URL.split('/tests').join('/postgres')
  });

  beforeAll(done => {
    (async () => {
      await client.connect();
      await client.query('DROP DATABASE tests');
      await client.query('CREATE DATABASE tests');
      await client.end();
      exec('prisma migrate dev', {env: process.env }, (err, stdout) => {
        if (err) {
          throw err;
        }
        console.log(stdout);
        done();
      });
    })().catch(err => {
      console.error(err);
    });
  }, 6e5);

  test('It should response the heart beat request', done => {
    console.log('aaaaaaaaaaaaaaaaaa')
    request(app)
      .get('/heart-beat/')
      .then(response => {
        expect(response.statusCode).toBe(200);
        done();
      });
  });

  test('It should do the web API tests', async () => {
    const state: any = {};
    let currentResponse: any = {};
    const checkEndpointResponse = (response: request.Response, endpoint: EndpointTest) => {
      currentResponse = response?.body || {};
      if (endpoint.expectedResponseCode) {
        expect(response.statusCode).toBe(endpoint.expectedResponseCode);
      }
      checkResponse(response.body, endpoint.expectedResponseBody || {});
    };

    const testsTotal = endpointsToTest.length;
    let current = 0;
    for (const endpoint of endpointsToTest) {
      const epTry = async () => {
        console.log(`${++current} of ${testsTotal}`);
        console.log(endpoint.path);
        let requestChain: any = request(app);
        if (endpoint.beforeExecute) {
          await endpoint.beforeExecute(state);
        }
        switch (endpoint.method) {
          case EndpointTestMethod.GET:
            requestChain = requestChain
              .get(endpoint.path)
              .set(endpoint.requestHeaders)
              .then((response: request.Response) => checkEndpointResponse(response, endpoint));
            await requestChain;
            break;
          case EndpointTestMethod.POST:
            requestChain = requestChain
              .post(endpoint.path)
              .send(endpoint.requestBody)
              .set(endpoint.requestHeaders)
              .then((response: request.Response) => checkEndpointResponse(response, endpoint));
            await requestChain;
            break;
          case EndpointTestMethod.PUT:
            requestChain = requestChain
              .put(endpoint.path)
              .send(endpoint.requestBody)
              .set(endpoint.requestHeaders)
              .then((response: request.Response) => checkEndpointResponse(response, endpoint));
            await requestChain;
            break;
          case EndpointTestMethod.DELETE:
              requestChain = requestChain
                .delete(endpoint.path)
                .set(endpoint.requestHeaders)
                .then((response: request.Response) => checkEndpointResponse(response, endpoint));
              await requestChain;
              break;
          // TODO more
          default:
            console.warn('Invalid endpoint test', endpoint);
        }
        if (endpoint.afterExecute) {
          await endpoint.afterExecute(state, currentResponse);
        }
      };
      let tries = 0;
      do {
        try {
          await epTry();
          break;
        } catch (err) {
          if (tries === 5) {
            throw err;
          }
          console.warn(err);
        }
        continue;
      } while(++tries);
    }
  }, 5e4);

});