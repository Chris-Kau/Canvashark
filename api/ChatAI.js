import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
    apiKey: process.env.OPENAI_KEY, // Make sure to set this in your environment variables
});
const openai = new OpenAIApi(configuration);

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { prompt } = req.body; // Expecting a prompt in the request body

        try {
            const response = await openai.createChatCompletion({
                model: 'gpt-3.5-turbo',
                messages: [
                    {role: 'system', content: "Only reply with 'Short Task', 'Medium Task', or 'Long Task'"},
                    { role: 'user', content: prompt }
                ],
            });

            res.status(200).json({ reply: response.data.choices[0].message.content });
        } catch (error) {
            console.error('Error fetching response from OpenAI:', error);
            res.status(500).json({ error: 'Failed to fetch response from OpenAI' });
        }
    }
}