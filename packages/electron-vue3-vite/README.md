# Vue 3 + TypeScript + Vite + electron

## step1. 搭建 vue3 + vite + typescript
```
npm init vite@latest
```
init过程中，选择vue、typescript即可

## step2. 安装electron和vite-plugin-electron
```
pnpm install electron vite-plugin-electron -D
# 或 npm install electron vite-plugin-electron -D
# 或 yarn add electron vite-plugin-electron -D
```

## step3. vite.config.js配置electron编译项
```
electron({
  entry: ["electron/index.ts", "electron/preload.ts"],
}),
```
如果有preload的话，一并编译

## step4. package.json配置main属性
```
  "main": "./dist-electron/index.js"
```
并删除`type: "module"`选项
- dist-electron是vite.config.js配置electron的默认输出目录
- index.js是`electron/index.ts`编译后的结果，也是项目入口

## step5. 由electron（相当于浏览器）拉起页面
```
# electron/index.ts
// 加载web页面
mainWindow.loadURL('http://localhost:8899');
```
- `http://localhost:8899`是起的web服务（直接在浏览器上也可以访问）
- 也有可能以文件的方式访问的，使用`mainWindow.loadFile('web入口文件')`

