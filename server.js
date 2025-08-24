// server.js
import express from 'express';
import { GoogleGenerativeAI } from '@google/generative-ai';

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Server is running. Use POST /api/gemini to interact.');
});

app.post('/api/gemini', async (req, res) => {
  const { prompt } = req.body;
  const genAI = new GoogleGenerativeAI(process.env.VITE_GEMINI_API_KEY);
  const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

  try {
    const result = await model.generateContent({
      contents: [{ parts: [{ text: prompt }] }],
    });
    res.json({ text: result.response.text() });
  } catch (err) {
    res.status(500).json({ error: 'API error' });
  }
});

app.listen(3001, () => console.log('API on http://localhost:3001'));