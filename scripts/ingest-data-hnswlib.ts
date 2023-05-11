import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter';
import { OpenAIEmbeddings } from 'langchain/embeddings/openai';
import { HNSWLib } from "langchain/vectorstores/hnswlib";
import { TextLoader } from "langchain/document_loaders/fs/text";
import { DirectoryLoader } from 'langchain/document_loaders/fs/directory';
import { CustomPDFLoader } from '@/utils/customPDFLoader';
import HttpProxyAgent from 'http-proxy-agent';

/* Name of directory to retrieve your files from */
const filePath = 'docs';

export const run = async () => {
  try {
    /*load raw docs from the all files in the directory */
    const directoryLoader = new DirectoryLoader(filePath, {
      // '.txt': (path) => new TextLoader(path),
      '.pdf': (path) => new CustomPDFLoader(path),
    });

    // const loader = new PDFLoader(filePath);
    const rawDocs = await directoryLoader.load();

    /* Split text into chunks */
    const textSplitter = new RecursiveCharacterTextSplitter({
      chunkSize: 1000,
      chunkOverlap: 200,
    });

    const docs = await textSplitter.splitDocuments(rawDocs);
    console.log('split docs', docs);

    console.log('creating vector store...');
    /*create and store the embeddings in the vectorStore*/
    const embeddings = new OpenAIEmbeddings(
      {
        modelName: 'text-embedding-ada-002',
      },
      {
        baseOptions: {
          httpsAgent: new HttpProxyAgent({
            hostname: '127.0.0.1',
            port: 7890,
          }),
          adapter: null,
        },
      }
    );

    // let chroma = new Chroma(embeddings, { collectionName: COLLECTION_NAME, url: 'http://110.238.109.247:8000' });
    // await chroma.index?.reset();

    //embed the PDF documents

    // Ingest documents in batches of 100
    const directory = "./cache";
    const vectorStore = await HNSWLib.fromDocuments(docs, embeddings);

    await vectorStore.save(directory);

    // for (let i = 0; i < docs.length; i += 100) {
    //   const batch = docs.slice(i, i + 100);
    //   await HNSWLib.fromDocuments(batch, embeddings);
    // }
  } catch (error) {
    console.log('error', error);
    throw new Error('Failed to ingest your data');
  }
};

(async () => {
  await run();
  console.log('ingestion complete');
})();
