import { OpenAPIHono } from "@hono/zod-openapi";
import aboutPage from "./routes/post.about";
import aboutPageAction from "./controller/post.about.controller";
import getAboutContent from "./routes/get.about";
import getAboutContentAction from "./controller/get.about.controller";
import setPrivacyPolicyContent from "./routes/post.privacy-policy";
import getPrivacyPolicyContent from "./routes/get.privacy-policy";
import getPrivacyPolicyContentAction from "./controller/get.privacy-policy.controller";
import setPrivacyPolicyContentAction from "./controller/post.privacy-policy.controller";
import getTermsAction from "./controller/get.terms.controller";
import getCookiesAction from "./controller/get.cookies.controller";
import getCookiesContent from "./routes/get.cookies-policy";
import getTermsContent from "./routes/get.terms";
import setCookiesContent from "./routes/post.cookies-policy";
import setCookiesContentAction from "./controller/post.cookies.controller";
import setTermsContent from "./routes/post.terms";
import setTermsContentAction from "./controller/post.terms.controller";

const legalContent = new OpenAPIHono();
legalContent.openapi(aboutPage, aboutPageAction);
legalContent.openapi(getAboutContent, getAboutContentAction);

legalContent.openapi(setPrivacyPolicyContent, setPrivacyPolicyContentAction);
legalContent.openapi(getPrivacyPolicyContent, getPrivacyPolicyContentAction);

legalContent.openapi(setTermsContent, setTermsContentAction);
legalContent.openapi(getTermsContent, getTermsAction);

legalContent.openapi(setCookiesContent, setCookiesContentAction);
legalContent.openapi(getCookiesContent, getCookiesAction);

export default legalContent;
