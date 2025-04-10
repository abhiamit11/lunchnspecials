import { z } from "zod";

export const AboutSchema = z.object({
  aboutHtml: z.string(),
});

export const contentSchema = z.object({
  content: z.string(),
  isHtml: z.boolean(),
});

export type contentType = z.infer<typeof contentSchema>;

export type AboutType = {
  aboutHtml: string;
};

export const PrivacyPolicySchema = contentSchema;

export type PrivacyPolicyType = z.infer<typeof contentSchema>;

export type TermsConditionsType = {
  termsConditionsHtml: string;
};

export const TermsConditionsSchema = z.object({
  termsConditionsHtml: z.string(),
});

export type CookiesType = {
  cookiesHtml: string;
};

export const CookiesSchema = z.object({
  cookiesHtml: z.string(),
});
