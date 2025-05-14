import { RouteHandler } from "@hono/zod-openapi";
import getDaySpecial from "../routes/get.day-special";
import { ObjectId } from "mongodb";
import { restaurantType } from "../schema/restaurants.schema";
import { db } from "../../../services/mongodb";

const getDaySpecialAction: RouteHandler<typeof getDaySpecial> = async (c) => {
  try {
    const { id } = c.req.valid("param");
    const { day } = c.req.query();
    const restaurantId = new ObjectId(id);

    const item = await db
      .collection<restaurantType>("restaurants")
      .aggregate<restaurantType>([
        {
          $match: {
            _id: restaurantId, // Replace with actual _id
          },
        },
        {
          $addFields: {
            menuId: "$menu", // Add the 'menu' field as 'menuId'
          },
        },
        {
          $lookup: {
            from: "restaurant_menus", // Name of the collection where menus are stored
            localField: "menuId",
            foreignField: "_id",
            as: "menu",
          },
        },
        {
          $unwind: "$menu",
        },
        {
          $unwind: "$menu.items",
        },
        {
          $match: {
            "menu.items.day": day || "monday", // Assuming today's Monday
          },
        },
        {
          $group: {
            _id: "$_id",
            name: { $first: "$name" },
            address: { $first: "$address" },
            menu: { $push: "$menu.items" },
            coordinates: { $first: "$coordinates" },
            url: { $first: "$url" },
            phone: { $first: "$phone" },
            rating: { $first: "$rating" },
            updatedAt: { $first: "$updatedAt" },
          },
        },
        {
          $addFields: {
            categories: {
              $map: {
                input: "$menu",
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
            address: 1,
            menu: 1,
            category: 1,
            url: 1,
            phone: 1,
            rating: 1,
            updatedAt: 1,
          },
        },
        // {
        //   $addFields: {
        //     menu: { $arrayElemAt: ["$menu.items", 0] }, // Add the 'menu' field as 'menuId'
        //   },
        // },
      ])
      .toArray();

    if (!item) {
      throw new Error("Not Found");
    }

    return c.json(
      {
        succeed: true,
        data: item[0],
      },
      200
    );
  } catch (e: any) {
    return c.json({ hasError: true, description: e.message }, 400);
  }
};

export default getDaySpecialAction;
