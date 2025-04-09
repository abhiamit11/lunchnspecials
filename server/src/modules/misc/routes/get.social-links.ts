import { createRoute, z } from "@hono/zod-openapi";
import { ErrorResponse } from "../../../constants";

const tags = ["Settings"];

const getSocialLinksRoute = createRoute({
  tags,
  summary: "Social Links",
  description: "",
  method: "get",
  path: "/cms/social-links",
  request: {},
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

export default getSocialLinksRoute;
