import { createRoute, z } from "@hono/zod-openapi";
import { ErrorResponse } from "../../../constants";

const tags = ["Admin Restaurants"];

const deleteAllRestaurantsRoute = createRoute({
  tags: tags,
  summary: "Delete All Restaurants",
  description: "",
  method: "delete",
  path: "/admin/all/restaurants",
  request: {},
  responses: {
    200: {
      content: {
        "application/json": {
          schema: z.object({
            succeed: z.boolean(),
            data: z.object({
              acknowledged: z.boolean(),
              deletedCount: z.number(),
            }),
          }),
        },
      },
      description: "",
    },
    400: ErrorResponse,
  },
});

export default deleteAllRestaurantsRoute;
