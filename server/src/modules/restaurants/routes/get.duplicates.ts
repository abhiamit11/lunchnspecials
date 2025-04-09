import { createRoute, z } from "@hono/zod-openapi";
import { restaurantSchema } from "../schema/restaurants.schema";
import { ErrorResponse } from "../../../constants";

const tags = ["Admin Restaurants"];

const getDuplicatesRoute = createRoute({
  tags: tags,
  summary: "Get Duplicates Restaurants",
  description: "Retrieves a list of Duplicates Restaurants.",
  method: "get",
  path: "/duplicates",
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

export default getDuplicatesRoute;
