import { createRoute } from "@hono/zod-openapi";
import { ErrorResponse } from "../../../constants";
import {
  CookiesSchema,
  PrivacyPolicySchema,
  ResponseSchema,
} from "../schema/legal.schema";

const tags = ["Legal Content"];

const setCookiesContent = createRoute({
  tags,
  summary: "Cookies Policy",
  description: "Update the 'Cookies Policy' using this endpoint.",
  method: "post",
  path: "/cookies-content",
  request: {
    body: {
      content: {
        "application/json": {
          schema: CookiesSchema,
        },
      },
    },
  },
  responses: {
    200: {
      content: {
        "application/json": {
          schema: ResponseSchema,
        },
      },
      description: "",
    },
    400: ErrorResponse,
  },
});

export default setCookiesContent;
