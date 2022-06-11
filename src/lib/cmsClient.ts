import { createClient } from "microcms-js-sdk";

if (!process.env.DOMAIN_NAME || !process.env.API_KEY) {
  throw new Error("Api key is not set");
}

export const client = createClient({
  serviceDomain: process.env.DOMAIN_NAME,
  apiKey: process.env.API_KEY,
});
