import { createRoute, z } from "@hono/zod-openapi";
import { deleteManySchema } from "../schema/restaurants.schema";
import { ErrorResponse } from "../../../constants";

const tags = ["Admin Restaurants"];

const deleteManyRestaurant = createRoute({
  tags,
  summary: "Delete Many",
  description:
    "Deletes the restaurants from the database using the provided IDs.",
  security: [{ Bearer: [] }],
  method: "patch",
  path: "/delete/many",
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
          schema: z.object({
            succeed: z.boolean(),
            data: z.object({
              acknowledged: z.boolean(),
              deletedCount: z.number(),
            }),
          }),
        },
      },
      description:
        "Get the deletedCount and succeeded status for the delete operation.",
    },
    400: ErrorResponse,
  },
});

export default deleteManyRestaurant;
