import { OpenAPIHono } from "@hono/zod-openapi";
import restaurants from "../modules/restaurants";
import auth from "../modules/auth";
import jwtMiddleware from "../middleware/jwt";
import { HTTPException } from "hono/http-exception";
import analyticsRoute from "../modules/analytics";
import legalContentRoute from "../modules/legal-content";

const app = new OpenAPIHono();

app.route("/", auth);

app.on(["POST", "PUT", "PATCH", "DELETE"], "*", jwtMiddleware());

app.onError((err, c) => {
  if (err instanceof HTTPException) {
    let message = "Bad Request";
    if (err.status == 401) {
      message =
        "Authorization is required to access this resource. Please include valid credentials in your request.";
    }
    return c.json(
      {
        hasError: true,
        status: err.status,
        message: message,
        error: err.message,
      },
      err.status
    );
  }
  return c.json({ message: "Internal Server Error" }, 500);
});

// Add the route here that requires authorization.
app.route("/", restaurants);
app.route("/", analyticsRoute);
app.route("/", legalContentRoute);

const router = app;
export default router;
