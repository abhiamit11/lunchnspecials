import { db } from "../../../services/mongodb";
import { RouteHandler } from "@hono/zod-openapi";
import addRestaurants from "../routes/post.restaurants";
import { ObjectId } from "mongodb";

const postRestaurantAction: RouteHandler<typeof addRestaurants> = async (c) => {
  try {
    const body = c.req.valid("json");

    const restaurantId = new ObjectId();

    const menus = {
      items: [...body.menu],
      restaurantId,
    };

    const menusRes = await db.collection("restaurant_menus").insertOne(menus);
    const { coordinates } = body;
    const restaurant = {
      ...body,
      _id: restaurantId,
      menu: new ObjectId(menusRes.insertedId),
      creationAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      location: {
        type: "Point",
        coordinates: [
          parseFloat(coordinates.longitude),
          parseFloat(coordinates.latitude),
        ],
      },
    };

    const data = await db.collection("restaurants").insertOne(restaurant);

    return c.json({ succeed: true, data }, 200);
  } catch (e: any) {
    return c.json({ hasError: true, description: e.message }, 400);
  } finally {
  }
};
export default postRestaurantAction;
