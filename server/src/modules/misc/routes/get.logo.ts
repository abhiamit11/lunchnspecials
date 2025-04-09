import { createRoute, z } from "@hono/zod-openapi";
import { ErrorResponse } from "../../../constants";

const tags = ["Settings"];

const ImageResponseSchema = z.object({
  contentType: z.string(),
  body: z.unknown(), // This will represent the image binary data
});

const getLogoRoute = createRoute({
  tags,
  summary: "Site Logo",
  description: "",
  method: "get",
  path: "/cms/logo",
  request: {},
  responses: {
    200: {
      content: {
        "image/*": {
          schema: ImageResponseSchema,
        },
      },
      description: "",
    },
    400: ErrorResponse,
  },
});

export default getLogoRoute;
