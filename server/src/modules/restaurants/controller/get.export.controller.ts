import { db } from "../../../services/mongodb";
import { RouteHandler } from "@hono/zod-openapi";
import { ObjectId } from "mongodb";
import exportManyRestaurant from "../routes/get.export";
import { restaurantType } from "../schema/restaurants.schema";

type menuObject = {
  menu_id: ObjectId;
  menu_day: string;
  menu_name: string;
  menu_price: string;
  menu_description: string;
  menu_category: string;
  menu_timings_opening: string;
  menu_timings_closing: string;
};
type csvObject = {
  restaurant_id: ObjectId;
  name: string;
  website: string;
  description: string;
  address: string;
  zip: string;
  phone: string;
  rating: string;
  coordinates_latitude: string;
  coordinates_longitude: string;
} & menuObject;

type MenuItem = {
  name: string;
  day: string;
  description: string;
  price: string;
  category: string;
  timings: {
    opening: string;
    closing: string;
  };
};
type MenuType = {
  _id: ObjectId;
  items: MenuItem[];
  restaurantId: ObjectId;
};

type exportRestaurantType = restaurantType & {
  updatedAt: string;
  creationAt: string;
};

const exportManyRestaurantAction: RouteHandler<
  typeof exportManyRestaurant
> = async (c) => {
  try {
    const { ids } = c.req.valid("json");

    const idsToExport = ids.map((_id: string) => new ObjectId(_id));

    const menuArray = await db
      .collection<MenuType>("restaurant_menus")
      .find<MenuType>({ restaurantId: { $in: idsToExport } })
      .toArray()
      .catch((error) => console.error(error));

    const restaurantsArray = await db
      .collection<exportRestaurantType>("restaurants")
      .find({ _id: { $in: idsToExport } })
      .toArray()
      .catch((error) => console.error(error));

    if (!restaurantsArray) {
      throw new Error("");
    }

    const data: csvObject[] = [];
    restaurantsArray.forEach((restaurant) => {
      const columnsToAddLast = {
        new_or_revised: restaurant.isNewOrRevised,
        business_partner: restaurant.isPartner,
        creation_date: restaurant.creationAt
          ? new Date(restaurant.creationAt).toDateString()
          : "",
        updated_date: restaurant.creationAt
          ? new Date(restaurant.creationAt).toDateString()
          : "",
      };
      const exportObj = {
        restaurant_id: restaurant._id,
        name: restaurant.name,
        website: restaurant.url || "",
        description: restaurant.description || "",
        address: restaurant.address,
        zip: restaurant.zip,
        phone: restaurant.phone || "",
        rating: restaurant.rating || "",
        coordinates_latitude: restaurant.coordinates.latitude,
        coordinates_longitude: restaurant.coordinates.longitude,
      };

      let menu = {
        menu_day: "",
        menu_name: "",
        menu_price: "",
        menu_description: "",
        menu_category: "",
        menu_timings_opening: "",
        menu_timings_closing: "",
        menu_id: new ObjectId(),
      };

      if (!Array.isArray(menuArray) || menuArray.length === 0) {
        data.push({ ...exportObj, ...menu, ...columnsToAddLast });
        return;
      }

      const restaurantMenu = menuArray.find((item) =>
        item.restaurantId.equals(restaurant._id)
      );

      if (!restaurantMenu) {
        data.push({ ...exportObj, ...menu, ...columnsToAddLast });
        return;
      }

      restaurantMenu.items.forEach((item) => {
        data.push({
          ...exportObj,
          menu_id: restaurantMenu._id,
          menu_day: item.day,
          menu_name: item.name,
          menu_price: item.price,
          menu_description: item.description.replaceAll(",", " "),
          menu_category: item.category,
          menu_timings_opening: item.timings?.opening || "",
          menu_timings_closing: item.timings?.closing || "",
          ...columnsToAddLast,
        });
      });
    });

    return c.json({ succeed: true, total: data.length, data }, 200);
  } catch (e: any) {
    return c.json({ hasError: true, description: e.message }, 400);
  }
};
export default exportManyRestaurantAction;
