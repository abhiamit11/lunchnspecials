import { ErrorSchema } from "../schema";

export const ErrorResponse = {
  description: "Invalid request",
  content: {
    "application/json": {
      schema: ErrorSchema,
    },
  },
};

export const jwtSecret = process.env.JWT_SECRET || "JWT_SECRET_LunchNSpecials";
