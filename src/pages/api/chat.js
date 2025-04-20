// pages/api/chat.js
export default async function handler(req, res) {
    if (req.method !== 'POST') {
      return res.status(405).end(); // Method Not Allowed
    }
  
    const { prompt } = req.body;
  
    try {
      const openaiRes = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages: [{ role: 'user', content: prompt }],
        }),
      });
  
      const data = await openaiRes.json();
      const message = data.choices[0].message.content;
  
      res.status(200).json({ message });
    } catch (err) {
      console.error('OpenAI error:', err);
      res.status(500).json({ error: 'Something went wrong' });
    }
  }
  