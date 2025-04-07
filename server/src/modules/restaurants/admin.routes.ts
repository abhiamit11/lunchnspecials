import { OpenAPIHono } from "@hono/zod-openapi";
import addRestaurant from "./routes/post.restaurants";
import postRestaurantAction from "./controller/post.restaurant.controller";
import deleteRestaurant from "./routes/delete.restaurants";
import deleteRestaurantAction from "./controller/delete.restaurants.controller";
import putRestaurantAction from "./controller/put.restaurant.controller";
import putRestaurant from "./routes/put.restaurants";
import importRestaurants from "./routes/post.import";
import postImportAction from "./controller/post.import.controller";

import getImportHistroy from "./routes/get.import";
import getImportHistroyAction from "./controller/get.import.controller";
import deleteManyRestaurant from "./routes/delete.many";
import deleteManyRestaurantAction from "./controller/delete.many.controller";
import exportManyRestaurant from "./routes/get.export";
import exportManyRestaurantAction from "./controller/get.export.controller";
import getDuplicatesRoute from "./routes/get.duplicates";
import getDuplicatesAction from "./controller/get.duplicates.controller";

const restaurantsForAdmin = new OpenAPIHono();

restaurantsForAdmin.openapi(addRestaurant, postRestaurantAction);
restaurantsForAdmin.openapi(deleteRestaurant, deleteRestaurantAction);
restaurantsForAdmin.openapi(putRestaurant, putRestaurantAction);
restaurantsForAdmin.openapi(importRestaurants, postImportAction);
restaurantsForAdmin.openapi(getImportHistroy, getImportHistroyAction);
restaurantsForAdmin.openapi(deleteManyRestaurant, deleteManyRestaurantAction);
restaurantsForAdmin.openapi(exportManyRestaurant, exportManyRestaurantAction);
restaurantsForAdmin.openapi(getDuplicatesRoute, getDuplicatesAction);

export default restaurantsForAdmin;
