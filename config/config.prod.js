'use strict';
// 生产配置

const path = require('path');
const os = require('os');

module.exports = appInfo => {
  const cfgPath = path.join(os.homedir(), 'conf', `${appInfo.name}.prod.js`);
  return require(cfgPath)(appInfo);
};
