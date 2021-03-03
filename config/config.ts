import defaultSettings from './defaultSettings';
import pageRoutes from './router.config';
import customConfig from './customConfig';
import { utils,defineConfig} from 'umi';

const { winPath } = utils;
const { primaryColor } = defaultSettings;

let defaultConfig = {
  nodeModulesTransform: {
    type: 'none',
  },
  targets: {
    ie: 11,
  },
  // 基础路径 baseUrl
  base: '/',
   // publicPath: '/xk/',
  publicPath: '/',
  manifest: {
    basePath: '/',
  },
  dva: {
    hmr: true,
  },
  antd: {},
  // 路由配置
  routes: pageRoutes,
  ignoreMomentLocale: true, //忽略 moment 的 locale 文件，用于减少尺寸。
  lessLoader: { javascriptEnabled: true },
  cssLoader: {
    // 这里的 modules 可以接受 getLocalIdent
    modules: {
      getLocalIdent: (
        context: {
          resourcePath: string;
        },
        _: string,
        localName: string,
      ) => {
        if (
          context.resourcePath.includes('node_modules') ||
          context.resourcePath.includes('ant.design.pro.less') ||
          context.resourcePath.includes('global.less')
        ) {
          return localName;
        }
        const match = context.resourcePath.match(/src(.*)/);
        if (match && match[1]) {
          const antdProPath = match[1].replace('.less', '');
          const arr = winPath(antdProPath)
            .split('/')
            .map((a: string) => a.replace(/([A-Z])/g, '-$1'))
            .map((a: string) => a.toLowerCase());
          return `antd-pro${arr.join('-')}-${localName}`.replace(/--/g, '-');
        }
        return localName;
      },
    },
  },
  locale: {
    default: 'zh-CN', // default zh-CN
    baseNavigator: true,
  },
  // dynamicImport: {
  //   loading: '@/components/PageLoading/index',
  // },
  // 暂时关闭
  pwa: false,
  title: 'CRM',
  metas: [{ charset: 'utf-8' }],
  headScripts: [],
  theme: {
    'primary-color': primaryColor,
  },
  ...customConfig,
};
export default defineConfig(defaultConfig as any);