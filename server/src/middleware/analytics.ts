import { createMiddleware } from "hono/factory";
import { getCookie, setCookie } from "hono/cookie";
import { ObjectId } from "mongodb";
import { db } from "../services/mongodb";

type interaction = "load" | "view";

type VisitorObjectType = {
  visitorId: string;
  visitTimestamp: string;
  devices: string;
  os: string;
  language: string;
  interactions: string;
};

const analyticsMiddleware = (type: interaction) => {
  return createMiddleware(async (c, next) => {
    try {
      const analyticsVisitor =
        db.collection<VisitorObjectType>("analytics_visitor");

      let visitorId = getCookie(c, "visitor_id");

      if (!visitorId) {
        visitorId = crypto.randomUUID();
        setCookie(c, "visitor_id", visitorId, {
          path: "/",
          httpOnly: false,
          secure: true,
          sameSite: "none",
          maxAge: 60 * 60 * 24 * 30,
        });
      }
      const {
        "sec-ch-ua-mobile": isMobile,
        "sec-ch-ua-platform": os,
        "accept-language": language,
      } = c.req.header();

      const analyticsData: VisitorObjectType = {
        visitorId,
        visitTimestamp: new Date().toString(),
        devices: isMobile === "?1" ? "mobile" : "desktop",
        os: (os && JSON.parse(os)) || "",
        language,
        interactions: type,
      };

      if (type === "load") {
        await analyticsVisitor.insertOne(analyticsData);
      }

      if (type === "view") {
        const { id } = c.req.param() as { id: string };
        const { day } = c.req.query();
        const restaurantId = new ObjectId(id);
        const obj = {
          visitorId,
          visitTimestamp: new Date().toString(),
          interactions: type,
          restaurantId,
          day,
        };
        await db.collection("analytics_restaurant_visit").insertOne(obj);
      }
    } catch (error) {
      console.error("analytics-middleware-error", error);
    }
    await next();
  });
};

export default analyticsMiddleware;
