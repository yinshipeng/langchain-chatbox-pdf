# GPT & LangChain - Create a ChatGPT Chatbot for Your PDF Files

Use the new GPT api to build a chatGPT chatbot for multiple Large PDF files.

Tech stack used includes LangChain, Hnswlib, Typescript, Openai, and Next.js. LangChain is a framework that makes it easier to build scalable AI/LLM apps and chatbots. Hnswlib is a vectorstore for storing embeddings and your PDF in text to later retrieve similar docs.

The visual guide of this repo and tutorial is in the `visual guide` folder.

**If you run into errors, please review the troubleshooting section further down this page.**

Prelude: Please make sure you have already downloaded node on your system and the version is 18 or greater.

## Development

1. Clone the repo or download the ZIP

```
git clone [github https url]
```


2. Install packages

First run `npm install pnpm -g` to install yarn globally (if you haven't already).

Then run:

```
pnpm install
```
After installation, you should now see a `node_modules` folder.

3. Set up your `.env` file

- Copy `.env.example` into `.env`
  Your `.env` file should look like this:

```
OPENAI_API_KEY=
```
4. In `utils/makechain.ts` chain change the `QA_PROMPT` for your own usecase. Change `modelName` in `new OpenAI` to `GPT`, if you have access to `GPT` api. Please verify outside this repo that you have access to `GPT` api, otherwise the application will not work.

## Convert your PDF files to embeddings

**This repo can load multiple PDF files**

1. Inside `docs` folder, add your pdf files or folders that contain pdf files.

2. Run the script `pnpm run ingest` to 'ingest' and embed your docs. If you run into errors troubleshoot below.

## Run the app

Once you've verified that the embeddings and content have been successfully added to your Hnswlib, you can run the app `pnpm run dev` to launch the local dev environment, and then type a question in the chat interface.

## Troubleshooting

In general, keep an eye out in the `issues` and `discussions` section of this repo for solutions.

