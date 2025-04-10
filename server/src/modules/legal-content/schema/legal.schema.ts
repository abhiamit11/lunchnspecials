import { ObjectId } from "mongodb";
import { z } from "zod";

const contentSchema = z.object({
  content: z.string(),
  isHtml: z.boolean(),
});

export const AboutSchema = z.object({
  aboutHtml: contentSchema,
});

export const ResponseSchema = z.object({
  succeed: z.boolean(),
  message: z.string(),
});

export const ContentResponseSchema = z.object({
  succeed: z.boolean(),
  data: contentSchema,
});

export const PrivacyPolicySchema = z.object({
  privacyHtml: contentSchema,
});

export const CookiesSchema = z.object({
  cookiesHtml: contentSchema,
});

export const TermsConditionsSchema = z.object({
  termsConditionsHtml: contentSchema,
});

type contentSchema = z.infer<typeof contentSchema>;
export type LegalContentType = {
  _id?: ObjectId;
  aboutHtml: contentSchema;
  privacyHtml: contentSchema;
  termsConditionsHtml: contentSchema;
  cookiesHtml: contentSchema;
  updatedAt: string;
  creationAt: string;
};
