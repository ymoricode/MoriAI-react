import model from '../lib/googleAi';

const getConversationTitle = async (userPrompt) => {
  try {
    const result = await model.generateContent(
      `Given a user prompt, generate a concise and informative title that accurately describes the conversation. Consider keywords, topics, and the overall intent of the prompt. Response in plain text format, not markdown.
      
      Prompt: ${userPrompt}`,
    );

    return result.candidates[0]?.content || 'Untitled';
  } catch (err) {
    console.log(`Error generating conversation title: ${err.message}`);
    return 'Untitled';
  }
};

const getAiResponse = async (userPrompt, chats = []) => {
  const history = chats.flatMap(({ user_prompt, ai_response }) => [
    { role: 'user', parts: [{ text: user_prompt }] },
    { role: 'model', parts: [{ text: ai_response }] },
  ]);

  try {
    const chat = model.startChat({
      history,
      generationConfig: { temperature: 1.5 },
    });
    const result = await chat.sendMessage(userPrompt);
    return result.candidates[0]?.content || 'No response';
  } catch (err) {
    console.log(`Error generating AI response: ${err.message}`);
    return 'Error generating response';
  }
};

export { getConversationTitle, getAiResponse };
