'use strict';

const extend = require('extend2');
const validator = require('validator');

module.exports = {
  setCookie(key, value, path, expires) {
    if (typeof value !== 'string') {
      this.logger.error('setCookie value必须为字符串');
      return;
    }
    const options = extend(true, { path, expires }, this.app.config.cookieOps);
    // this.logger.debug('setCookie options', key, value, options);
    return this.cookies.set(key, value, options);
  },
  getCookie(key) {
    // this.logger.debug('options', this.app.config.cookieOps);
    const res = this.cookies.get(key, this.app.config.cookieOps);
    if (typeof res === 'string' && validator.isJSON(res)) {
      return JSON.parse(res);
    }
    return res;
  },
};

// exports.setCookie = (key, value, path, expires) => {
//   const options = extend(true, { path, expires }, this.app.config.cookieOps);
//   this.logger.debug('options', options);
//   return this.cookies.set(key, value, options);
// };

// exports.getCookie = key => {
//   this.logger.debug('options', this.app.config.cookieOps);
//   return this.cookies.get(key, this.app.config.cookieOps);
// };
