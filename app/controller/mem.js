'use strict';

const Controller = require('egg').Controller;
const mem = require('../lib/memcache');

class MemController extends Controller {
  async index() {
    const { ctx } = this;
    ctx.body = JSON.stringify(mem);
  }
  async set() {
    mem.server = new Date();
    mem.value2 = 123;
    this.ctx.body = JSON.stringify(mem);
  }
}
module.exports = MemController;
