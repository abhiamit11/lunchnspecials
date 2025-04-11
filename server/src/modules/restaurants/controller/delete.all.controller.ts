import { db } from "../../../services/mongodb";
import { RouteHandler } from "@hono/zod-openapi";
import deleteAllRestaurantsRoute from "../routes/delete.all";
const deleteAllAction: RouteHandler<typeof deleteAllRestaurantsRoute> = async (
  c
) => {
  try {
    await db
      .collection("restaurant_menus")
      .deleteMany({})
      .catch((error) => console.error(error));

    const data = await db
      .collection("restaurants")
      .deleteMany({})
      .catch((error) => console.error(error));

    return c.json({ succeed: true, data }, 200);
  } catch (error) {
    return c.json(
      {
        hasError: true,
        description: "something went wrong please try again.",
      },
      400
    );
  }
};

export default deleteAllAction;
