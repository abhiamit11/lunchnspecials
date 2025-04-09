import { db } from "../../../services/mongodb";
import { restaurantType } from "../schema/restaurants.schema";
import { RouteHandler } from "@hono/zod-openapi";
import getDuplicatesRoute from "../routes/get.duplicates";
import { ObjectId } from "mongodb";

type collection = restaurantType & {
  _id: ObjectId;
};

const getDuplicatesAction: RouteHandler<typeof getDuplicatesRoute> = async (
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

    const duplicateRestaurants: any[] = [];
    let total = 0;
    duplicates.forEach((element) => {
      const count = element.count - 1;
      total = total + count;
      duplicateRestaurants.push({
        name: element.docs[0].name,
        address: element.docs[0].address,
        count,
      });
    });

    return c.json(
      {
        total,
        data: duplicateRestaurants,
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

export default getDuplicatesAction;
