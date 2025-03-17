import { createRoute, z } from "@hono/zod-openapi";
import { deleteManySchema } from "../schema/restaurants.schema";
import { ErrorResponse } from "../../../constants";

const tags = ["Admin Restaurants"];

const exportSchema = z.object({
  succeed: z.boolean(),
  total: z.number(),
  data: z
    .array(
      z.object({
        name: z.string(),
        website: z.string(),
        description: z.string(),
        address: z.string(),
        zip: z.string(),
        phone: z.string(),
        rating: z.string(),
        coordinates_latitude: z.string(),
        coordinates_longitude: z.string(),
        menu_day: z.string(),
        menu_name: z.string(),
        menu_price: z.string(),
        menu_description: z.string(),
        menu_category: z.string(),
        menu_timings_opening: z.string(),
        menu_timings_closing: z.string(),
      })
    )
    .or(z.null()),
});

const exportManyRestaurant = createRoute({
  tags,
  summary: "Export",
  description:
    "Export the restaurants from the database using the provided IDs.",
  security: [{ Bearer: [] }],
  method: "post",
  path: "/export/many",
  request: {
    body: {
      content: {
        "application/json": {
          schema: deleteManySchema,
        },
      },
    },
  },
  responses: {
    200: {
      content: {
        "application/json": {
          schema: exportSchema,
        },
      },
      description:
        "Get the deletedCount and succeeded status for the delete operation.",
    },
    400: ErrorResponse,
  },
});

export default exportManyRestaurant;
