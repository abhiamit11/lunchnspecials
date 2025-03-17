import { db } from "../../../services/mongodb";
import { RouteHandler } from "@hono/zod-openapi";
import { ObjectId } from "mongodb";
import deleteRestaurant from "../routes/delete.restaurants";

const deleteRestaurantAction: RouteHandler<typeof deleteRestaurant> = async (
  c
) => {
  try {
    const { id } = c.req.valid("param");
    const restaurantId = new ObjectId(id);

    await db
      .collection("restaurant_menus")
      .deleteOne({ restaurantId: restaurantId });

    const data = await db
      .collection("restaurants")
      .deleteOne({ _id: restaurantId });

    return c.json({ succeed: true, data }, 200);
  } catch (e: any) {
    return c.json({ hasError: true, description: e.message }, 400);
  }
};
export default deleteRestaurantAction;
