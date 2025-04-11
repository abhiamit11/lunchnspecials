import { OpenAPIHono } from "@hono/zod-openapi";
import restaurantsForAdmin from "./admin.routes";
import restaurantsForAll from "./routes";
import deleteDuplicatesAction from "./controller/delete.duplicates.controller";
import deleteDuplicatesRoute from "./routes/delete.duplicates";
import deleteAllRestaurantsRoute from "./routes/delete.all";
import deleteAllAction from "./controller/delete.all.controller";

const restaurants = new OpenAPIHono();

restaurants.route("/restaurants", restaurantsForAll);
restaurants.route("/admin/restaurants", restaurantsForAdmin);

restaurants.openapi(deleteDuplicatesRoute, deleteDuplicatesAction);
restaurants.openapi(deleteAllRestaurantsRoute, deleteAllAction);

export default restaurants;
