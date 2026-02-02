# 婚礼请柬部署指南

本文档详细说明如何将婚礼请柬部署到互联网，让亲朋好友可以通过链接访问。

---

## 📋 部署前准备

### 1. 完成内容配置

在部署前，请确保已完成以下配置：

- ✅ 修改 `scripts/config.js` 中的新人信息、婚礼时间、地点
- ✅ 准备 5 张图片（封面图 + 4张背景图），放入 `assets/images/` 文件夹
- ✅ 准备背景音乐文件，放入 `assets/music/` 文件夹并命名为 `bgm.mp3`
- ✅ 在 `https://lbs.qq.com/getPoint/` 获取婚礼地点的准确经纬度
- ✅ 本地测试请柬效果（使用浏览器直接打开 `index.html`）

---

### 2. 图片要求检查

| 图片 | 位置 | 尺寸 | 大小 |
|-----|------|------|------|
| cover.jpg | assets/images/ | 1200×630px | < 300KB |
| page1.jpg | assets/images/ | 1080×1920px | < 500KB |
| page2.jpg | assets/images/ | 1080×1920px | < 500KB |
| page3.jpg | assets/images/ | 1080×1920px | < 500KB |
| page4.jpg | assets/images/ | 1080×1920px | < 500KB |

**注意：** 所有图片必须压缩到合适大小，否则加载会很慢。

---

## 🚀 部署方案选择

我们提供 3 种免费部署方案，您可以根据需求选择：

| 方案 | 难度 | 速度 | 自定义域名 | 推荐指数 |
|-----|------|------|-----------|---------|
| GitHub Pages | ⭐⭐ | 中 | ✅ | ⭐⭐⭐⭐⭐ |
| Netlify | ⭐ | 快 | ✅ | ⭐⭐⭐⭐⭐ |
| Vercel | ⭐ | 快 | ✅ | ⭐⭐⭐⭐ |

**推荐：** Netlify（最简单，速度最快）

---

## 方案一：GitHub Pages 部署

### 优点
- ✅ 完全免费
- ✅ 稳定可靠
- ✅ 支持自定义域名
- ✅ 版本控制，方便修改

### 缺点
- ❌ 国内访问速度较慢（可能需要科学上网）
- ❌ 需要学习基本的 Git 操作

---

### 步骤1：创建 GitHub 账号

1. 访问 https://github.com/
2. 点击 "Sign up" 注册账号
3. 验证邮箱

---

### 步骤2：创建仓库

1. 登录 GitHub 后，点击右上角 "+" → "New repository"
2. 填写仓库信息：
   - **Repository name**: `wedding-invitation`（可自定义）
   - **Public**: 选择 Public（公开）
   - ✅ 勾选 "Add a README file"
3. 点击 "Create repository"

---

### 步骤3：上传文件

**方法A：网页上传（适合新手）**

1. 在仓库页面，点击 "Add file" → "Upload files"
2. 将整个项目文件夹拖拽到上传区域
3. 等待上传完成，点击 "Commit changes"

**方法B：使用 Git 命令行（推荐）**

```bash
# 1. 初始化 Git 仓库
cd f:/WangLuProject/hunli
git init

# 2. 添加所有文件
git add .

# 3. 提交
git commit -m "初始提交：婚礼请柬"

# 4. 关联远程仓库（替换为您的用户名和仓库名）
git remote add origin https://github.com/YOUR_USERNAME/wedding-invitation.git

# 5. 推送到 GitHub
git branch -M main
git push -u origin main
```

---

### 步骤4：启用 GitHub Pages

1. 进入仓库，点击 "Settings"（设置）
2. 左侧菜单找到 "Pages"
3. 在 "Source" 中选择：
   - Branch: `main`
   - Folder: `/ (root)`
4. 点击 "Save"
5. 等待几分钟，页面会显示访问链接：
   ```
   https://YOUR_USERNAME.github.io/wedding-invitation/
   ```

---

### 步骤5：配置 Open Graph

1. 打开 `index.html`，找到 Open Graph 配置部分
2. 将 `og:image` 和 `og:url` 替换为实际的 GitHub Pages 链接：

```html
<meta property="og:image" content="https://YOUR_USERNAME.github.io/wedding-invitation/assets/images/cover.jpg">
<meta property="og:url" content="https://YOUR_USERNAME.github.io/wedding-invitation/index.html">
```

3. 同样在 `scripts/config.js` 中更新：

```javascript
og: {
  image: 'https://YOUR_USERNAME.github.io/wedding-invitation/assets/images/cover.jpg',
  url: 'https://YOUR_USERNAME.github.io/wedding-invitation/index.html'
}
```

4. 重新提交并推送：

```bash
git add .
git commit -m "更新 Open Graph 链接"
git push
```

---

## 方案二：Netlify 部署（推荐）

### 优点
- ✅ 完全免费
- ✅ 部署超级简单（拖拽即可）
- ✅ 国内访问速度快
- ✅ 自动 HTTPS
- ✅ 支持自定义域名

### 缺点
- ❌ 无（几乎完美）

---

### 步骤1：注册 Netlify

1. 访问 https://www.netlify.com/
2. 点击 "Sign up"，使用 GitHub/Email 注册
3. 验证邮箱

---

### 步骤2：部署项目

**方法A：拖拽上传（最简单）**

1. 登录 Netlify
2. 找到页面底部的 "Want to deploy a new site without connecting to Git?"
3. 将整个项目文件夹（`hunli` 文件夹）直接拖拽到虚线框中
4. 等待几秒钟，部署完成！
5. Netlify 会自动生成一个链接，例如：
   ```
   https://random-name-12345.netlify.app
   ```

**方法B：连接 GitHub（推荐）**

1. 先将项目上传到 GitHub（参考方案一的步骤1-3）
2. 在 Netlify 点击 "Add new site" → "Import an existing project"
3. 选择 "GitHub"，授权并选择您的仓库
4. 配置构建设置：
   - Build command: 留空
   - Publish directory: `.`（点）
5. 点击 "Deploy site"
6. 等待部署完成

---

### 步骤3：自定义域名（可选）

1. 在 Netlify 站点页面，点击 "Site settings"
2. 找到 "Domain management"
3. 点击 "Options" → "Edit site name"
4. 修改为您喜欢的名称，例如：
   ```
   wangluzhanxiaofang.netlify.app
   ```

---

### 步骤4：配置 Open Graph

与 GitHub Pages 类似，更新 `index.html` 和 `config.js` 中的链接：

```html
<meta property="og:image" content="https://您的站点名.netlify.app/assets/images/cover.jpg">
<meta property="og:url" content="https://您的站点名.netlify.app/index.html">
```

修改后重新上传或推送到 GitHub（如果使用了 Git 连接）。

---

## 方案三：Vercel 部署

### 优点
- ✅ 完全免费
- ✅ 部署简单
- ✅ 速度快
- ✅ 支持自定义域名

### 缺点
- ❌ 需要科学上网访问官网

---

### 步骤1：注册 Vercel

1. 访问 https://vercel.com/
2. 使用 GitHub/GitLab/Email 注册
3. 验证邮箱

---

### 步骤2：部署项目

**方法A：命令行部署**

1. 安装 Vercel CLI：
   ```bash
   npm install -g vercel
   ```

2. 在项目目录运行：
   ```bash
   cd f:/WangLuProject/hunli
   vercel
   ```

3. 按提示操作，完成后会生成访问链接

**方法B：导入 GitHub 项目**

1. 将项目上传到 GitHub
2. 在 Vercel 点击 "Add New..." → "Project"
3. 导入您的 GitHub 仓库
4. 点击 "Deploy"
5. 等待部署完成

---

### 步骤3：配置 Open Graph

同样更新 `index.html` 和 `config.js` 中的链接：

```html
<meta property="og:image" content="https://您的项目名.vercel.app/assets/images/cover.jpg">
<meta property="og:url" content="https://您的项目名.vercel.app/index.html">
```

---

## 🌐 自定义域名配置（可选）

如果您有自己的域名（如 `www.ourwedding.com`），可以绑定到部署的站点。

### GitHub Pages 绑定域名

1. 在域名服务商（阿里云/腾讯云等）添加 DNS 记录：
   ```
   类型: CNAME
   主机记录: www
   记录值: YOUR_USERNAME.github.io
   ```

2. 在 GitHub 仓库的 `Settings` → `Pages` 中：
   - 在 "Custom domain" 输入您的域名
   - 点击 "Save"
   - ✅ 勾选 "Enforce HTTPS"

3. 等待 DNS 生效（可能需要几小时）

---

### Netlify 绑定域名

1. 在 Netlify 站点页面，点击 "Domain settings"
2. 点击 "Add custom domain"
3. 输入您的域名，点击 "Verify"
4. 按照提示在域名服务商添加 DNS 记录：
   ```
   类型: CNAME
   主机记录: www
   记录值: YOUR_SITE.netlify.app
   ```
5. 等待 DNS 生效，Netlify 会自动配置 HTTPS

---

### Vercel 绑定域名

1. 在 Vercel 项目页面，点击 "Settings" → "Domains"
2. 输入您的域名，点击 "Add"
3. 按照提示添加 DNS 记录
4. 等待验证完成

---

## 🧪 微信分享测试

### 1. 清除微信缓存

微信会缓存 Open Graph 信息，首次分享前需要清除缓存：

**方法A：使用微信开发者工具**
1. 访问：https://mp.weixin.qq.com/debug/cgi-bin/sandbox?t=jsapisign
2. 输入您的请柬链接
3. 点击 "查询"
4. 如果显示 Open Graph 信息，说明配置成功

**方法B：使用微信调试工具**
1. 在微信中搜索 "微信公众平台测试号"
2. 申请测试号
3. 使用 JS-SDK 调试工具测试

---

### 2. 测试分享效果

1. 在手机微信中打开请柬链接
2. 点击右上角 "..." → "分享到朋友圈"
3. 检查是否显示：
   - ✅ 封面图片（1200×630px）
   - ✅ 标题
   - ✅ 描述文字

**如果没有显示图片：**
- 检查图片链接是否为 HTTPS
- 检查图片大小是否超过 300KB
- 检查图片链接是否可访问
- 等待几分钟后重试（微信有缓存）

---

## 🔧 常见问题解决

### 问题1：图片不显示

**原因：** 图片路径错误或文件未上传

**解决：**
1. 检查 `assets/images/` 文件夹是否有所有图片
2. 检查图片文件名是否正确（区分大小写）
3. 在浏览器控制台查看错误信息（F12）

---

### 问题2：音乐不播放

**原因：** 浏览器自动播放策略限制

**解决：**
1. 这是正常现象，用户需要手动点击音乐按钮
2. 或者在页面加载后有任何交互（如滑动）后自动播放

---

### 问题3：朋友圈分享没有封面图

**原因：** Open Graph 配置错误或微信缓存

**解决：**
1. 检查 `og:image` 链接是否为 HTTPS
2. 图片必须可以公网访问
3. 图片大小不超过 300KB
4. 使用微信调试工具清除缓存
5. 等待几分钟后重试

---

### 问题4：页面加载很慢

**原因：** 图片或音乐文件过大

**解决：**
1. 使用 TinyPNG 压缩所有图片
2. 音乐文件码率降低到 128kbps
3. 使用 CDN 加速（高级）

---

### 问题5：地图导航打不开

**原因：** 经纬度配置错误

**解决：**
1. 访问 https://lbs.qq.com/getPoint/
2. 搜索您的婚礼地址
3. 复制准确的经纬度
4. 更新 `config.js` 中的 `map.lat` 和 `map.lng`

---

## 📱 分享方式

部署完成后，您可以通过以下方式分享：

### 1. 直接分享链接
- 复制部署后的链接
- 发送给亲朋好友
- 发布到微信朋友圈、QQ空间等

### 2. 生成二维码
1. 使用在线工具：https://cli.im/
2. 输入您的请柬链接
3. 生成二维码图片
4. 下载后可以：
   - 打印到纸质请柬上
   - 发送到微信群
   - 制作成海报

### 3. 制作海报
1. 使用 Canva 或稿定设计
2. 选择婚礼海报模板
3. 添加二维码和文字说明
4. 导出后分享到朋友圈

---

## 🎯 优化建议

### 性能优化
- ✅ 压缩所有图片到最小（保持清晰度）
- ✅ 使用 WebP 格式（如果浏览器支持）
- ✅ 启用 Gzip 压缩（Netlify/Vercel 自动开启）
- ✅ 使用 CDN 加速（Netlify/Vercel 自带）

### SEO 优化
- ✅ 完善 `<title>` 和 `<meta description>`
- ✅ 配置完整的 Open Graph 标签
- ✅ 添加网站图标（favicon）

### 用户体验优化
- ✅ 添加加载动画
- ✅ 优化字体加载速度
- ✅ 适配多种屏幕尺寸
- ✅ 测试不同浏览器兼容性

---

## 📞 获取帮助

如果遇到问题，可以：

1. **查看文档**：重新阅读本部署指南
2. **搜索教程**：搜索 "GitHub Pages 部署教程" 或 "Netlify 部署教程"
3. **社区求助**：在 GitHub Discussions 或 Stack Overflow 提问
4. **视频教程**：B站搜索 "静态网站部署" 相关视频

---

## 🎉 部署完成清单

在正式分享前，请确认：

- ✅ 所有文字信息已修改正确（姓名、日期、地点）
- ✅ 所有图片已上传且显示正常
- ✅ 背景音乐可以播放
- ✅ 地图导航功能正常
- ✅ 在多个设备上测试（iPhone、Android、电脑）
- ✅ 微信朋友圈分享显示封面图
- ✅ 页面加载速度正常（< 5秒）
- ✅ 所有链接都是 HTTPS

---

**恭喜您完成部署！祝婚礼圆满成功！💒✨**
