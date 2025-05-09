import { createRoute, z } from "@hono/zod-openapi";
import { ErrorResponse } from "../../../constants";
import { ObjectId } from "mongodb";
import { ParamsSchema, restaurantSchema } from "../schema/restaurants.schema";

const tags = ["Admin Restaurants"];

const putRestaurant = createRoute({
  tags,
  summary: "Update",
  description: "Update a restaurant's data in the database using its ID.",
  security: [{ Bearer: [] }],
  method: "put",
  path: "/{id}",
  request: {
    params: ParamsSchema,
    body: {
      content: {
        "application/json": {
          schema: restaurantSchema.and(
            z.object({
              menuId: z.string(),
              isPartner: z.boolean().optional(),
              isNewOrRevised: z.boolean().optional(),
            })
          ),
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
              modifiedCount: z.number(),
              upsertedId: z.string().or(z.null()),
              upsertedCount: z.number(),
              matchedCount: z.number(),
            }),
          }),
        },
      },
      description:
        "Get the upsertedCount and succeeded status for the put operation.",
    },
    400: ErrorResponse,
  },
});

export default putRestaurant;
