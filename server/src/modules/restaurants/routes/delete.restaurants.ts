import { createRoute, z } from "@hono/zod-openapi";
import { ParamsSchema } from "../schema/restaurants.schema";
import { ErrorResponse } from "../../../constants";

const tags = ["Admin Restaurants"];

const deleteRestaurant = createRoute({
  tags,
  summary: "Delete",
  description:
    "Deletes the restaurant from the database using the provided ID.",
  security: [{ Bearer: [] }],
  method: "delete",
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

export default deleteRestaurant;
