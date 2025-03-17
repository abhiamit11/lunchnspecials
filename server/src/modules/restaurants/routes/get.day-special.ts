import { createRoute, z } from "@hono/zod-openapi";
import { ParamsSchema, restaurantSchema } from "../schema/restaurants.schema";
import { ErrorResponse } from "../../../constants";
import analyticsMiddleware from "../../../middleware/analytics";

const tags = ["Restaurants"];

const getDaySpecial = createRoute({
  tags: tags,
  summary: "Get day special items",
  description: "Retrieves a Restaurant with ID from the database.",
  method: "get",
  path: "/special/{id}",
  middleware: [analyticsMiddleware("view")],
  request: {
    params: ParamsSchema,
    query: z.object({ day: z.string().default("monday").optional() }),
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

export default getDaySpecial;
