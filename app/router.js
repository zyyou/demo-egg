'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  // 首页
  app.router.get('/', app.controller.home.index);

  // grpc
  app.router.get('/grpc', app.controller.grpc.index);

  nacos(app, '/nacos', app.controller.nacos);
  mem(app, '/mem', app.controller.mem);
  vue(app, '/vue', app.controller.vue);
};

/**
 * 内存缓存路由
 *
 * @param {Egg.Application} app - egg Application
 * @param {String} prefix 路由前缀
 * @param {Egg.Controller} controller - egg Controller
 */
function vue(app, prefix, controller) {
  app.router.get(`${prefix}/`, controller.index);
  app.router.get(`${prefix}/index`, controller.index);
}

/**
 * 内存缓存路由
 *
 * @param {Egg.Application} app - egg Application
 * @param {String} prefix 路由前缀
 * @param {Egg.Controller} controller - egg Controller
 */
function mem(app, prefix, controller) {
  app.router.get(`${prefix}/`, controller.index);
  app.router.get(`${prefix}/index`, controller.index);
  app.router.get(`${prefix}/set`, controller.set);
}

/**
 * Nacos 路由
 *
 * @param {Egg.Application} app - egg Application
 * @param {String} prefix 路由前缀
 * @param {Egg.Controller} controller - egg Controller
 */
function nacos(app, prefix, controller) {
  app.router.get(`${prefix}/`, controller.index);
  app.router.get(`${prefix}/index`, controller.index);
  app.router.get(`${prefix}/registry`, controller.registry);
  app.router.get(`${prefix}/deregister`, controller.deregister);
  app.router.get(`${prefix}/subscribe`, controller.subscribe);
}
