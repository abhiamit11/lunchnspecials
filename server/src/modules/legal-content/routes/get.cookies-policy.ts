import { createRoute } from "@hono/zod-openapi";
import { ErrorResponse } from "../../../constants";
import { ContentResponseSchema } from "../schema/legal.schema";

const tags = ["Legal Content"];

const getCookiesContent = createRoute({
  tags,
  summary: "Get Cookies Policy",
  description: "get the 'Cookies Policy' content using this endpoint.",
  method: "get",
  path: "/cookies-content",
  request: {
    body: {
      content: {},
    },
  },
  responses: {
    200: {
      content: {
        "application/json": {
          schema: ContentResponseSchema,
        },
      },
      description: "",
    },
    400: ErrorResponse,
  },
});

export default getCookiesContent;
