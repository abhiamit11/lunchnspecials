import { createRoute, z } from "@hono/zod-openapi";
import { restaurantSchema } from "../schema/restaurants.schema";
import { paginationQuerySchema } from "../../../schema";
import { ErrorResponse } from "../../../constants";

const tags = ["Restaurants"];

const getRestaurants = createRoute({
  tags: tags,
  summary: "Get All",
  description: "Retrieves a all Restaurants from the database.",
  method: "get",
  path: "",
  request: {
    query: paginationQuerySchema,
  },
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
      description: "Retrieve all available Restaurants.",
    },
    400: ErrorResponse,
  },
});

export default getRestaurants;
