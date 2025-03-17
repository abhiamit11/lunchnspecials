import { db } from "../../../services/mongodb";
import { restaurantType } from "../schema/restaurants.schema";
import { RouteHandler } from "@hono/zod-openapi";
import getRestaurant from "../routes/get.restaurant";
import { ObjectId } from "mongodb";

const getRestaurantAction: RouteHandler<typeof getRestaurant> = async (c) => {
  try {
    const { id } = c.req.valid("param");
    const restaurantId = new ObjectId(id);
    // const item = await db
    //   .collection<restaurantType>("restaurants")
    //   .findOne({ _id: restaurantId });

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
          $addFields: {
            menu: { $arrayElemAt: ["$menu.items", 0] }, // Add the 'menu' field as 'menuId'
          },
        },
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

export default getRestaurantAction;
