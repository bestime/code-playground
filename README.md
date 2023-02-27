# 通用vue3项目模板

- [git提交](#git提交)
- 本项目采用 eslint + prettier 统一代码风格，具体配置请参考官方文档
  - [eslint 配置文档](https://eslint.bootcss.com/docs/rules/)
  - [prettier 配置文档](https://www.prettier.cn/docs/options.html)
- [构建命令](#构建命令)
- [自定义环境变量](#自定义环境变量)
- 尽量避免使用以下技术 (导致代码追踪困难)：vuex、pinia、全局事件订阅、全局变量、全局样式、portal组件。
- 模块导出请遵循`ES6标准`

### git提交

提交代码前，会自动检验提交内容
- 代码风格
- 提交注释信息规范。[commit-message文档](https://github.com/conventional-changelog/commitlint#what-is-commitlint)

  ```cmd
  // 类型: 消息
  git commit -m 'docs: 更新READEME.md文档'
  ```
  支持的提交类型
  - feat: 新增功能
  - fix: 修复bug
  - style: 代码格式修改
  - test: 测试
  - refactor: 重构代码
  - build: 项目构建
  - docs: 文档更新
  - revert: 回滚某个更早之前的提交
  - chore: 其它修改

### 构建命令（可根据情况自行添加）
- `npm run dev` - 开发模式
- `npm run build:hash` - 发布模式（hash）
- `npm run build:history` - 发布模式（history）
- `npm run lint-check` - 代码质量检测
- `npm run lint-fix` - 代码质量修复。如果未完全修复，请手动修改代码

## 自定义环境变量
- `VITE_ROUTER_MODE` - 路由模式。支持 hash 和 history
- `VITE_ROUTER_BASE` - 项目baseUrl，会直接影响系统变量 BASE_URL
- 服务器01配置
  - `VITE_SERVER_01.origin` - 服务器地址
  - `VITE_SERVER_01.apiPrefix` - api前缀
  - `VITE_SERVER_01.devProxy` - 是否开启本地代理(true|false)

