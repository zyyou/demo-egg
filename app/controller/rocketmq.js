'use strict';

const Controller = require('egg').Controller;

class RocketMQController extends Controller {
  async index() {
    const { ctx } = this;
    ctx.body = this.config.name + ' RocketMQ';
  }

  async send() {
    const nameServer = '192.168.70.121:9876';
    const group = 'zyy_group';
    const topic = 'zyy_topic';
    const tag = 'zyy_tag';
    const message = 'zyy mq helper zyy_topic ' + new Date();
    const keys = ['zyy', Math.round(Math.random() * 10)];
    const res = await this.ctx.helper.sendQueueMsg(nameServer, group, topic, tag, message, keys);
    this.ctx.body = 'ok ' + JSON.stringify(res);
  }

  async send1() {
    const nameServer = '192.168.70.121:9876';
    const group = '192.168.70.121:9876';
    const topic = 'SELF_TEST_TOPIC';
    const tag = 'test';
    const message = 'zyy mq helper SELF_TEST_TOPIC ' + new Date();
    const keys = ['zyy', Math.round(Math.random() * 10)];
    const res = await this.ctx.helper.sendQueueMsg(nameServer, group, topic, tag, message, keys);
    this.ctx.body = 'ok ' + JSON.stringify(res);
  }
}
module.exports = RocketMQController;
