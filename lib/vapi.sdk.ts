import Vapi from "@vapi-ai/web";

const token = process.env.NEXT_PUBLIC_VAPI_WEB_TOKEN;
if (!token) {
  throw new Error("VAPI token is missing!");
}
export const vapi = new Vapi(token);
