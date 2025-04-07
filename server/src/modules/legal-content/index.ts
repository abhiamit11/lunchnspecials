import { OpenAPIHono } from "@hono/zod-openapi";
import legalContent from "./routes";

const legalContentRoute = new OpenAPIHono();

legalContentRoute.route("/legal-content", legalContent);

export default legalContentRoute;
