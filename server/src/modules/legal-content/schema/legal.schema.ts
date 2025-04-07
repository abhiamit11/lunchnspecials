import { ObjectId } from "mongodb";
import { z } from "zod";

export const AboutSchema = z.object({
  aboutHtml: z.string(),
});

export const ResponseSchema = z.object({
  succeed: z.boolean(),
  message: z.string(),
});

export const ContentResponseSchema = z.object({
  succeed: z.boolean(),
  content: z.string(),
});

export const PrivacyPolicySchema = z.object({
  privacyHtml: z.string(),
});

export const CookiesSchema = z.object({
  cookiesHtml: z.string(),
});

export const TermsConditionsSchema = z.object({
  termsConditionsHtml: z.string(),
});

export type LegalContentType = {
  _id?: ObjectId;
  aboutHtml: string;
  privacyHtml: string;
  termsConditionsHtml: string;
  cookiesHtml: string;
  updatedAt: string;
  creationAt: string;
};
