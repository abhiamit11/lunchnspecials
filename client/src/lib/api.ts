import axios from "axios";

export type PaginationType = {
  page: number;
  limit: number;
  sortBy?: string | undefined;
  sortOrder?: "asc" | "desc" | undefined;
  search?: string;
};

export type Restaurant = {
  _id: string;
  name: string;
  address: string;
  category: "drink" | "lunch" | "both" | undefined;
  coordinates: { latitude: string; longitude: string };
  isPartner: boolean | null;
  isNewOrRevised: boolean | null;
  updatedAt: string;
};

export async function getRestaurants(
  x: number,
  y: number,
  r?: number | undefined,
  day?: string,
  init?: boolean
): Promise<{
  total: number;
  data: Restaurant[];
}> {
  let query = r ? `&radius=${r}` : "";
  query = query + (day ? `&day=${day}` : "");
  const first = init ? `&init=${init}` : "";
  return axios
    .get(`/restaurants/map/?x=${x}&y=${y}${query}${first}`, {
      withCredentials: true,
    })
    .then((response) => response.data);
}

export type IndividualRestaurant = Omit<Restaurant, "menu"> & {
  url?: string;
  rating?: string;
  phone?: string;
  updatedAt: string;
  menu: {
    day: string;
    name: string;
    price: string;
    description: string;
    category: "drink" | "lunch";
    timings: {
      opening: string;
      closing: string;
    };
  }[];
};

export async function getRestaurant(
  id: string,
  day?: string
): Promise<{ succeed: boolean; data: IndividualRestaurant }> {
  let query = day ? `?day=${day}` : "";
  return axios
    .get(`/restaurants/special/${id}${query}`)
    .then((response) => response.data);
}

export type socialLinksResponse = {
  socialLinks: { facebook: string; instagram: string; email: string };
};

export async function getSocialLinks(): Promise<socialLinksResponse> {
  return axios.get(`/cms/social-links`).then((response) => response.data);
}
