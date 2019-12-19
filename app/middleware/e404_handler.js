'use strict';

const message = require('bck-msg');

module.exports = () => {
  return async (ctx, next) => {
    await next();
    if (ctx.status !== 404 || ctx.body) {
      return;
    }

    ctx.logger.info('404 请求地址无效');
    const data = message.openAPIFail('丢了丢了~', { status: 404 });
    if (1 || ctx.acceptJSON) {
      ctx.body = data;
      return;
    }
    data.message = data.return_msg;
    await ctx.renderX('cashier/error.h5.njk', data);
  };
};
