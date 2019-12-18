'use strict';

const Controller = require('egg').Controller;

class VueController extends Controller {
  async index() {
    const { ctx } = this;
    ctx.body = 'vue test';
  }
  async view() {
    this.ctx.render('vue/view.vue');
  }
}
module.exports = VueController;
