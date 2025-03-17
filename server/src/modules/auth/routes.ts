import { OpenAPIHono } from "@hono/zod-openapi";
import postSigninAction from "./controller/post.signin.controller";
import signin from "./routes/post.signin";
import changePassword from "./routes/post.change-password";
import changePasswordAction from "./controller/post.new-password.controller";

const authForAdmin = new OpenAPIHono();
authForAdmin.openapi(signin, postSigninAction);
authForAdmin.openapi(changePassword, changePasswordAction);

export default authForAdmin;
