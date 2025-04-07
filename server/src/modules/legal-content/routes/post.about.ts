import { createRoute } from "@hono/zod-openapi";
import { ErrorResponse } from "../../../constants";
import { AboutSchema, ResponseSchema } from "../schema/legal.schema";

const tags = ["Legal Content"];

const aboutPage = createRoute({
  tags,
  summary: "About",
  description: "Update the 'About Us' using this endpoint.",
  method: "post",
  path: "/about",
  request: {
    body: {
      content: {
        "application/json": {
          schema: AboutSchema,
        },
      },
    },
  },
  responses: {
    200: {
      content: {
        "application/json": {
          schema: ResponseSchema,
        },
      },
      description: "",
    },
    400: ErrorResponse,
  },
});

export default aboutPage;
