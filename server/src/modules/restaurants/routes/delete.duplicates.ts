import { createRoute, z } from "@hono/zod-openapi";
import { restaurantSchema } from "../schema/restaurants.schema";
import { ErrorResponse } from "../../../constants";

const tags = ["Admin Restaurants"];

const deleteDuplicatesRoute = createRoute({
  tags: tags,
  summary: "Delete Duplicates Restaurants",
  description: "",
  method: "delete",
  path: "/admin/duplicate/restaurants",
  request: {},
  responses: {
    200: {
      content: {
        "application/json": {
          schema: z.object({
            total: z.number(),
            data: z.array(restaurantSchema),
          }),
        },
      },
      description: "",
    },
    400: ErrorResponse,
  },
});

export default deleteDuplicatesRoute;
