import { OpenAPIHono } from "@hono/zod-openapi";
import authForAdmin from "./routes";

const auth = new OpenAPIHono();

auth.route("/auth", authForAdmin);

export default auth;
