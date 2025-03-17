import axios from "axios";

export type analyticsOverviewType = {
  uniqueVisitor: number;
  visitor: number;
  totalRestaurants: number;
  topViewedRestaurant: {
    visitCount: number;
    restaurantId: string;
    restaurantName: string;
    location: string;
  };
};

export async function analyticsOverview(): Promise<analyticsOverviewType> {
  return axios.get(`/analytics`).then((response) => response.data);
}
