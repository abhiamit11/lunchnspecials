import { z } from "@hono/zod-openapi";
import { ObjectId } from "mongodb";

export const ParamsSchema = z.object({
  id: z.string(z.instanceof(ObjectId)).min(3),
});

const coordinatesSchema = z.object({
  latitude: z.string(),
  longitude: z.string(),
});

const timingsSchema = z.object({
  opening: z.string().optional().or(z.null()),
  closing: z.string().optional().or(z.null()),
});

const menuSchema = z.object({
  day: z.string(),
  name: z.string(),
  price: z.string(),
  description: z.string(),
  category: z.string().optional().default("lunch"),
  timings: timingsSchema,
});

export const restaurantSchema = z.object({
  name: z.string().min(1, "restaurant name is required"),
  url: z.string().url().optional(),
  description: z.string().optional(),
  address: z.string().min(1, "restaurant address is required"),
  zip: z.string().min(1),
  coordinates: coordinatesSchema,
  menu: z.array(menuSchema),
  phone: z.string().optional(),
  rating: z.string().optional(),
  isNewOrRevised: z.boolean().optional(),
  isPartner: z.boolean().optional(),
});

export const deleteManySchema = z.object({
  ids: z.array(z.string()).min(1, "IDs required."),
});

export type restaurantType = z.infer<typeof restaurantSchema>;

export const FileRequestSchema = z.object({
  csv: z.custom<File>((v) => v instanceof File).openapi({}),
});

export const MapRestaurantSchema = z.object({
  _id: z.string(),
  name: z.string(),
  address: z.string(),
  category: z.string(),
  coordinates: z.object({ latitude: z.string(), longitude: z.string() }),
});

export type MapRestaurant = {
  _id: string;
  name: string;
  address: string;
  category: "drink" | "lunch" | "both";
  coordinates: { latitude: string; longitude: string };
};

export const exportSchema = z.object({
  succeed: z.boolean(),
  total: z.number(),
  data: z
    .array(
      z.object({
        name: z.string(),
        website: z.string(),
        description: z.string(),
        address: z.string(),
        zip: z.string(),
        phone: z.string(),
        rating: z.string(),
        coordinates_latitude: z.string(),
        coordinates_longitude: z.string(),
        menu_day: z.string(),
        menu_name: z.string(),
        menu_price: z.string(),
        menu_description: z.string(),
        menu_category: z.string(),
        menu_timings_opening: z.string(),
        menu_timings_closing: z.string(),
        new_or_revised: z.string().optional(),
        business_partner: z.string().optional(),
        creation_date: z.string().optional(),
        updated_date: z.string().optional(),
      })
    )
    .or(z.null()),
});
