import axios from "axios"

const aiCtrl = {}

aiCtrl.askQuestion = async (req, res) => {
  try {
    const { question } = req.body
    
    if (!question) {
      return res.status(400).json({ error: "Question is required" })
    }

    console.log('Question received:', question);
    console.log('API Key available:', !!process.env.OPENAI_API_KEY);

    if (process.env.OPENAI_API_KEY) {
      try {
        console.log('Using real AI API for response...');
        
        const isOpenAI = process.env.OPENAI_API_KEY.startsWith('sk-');
        const apiUrl = isOpenAI 
          ? 'https://api.openai.com/v1/chat/completions'
          : 'https://api.together.xyz/v1/chat/completions';
        
        console.log('API URL:', apiUrl);
        
        const headers = {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
        };

        const model = isOpenAI 
          ? "gpt-3.5-turbo" 
          : "microsoft/DialoGPT-medium";

        const requestBody = {
          model: model,
          messages: [
            {
              role: "system",
              content: `You are TaskMaster AI, a helpful and knowledgeable assistant similar to ChatGPT. You can answer questions about ANY topic including:

- Technology and programming (React, Node.js, Python, Ruby, AI, etc.)
- Science and mathematics
- History and current events
- Literature and arts
- Business and economics
- Health and wellness
- Personal development and career advice
- Task management and productivity
- General knowledge and trivia
- Creative writing and brainstorming
- Problem solving and analysis

Provide comprehensive, accurate, and helpful responses. Be conversational, encouraging, and thorough in your explanations. If the user asks about task management, relate it to how they can use TaskMaster effectively. Always aim to be as helpful as ChatGPT would be.`
            },
            {
              role: "user",
              content: question
            }
          ],
          max_tokens: 1000,
          temperature: 0.7
        };
        
        if (isOpenAI) {
          requestBody.presence_penalty = 0.1;
          requestBody.frequency_penalty = 0.1;
        }
        
        console.log('Using model:', model);
        console.log('Sending request to AI API...');
        const response = await axios.post(apiUrl, requestBody, { headers });
        
        const answer = response.data.choices[0].message.content;
        console.log('AI API response received successfully');
        
        return res.json({ 
          question, 
          answer,
          timestamp: new Date().toISOString(),
          source: isOpenAI ? "OpenAI GPT-3.5" : "Together AI (DialoGPT)"
        });
        
      } catch (apiError) {
        console.error('AI API Error:', apiError.message);
        console.error('Error response:', apiError.response?.data);
        console.error('Error status:', apiError.response?.status);
        
        console.log('API failed, using fallback response...');
      }
    }

    if (!process.env.OPENAI_API_KEY) {
      return res.json({ 
        question, 
        answer: `I understand you're asking about "${question}". To get comprehensive answers to any question like ChatGPT, please configure your OpenAI API key in the backend .env file. Once configured, I'll be able to answer any question you ask with detailed, AI-powered responses!`,
        timestamp: new Date().toISOString(),
        source: "TaskMaster AI (API Key Required)"
      });
    }

    return res.json({ 
      question, 
      answer: `I'm sorry, I'm having trouble connecting to my AI service right now. Your question was: "${question}"\n\nPlease try again in a moment, or check that your API key is properly configured. I'm designed to answer any question like ChatGPT once the connection is working!`,
      timestamp: new Date().toISOString(),
      source: "TaskMaster AI (Connection Issue)"
    });
    
  } catch (err) {
    console.error('AI Error:', err.message);
    
    const fallbackAnswer = `I'm sorry, I'm experiencing technical difficulties right now. Your question was: "${req.body.question}"\n\nPlease try again in a moment. I'm designed to work like ChatGPT and answer any question once the system is working properly!`
    
    res.json({ 
      question: req.body.question, 
      answer: fallbackAnswer,
      timestamp: new Date().toISOString(),
      source: "TaskMaster AI (Technical Issue)"
    })
  }
}

export default aiCtrl 