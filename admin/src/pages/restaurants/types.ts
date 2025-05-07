import { z } from "zod";
import { editformSchema, formSchema, menuItemSchema } from "./schema";

export type Restaurant = {
  _id: string;
  name: string;
  address: string;
  url: string;
  coordinates: {
    latitude: string;
    longitude: string;
  };
  timings: {
    opening: string;
    closing: string;
  };
  creationAt: string;
  updatedAt: string;
  menu?: string;
};

export type DeleteRestaurantResponseType = {
  succeed: boolean;
  data: {
    acknowledged: boolean;
    deletedCount: number;
  };
};

export type PaginationType = {
  page: number;
  limit: number;
  sortBy?: string | undefined;
  sortOrder?: "asc" | "desc" | undefined;
  search?: string;
};

export type EditformType = z.infer<typeof editformSchema>;
export type AddFormType = z.infer<typeof formSchema>;

export type MenuItem = z.infer<typeof menuItemSchema>;

export type AddRestaurantRequestType = AddFormType;
export type EditRestaurantRequestType = EditformType;

export type AddRestaurantResponseType = {
  succeed: boolean;
  data: {
    acknowledged: boolean;
    insertedId: string | null;
  };
};

export type EditRestaurantResponseType = {
  succeed: boolean;
  data: z.infer<typeof formSchema>;
};

export type ImportHistoryType = {
  _id: string;
  importId: string;
  importedAt: string;
  importedCount: number;
  succeed: boolean;
  partial?: boolean;
};
