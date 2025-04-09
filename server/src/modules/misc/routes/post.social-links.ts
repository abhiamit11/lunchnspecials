import { createRoute, z } from "@hono/zod-openapi";
import { ErrorResponse } from "../../../constants";
import { socialLinksSchema } from "../schema/settings.schema";

const tags = ["Settings"];

const setSocialLinksRoute = createRoute({
  tags,
  summary: "Add/Update Social Links",
  description: "",
  method: "post",
  path: "/cms/social-links",
  request: {
    body: {
      content: {
        "application/json": {
          schema: socialLinksSchema,
        },
      },
    },
  },
  responses: {
    200: {
      content: {
        "application/json": {
          schema: z.any(),
        },
      },
      description: "",
    },
    400: ErrorResponse,
  },
});

export default setSocialLinksRoute;
