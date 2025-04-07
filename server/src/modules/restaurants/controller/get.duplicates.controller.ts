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
              $push: { _id: "$_id", name: "$name", updatedAt: "$updatedAt" },
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

    // Step 2: Use the results to find the actual duplicate documents
    // let duplicateDocs = duplicates.map((doc) => {
    //   console.log("doc", doc.docs[0]);
    //   return doc._id;
    // });

    // console.log("duplicateDocs", duplicateDocs);

    return c.json(
      {
        total: 0,
        data: duplicates,
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
