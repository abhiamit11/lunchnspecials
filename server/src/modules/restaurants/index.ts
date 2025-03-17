import { OpenAPIHono } from "@hono/zod-openapi";
import restaurantsForAdmin from "./admin.routes";
import restaurantsForAll from "./routes";

const restaurants = new OpenAPIHono();

restaurants.route("/restaurants", restaurantsForAll);
restaurants.route("/admin/restaurants", restaurantsForAdmin);

export default restaurants;
