'use strict';

const os = require('os');

module.exports = () => {
  return async (ctx, next) => {
    await next();
    // 下发hostname 用于识别负载服务器
    ctx.res.setHeader('hn', os.hostname());
  };
};
