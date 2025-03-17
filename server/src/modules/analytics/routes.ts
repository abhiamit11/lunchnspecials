import { OpenAPIHono } from "@hono/zod-openapi";
import analytics from "./routes/get.analytics";
import getanalyticsAction from "./controller/get.analytics.controller";

const analyticsForAdmin = new OpenAPIHono();
analyticsForAdmin.openapi(analytics, getanalyticsAction);

export default analyticsForAdmin;
