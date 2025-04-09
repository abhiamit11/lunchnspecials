import { RouteHandler } from "@hono/zod-openapi";
import { db } from "../../../services/mongodb";
import getLogoRoute from "../routes/get.logo";
import setLogoRoute from "../routes/post.logo";

const imageTypes = [
  "image/png",
  "image/jpeg",
  "image/jpg",
  "image/gif",
  "image/webp",
  "image/svg+xml",
];
const setLogoAction: RouteHandler<typeof setLogoRoute> = async (c) => {
  try {
    const body = await c.req.parseBody();
    const logoImage = body["logo"];

    if (!logoImage) {
      throw new Error("No file uploaded");
    }

    if (typeof logoImage == "string") {
      throw new Error("The uploaded file is not properly formatted as a CSV.");
    }

    if (!imageTypes.includes(logoImage.type)) {
      throw new Error("The uploaded file is not properly formatted as a CSV.");
    }

    const filePath = `./src/static/${logoImage.name}`;
    await Bun.write(filePath, logoImage);
    const siteLogoDb = db.collection("site_logo");

    const existingLogo = await siteLogoDb
      .find()
      .sort({ updatedAt: -1 })
      .toArray();
    if (existingLogo.length == 0) {
      await siteLogoDb.insertOne({
        path: filePath,
        updatedAt: new Date().toISOString(),
        createdAt: new Date().toISOString(),
      });
    }

    if (existingLogo.length > 0) {
      const currantLogo = existingLogo[0];
      const exists = await Bun.file(currantLogo.path).exists();
      if (exists) {
        await Bun.file(currantLogo.path).delete();
      }

      await siteLogoDb.updateOne(
        { _id: currantLogo._id },
        {
          $set: {
            path: filePath,
            updatedAt: new Date().toISOString(),
          },
        }
      );
    }

    return c.json({ succeed: true });
  } catch (e: any) {
    return c.json({ hasError: true, description: e.message }, 400);
  } finally {
  }
};

export default setLogoAction;
