import { createRoute } from "@hono/zod-openapi";
import { ErrorResponse } from "../../../constants";
import { PrivacyPolicySchema, ResponseSchema } from "../schema/legal.schema";

const tags = ["Legal Content"];

const setPrivacyPolicyContent = createRoute({
  tags,
  summary: "Privacy Policy",
  description: "Update the 'Privacy Policy' using this endpoint.",
  method: "post",
  path: "/privacy-content",
  request: {
    body: {
      content: {
        "application/json": {
          schema: PrivacyPolicySchema,
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

export default setPrivacyPolicyContent;
