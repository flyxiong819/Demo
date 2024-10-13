# utilities

## 物业配置流程
1. 到config/constants.ts定义channel枚举
2. 配置channel: config/channel.ts
3. 配置屋苑: config/building-list.ts

## 启胜物业 http://tapd.woa.com/10145891/prong/stories/view/1010145891874582999
1. 添加页
（1）“电子账单号码”改用“物业编号”
（2）“物业编号”长度限制7～12位
2. 缴费记录详情页
（1）“账单号码”改用“物业编号”
3. 缴费结果页
（1）“账单号码”改用“物业编号”
4. 电子账单页
（1）“账单号码”改用“物业编号“
## 相关链接

- [生活缴费故障公告配置指南](https://iwiki.woa.com/pages/viewpage.action?pageId=1835113638)

## 配置中同时存在两个company logo的问题梳理
- 1. 多数使用companyLogo2
- 2. 使用companyLogo的地方有
  - （1）账单页
  - （2）生成电子账单页
  - （3）只有clp和towngas的companyLogo/companyLogo2使用了两种不同的图片（尺寸不同），其他物业费的companyLogo/companyLogo2是同一张图片
- TODO: 想办法将其合并了

## TODO: channel-custom.ts配置文件，想办法将其去掉了
- 部分物业底部展示了“官方合作渠道”，部分没有展示，这个应该是有问题的。TODO: 跟产品沟通


## 入口 url

https://bill-payment.wechatpay.com.hk/cgi-bin/ia_utilities_index.cgi

## 前端维护文档

https://iwiki.oa.tencent.com/pages/viewpage.action?pageId=22118542

## 后台接口文档

https://iwiki.woa.com/pages/viewpage.action?pageId=506077506

## 设计稿

https://codesign.qq.com/s/o5l429l7npjdYDO
https://codesign.qq.com/workspace/board/8ALwE9V4ddZX1Dp

## 开发环境电费账号

## 开发环境煤气账号

7228364387/english name

## Project setup

```
npm install
```

### Compiles and hot-reloads for development

```
npm run serve
```

### Compiles and minifies for production

```
npm run build
```

### Lints and fixes files

```
npm run lint
```

### Run your unit tests

```
npm run test:unit
```

### Run your end-to-end tests

```
npm run test:e2e
```
