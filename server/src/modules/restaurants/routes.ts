import { OpenAPIHono } from "@hono/zod-openapi";

import getRestaurants from "./routes/get.restaurants";
import getRestaurantsAction from "./controller/get.restaurants.controller";

import getRestaurant from "./routes/get.restaurant";
import getRestaurantAction from "./controller/get.restaurant.controller";

import getRestaurantsOnMap from "./routes/get.map";
import getRestaurantsOnMapAction from "./controller/get.map.controller";

import getDaySpecial from "./routes/get.day-special";
import getDaySpecialAction from "./controller/get.day-special.controller";

const restaurantsForAll = new OpenAPIHono();

restaurantsForAll.openapi(getRestaurants, getRestaurantsAction);
restaurantsForAll.openapi(getRestaurant, getRestaurantAction);
restaurantsForAll.openapi(getRestaurantsOnMap, getRestaurantsOnMapAction);
restaurantsForAll.openapi(getDaySpecial, getDaySpecialAction);

export default restaurantsForAll;
