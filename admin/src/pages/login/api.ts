import axios from "axios";
import { SigninFormType, SigninResponseType } from "./schema";

export async function signin(
  data: SigninFormType
): Promise<SigninResponseType> {
  return axios
    .post(`/auth/signin`, { ...data })
    .then((response) => response.data);
}
