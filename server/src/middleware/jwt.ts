import { createMiddleware } from "hono/factory";
import { jwt } from "hono/jwt";
import { jwtSecret } from "../constants";

export default () =>
  createMiddleware(async (c, next) => {
    const jwtMiddleware = jwt({
      secret: jwtSecret,
    });
    return jwtMiddleware(c, next);
  });
