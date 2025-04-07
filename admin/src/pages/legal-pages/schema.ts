import { z } from "zod";

export const AboutSchema = z.object({
  aboutHtml: z.string(),
});

export type AboutType = {
  aboutHtml: string;
};

export const PrivacyPolicySchema = z.object({
  privacyHtml: z.string(),
});

export type PrivacyPolicyType = {
  privacyHtml: string;
};

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
