import { RouteHandler } from "@hono/zod-openapi";
import getSocialLinksRoute from "../routes/get.social-links";
import { db } from "../../../services/mongodb";

type socialLinksType = {
  facebook: string;
  instagram: string;
  email: string;
};

const getSocialLinksAction: RouteHandler<typeof getSocialLinksRoute> = async (
  c
) => {
  try {
    const socialLinksDb = db.collection<socialLinksType>("social_links");
    const links = await socialLinksDb.find().sort({ updatedAt: -1 }).toArray();
    if (links.length == 0) {
      throw new Error("No social links found in the database.");
    }
    return c.json({ socialLinks: links[0] }, 200);
  } catch (e: any) {
    return c.json({ hasError: true, description: e.message }, 400);
  } finally {
  }
};

export default getSocialLinksAction;
