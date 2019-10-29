# heepayweb

汇付宝收银台&SDK 服务

## 构建

```
// 在服务器同环境下安装包
npm i --production

// 测试环境，建议加日期tag，如 XX:19091701
docker build . -t heepayweb

```

## 运行

```
# 121测试环境挂载卷模式
docker run -itd -u 1000 -h heepayweb --name=heepayweb -p 9104:9104 -e EGG_SERVER_ENV=local -v /hy/docker/heepay-web:/home/node/app -v /hy/docker/logs/heepayweb:/tmp hynode

# 121测试环境容器镜像模式
docker run -itd -u 1000 -h heepayweb-i --name=heepayweb-i -p 59104:9104 -e NODE_ENV=production -e EGG_SERVER_ENV=prod -v /hy/imagehy/heepayweb:/home/node/conf -v /hy/imagehy/logs/heepayweb:/tmp heepayweb

# 生产环境
docker run -itd -u 1000 -h heepayweb --name=heepayweb -p 9104:9104 -e NODE_ENV=production -e EGG_SERVER_ENV=prod -v /hy/production/heepayweb:/home/node/conf -v /hy/logs/heepayweb:/tmp heepayweb
```
