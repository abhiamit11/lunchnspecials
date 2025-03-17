import { db } from "../../../services/mongodb";
import { RouteHandler } from "@hono/zod-openapi";
import { ObjectId } from "mongodb";
import deleteManyRestaurant from "../routes/delete.many";

const deleteManyRestaurantAction: RouteHandler<
  typeof deleteManyRestaurant
> = async (c) => {
  try {
    const { ids } = c.req.valid("json");

    const idsToDelete = ids.map((_id: string) => new ObjectId(_id));

    await db
      .collection("restaurant_menus")
      .deleteMany({ restaurantId: { $in: idsToDelete } })
      .catch((error) => console.error(error));

    const data = await db
      .collection("restaurants")
      .deleteMany({ _id: { $in: idsToDelete } })
      .catch((error) => console.error(error));

    return c.json({ succeed: true, data }, 200);
  } catch (e: any) {
    return c.json({ hasError: true, description: e.message }, 400);
  }
};
export default deleteManyRestaurantAction;
