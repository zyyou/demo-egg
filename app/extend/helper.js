'use strict';
// 扩展，不能改名

const moment = require('moment');
const format = require('format');
const { Producer, Message } = require('ali-ons');

// RocketMQ 生产者
const producer = [];

exports.moment = moment;
exports.format = format;

exports.sendQueueMsg = async (nameServer, group, topic, tag, message, keys) => {
  if (!producer[group]) {
    producer[group] = new Producer({
      producerGroup: group,
      nameSrv: nameServer,
    });
  }

  const mqMsg = new Message(topic, tag, message);
  if (keys) {
    mqMsg.keys = keys;
  }

  return await producer[group].send(mqMsg);
};
