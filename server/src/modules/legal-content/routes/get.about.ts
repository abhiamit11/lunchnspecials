import { createRoute } from "@hono/zod-openapi";
import { ErrorResponse } from "../../../constants";
import { ContentResponseSchema } from "../schema/legal.schema";

const tags = ["Legal Content"];

const getAboutContent = createRoute({
  tags,
  summary: "Get About",
  description: "get the 'About Us' content using this endpoint.",
  method: "get",
  path: "/about",
  request: {
    body: {
      content: {},
    },
  },
  responses: {
    200: {
      content: {
        "application/json": {
          schema: ContentResponseSchema,
        },
      },
      description: "",
    },
    400: ErrorResponse,
  },
});

export default getAboutContent;
