import { z } from "zod";

export const SigninformSchema = z.object({
  email: z
    .string()
    .nonempty("Email Required.")
    .email("Ensure it's a valid email address."),
  password: z
    .string()
    .nonempty("Password Required.")
    .min(6, "password should be at least 6 characters long"),
});

export type SigninFormType = z.infer<typeof SigninformSchema>;

export type SigninResponseType = {
  message: string;
  succeed: boolean;
  data: {
    token: string;
    tokenExp: number;
    user: {
      email: string;
      _id: string;
      username: string;
    };
  };
};
