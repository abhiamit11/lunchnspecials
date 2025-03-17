import { z } from "zod";

const topViewedRestaurantSchema = z.object({
  visitCount: z.number(),
  restaurantId: z.string(),
  restaurantName: z.string(),
  location: z.string(),
});

export const analyticsOverviewSchema = z.object({
  uniqueVisitor: z.number(),
  visitor: z.number(),
  topViewedRestaurant: topViewedRestaurantSchema,
  totalRestaurants: z.number(),
});

export type analyticsOverviewType = z.infer<typeof analyticsOverviewSchema>;
export type topViewedRestaurantType = z.infer<typeof topViewedRestaurantSchema>;
export type analyticsVisitorType = {
  uniqueVisitor: number;
  visitor: number;
};
