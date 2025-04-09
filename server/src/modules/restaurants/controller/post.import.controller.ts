import { db } from "../../../services/mongodb";
import { RouteHandler } from "@hono/zod-openapi";
import importRestaurants from "../routes/post.import";
import * as fs from "node:fs";
import csv = require("csv-parser");
import { restaurantType } from "../schema/restaurants.schema";
import { BulkWriteResult, InsertManyResult, ObjectId } from "mongodb";

type csvObject = {
  restaurant_id?: string;
  name: string;
  website: string;
  description: string;
  address: string;
  zip: string;
  phone: string;
  rating: string;
  coordinates_latitude: string;
  coordinates_longitude: string;
  menu_id?: string;
  menu_day: string;
  menu_name: string;
  menu_price: string;
  menu_description: string;
  menu_category: string;
  menu_timings_opening: string;
  menu_timings_closing: string;
};

const headersRequired = [
  "name",
  "address",
  "zip",
  "coordinates_latitude",
  "coordinates_longitude",
  "menu_day",
  "menu_name",
  "menu_price",
  "menu_description",
  "menu_category",
  "menu_timings_opening",
  "menu_timings_closing",
];

type importObjectToDb = Omit<restaurantType, "menu"> & {
  _id: ObjectId;
  creationAt: string;
  updatedAt: string;
  importedAt: string;
  importId: string;
  menu: ObjectId;
  location: {
    type: string;
    coordinates: number[];
  };
};

type importMenuType = {
  _id: ObjectId;
  items: {
    name: string;
    day: string;
    description: string;
    price: string;
  }[];
  restaurantId: ObjectId;
};

type resType = BulkWriteResult | undefined;

const processedData = async (data: csvObject[]): Promise<resType> => {
  const importId = crypto.randomUUID();

  if (Array.isArray(data) && data.length > 0) {
    const bulkData: importObjectToDb[] = [];
    const bulkMenuData: importMenuType[] = [];

    const bulkOperationToRestaurant: any[] = [];
    const bulkOperationToMenu: any[] = [];

    const restaurantMap = new Map<string, ObjectId>(); // Maps "name|address" to restaurantId
    const menuMap = new Map<string, importMenuType>(); // Maps restaurantId to menu object

    const timestamp = new Date().toISOString(); // Reduce redundant date function calls

    try {
      data.forEach((item) => {
        const key = `${item.name}|${item.address}`;

        if (!restaurantMap.has(key)) {
          let restaurantId = new ObjectId();

          let menu: importMenuType = {
            _id: new ObjectId(),
            items: [],
            restaurantId,
          };

          let objectRestructure: importObjectToDb = {
            _id: restaurantId,
            name: item.name,
            address: item.address,
            zip: item.zip,
            url: item.website,
            description: item.description,
            coordinates: {
              latitude: item.coordinates_latitude,
              longitude: item.coordinates_longitude,
            },
            location: {
              type: "Point",
              coordinates: [
                parseFloat(item.coordinates_longitude),
                parseFloat(item.coordinates_latitude),
              ],
            },
            menu: menu._id,
            creationAt: timestamp,
            updatedAt: timestamp,
            importedAt: timestamp,
            importId,
            phone: item.phone,
            rating: item.rating,
          };

          // If the file has a restaurant_id, update the existing record.
          if (item.restaurant_id) {
            restaurantId = new ObjectId(item.restaurant_id);

            if (item.menu_id) {
              menu = {
                ...menu,
                restaurantId,
                _id: new ObjectId(item.menu_id),
              };
            }

            objectRestructure = {
              ...objectRestructure,
              _id: restaurantId,
              menu: menu._id,
            };
          }
          //end

          // Store references for fast lookup
          restaurantMap.set(key, restaurantId);
          menuMap.set(restaurantId.toHexString(), menu);

          bulkData.push(objectRestructure);
          bulkMenuData.push(menu);

          // ----
          bulkOperationToMenu.push({
            updateOne: {
              filter: { _id: menu._id },
              update: { $set: menu },
              upsert: true, // Insert if not found
            },
          });
          // ----
          bulkOperationToRestaurant.push({
            updateOne: {
              filter: { _id: restaurantId },
              update: { $set: objectRestructure },
              upsert: true, // Insert if not found
            },
          });
        } // end if

        // Add menu item to the correct menu
        const restaurantId = restaurantMap.get(key)!;
        const menu = menuMap.get(restaurantId.toHexString())!;

        const menuItem = {
          name: item.menu_name,
          day: item.menu_day.toLowerCase(),
          description: item.menu_description,
          price: item.menu_price.trim(),
          category: item.menu_category,
          timings: {
            opening: item.menu_timings_opening,
            closing: item.menu_timings_closing,
          },
        };

        menu.items.push(menuItem);
      }); // end forEach
    } catch (error) {
      throw error;
    }

    return new Promise(async (resolve, reject) => {
      try {
        const menuOperation = await db
          .collection("restaurant_menus")
          .bulkWrite(bulkOperationToMenu);

        if (menuOperation.hasWriteErrors()) {
          throw new Error("Error While Bulk Operation To Menu");
        }

        const result = await db
          .collection("restaurants")
          .bulkWrite(bulkOperationToRestaurant);

        if (!result) {
          throw new Error("Error While Bulk Operation To Restaurant");
        }

        if (result.hasWriteErrors()) {
          throw new Error("Error While Bulk Operation To Restaurant");
        }

        await db.collection("import_history").insertOne({
          importId,
          importedAt: new Date().toISOString(),
          importedCount: result.insertedCount + result.upsertedCount,
          updatedCount: result.modifiedCount,
          succeed: result.isOk(),
        });

        resolve(result);
      } catch (error) {
        reject(error);
      }
    });
  }
};

async function bulkInsertCSV(filePath: string): Promise<resType> {
  const data: any[] = [];
  return new Promise((resolve, reject) => {
    fs.createReadStream(filePath)
      .pipe(csv())
      .on("headers", (headers) => {
        if (Array.isArray(headers)) {
          if (headers.length < headersRequired.length) {
            reject(
              new Error(
                "The required headers are missing from the file. The missing headers are: " +
                  headersRequired.join(", ")
              )
            );
          }

          // Find missing headers
          const missingHeaders = headersRequired.filter(
            (header) => !headers.includes(header)
          );

          if (missingHeaders.length > 0) {
            reject(
              new Error(
                "The required headers are missing from the file: " +
                  missingHeaders.join(", ")
              )
            );
          }
          // end
        }
      })
      .on("data", (x: { [key: string]: string }) => data.push(x))
      .on("end", async () => {
        try {
          const res = await processedData(data);
          resolve(res);
        } catch (error) {
          reject(error);
        }
      })
      .on("error", (e) => reject(e));
  });
}

const postImportAction: RouteHandler<typeof importRestaurants> = async (c) => {
  try {
    const body = await c.req.parseBody();
    const csvFile = body["csv"];

    if (!csvFile) {
      throw new Error("No file uploaded");
    }

    if (typeof csvFile == "string") {
      throw new Error("The uploaded file is not properly formatted as a CSV.");
    }

    if (csvFile.type != "text/csv") {
      throw new Error("The uploaded file is not properly formatted as a CSV.");
    }

    const filePath = `/tmp/${csvFile.name}`;
    await Bun.write(filePath, csvFile);

    const data = await bulkInsertCSV(filePath);

    if (data) return c.json({ succeed: true, data }, 200);
    else throw new Error("Empty");
  } catch (e: any) {
    return c.json({ hasError: true, description: e.message }, 400);
  } finally {
  }
};

export default postImportAction;
