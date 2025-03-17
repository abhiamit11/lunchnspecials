import { z } from "zod";

const UserSchema = z.object({
  _id: z.string(),
  username: z.string(),
  email: z.string().email(),
});

const DataSchema = z.object({
  token: z.string(),
  tokenExp: z.number().optional(),
  user: UserSchema,
});

export const ResponseSchema = z.object({
  succeed: z.boolean(),
  message: z.string(),
  data: DataSchema,
});

export const SigninSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export type UserObjectType = {
  _id: string;
  email: string;
  password: string;
  user: string;
  role: string;
};

export type ResponseType = z.infer<typeof ResponseSchema>;

export const ChangePasswordSchema = z.object({
  currentPassword: z.string(),
  newPassword: z.string(),
});

export const NewPasswordResponseSchema = z.object({
  succeed: z.boolean(),
  message: z.string(),
});
