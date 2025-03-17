import { createRoute, z } from "@hono/zod-openapi";
import { ErrorResponse } from "../../../constants";
import jwtMiddleware from "../../../middleware/jwt";
import { analyticsOverviewSchema } from "../schema/analytics.schema";

const tags = ["Analytics"];

const analytics = createRoute({
  tags,
  summary: "Analytics Stats",
  description:
    "Logging into an account or system by providing your credentials, with email and password",
  method: "get",
  path: "/",
  middleware: [jwtMiddleware()],
  request: {},
  responses: {
    200: {
      content: {
        "application/json": {
          schema: analyticsOverviewSchema,
        },
      },
      description:
        "Get the insertedId and succeeded status for the post operation.",
    },
    400: ErrorResponse,
  },
});

export default analytics;
