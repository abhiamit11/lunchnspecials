import axios from "axios";
import { passwordFormType } from "./schema";

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
