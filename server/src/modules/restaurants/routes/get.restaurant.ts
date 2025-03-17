import { createRoute, z } from "@hono/zod-openapi";
import { ParamsSchema, restaurantSchema } from "../schema/restaurants.schema";
import { ErrorResponse } from "../../../constants";

const tags = ["Restaurants"];

const getRestaurant = createRoute({
  tags: tags,
  summary: "Get",
  description: "Retrieves a Restaurant with ID from the database.",
  method: "get",
  path: "/{id}",
  request: {
    params: ParamsSchema,
  },
  responses: {
    200: {
      content: {
        "application/json": {
          schema: z.object({
            succeed: z.boolean(),
            data: restaurantSchema,
          }),
        },
      },
      description: "Retrieve available Restaurant.",
    },
    400: ErrorResponse,
  },
});

export default getRestaurant;
