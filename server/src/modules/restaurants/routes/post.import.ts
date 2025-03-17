import { createRoute, z } from "@hono/zod-openapi";
import { ErrorResponse } from "../../../constants";
import { ObjectId } from "mongodb";
import { FileRequestSchema } from "../schema/restaurants.schema";

const tags = ["Admin Restaurants"];

const schema = z.object({
  succeed: z.boolean(),
  data: z.any(),
});

const importRestaurants = createRoute({
  tags,
  summary: "Import",
  description: "Bulk CSV import of restaurant data into the database.",
  security: [{ Bearer: [] }],
  method: "post",
  path: "/import",
  request: {
    body: {
      content: {
        "multipart/form-data": {
          schema: FileRequestSchema,
        },
      },
    },
  },
  responses: {
    200: {
      content: {
        "application/json": {
          schema,
        },
      },
      description:
        "Get the insertedId and succeeded status for the post operation.",
    },
    400: ErrorResponse,
  },
});

export default importRestaurants;
