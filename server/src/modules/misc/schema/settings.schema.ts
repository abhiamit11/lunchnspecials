import { z } from "zod";

export const socialLinksSchema = z.object({
  facebook: z.string(),
  instagram: z.string(),
  email: z.string(),
});

export const logoRequestSchema = z.object({
  logo: z.custom<File>((v) => v instanceof File).openapi({}),
});
