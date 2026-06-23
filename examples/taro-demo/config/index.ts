import { defineConfig } from '@tarojs/cli';

const isProduction = process.env.NODE_ENV === 'production';
const githubPagesBase = '/animal-island-ui-taro-port/';

export default defineConfig({
  projectName: 'animal-island-ui-taro-demo',
  date: '2026-06-23',
  designWidth: 750,
  deviceRatio: {
    640: 2.34 / 2,
    750: 1,
    828: 1.81 / 2
  },
  sourceRoot: 'src',
  outputRoot: 'dist',
  framework: 'react',
  compiler: 'webpack5',
  mini: {},
  h5: {
    publicPath: process.env.TARO_PUBLIC_PATH || (isProduction ? githubPagesBase : '/'),
    staticDirectory: 'static'
  }
});
