import { z } from "@hono/zod-openapi";

export const ErrorSchema = z.object({
  hasError: z.boolean().openapi({
    example: true,
  }),
  description: z.string().openapi({
    example: "Bad Request",
  }),
});

export const paginationQuerySchema = z.object({
  page: z
    .string()
    .regex(/^\d+$/, "Page must be a valid number") // Ensure page is a number
    .transform(Number) // Convert string to number
    .default("1"), // Default to page 1 if not provided
  limit: z
    .string()
    .regex(/^\d+$/, "Limit must be a valid number") // Ensure limit is a number
    .transform(Number) // Convert string to number
    .default("10"), // Default to limit 10 if not provided
  sortBy: z.string().optional().default("updatedAt"), // Default sort by 'name'
  sortOrder: z.enum(["asc", "desc"]).optional().default("asc"), // Default sort order is 'asc',
  search: z.string().optional(),
});

export const coordinatesQuerySchema = z.object({
  x: z
    .string()
    // .regex(/^\d+$/, "Page must be a valid number") // Ensure page is a number
    .transform(Number),
  y: z
    .string()
    // .regex(/^\d+$/, "Page must be a valid number") // Ensure page is a number
    .transform(Number),
  radius: z.string().transform(Number).optional().default("1.5"), // Default sort by 'name'
  day: z.string().optional(),
});
