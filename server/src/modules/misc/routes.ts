import { OpenAPIHono } from "@hono/zod-openapi";
import setSocialLinksRoute from "./routes/post.social-links";
import setSocialLinksAction from "./controller/post.social-links.controller";
import setLogoRoute from "./routes/post.logo";
import setLogoAction from "./controller/post.logo.controller";

const settingsForAdmin = new OpenAPIHono();
settingsForAdmin.openapi(setSocialLinksRoute, setSocialLinksAction);
settingsForAdmin.openapi(setLogoRoute, setLogoAction);

export default settingsForAdmin;
