import { RouteHandler } from "@hono/zod-openapi";
import { db } from "../../../services/mongodb";
import { LegalContentType } from "../schema/legal.schema";
import getAboutContent from "../routes/get.about";

const getTermsAction: RouteHandler<typeof getAboutContent> = async (c) => {
  try {
    const legalPagesDb = db.collection<LegalContentType>("legal_pages");
    const res = await legalPagesDb.find().sort("updatedAt").toArray();
    try {
      if (res.length == 0) {
        throw new Error("No content found.");
      }
      return c.json(
        {
          succeed: true,
          content: res[0].termsConditionsHtml,
        },
        200
      );
    } catch (error) {
      throw new Error("Error while getting data.");
    }
  } catch (e: any) {
    return c.json({ hasError: true, description: e.message }, 400);
  } finally {
  }
};
export default getTermsAction;
