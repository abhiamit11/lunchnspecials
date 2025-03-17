import { db } from "../../../services/mongodb";
import { restaurantType } from "../schema/restaurants.schema";
import { RouteHandler } from "@hono/zod-openapi";
import getImportHistroy from "../routes/get.import";

const getImportHistroyAction: RouteHandler<typeof getImportHistroy> = async (
  c
) => {
  try {
    const items = await db
      .collection<restaurantType>("import_history")
      .aggregate<restaurantType>()
      .sort({ importedAt: -1 })
      .limit(5)
      .toArray();

    const total = await db.collection("import_history").countDocuments();

    return c.json(
      {
        total,
        data: items,
      },
      200
    );
  } catch (error) {
    return c.json(
      {
        hasError: true,
        description: "",
      },
      400
    );
  }
};

export default getImportHistroyAction;
