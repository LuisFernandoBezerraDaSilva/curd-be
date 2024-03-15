import category from "./categories/category-test";

export enum EndpointTestMethod {
    GET,
    POST,
    PUT,
    DELETE
};

export type EndpointTest = {
    path: string;
    method: EndpointTestMethod;
    requestBody?: any;
    requestHeaders: any;
    expectedResponseBody?: any;
    expectedResponseCode?: number;
    expectedResponseTime?: number;
    beforeExecute?: (state: any) => Promise<void>;
    afterExecute?: (state: any, response: any) => Promise<void>;
};



export const makeEndpointTests = (): Array<EndpointTest> => [
    ...category(),

    // TODO the rest

];