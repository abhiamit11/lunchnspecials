import { createRoute } from "@hono/zod-openapi";
import { ErrorResponse } from "../../../constants";
import { ContentResponseSchema } from "../schema/legal.schema";

const tags = ["Legal Content"];

const getTermsContent = createRoute({
  tags,
  summary: "Get Terms and Conditions",
  description: "get the 'Privacy Policy' content using this endpoint.",
  method: "get",
  path: "/terms-content",
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

export default getTermsContent;
