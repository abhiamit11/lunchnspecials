import axios from "axios";
import { passwordFormType } from "./schema";
import { headers } from "@/constant";
import { SocialLinksType } from "./update-links";

type ResponseType = {
  succeed: string;
  message: string;
};

export async function updatePassword(
  data: passwordFormType
): Promise<ResponseType> {
  return axios
    .post(`/auth/change-password`, data)
    .then((response) => response.data);
}

type socialLinksResponse = {
  socialLinks: SocialLinksType;
};
export async function getSocialLinks(): Promise<socialLinksResponse> {
  return axios
    .get(`/cms/social-links`, { headers })
    .then((response) => response.data);
}

export async function setSocialLinks(
  data: SocialLinksType
): Promise<socialLinksResponse> {
  return axios
    .post(`/admin/settings/cms/social-links`, data)
    .then((response) => response.data);
}

export async function uploadLogo(data: FormData): Promise<unknown> {
  const options = {
    method: "POST",
    url: `/admin/settings/cms/logo`,
    headers: { "Content-Type": "multipart/form-data" },
    data,
  };
  return await axios.request(options).then((response) => response.data);
}
