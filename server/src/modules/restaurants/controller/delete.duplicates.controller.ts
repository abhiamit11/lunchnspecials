import { db } from "../../../services/mongodb";
import { restaurantType } from "../schema/restaurants.schema";
import { RouteHandler } from "@hono/zod-openapi";
import getDuplicatesRoute from "../routes/get.duplicates";
import { ObjectId } from "mongodb";

type collection = restaurantType & {
  _id: ObjectId;
};

const deleteDuplicatesAction: RouteHandler<typeof getDuplicatesRoute> = async (
  c
) => {
  try {
    const restaurantDb = db.collection("restaurants");
    const duplicates = await restaurantDb
      .aggregate<any>([
        { $sort: { updatedAt: -1 } },
        {
          $group: {
            _id: { name: "$name", location: "$location" },
            docs: {
              $push: {
                _id: "$_id",
                name: "$name",
                updatedAt: "$updatedAt",
                address: "$address",
              },
            },
            count: { $sum: 1 },
          },
        },
        {
          $match: {
            count: { $gt: 1 }, // Filter for more than one occurrence
          },
        },
      ])
      .toArray();

    let total = 0;
    const ids: any[] = [];
    duplicates.forEach((element) => {
      const latestRecord = element.docs[0]; // the first one is the latest
      const idsToDelete = element.docs
        .slice(1)
        .map((doc: { _id: ObjectId }) => doc._id);
      ids.push(...idsToDelete);
    });
    total = ids.length;

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

export default deleteDuplicatesAction;
