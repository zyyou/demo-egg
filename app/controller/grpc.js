'use strict';

const Controller = require('egg').Controller;

class GrpcController extends Controller {
  async index() {
    const service = this.ctx.grpc.zyy.zyyGrpcService;

    // 发送请求
    const result = await service.getData({
      code: 22,
      // message: 'frome nodejs client',
    });

    this.logger.debug('grpc response', result);
    this.ctx.body = result;
  }
}

module.exports = GrpcController;
