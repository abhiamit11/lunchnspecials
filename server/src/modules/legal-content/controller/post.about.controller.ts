import { RouteHandler } from "@hono/zod-openapi";
import aboutPage from "../routes/post.about";
import { db } from "../../../services/mongodb";
import { LegalContentType } from "../schema/legal.schema";

const aboutPageAction: RouteHandler<typeof aboutPage> = async (c) => {
  try {
    const { aboutHtml } = c.req.valid("json");
    const legalPagesDb = db.collection<LegalContentType>("legal_pages");
    const res = await legalPagesDb.find().sort("updatedAt").toArray();
    try {
      if (res.length == 0) {
        const defualtData = {
          aboutHtml,
          privacyHtml: "",
          termsConditionsHtml: "",
          cookiesHtml: "",
          updatedAt: new Date().toISOString(),
          creationAt: new Date().toISOString(),
        };
        await legalPagesDb.insertOne(defualtData);
      }

      if (res.length > 0) {
        const currentData = res[0];
        const updatedData = {
          ...currentData,
          aboutHtml,
          updatedAt: new Date().toISOString(),
        };
        await legalPagesDb.updateOne(
          {
            _id: currentData._id,
          },
          { $set: { ...updatedData } }
        );
      }
    } catch (error) {
      throw new Error("Error while updating data.");
    }

    return c.json(
      { succeed: true, message: "This page updated successfully." },
      200
    );
  } catch (e: any) {
    return c.json({ hasError: true, description: e.message }, 400);
  } finally {
  }
};
export default aboutPageAction;
