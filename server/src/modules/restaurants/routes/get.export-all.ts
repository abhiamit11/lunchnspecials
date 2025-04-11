import { createRoute, z } from "@hono/zod-openapi";
import { deleteManySchema, exportSchema } from "../schema/restaurants.schema";
import { ErrorResponse } from "../../../constants";

const tags = ["Admin Restaurants"];

const exportRestaurants = createRoute({
  tags,
  summary: "Export All",
  description: "Export the all restaurants from the database.",
  security: [{ Bearer: [] }],
  method: "post",
  path: "/export/all",
  request: {},
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

export default exportRestaurants;
