import * as z from "zod/v4";

import { createDocument, ZodOpenApiOperationObject } from "zod-openapi";

export const putJob: ZodOpenApiOperationObject = {
  requestParams: {
    path: z.object({ jobId: z.string() }),
  },
  requestBody: {
    content: {
      "application/json": {
        schema: z.object({ title: z.string() }),
      },
    },
  },
  responses: {
    "200": {
      description: "200 OK",
      content: {
        "application/json": {
          schema: z.object({ jobId: z.string(), title: z.string() }),
        },
      },
    },
  },
};

export const openApiDoc = createDocument({
  openapi: "3.1.0",
  info: {
    title: "My API",
    version: "1.0.0",
  },
  paths: {
    "/jobs/{jobId}": {
      put: putJob,
    },
  },
});
