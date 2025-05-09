import { createRoute, z } from "@hono/zod-openapi";
import { ErrorResponse } from "../../../constants";
import { ObjectId } from "mongodb";
import { restaurantSchema } from "../schema/restaurants.schema";

const tags = ["Admin Restaurants"];

const addRestaurant = createRoute({
  tags,
  summary: "Add",
  description: "Adds a new Restaurant to the database.",
  security: [{ Bearer: [] }],
  method: "post",
  path: "",
  request: {
    body: {
      content: {
        "application/json": {
          schema: restaurantSchema.and(
            z.object({
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
              insertedId: z.instanceof(ObjectId),
            }),
          }),
        },
      },
      description:
        "Get the insertedId and succeeded status for the post operation.",
    },
    400: ErrorResponse,
  },
});

export default addRestaurant;
