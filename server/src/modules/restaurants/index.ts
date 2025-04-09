import { OpenAPIHono } from "@hono/zod-openapi";
import restaurantsForAdmin from "./admin.routes";
import restaurantsForAll from "./routes";
import deleteDuplicatesAction from "./controller/delete.duplicates.controller";
import deleteDuplicatesRoute from "./routes/delete.duplicates";

const restaurants = new OpenAPIHono();

restaurants.route("/restaurants", restaurantsForAll);
restaurants.route("/admin/restaurants", restaurantsForAdmin);

restaurants.openapi(deleteDuplicatesRoute, deleteDuplicatesAction);

export default restaurants;
