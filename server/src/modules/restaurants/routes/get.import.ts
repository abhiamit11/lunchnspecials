import { createRoute, z } from "@hono/zod-openapi";
import { restaurantSchema } from "../schema/restaurants.schema";
import { ErrorResponse } from "../../../constants";

const tags = ["Admin Restaurants"];

const getImportHistroy = createRoute({
  tags: tags,
  summary: "Get Import Histroy",
  description: "Retrieves a import histroy.",
  method: "get",
  path: "/import/histroy",
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
      description: "Retrieve all available Restaurants.",
    },
    400: ErrorResponse,
  },
});

export default getImportHistroy;
