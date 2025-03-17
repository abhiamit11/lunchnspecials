import { db } from "../../../services/mongodb";
import { RouteHandler } from "@hono/zod-openapi";
import { ObjectId } from "mongodb";
import putRestaurant from "../routes/put.restaurants";

const putRestaurantAction: RouteHandler<typeof putRestaurant> = async (c) => {
  try {
    const body = c.req.valid("json");
    const { id } = c.req.valid("param");

    const restaurantId = new ObjectId(id);
    const menuId = new ObjectId(body.menuId);

    const menus = {
      items: [...body.menu],
      restaurantId,
    };

    await db.collection("restaurant_menus").updateOne(
      { _id: menuId },
      {
        $set: menus,
      }
    );
    const { coordinates } = body;

    const restaurant = {
      ...body,
      _id: restaurantId,
      menu: new ObjectId(body.menuId),
      updatedAt: new Date().toISOString(),
      location: {
        type: "Point",
        coordinates: [
          parseFloat(coordinates.longitude),
          parseFloat(coordinates.latitude),
        ],
      },
    };

    const data = await db.collection("restaurants").updateOne(
      { _id: restaurantId },
      {
        $set: restaurant,
      }
    );

    return c.json({ succeed: true, data }, 200);
  } catch (e: any) {
    return c.json({ hasError: true, description: e.message }, 400);
  } finally {
  }
};
export default putRestaurantAction;
