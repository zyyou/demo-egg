'use strict';

const Controller = require('egg').Controller;

const NacosNamingClient = require('nacos').NacosNamingClient;

class NacosController extends Controller {
  constructor(ctx) {
    super(ctx);
    this.serviceName = 'nodejs.cache';
    this.client = new NacosNamingClient({
      logger: this.logger,
      serverList: '192.168.70.21:8848', // replace to real nacos serverList
      namespace: 'public',
    });
  }

  async index() {
    const { ctx } = this;
    ctx.body = 'nacos测试';
  }

  // 注册nodejs缓存服务
  async registry() {
    await this.client.ready();
    await this.client.registerInstance(this.serviceName, {
      ip: '192.168.70.121',
      port: 9001,
    });
    this.ctx.body = 'registry';
  }

  // 取消注册nodejs缓存服务
  async deregister() {
    await this.client.deregisterInstance(this.serviceName, {
      ip: '192.168.70.121',
      port: 9001,
    });
    this.ctx.body = 'deregister';
  }

  // 发现nodejs缓存服务
  async subscribe() {
    this.client.subscribe(this.serviceName, hosts => {
      this.app.logger.warn('subscribe', hosts);
    });
    this.ctx.body = 'subscribe';
  }
}
module.exports = NacosController;
