import { db } from "../../../services/mongodb";
import { restaurantType } from "../schema/restaurants.schema";
import { RouteHandler } from "@hono/zod-openapi";
import getRestaurants from "../routes/get.restaurants";
import { paginationQuerySchema } from "../../../schema";

const getRestaurantsAction: RouteHandler<typeof getRestaurants> = async (c) => {
  try {
    const queryParams = c.req.query();
    const {
      page,
      limit,
      sortBy,
      sortOrder,
      search,
      createdAtStart,
      createdAtEnd,
      updatedAtStart,
      updatedAtEnd,
    } = paginationQuerySchema.parse(queryParams);

    const skip = limit * (page - 1);
    const sort = { [sortBy]: sortOrder === "asc" ? 1 : -1 };

    const items = await db
      .collection<restaurantType>("restaurants")
      .aggregate<restaurantType>([
        {
          $addFields: {
            createdAtDate: { $dateFromString: { dateString: "$creationAt" } },
            updatedAtDate: { $dateFromString: { dateString: "$updatedAt" } },
          },
        },
        {
          $match: {
            ...(search
              ? {
                  $or: [
                    { name: new RegExp(search, "i") },
                    { address: new RegExp(search, "i") },
                    { zip: new RegExp(search, "i") },
                  ],
                }
              : {}),
            ...(createdAtStart && createdAtEnd
              ? {
                  createdAtDate: {
                    $gte: new Date(createdAtStart),
                    $lte: new Date(createdAtEnd),
                  },
                }
              : createdAtStart
              ? { createdAtDate: { $gte: new Date(createdAtStart) } }
              : createdAtEnd
              ? { createdAtDate: { $lte: new Date(createdAtEnd) } }
              : {}),
            ...(updatedAtStart && updatedAtEnd
              ? {
                  updatedAtDate: {
                    $gte: new Date(updatedAtStart),
                    $lte: new Date(updatedAtEnd),
                  },
                }
              : updatedAtStart
              ? { updatedAtDate: { $gte: new Date(updatedAtStart) } }
              : updatedAtEnd
              ? { updatedAtDate: { $lte: new Date(updatedAtEnd) } }
              : {}),
          },
        },
      ])
      .sort({ [sortBy]: sortOrder === "asc" ? 1 : -1 })
      .skip(skip)
      .limit(limit)
      .toArray();

    const total = await db.collection("restaurants").countDocuments();

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

export default getRestaurantsAction;
