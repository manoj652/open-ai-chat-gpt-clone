import { Configuration, OpenAIApi } from "openai";
const configuration = new Configuration({
  apiKey:"API KEY",
});
export const openai = new OpenAIApi(configuration);
