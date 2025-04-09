import { OpenAPIHono } from "@hono/zod-openapi";
import settingsForAdmin from "./routes";
import getSocialLinksAction from "./controller/get.social-links.controller";
import getSocialLinksRoute from "./routes/get.social-links";
import getLogoRoute from "./routes/get.logo";
import getLogoAction from "./controller/get.logo.controller";

const settingsRoute = new OpenAPIHono();

settingsRoute.openapi(getSocialLinksRoute, getSocialLinksAction);
settingsRoute.openapi(getLogoRoute, getLogoAction);

settingsRoute.route("/admin/settings", settingsForAdmin);

export default settingsRoute;
