'use strict';

const { Consumer } = require('ali-ons');
const grpc = require('grpc');
const protoLoader = require('@grpc/proto-loader');

class AppBootHook {
  constructor(app) {
    this.app = app;
  }

  configWillLoad() {
    // 此时 config 文件已经被读取并合并，但是还并未生效
    // 这是应用层修改配置的最后时机
    // 注意：此函数只支持同步调用
    // this.app.logger.debug('1 configWillLoad', this.app.config);

    this.app.logger.warn(`以 ${this.app.config.env} 环境启动，日志目录：${this.app.config.logger.dir}`);
  }

  async didLoad() {
    // 所有的配置已经加载完毕
    // 可以用来加载应用自定义的文件，启动自定义的服务
    // this.app.logger.debug('2 didLoad');
  }

  async willReady() {
    // 所有的插件都已启动完毕，但是应用整体还未 ready
    // 可以做一些数据初始化等操作，这些操作成功才会启动应用
    // this.app.logger.debug('3 willReady');
  }

  async didReady() {
    // 应用已经启动完毕
    // this.app.logger.debug('4 didReady');
  }

  async serverDidReady() {
    // http / https server 已启动，开始接受外部请求
    // 此时可以从 app.server 拿到 server 的实例
    // this.app.logger.debug('5 serverDidReady');

    // *** rocketmq begin ***
    const consumer = new Consumer({
      httpclient: this.app.curl,
      consumerGroup: 'zyy_group',
      nameSrv: '192.168.70.121:9876',
    });
    consumer.subscribe('zyy_topic', 'zyy_tag', async msg => {
      this.app.logger.debug(`收到消息[${msg.msgId}]:${msg.body.toString()}`, msg);
    });
    // *** rocketmq end ***

    // *** grpc begin ***
    const server = new grpc.Server();
    // 加载服务
    const packageDefinition = await protoLoader.load(__dirname + '/app/proto/zyy.proto');
    // this.app.logger.debug('proto packageDefinition',packageDefinition);
    // 获取proto
    const helloProto = grpc.loadPackageDefinition(packageDefinition);
    // 获取package
    const grpc_zyy = helloProto.zyy;
    // 实现getData
    const grpcAction = (call, callback) => {
      this.app.logger.debug('grpc request', call.request);
      // 响应
      callback(null, {
        code: 111,
        message: 'from nodejs server: ' + JSON.stringify(call.request),
        time: new Date().toLocaleString(),
      });
    };
    // 加入grpc服务
    server.addService(grpc_zyy.ZyyGrpcService.service, { getData: grpcAction });

    // 启动监听
    server.bind('0.0.0.0:50051', grpc.ServerCredentials.createInsecure());
    server.start();
    // *** grpc end ***
  }
}

module.exports = AppBootHook;
