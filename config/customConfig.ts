const path = require('path');

const alias = {
  '@': path.resolve(__dirname, '../src/'),
  request: path.resolve(__dirname, '../src/utils/request'),
  components: path.resolve(__dirname, '../src/components/'),
  layouts: path.resolve(__dirname, '../src/layouts/'),
  assets: path.resolve(__dirname, '../src/assets'),
};


const { REACT_APP_ENV = 'dev', PORT = '8000' } = process.env;

const domains: any = {
  mock: {
    api: 'http://localhost:' + PORT,
    apiTarget: '/_api/',
    wmc: 'http://dev.xxx.com',
    sso: 'http://sso.dev.xxx.com',
  },
  dev: {
    // api: 'http://172.11.17.73:9000',
    api: 'http://api.dev.cn',
    apiTarget: '',
    wmc: 'http://dev.xxx.com',
    sso: 'http://sso.xxx.com',
  },
  qa: {
    api: 'http://api.qa.cn',
    apiTarget: '',
    wmc: 'http://qa.xxx.com',
    sso: 'http://sso.xxx.com',
  },
};

const domain = domains[REACT_APP_ENV];

export default {
  proxy: {
    '/api/': {
      target: domain.api,
      pathRewrite: {
        '^/api': domain.apiTarget,
      },
      changeOrigin: true,
    },
    '/common/oauth': {
      target: 'https://www.dev.xxx.com',
      secure: false,
      changeOrigin: true,
    },
    '/common/api': {
      target: 'https://www.dev.xxx.com',
      secure: false,
      changeOrigin: true,
    },
    '/_api/': {
      target: domain.api,
      pathRewrite: {
        '^/_api/': domain.apiTarget,
      },
      changeOrigin: true,
    },
    '/wmc/': {
      target: domain.wmc,
      pathRewrite: {
        '^/wmc': domain.apiTarget,
      },
      changeOrigin: true,
    },
    '/sso/': {
      target: domain.sso,
      pathRewrite: {
        '^/sso/': '/',
      },
      changeOrigin: true,
    },
    '/ws/zq': {
      target: domain.api,
      pathRewrite: {
        '^/ws/': '/',
      },
      ws: true,
      secure: false,
      changeOrigin: true,
    },
  },
  alias,
  //指定 history 类型，可选 browser、hash 和 memory。
  history: {
    type: 'browser',
  },
  define: {
    'process.env.REACT_APP_ENV': `${REACT_APP_ENV}`,
  },
};
