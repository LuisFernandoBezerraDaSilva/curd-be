import { EndpointTest, EndpointTestMethod } from "../endpoint-test";

export const commonRequestHeaders = {
    "Content-Type": "application/json",
};

export default (): EndpointTest[] => [

  {
    path: "/category",
    method: EndpointTestMethod.GET,
    requestHeaders: { ...commonRequestHeaders },
    expectedResponseCode: 200,
  },
  {
    path: "/category",
    method: EndpointTestMethod.POST,
    requestBody: {
      code: "123",
      title: "test",
      description: "testeeee",
    },
    requestHeaders: { ...commonRequestHeaders },
    expectedResponseCode: 200,
  },
  {
    path: "/category",
    method: EndpointTestMethod.PUT,
    requestBody: {
      id: 1,
      code: "1234",
      title: "teste",
      description: "testeeee1",
    },
    requestHeaders: { ...commonRequestHeaders },
    expectedResponseCode: 200,
  },
  {
    path: "/category/1",
    method: EndpointTestMethod.DELETE,
    requestHeaders: { ...commonRequestHeaders },
    expectedResponseCode: 200,
  },
  
 
 
];
