import { createRoute } from "@hono/zod-openapi";
import { ErrorResponse } from "../../../constants";
import { ResponseSchema, TermsConditionsSchema } from "../schema/legal.schema";

const tags = ["Legal Content"];

const setTermsContent = createRoute({
  tags,
  summary: "Terms and Conditions",
  description: "Update the 'Privacy Policy' using this endpoint.",
  method: "post",
  path: "/terms-content",
  request: {
    body: {
      content: {
        "application/json": {
          schema: TermsConditionsSchema,
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

export default setTermsContent;
