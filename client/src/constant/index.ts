const env = import.meta.env;
export const headers = { Authorization: `Bearer ` };
export const API_URL: string | undefined = env.VITE_API_URL || "";
export const MAP_KEY: string = env.VITE_MAP_KEY || "";
export const DEV = env.DEV;

export const FB_URL: string = env.VITE_FB_URL || "";
export const IG_URL: string = env.VITE_IG_URL || "";
export const MAIL: string = env.VITE_MAIL || "";
export const GA_TAG: string = env.VITE_GA_TAG;

export const LOGO_URL: string = API_URL + "cms/logo";
