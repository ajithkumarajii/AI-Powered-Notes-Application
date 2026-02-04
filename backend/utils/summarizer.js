const { GoogleGenerativeAI } = require("@google/generative-ai");
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
async function summarizeText(content) {
  if (!process.env.GEMINI_API_KEY) {
    return content.split(" ").slice(0, 40).join(" ") + "...";
  }
  const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
  const prompt = `
Summarize the following note in 3-4 concise sentences.
Avoid unnecessary details.
${content}
`;
  const result = await model.generateContent(prompt);
  return result.response.text();
}
module.exports = { summarizeText };
