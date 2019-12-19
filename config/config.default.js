'use strict';
// 开发配置

const os = require('os');
const path = require('path');

const message = require('bck-msg');

module.exports = appInfo => {
  // 应用配置
  const config = (exports = {});

  // cookie签名key，生产应覆盖改值
  config.keys = appInfo.name + '_com_;lqjewroi';

  // 日志配置
  config.logger = {
    dir: process.env.NODE_LOG_DIR || path.join(process.cwd(), 'logs'),
    level: 'DEBUG', // NONE，DEBUG，INFO，WARN，ERROR
    consoleLevel: 'DEBUG',
    appLogName: `${appInfo.name}-web.log`,
    coreLogName: 'egg-core.log',
    agentLogName: 'egg-agent.log',
    errorLogName: 'common-error.log',
  };

  config.alinode = {
    enable: false,
    agentidMode: '', // IP
    packages: [path.join(process.cwd(), 'package.json')],
  };

  // 中间件名，按顺序加载
  config.middleware = ['e404Handler', 'comHeader'];

  config.onerror = {
    all(err, ctx) {
      ctx.logger.error('全局异常捕获', err);
      ctx.body = message.openAPIFail(err.message, {
        hn: os.hostname(),
      });
    },
  };

  config.i18n = {
    defaultLocale: 'zh-CN',
  };

  // 安全配置
  config.security = {
    csrf: {
      // 忽略csrf检查
      ignore: ['/trade', '/digital'],
    },
  };

  // 自定义配置
  let customPath = '';
  switch (appInfo.env) {
    case 'local':
      customPath = `./${appInfo.name}.local.json`;
      break;
    case 'prod':
      customPath = path.join(os.homedir(), 'conf', `${appInfo.name}.prod.json`);
      break;
    default:
      console.error('加载local配置 env:', appInfo.env);
      customPath = `./${appInfo.name}.local.json`;
      break;
  }
  const customConfig = require(customPath);
  // config = extend(true, config, customConfig);

  // console.log('userConfig', userConfig);

  return {
    ...config,
    ...customConfig,
  };
};
