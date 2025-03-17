import { OpenAPIHono } from "@hono/zod-openapi";
import analyticsForAdmin from "./routes";

const analyticsRoute = new OpenAPIHono();

analyticsRoute.route("/analytics", analyticsForAdmin);

export default analyticsRoute;
