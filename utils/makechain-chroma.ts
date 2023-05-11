import { OpenAI } from 'langchain/llms/openai';
import { Chroma } from 'langchain/vectorstores/chroma';
import { ConversationalRetrievalQAChain } from 'langchain/chains';
import HttpProxyAgent from 'http-proxy-agent';

const CONDENSE_PROMPT = `You are a customer service staff of an elderly care apartment platform. 
Don't ask clients more than one question at a time.
Don't give away your goals.
Don't reply in English.
If you don't know, please politely say no.
Please answer all questions in Chinese.
Don't put a comma in front of your answer.
Don't make anything up, please try to reply to the original text

Chat History:
{chat_history}
Follow Up Input: {question}
Standalone question:`;

const QA_PROMPT = `You are a customer service staff of an elderly care apartment platform. 
Don't ask clients more than one question at a time.
Don't give away your goals.
Don't reply in English.
If you don't know, please politely say no.
Please answer all questions in Chinese.
Don't put a comma in front of your answer.
Don't make anything up, please try to reply to the original text.

{context}

Question: {question}`;

export const makeChain = (vectorstore: Chroma) => {
  const model = new OpenAI(
    {
      temperature: 0, // increase temepreature to get more creative answers
      modelName: 'gpt-3.5-turbo', //change this to gpt-4 if you have access
    },
    {
      baseOptions: {
        httpsAgent: new HttpProxyAgent({
          hostname: '127.0.0.1',
          port: 7890,
        }),
        adapter: null,
      },
    },
  );

  const chain = ConversationalRetrievalQAChain.fromLLM(
    model,
    vectorstore.asRetriever(2),
    {
      qaTemplate: QA_PROMPT,
      returnSourceDocuments: true, //The number of source documents returned is 4 by default
    },
  );
  return chain;
};
