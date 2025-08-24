// pages/api/gemini.js
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const { prompt } = req.body;

  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST');

  try {
    const { GoogleGenerativeAI } = await import('@google/generative-ai');
    const genAI = new GoogleGenerativeAI(process.env.VITE_GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' }); // or 2.5-flash if you really have access
    const result = await model.generateContent({
      contents: [{ parts: [{ text: prompt }] }],
    });
    res.status(200).json({ text: result.response.text() });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to get response' });
  }
}