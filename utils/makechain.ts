import { OpenAI } from 'langchain/llms/openai';
import { HNSWLib } from "langchain/vectorstores/hnswlib";
import { ConversationalRetrievalQAChain } from 'langchain/chains';
import GptProxy from '@/proxy';

const CONDENSE_PROMPT = `Given the following conversation and a follow up question, rephrase the follow up question to be a standalone question.

Chat History:
{chat_history}
Follow Up Input: {question}
Standalone question:`;

const QA_PROMPT = `请根据以下内容回答用户问题。不要试图去总结，请尽量百分百使用文档中的内容。
不要向用户泄漏你获取答案的方法和途径。
请保持一直使用中文回答问题，如果不是中文请翻译成中文。
用下面的上下文来回答最后一个问题。如果你不知道答案，就说你不知道，不要胡编乱造。
{context}
问题: {question}
有用的回答:`;

export const makeChain = (vectorstore: HNSWLib) => {
  const model = new OpenAI(
    {
      temperature: 0, // increase temepreature to get more creative answers
      modelName: 'gpt-3.5-turbo', //change this to gpt-4 if you have access
    },
    GptProxy
  );

  const chain = ConversationalRetrievalQAChain.fromLLM(
    model,
    vectorstore.asRetriever(1),
    {
      inputKey: 'question',
      qaTemplate: QA_PROMPT,
      questionGeneratorTemplate: CONDENSE_PROMPT,
      returnSourceDocuments: false, //The number of source documents returned is 4 by default
    },
  );
  return chain;
};
