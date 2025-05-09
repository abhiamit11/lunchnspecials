import { headers } from "@/constant";
import axios from "axios";

import {
  DeleteRestaurantResponseType,
  PaginationType,
  Restaurant,
  AddRestaurantRequestType,
  AddRestaurantResponseType,
  EditRestaurantResponseType,
  EditRestaurantRequestType,
  ImportHistoryType,
} from "./types";

export async function getRestaurants(pagination: PaginationType): Promise<{
  total: number;
  data: Restaurant[];
}> {
  const {
    page,
    limit,
    search,
    createdAtEnd,
    createdAtStart,
    updatedAtEnd,
    updatedAtStart,
  } = pagination;
  const query = `?page=${page || 1}&limit=${limit || 10}&sortBy=updatedAt&sortOrder=desc`;
  const filters =
    `` +
    (createdAtEnd ? `&createdAtEnd=${createdAtEnd}` : ``) +
    (createdAtStart ? `&createdAtStart=${createdAtStart}` : ``) +
    (updatedAtEnd ? `&updatedAtEnd=${updatedAtEnd}` : ``) +
    (updatedAtStart ? `&updatedAtStart=${updatedAtStart}` : ``);

  const s = search ? `&search=${search}` : "";
  return axios
    .get(`/restaurants${query + s + filters}`, { headers })
    .then((response) => response.data);
}

export async function getRestaurant(
  id: string
): Promise<EditRestaurantResponseType> {
  return axios.get(`/restaurants/${id}`).then((response) => response.data);
}

export async function deleteRestaurant(
  id: string
): Promise<DeleteRestaurantResponseType> {
  return axios
    .delete(`/admin/restaurants/${id}`)
    .then((response) => response.data);
}

export async function addRestaurant(
  data: AddRestaurantRequestType
): Promise<AddRestaurantResponseType> {
  return axios
    .post(`/admin/restaurants`, { ...data })
    .then((response) => response.data);
}

export async function updateRestaurant(
  id: string,
  data: EditRestaurantRequestType
): Promise<AddRestaurantResponseType> {
  return axios
    .put(`/admin/restaurants/${id}`, { ...data })
    .then((response) => response.data);
}

export async function importRestaurants(data: FormData): Promise<unknown> {
  const options = {
    method: "POST",
    url: `/admin/restaurants/import`,
    headers: { "Content-Type": "multipart/form-data" },
    data,
  };
  return await axios.request(options).then((response) => response.data);
}

export async function getImportHistroy(): Promise<{
  total: number;
  data: ImportHistoryType[];
}> {
  return axios
    .get(`/admin/restaurants/import/histroy`, { headers })
    .then((response) => response.data);
}

export async function deleteManyRestaurant(data: {
  ids: string[];
}): Promise<DeleteRestaurantResponseType> {
  return axios
    .patch(`/admin/restaurants/delete/many`, data)
    .then((response) => response.data);
}

export async function exportManyRestaurant(data: {
  ids: string[];
}): Promise<any> {
  return axios
    .post(`/admin/restaurants/export/many`, data)
    .then((response) => response.data);
}
