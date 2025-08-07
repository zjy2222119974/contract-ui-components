# 📦 Contract UI Components 发布指南

## 🎯 发布到GitHub Packages

### 1. 准备工作

#### 创建GitHub仓库
1. 在GitHub上创建仓库：`contract-ui-components`
2. 设置为私有仓库（如果需要）
3. 获取仓库URL

#### 更新配置
更新 `package.json` 中的仓库URL：
```json
{
  "repository": {
    "type": "git",
    "url": "https://github.com/YOUR_USERNAME/contract-ui-components.git"
  }
}
```

### 2. 身份验证设置

#### 生成GitHub Personal Access Token
1. 进入 GitHub Settings → Developer settings → Personal access tokens
2. 创建新token，勾选以下权限：
   - `write:packages`
   - `read:packages` 
   - `delete:packages` (可选)

#### 配置npm认证
```bash
# 方法1: 使用npm login
npm login --scope=@zjy2222119974 --registry=https://npm.pkg.github.com

# 方法2: 直接配置.npmrc
echo "//npm.pkg.github.com/:_authToken=YOUR_TOKEN" >> ~/.npmrc
```

### 3. 构建和发布

#### 构建包
```bash
cd contract-ui-components
npm run clean
npm run build
```

#### 发布到GitHub Packages
```bash
npm publish
```

### 4. 使用已发布的包

#### 在项目中安装
```bash
# 在使用项目中配置.npmrc
echo "@zjy2222119974:registry=https://npm.pkg.github.com" >> .npmrc

# 安装包
npm install @zjy2222119974/ui-components
```

#### 在代码中使用
```typescript
import { TabPanelEnhanced, ProductCard } from '@zjy2222119974/ui-components'
```

## 🎯 发布到公共npm

如果要发布到公共npm仓库：

### 1. 更新配置
```json
// package.json - 移除publishConfig
{
  "name": "@zjy2222119974/ui-components",
  // 移除或注释掉
  // "publishConfig": {
  //   "registry": "https://npm.pkg.github.com"
  // }
}
```

```bash
# .npmrc - 移除GitHub Packages配置
# 注释掉或删除这行
# @zjy2222119974:registry=https://npm.pkg.github.com
```

### 2. 发布到npm
```bash
# 登录npm
npm login

# 发布包（作为scoped package）
npm publish --access public
```

## 🔧 版本管理

### 更新版本
```bash
# 补丁版本 (1.0.0 → 1.0.1)
npm version patch

# 次要版本 (1.0.0 → 1.1.0)
npm version minor

# 主要版本 (1.0.0 → 2.0.0)
npm version major
```

### 发布新版本
```bash
npm run build
npm publish
```

## 📋 检查清单

发布前检查：
- [ ] 代码已构建且无错误
- [ ] 版本号已更新
- [ ] README.md 已更新
- [ ] 仓库URL正确
- [ ] 身份验证已配置
- [ ] 依赖项已正确配置

## 🚀 自动化发布 (CI/CD)

可以设置GitHub Actions自动发布：

```yaml
# .github/workflows/publish.yml
name: Publish Package

on:
  push:
    tags:
      - 'v*'

jobs:
  publish:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
          registry-url: 'https://npm.pkg.github.com'
      
      - run: npm ci
      - run: npm run build
      - run: npm publish
        env:
          NODE_AUTH_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

## 💡 使用建议

1. **私有包推荐GitHub Packages** - 免费且与GitHub集成良好
2. **开源包推荐公共npm** - 更好的可发现性和使用体验
3. **企业使用推荐私有npm仓库** - 更多企业级功能
4. **设置CI/CD** - 自动化构建和发布流程
5. **版本管理** - 使用语义化版本控制