import { db } from "../../../services/mongodb";
import { MapRestaurant } from "../schema/restaurants.schema";
import { RouteHandler } from "@hono/zod-openapi";
import getRestaurantsOnMap from "../routes/get.map";
import { coordinatesQuerySchema } from "../../../schema";

const getRestaurantsOnMapAction: RouteHandler<
  typeof getRestaurantsOnMap
> = async (c) => {
  try {
    const queryParams = c.req.query();
    const { x, y, radius, day } = coordinatesQuerySchema.parse(queryParams);

    const data = await db
      .collection<MapRestaurant>("restaurants")
      .aggregate<MapRestaurant>([
        {
          $geoNear: {
            near: { type: "Point", coordinates: [x, y] },
            distanceField: "distance",
            maxDistance: radius * 1000, // Convert kilometers to meters
            spherical: true,
          },
        },
        {
          $lookup: {
            from: "restaurant_menus",
            localField: "_id",
            foreignField: "restaurantId",
            as: "menuDetails",
          },
        },
        {
          $unwind: "$menuDetails",
        },
        {
          $unwind: "$menuDetails.items",
        },
        {
          $match: {
            "menuDetails.items.day": day || "monday", // Assuming today's Monday
          },
        },
        {
          $group: {
            _id: "$_id",
            name: { $first: "$name" },
            address: { $first: "$address" },
            menuItems: { $push: "$menuDetails.items" },
            coordinates: { $first: "$coordinates" },
          },
        },
        {
          $addFields: {
            categories: {
              $map: {
                input: "$menuItems",
                as: "item",
                in: "$$item.category",
              },
            },
          },
        },
        {
          $addFields: {
            category: {
              $cond: {
                if: { $in: ["lunch", "$categories"] },
                then: {
                  $cond: {
                    if: { $in: ["drink", "$categories"] },
                    then: "both",
                    else: "lunch",
                  },
                },
                else: "drink",
              },
            },
          },
        },
        {
          $project: {
            _id: 1,
            name: 1,
            address: 1,
            coordinates: 1,
            category: 1,
          },
        },
      ])
      .toArray();

    return c.json(
      {
        total: data.length,
        data,
      },
      200
    );
  } catch (error) {
    return c.json(
      {
        hasError: true,
        description: error,
      },
      400
    );
  }
};

export default getRestaurantsOnMapAction;
