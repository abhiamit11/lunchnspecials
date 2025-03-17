import { RouteHandler } from "@hono/zod-openapi";
import signin from "../routes/post.signin";
import { sign } from "hono/jwt";
import { db } from "../../../services/mongodb";
import { jwtSecret } from "../../../constants";
import { ResponseType, UserObjectType } from "../schema/auth.schema";

const postSigninAction: RouteHandler<typeof signin> = async (c) => {
  try {
    const superAdmins = db.collection<UserObjectType>("superadmins");
    const { email, password } = c.req.valid("json");
    let user = await superAdmins.findOne({ email: email });
    if (!user) {
      throw new Error("Login with proper credentials!");
    }

    const isMatch = await Bun.password.verify(password, user.password);

    if (!isMatch) {
      throw new Error("Please enter valid credentials to log in!");
    }
    // Token expires in 6 hours
    const exp = Math.floor(Date.now() / 1000) + 60 * 60 * 6;
    const payload = {
      sub: user._id,
      role: user.role,
      user: user.user,
      email: user.email,
      exp,
    };

    const token = await sign(payload, jwtSecret);

    const data: ResponseType = {
      succeed: true,
      message: "Authenticated!",
      data: {
        token,
        tokenExp: exp,
        user: {
          _id: user._id,
          email: user.email,
          username: user.user,
        },
      },
    };

    return c.json(data, 200);
  } catch (e: any) {
    return c.json({ hasError: true, description: e.message }, 400);
  } finally {
  }
};
export default postSigninAction;
