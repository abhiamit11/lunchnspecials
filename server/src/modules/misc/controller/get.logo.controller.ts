import { RouteHandler } from "@hono/zod-openapi";
import { db } from "../../../services/mongodb";
import getLogoRoute from "../routes/get.logo";

const getLogoAction: RouteHandler<typeof getLogoRoute> = async (c) => {
  try {
    const siteLogoDb = db.collection("site_logo");
    const currantLogo = await siteLogoDb
      .find()
      .sort({ updatedAt: -1 })
      .toArray();

    if (currantLogo.length == 0) {
      throw Error("The system does not have any logo.");
    }

    const imagePath = currantLogo[0].path || "";
    const exists = await Bun.file(imagePath).exists();
    if (!exists) {
      throw Error("The requested logo file does not exist.");
    }
    const file = await Bun.file(imagePath).arrayBuffer();

    // Return the image as a response with the appropriate Content-Type header
    return c.body(file, {
      headers: {
        "Content-Type": "image/png",
      },
    });
  } catch (e: any) {
    return c.json({ hasError: true, description: e.message }, 400);
  } finally {
  }
};

export default getLogoAction;
