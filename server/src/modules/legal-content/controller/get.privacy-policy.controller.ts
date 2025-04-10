import { RouteHandler } from "@hono/zod-openapi";
import { db } from "../../../services/mongodb";
import { LegalContentType } from "../schema/legal.schema";
import getPrivacyPolicyContent from "../routes/get.privacy-policy";

const getPrivacyPolicyContentAction: RouteHandler<
  typeof getPrivacyPolicyContent
> = async (c) => {
  try {
    const legalPagesDb = db.collection<LegalContentType>("legal_pages");
    const res = await legalPagesDb.find().sort("updatedAt").toArray();
    try {
      if (res.length == 0) {
        return c.json(
          {
            succeed: true,
            data: { content: "", isHtml: false },
          },
          200
        );
      }
      return c.json(
        {
          succeed: true,
          data: res[0].privacyHtml,
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
export default getPrivacyPolicyContentAction;
