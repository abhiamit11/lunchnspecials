import { createRoute, z } from "@hono/zod-openapi";
import { ErrorResponse } from "../../../constants";
import { ResponseSchema, SigninSchema } from "../schema/auth.schema";

const tags = ["Admin Auth"];

const signin = createRoute({
  tags,
  summary: "Sign in",
  description:
    "Logging into an account or system by providing your credentials, with email and password",
  method: "post",
  path: "/signin",
  request: {
    body: {
      content: {
        "application/json": {
          schema: SigninSchema,
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
      description:
        "Get the insertedId and succeeded status for the post operation.",
    },
    400: ErrorResponse,
  },
});

export default signin;
