import { RouteHandler } from "@hono/zod-openapi";
import signin from "../routes/get.analytics";
import { db } from "../../../services/mongodb";
import analytics from "../routes/get.analytics";
import {
  analyticsOverviewType,
  analyticsVisitorType,
  topViewedRestaurantType,
} from "../schema/analytics.schema";

const getanalyticsAction: RouteHandler<typeof analytics> = async (c) => {
  try {
    const analyticsVisitor = db.collection("analytics_visitor");
    const res = await analyticsVisitor
      .aggregate<analyticsVisitorType>([
        {
          $group: {
            _id: null, // We don't need to group by anything, just get totals
            uniqueVisitors: { $addToSet: "$visitorId" }, // Add unique visitorId to a set
            totalVisitors: { $sum: 1 }, // Count all documents
          },
        },
        {
          $project: {
            uniqueVisitor: { $size: "$uniqueVisitors" }, // Get the size of the unique visitor set
            visitor: "$totalVisitors", // Get the total count of visitors
          },
        },
      ])
      .toArray();

    const analyticsRestaurantVisit = db.collection<topViewedRestaurantType>(
      "analytics_restaurant_visit"
    );

    const topViewedRestaurant = await analyticsRestaurantVisit
      .aggregate<topViewedRestaurantType>([
        {
          $group: {
            _id: "$restaurantId", // Group by restaurantId
            visitCount: { $sum: 1 }, // Count the occurrences of each restaurantId
          },
        },
        {
          $sort: { visitCount: -1 }, // Sort by the count in descending order to get the most repeated restaurantId
        },
        {
          $limit: 1, // Get only the most repeated restaurantId
        },
        {
          $lookup: {
            from: "restaurants", // Join with the restaurants collection
            localField: "_id", // The field in analytics_restaurant_visit to match
            foreignField: "_id", // The field in restaurants to match
            as: "restaurantDetails", // Name the resulting array of matched restaurants
          },
        },
        {
          $unwind: "$restaurantDetails", // Unwind the restaurantDetails array (since there will be only one match)
        },
        {
          $project: {
            restaurantId: "$_id", // Include the restaurantId
            visitCount: 1, // Include the visitCount
            restaurantName: "$restaurantDetails.name", // Extract the restaurant name from the joined restaurant details
            location: "$restaurantDetails.address",
          },
        },
      ])
      .toArray();

    const totalRestaurants = (
      await db.collection("restaurants").find().toArray()
    ).length;

    const data: analyticsOverviewType = {
      ...res[0],
      topViewedRestaurant: topViewedRestaurant[0],
      totalRestaurants,
    };
    return c.json(data, 200);
  } catch (e: any) {
    return c.json({ hasError: true, description: e.message }, 400);
  } finally {
  }
};
export default getanalyticsAction;
