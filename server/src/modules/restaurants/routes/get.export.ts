import { createRoute, z } from "@hono/zod-openapi";
import { deleteManySchema, exportSchema } from "../schema/restaurants.schema";
import { ErrorResponse } from "../../../constants";

const tags = ["Admin Restaurants"];

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
      description: "",
    },
    400: ErrorResponse,
  },
});

export default exportManyRestaurant;
