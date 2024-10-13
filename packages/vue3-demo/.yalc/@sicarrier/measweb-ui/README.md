# @sicarrier/measweb-ui


# 使用
## 


## 如果应用项目是js开发的


# 开发
## 目录说明
src
├── assets  // 存放公用的图片
├── index.ts  // 整个项目包的入口，每个组件都是从这里export
├── packages
│   └── demo  // 组件名
│       └── index.vue // 组件入口，可以是index.ts
└── styles  // 存放公用的样式
    └── common.less // 通用的样式，每个组件都要import
    └── xxx.less  // 部分组件复用的样式

## 基本要点
- 命名要求：
  - 一个组件一个目录，在src/packages/目录下以组件名称建目录，如`src/packages/demo`
  - 组件入口文件命名为index.vue或index.ts
- 需要在src/index.ts文件里，将组件import，然后再export
  ```
  import MeasDemo from './packages/demo/index.vue';
  export { MeasDemo };
  ```
  - 组件命名必须为加前缀`Meas`
- 每个组件需加`README.md`
- 开发过程的验证，使用npm link 或 yalc

## 编译/发包
- 不需要编译，由引用侧进行编译
- 自测验证好后，才能publish
  - 暂时手动publish，后期走流水线publish
- 如果需要发包验证，可以发布beta包

