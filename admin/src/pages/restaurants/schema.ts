import { z } from "zod";

const coordinatesSchema = z.object({
  latitude: z.string().min(1, "Latitude is required"),
  longitude: z.string().min(1, "Longitude is required"),
});

const timingsSchema = z.object({
  opening: z.string().optional().or(z.null()),
  closing: z.string().optional().or(z.null()),
});

export const menuItemSchema = z.object({
  day: z.string().min(1, "Please select day."),
  name: z.string().min(1, "Name is required."),
  price: z.string().optional(),
  description: z.string().optional(),
  category: z.string().min(1, "Please select category.").default("lunch"),
  timings: timingsSchema,
});

export const formSchema = z.object({
  name: z.string().min(1, "Restaurant name is required."), // Required
  address: z.string().min(1, "Address is required."), // Required
  zip: z.string().min(1, "Zip is required."), // Required
  url: z.string().url("Please enter valid URL").optional(),
  description: z.string().optional(),
  coordinates: coordinatesSchema, // Required
  menu: z.array(menuItemSchema),
  phone: z.string().optional(),
  rating: z.string().optional(),
  // timings: timingsSchema,
  isPartner: z.boolean().optional(),
  isNewOrRevised: z.boolean().optional(),
});

export const editformSchema = formSchema.and(z.object({ menuId: z.string() }));
