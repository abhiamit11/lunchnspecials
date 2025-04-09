import { createRoute, z } from "@hono/zod-openapi";
import { ErrorResponse } from "../../../constants";
import { logoRequestSchema } from "../schema/settings.schema";

const tags = ["Settings"];

const ImageResponseSchema = z.object({
  contentType: z.string(),
  body: z.unknown(), // This will represent the image binary data
});

const setLogoRoute = createRoute({
  tags,
  summary: "Upload Site Logo",
  description: "",
  method: "post",
  path: "/cms/logo",
  request: {
    body: {
      content: {
        "multipart/form-data": {
          schema: logoRequestSchema,
        },
      },
    },
  },
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

export default setLogoRoute;
