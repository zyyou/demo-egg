'use strict';

const Subscription = require('egg').Subscription;

class MQMsg extends Subscription {
  // 通过 schedule 属性来设置定时任务的执行间隔等配置
  static get schedule() {
    return {
      disable: true, // true则不启动
      immediate: true, // 应用启动即执行一次
      interval: '1m', // 1 分钟间隔
      type: 'worker', // worker 每台机器只有一个worker执行，all 所有worker都执行
      env: ['local', 'prod'],
      cronOptions: {
        tz: 'Asia/Shanghai',
      },
    };
  }

  // 任务执行函数
  async subscribe() {
    const nameServer = '192.168.70.121:9876';
    const group = 'zyy_group';
    const topic = 'zyy_topic';
    const tag = 'zyy_tag';
    const message = 'zyy 定时消息 zyy_topic ' + new Date();
    const keys = ['zyy', '定时', Math.round(Math.random() * 10)];
    const res = await this.ctx.helper.sendQueueMsg(nameServer, group, topic, tag, message, keys);

    this.logger.debug('定时任务被执行..', res);
  }
}

module.exports = MQMsg;
