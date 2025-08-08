# SCSS 文件解析问题解决指南

## 问题描述

当使用 `@zjy2222119974/ui-components` 组件库时，可能会遇到以下错误：

```
resolve './index.scss' in '.../node_modules/@zjy2222119974/ui-components/es/components/actionsheet'
```

这是因为组件库中的组件使用了 SCSS 文件，但使用项目的构建工具没有配置 SCSS 处理器。

## 解决方案

### 方案一：配置 Webpack（推荐）

在使用项目的 webpack 配置中添加 SCSS 处理器：

```javascript
// webpack.config.js
module.exports = {
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader'
        ]
      }
    ]
  }
}
```

### 方案二：配置 Taro

在 Taro 项目的配置文件中添加 SCSS 支持：

```javascript
// config/index.js
module.exports = {
  mini: {
    webpackChain(chain) {
      chain.module
        .rule('scss')
        .test(/\.scss$/)
        .use('sass-loader')
        .loader('sass-loader')
    }
  }
}
```

### 方案三：使用 CSS 替代

如果不想处理 SCSS，可以只引入编译后的 CSS：

```tsx
// 只引入主样式文件，不引入组件内的 SCSS
import '@zjy2222119974/ui-components/styles/index.scss'
```

然后在组件中手动添加样式类名，而不依赖组件内的 SCSS 导入。

### 方案四：安装 SCSS 相关依赖

确保项目中安装了必要的 SCSS 处理依赖：

```bash
npm install --save-dev sass sass-loader css-loader style-loader
# 或
yarn add -D sass sass-loader css-loader style-loader
```

## 组件库构建说明

本组件库已经配置了自动复制 SCSS 文件的构建流程：

1. **构建脚本**：`scripts/copy-styles.js` 负责将 SCSS 文件复制到构建输出目录
2. **构建流程**：
   - `npm run build:lib` - 构建 CommonJS 版本并复制 SCSS 文件到 `lib` 目录
   - `npm run build:es` - 构建 ES 模块版本并复制 SCSS 文件到 `es` 目录
3. **文件结构**：构建后的目录结构保持与源码一致，包含所有 SCSS 文件

## 验证构建结果

构建完成后，可以检查以下目录确认 SCSS 文件已正确复制：

```
lib/
├── components/
│   ├── actionsheet/
│   │   ├── index.js
│   │   ├── index.d.ts
│   │   └── index.scss  ← SCSS 文件已复制
│   └── ...
└── styles/
    ├── index.scss
    ├── variables.scss
    └── mixins.scss

es/
├── components/
│   ├── actionsheet/
│   │   ├── index.js
│   │   ├── index.d.ts
│   │   └── index.scss  ← SCSS 文件已复制
│   └── ...
└── styles/
    ├── index.scss
    ├── variables.scss
    └── mixins.scss
```

## 最佳实践

1. **推荐使用方案一**：配置 Webpack 处理 SCSS 文件，这是最标准的解决方案
2. **Taro 项目使用方案二**：在 Taro 配置中添加 SCSS 支持
3. **简单项目使用方案三**：只引入主样式文件，避免复杂的 SCSS 处理
4. **确保依赖完整**：安装所有必要的 SCSS 处理依赖

## 常见问题

### Q: 为什么组件库不直接提供编译后的 CSS？
A: 组件库提供 SCSS 文件是为了保持样式的可定制性，用户可以根据需要修改变量和样式。

### Q: 可以删除组件内的 SCSS 导入吗？
A: 可以，但需要确保相应的样式类名在全局样式中定义，否则组件可能没有样式。

### Q: 构建时出现 SCSS 相关错误怎么办？
A: 检查是否正确安装了 SCSS 相关依赖，并确保构建配置正确。

## 联系支持

如果遇到其他问题，请通过以下方式联系：

- 提交 GitHub Issue
- 发送邮件至项目维护者 