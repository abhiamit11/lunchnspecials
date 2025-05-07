import { createRoute, z } from "@hono/zod-openapi";
import { MapRestaurantSchema } from "../schema/restaurants.schema";
import { coordinatesQuerySchema } from "../../../schema";
import { ErrorResponse } from "../../../constants";
import analyticsMiddleware from "../../../middleware/analytics";

const tags = ["Restaurants"];

const getRestaurantsOnMap = createRoute({
  tags: tags,
  summary: "Get Map",
  description:
    "Retrieves all the restaurants from the database and displays them on the map.",
  method: "get",
  path: "/map/",
  middleware: [analyticsMiddleware("load")],
  request: {
    query: coordinatesQuerySchema,
  },
  responses: {
    200: {
      content: {
        "application/json": {
          schema: z.object({
            total: z.number(),
            data: z.array(MapRestaurantSchema).or(z.null()),
          }),
        },
      },
      description: "Retrieve all available Restaurants.",
    },
    400: ErrorResponse,
  },
});

export default getRestaurantsOnMap;
