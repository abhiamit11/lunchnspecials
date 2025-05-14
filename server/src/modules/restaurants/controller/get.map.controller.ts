import { db } from "../../../services/mongodb";
import { MapRestaurant } from "../schema/restaurants.schema";
import { RouteHandler } from "@hono/zod-openapi";
import getRestaurantsOnMap from "../routes/get.map";
import { coordinatesQuerySchema } from "../../../schema";

const getRestaurantsOnMapAction: RouteHandler<
  typeof getRestaurantsOnMap & any
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
            isPartner: { $first: "$isPartner" },
            isNewOrRevised: { $first: "$isNewOrRevised" },
            updatedAt: { $first: "$updatedAt" },
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
                if: {
                  $and: [
                    { $in: ["lunch", "$categories"] },
                    { $in: ["drink", "$categories"] },
                    // { $in: ["ct", "$categories"] },
                  ],
                },
                then: "both",
                else: {
                  $cond: {
                    if: { $in: ["lunch", "$categories"] },
                    then: "lunch",
                    else: {
                      $cond: {
                        if: { $in: ["drink", "$categories"] },
                        then: "drink",
                        else: {
                          $cond: {
                            if: { $in: ["ct", "$categories"] },
                            then: "ct",
                            else: "none",
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
        {
          $project: {
            _id: 1,
            name: 1,
            // address: 1,
            coordinates: 1,
            category: 1,
            isPartner: 1,
            isNewOrRevised: 1,
            updatedAt: 1,
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
