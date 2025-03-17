import { createRoute, z } from "@hono/zod-openapi";
import { ErrorResponse } from "../../../constants";
import {
  ChangePasswordSchema,
  NewPasswordResponseSchema,
} from "../schema/auth.schema";
import jwtMiddleware from "../../../middleware/jwt";

const tags = ["Admin Auth"];

const changePassword = createRoute({
  tags,
  summary: "Change password",
  description: "Change password for account with existing password",
  method: "post",
  path: "/change-password",
  middleware: [jwtMiddleware()],
  request: {
    body: {
      content: {
        "application/json": {
          schema: ChangePasswordSchema,
        },
      },
    },
  },
  responses: {
    200: {
      content: {
        "application/json": {
          schema: NewPasswordResponseSchema,
        },
      },
      description:
        "Get the insertedId and succeeded status for the post operation.",
    },
    400: ErrorResponse,
  },
});

export default changePassword;
