import axios from "axios";

type ContentResponseSchema = {
  succeed: string;
  data: { content: string };
};

export async function getAboutContent(): Promise<ContentResponseSchema> {
  return axios.get(`legal-content/about`).then((response) => response.data);
}

export async function getTermsContent(): Promise<ContentResponseSchema> {
  return axios
    .get(`legal-content/terms-content`)
    .then((response) => response.data);
}

export async function getCookiesContent(): Promise<ContentResponseSchema> {
  return axios
    .get(`legal-content/cookies-content`)
    .then((response) => response.data);
}

export async function getPrivacyContent(): Promise<ContentResponseSchema> {
  return axios
    .get(`legal-content/privacy-content`)
    .then((response) => response.data);
}
