'use strict';

const Controller = require('egg').Controller;

class NacosController extends Controller {
  async index() {
    const { ctx } = this;
    ctx.body = 'nacos测试';
  }
  async discovery() {
    this.ctx.body = 'aaa';
  }
}
module.exports = NacosController;
