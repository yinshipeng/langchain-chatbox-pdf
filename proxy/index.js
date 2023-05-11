import HttpProxyAgent from 'http-proxy-agent';

const GptProxy = {
  baseOptions: {
    httpsAgent: new HttpProxyAgent({
      hostname: '127.0.0.1',
      port: 7890,
    }),
    adapter: null,
  },
};

export default GptProxy;
