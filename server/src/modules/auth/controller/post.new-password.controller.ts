import { RouteHandler } from "@hono/zod-openapi";
import { db } from "../../../services/mongodb";
import { UserObjectType } from "../schema/auth.schema";
import changePassword from "../routes/post.change-password";

interface Props extends RouteHandler<typeof changePassword> {}

const changePasswordAction: Props = async (c) => {
  try {
    const superAdmins = db.collection<UserObjectType>("superadmins");
    const { currentPassword, newPassword } = c.req.valid("json");
    const { email } = c.get("jwtPayload");

    let user = await superAdmins.findOne({ email: email });
    if (!user) {
      throw new Error("Login with proper credentials!");
    }

    const isMatch = await Bun.password.verify(currentPassword, user.password);

    if (!isMatch) {
      throw new Error("Please enter valid credentials to log in!");
    }

    const updatePassword = await Bun.password.hash(newPassword);

    await superAdmins.updateOne(
      { _id: user._id },
      { $set: { password: updatePassword } }
    );

    const data = {
      succeed: true,
      message: "Password changed successfully!",
    };

    return c.json(data, 200);
  } catch (e: any) {
    return c.json({ hasError: true, description: e.message }, 400);
  } finally {
  }
};
export default changePasswordAction;
