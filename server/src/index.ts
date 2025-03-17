import { OpenAPIHono } from "@hono/zod-openapi";
import { swaggerUI } from "@hono/swagger-ui";
import router from "./router";
import { logger } from "hono/logger";
import { cors } from "hono/cors";
import mongoMiddleware from "./services/mongodb";
import { apiReference } from "@scalar/hono-api-reference";

const app = new OpenAPIHono();

app.openAPIRegistry.registerComponent("securitySchemes", "Bearer", {
  type: "http",
  scheme: "bearer",
  bearerFormat: "JWT",
});
console.log("CORS_ORIGIN", process.env.CORS_ORIGIN);
app.use(
  cors({
    origin: process.env.CORS_ORIGIN?.split(", ") || [],
    credentials: true,
  })
);
app.use(
  logger((...rest: string[]) => {
    console.log("LOG :", new Date().toLocaleString(), ...rest);
  })
);
app.use("*", mongoMiddleware);

const versioning = "v1";

app.route(`/api/${versioning}`, router);

// The OpenAPI documentation will be available at /doc
app.doc("/docs", {
  openapi: "3.0.0",
  info: {
    version: "1.0.0",
    title: "LunchNSpecials API",
  },
});
app.get("/swagger", swaggerUI({ url: `/docs` }));

if (process.env.DEVELOPMENT == "true") {
  app.get(
    "/",
    apiReference({
      pageTitle: "LunchNSpecials API",
      spec: {
        url: "/docs",
      },
    })
  );
}

export default {
  port: process.env.APP_PORT || 5001,
  fetch: app.fetch,
};
