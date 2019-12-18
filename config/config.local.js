'use strict';

const path = require('path');
// const os = require('os');

module.exports = appInfo => {
  // 自定义配置
  const userConfig = {
    // 汇付宝服务
    heepayServer: 'http://192.168.5.145/mock/155/bff',
  };

  /**
   * 应用配置
   */
  const config = (exports = {});

  // 日志
  config.logger = {
    dir: process.env.NODE_LOG_DIR || path.join(process.cwd(), 'logs'),
    // NONE，DEBUG，INFO，WARN，ERROR
    level: 'DEBUG',
    // 开启生产debug日志
    allowDebugAtProd: false,
    consoleLevel: 'DEBUG',
    encoding: 'utf-8',
    outputJSON: false,
    appLogName: `${appInfo.name}-web.log`,
    coreLogName: 'egg-web.log',
    agentLogName: 'egg-agent.log',
    errorLogName: 'common-error.log',
  };

  config.alinode = {
    enable: true,
    appid: '79140',
    secret: 'd59b82f8bf980c87ab66cc27a10d9562c02db269',
    agentidMode: 'IP',
    packages: [path.join(__dirname, '..', 'package.json')],
  };

  config.cluster = {
    listen: {
      path: '',
      port: 3000,
      hostname: '0.0.0.0',
    },
    // https: {
    //   key: path.join(__dirname, '../cert/server.key'),
    //   cert: path.join(__dirname, '../cert/server.cert'),
    //   ca: path.join(__dirname, '../cert/server.ca'),
    // },
  };

  // ------ 以下配置谨慎修改 ------

  // 中间件名，按顺序加载
  // config.middleware = ['errorHandler'];

  // 只对 /api 前缀的 url 路径生效
  config.errorHandler = {
    match: '/api',
  };

  // 安全配置
  config.security = {
    csrf: {
      // 忽略csrf检查
      ignore: ['/sdk'],
    },
  };

  // 视图配置
  config.view = {
    defaultViewEngine: 'vue',
    mapping: {
      '.vue': 'vue',
    },
  };
  config.vue = {
    cache: true,
  };

  config.i18n = {
    defaultLocale: 'zh-CN',
  };

  // cookie签名key
  config.keys = appInfo.name + '_10fgj05_5292';
  // 读写cookie的options
  config.cookieOps = {
    httpOnly: true, // 不允许js访问
    // secure: true,     // 仅在https上传输，egg会判断后自动设置
    overwrite: true, // 同名覆盖
    signed: true, // 签名
    encrypt: true, // 加密
  };

  // egg-grpc配置
  config.grpc = {
    endpoint: 'localhost:50051', // 服务端地址
  };

  return {
    ...config,
    ...userConfig,
  };
};
