module.exports = {
  "presets": [
    "@vue/babel-preset-app"
  ],
  "plugins": [
    [
      "@tencent/babel-plugin-component",
      {
        "libraryName": "@/fit-ui",
        "libDir": "packages",
        "styleLibrary": {
          "name": "style",
          "base": false,
          "path": "[module].less"
        }
      },
      'fit-ui-component'
    ],
    [
      '@tencent/babel-plugin-component',
      {
        libraryName: '@tencent/wphk-ui',
        libDir: 'src/packages',
        styleLibrary: {
          name: 'style',
          base: false,
          path: '[module].less',
        },
      },
      'wphk-ui-component'
    ],
  ],
  sourceType: 'unambiguous'
}
