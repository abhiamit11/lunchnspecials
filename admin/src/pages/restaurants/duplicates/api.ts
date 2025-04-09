import axios from "axios";
import { headers } from "@/constant";

export type DuplicateRestaurantsType = {
  name: string;
  address: string;
  count: number;
};

export async function getDuplicateRestaurants(): Promise<{
  total: number;
  data: DuplicateRestaurantsType[];
}> {
  return axios
    .get(`/admin/restaurants/duplicates`, { headers })
    .then((response) => response.data);
}

export async function deleteDuplicateRestaurant(): Promise<{
  total: number;
  data: DuplicateRestaurantsType[];
}> {
  return axios
    .delete(`/admin/duplicate/restaurants`)
    .then((response) => response.data);
}
