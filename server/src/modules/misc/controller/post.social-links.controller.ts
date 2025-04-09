import { RouteHandler } from "@hono/zod-openapi";
import { db } from "../../../services/mongodb";
import setSocialLinksRoute from "../routes/post.social-links";

type socialLinksType = {
  facebook: string;
  instagram: string;
  email: string;
  updatedAt?: string;
};

const setSocialLinksAction: RouteHandler<typeof setSocialLinksRoute> = async (
  c
) => {
  try {
    const { facebook, instagram, email } = c.req.valid("json");
    const socialLinksDb = db.collection<socialLinksType>("social_links");
    const links = await socialLinksDb.find().sort({ updatedAt: -1 }).toArray();
    if (links.length == 0) {
      const data = await socialLinksDb.insertOne({
        email,
        facebook,
        instagram,
        updatedAt: new Date().toISOString(),
      });
      return c.json(data, 200);
    }

    if (links.length > 0) {
      const currantLinks = links[0];
      const newLinks = {
        ...currantLinks,
        email: email || currantLinks.email,
        instagram: instagram || currantLinks.instagram,
        facebook: facebook || currantLinks.facebook,
        updatedAt: new Date().toISOString(),
      };
      const data = await socialLinksDb.updateOne(
        { _id: currantLinks._id },
        { $set: newLinks }
      );
      return c.json(data, 200);
    }

    throw new Error("");
  } catch (e: any) {
    return c.json({ hasError: true, description: e.message }, 400);
  }
};

export default setSocialLinksAction;
