import axios from "axios";
import { contentType } from "./schema";
import { API_URL } from "@/constant";

type ResponseType = {
  succeed: string;
  message: string;
};

type ContentResponseSchema = {
  succeed: string;
  data: contentType;
};

// About
export async function updateAboutContent(
  aboutHtml: contentType
): Promise<ResponseType> {
  const data = { aboutHtml: { ...aboutHtml } };
  return axios
    .post(`${API_URL}legal-content/about`, data)
    .then((response) => response.data);
}

export async function getAboutContent(): Promise<ContentResponseSchema> {
  return axios
    .get(`${API_URL}legal-content/about`)
    .then((response) => response.data);
}

// Privacy Policy
export async function updatePrivacyPolicyContent(
  privacyHtml: contentType
): Promise<ResponseType> {
  const data = { privacyHtml: { ...privacyHtml } };
  return axios
    .post(`${API_URL}legal-content/privacy-content`, data)
    .then((response) => response.data);
}

export async function getPrivacyPolicyContent(): Promise<ContentResponseSchema> {
  return axios
    .get(`${API_URL}legal-content/privacy-content`)
    .then((response) => response.data);
}

// Terms and Conditions
export async function updateTermsContent(
  termsConditionsHtml: contentType
): Promise<ResponseType> {
  const data = { termsConditionsHtml: { ...termsConditionsHtml } };
  return axios
    .post(`${API_URL}legal-content/terms-content`, data)
    .then((response) => response.data);
}

export async function getTermsContent(): Promise<ContentResponseSchema> {
  return axios
    .get(`${API_URL}legal-content/terms-content`)
    .then((response) => response.data);
}

// Cookies
export async function updateCookiesContent(
  cookiesHtml: contentType
): Promise<ResponseType> {
  const data = { cookiesHtml: { ...cookiesHtml } };
  return axios
    .post(`${API_URL}legal-content/cookies-content`, data)
    .then((response) => response.data);
}

export async function getCookiesContent(): Promise<ContentResponseSchema> {
  return axios
    .get(`${API_URL}legal-content/cookies-content`)
    .then((response) => response.data);
}
