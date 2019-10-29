'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  // 首页
  app.router.get('/', app.controller.home.index);

  nacos(app, 'nacos', app.controller.nacos);
};

/**
 * Nacos 路由
 *
 * @param {Egg.Application} app - egg Application
 * @param {String} prefix 路由前缀
 * @param {Egg.Controller} controller - egg Controller
 */
function nacos(app, prefix, controller) {
  // 首页
  app.router.get(`${prefix}/index`, controller.index);
  // 服务发现
  app.router.get(`${prefix}/discovery`, controller.discovery);
}
