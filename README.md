# 💒 婚礼电子请柬

一个精美的婚礼电子请柬 H5 页面，支持微信朋友圈卡片式分享，提供三种主题风格供选择。

---

## ✨ 特性

- 🎨 **三种主题**：古风雅韵（推荐）、浪漫现代、简约清新
- 📱 **完美适配**：响应式设计，完美适配所有移动设备
- 🎵 **背景音乐**：支持自动播放背景音乐，可控制开关
- 📍 **地图导航**：一键跳转到腾讯/百度地图导航
- 💌 **微信优化**：配置 Open Graph 标签，朋友圈分享显示精美卡片
- 🎞️ **流畅动画**：页面切换流畅，装饰元素动态效果
- 🖼️ **多页展示**：4个页面（封面、邀请函、地图、结尾），每页独立图片

---

## 🎯 在线预览

<!-- 部署后替换为实际链接 -->
**演示地址：** [点击查看](https://your-site.netlify.app)

---

## 📸 截图预览

### 古风主题（默认）
- 第1页：封面 - 诗词引言、新人姓名、婚礼日期
- 第2页：邀请函 - 婚礼详情、温馨邀请
- 第3页：地图 - 婚礼地点、一键导航
- 第4页：结尾 - 感谢语、新人签名

### 浪漫现代主题
- 渐变色背景、现代字体、简约布局

### 简约清新主题
- 淡雅配色、极简设计、轻量装饰

---

## 🚀 快速开始

### 1. 克隆或下载项目

```bash
git clone https://github.com/YOUR_USERNAME/wedding-invitation.git
cd wedding-invitation
```

或直接下载 ZIP 文件解压。

---

### 2. 修改配置信息

编辑 `scripts/config.js` 文件，修改以下信息：

```javascript
const weddingConfig = {
  groom: '王路',              // 新郎姓名
  bride: '张小芳',            // 新娘姓名
  date: '2026年3月15日',      // 婚礼日期
  weekday: '星期日',          // 星期
  time: '上午10:18',          // 婚礼时间
  location: '虹桥乡窑山村石排村王为纲家',  // 婚礼地点
  
  // 地图配置（在 https://lbs.qq.com/getPoint/ 获取）
  map: {
    lat: 28.0,                // 纬度
    lng: 120.0,               // 经度
    name: '虹桥乡窑山村石排村王为纲家',
    address: '虹桥乡窑山村石排村'
  },
  
  theme: 'classic',           // 主题：'classic'(古风), 'modern'(现代), 'fresh'(清新)
  
  // 音乐配置
  music: {
    src: './assets/music/bgm.mp3',
    autoplay: true,
    loop: true
  }
};
```

---

### 3. 准备素材

#### 图片素材（必需）

将以下图片放入 `assets/images/` 文件夹：

| 文件名 | 尺寸 | 说明 |
|-------|------|------|
| cover.jpg | 1200×630px | 封面图（用于朋友圈分享） |
| page1.jpg | 1080×1920px | 第1页背景图 |
| page2.jpg | 1080×1920px | 第2页背景图 |
| page3.jpg | 1080×1920px | 第3页背景图 |
| page4.jpg | 1080×1920px | 第4页背景图 |

**图片要求：**
- 格式：JPG 或 PNG
- 大小：每张不超过 500KB（建议压缩到 300KB）
- 使用 [TinyPNG](https://tinypng.com/) 压缩图片

#### 音乐素材（可选）

- 将背景音乐文件命名为 `bgm.mp3`
- 放入 `assets/music/` 文件夹
- 建议：MP3 格式，128kbps，3-5分钟，< 5MB

---

### 4. 本地预览

直接用浏览器打开 `index.html` 即可预览效果。

**或使用本地服务器：**

```bash
# 使用 Python
python -m http.server 8000

# 使用 Node.js
npx http-server

# 使用 VS Code
安装 Live Server 插件，右键 index.html → Open with Live Server
```

然后访问：`http://localhost:8000`

---

### 5. 部署到互联网

选择以下任一方式部署（详见 `docs/DEPLOYMENT_GUIDE.md`）：

#### 方案一：Netlify（推荐）
1. 访问 [Netlify](https://www.netlify.com/)
2. 拖拽整个项目文件夹到 Netlify
3. 等待部署完成，获得访问链接

#### 方案二：GitHub Pages
1. 上传到 GitHub 仓库
2. 在仓库设置中启用 GitHub Pages
3. 访问 `https://YOUR_USERNAME.github.io/wedding-invitation/`

#### 方案三：Vercel
1. 访问 [Vercel](https://vercel.com/)
2. 导入 GitHub 仓库或上传文件
3. 一键部署

---

### 6. 配置 Open Graph（重要）

部署后，更新 `index.html` 中的 Open Graph 链接：

```html
<meta property="og:image" content="https://your-site.netlify.app/assets/images/cover.jpg">
<meta property="og:url" content="https://your-site.netlify.app/index.html">
```

同时更新 `scripts/config.js` 中的 `og` 配置。

---

## 🎨 自定义主题

### 切换主题

在 `scripts/config.js` 中修改：

```javascript
theme: 'classic'  // 'classic' | 'modern' | 'fresh'
```

### 调整样式

如需深度自定义，可修改以下文件：

- `styles/theme-classic.css` - 古风主题样式
- `styles/theme-modern.css` - 现代主题样式
- `styles/theme-fresh.css` - 清新主题样式
- `styles/common.css` - 公共样式

---

## 📖 文档

- **[设计指南](docs/DESIGN_GUIDE.md)** - 图片规格、素材推荐、配色方案
- **[部署指南](docs/DEPLOYMENT_GUIDE.md)** - 详细部署步骤、域名配置

---

## 🛠️ 技术栈

- **前端框架**：纯 HTML5 + CSS3 + JavaScript（无构建工具）
- **页面切换**：[Swiper.js](https://swiperjs.com/) 11.x
- **字体**：Google Fonts（思源宋体、站酷小薇体等）
- **样式框架**：Tailwind CSS（CDN）
- **地图服务**：腾讯地图 API

---

## 📁 项目结构

```
hunli/
├── index.html                  # 主页面
├── styles/                     # 样式文件
│   ├── common.css             # 公共样式
│   ├── theme-classic.css      # 古风主题
│   ├── theme-modern.css       # 现代主题
│   └── theme-fresh.css        # 清新主题
├── scripts/                    # 脚本文件
│   ├── config.js              # 配置文件（用户修改）
│   └── main.js                # 主脚本
├── assets/                     # 资源文件
│   ├── images/                # 图片资源
│   │   ├── cover.jpg          # 封面图
│   │   ├── page1.jpg          # 页面背景图
│   │   ├── page2.jpg
│   │   ├── page3.jpg
│   │   └── page4.jpg
│   ├── music/                 # 音乐资源
│   │   └── bgm.mp3            # 背景音乐
│   └── fonts/                 # 字体说明
│       └── README.md
├── docs/                       # 文档
│   ├── DESIGN_GUIDE.md        # 设计指南
│   └── DEPLOYMENT_GUIDE.md    # 部署指南
└── README.md                   # 本文件
```

---

## ❓ 常见问题

### Q1: 图片不显示怎么办？
**A:** 检查图片文件名是否正确，路径是否匹配，文件是否已上传。

### Q2: 音乐不能自动播放？
**A:** 这是浏览器的自动播放策略限制，属于正常现象。用户需要手动点击音乐按钮。

### Q3: 朋友圈分享没有封面图？
**A:** 
1. 确保 `og:image` 是 HTTPS 链接
2. 图片必须公网可访问
3. 图片大小不超过 300KB
4. 使用微信调试工具清除缓存

### Q4: 如何修改地图导航位置？
**A:** 访问 [腾讯位置服务](https://lbs.qq.com/getPoint/)，搜索地址，复制经纬度到 `config.js`。

### Q5: 如何自定义域名？
**A:** 参考 `docs/DEPLOYMENT_GUIDE.md` 中的"自定义域名配置"章节。

---

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

---

## 📄 许可

MIT License - 您可以自由使用、修改和分发此项目。

---

## 💝 致谢

- [Swiper.js](https://swiperjs.com/) - 页面滑动库
- [Google Fonts](https://fonts.google.com/) - 中文字体
- [Unsplash](https://unsplash.com/) - 图片素材
- [Tailwind CSS](https://tailwindcss.com/) - CSS 框架

---

## 📞 联系方式

如有问题或建议，欢迎通过以下方式联系：

- GitHub Issues: [提交问题](https://github.com/YOUR_USERNAME/wedding-invitation/issues)
- Email: your-email@example.com

---

**祝您婚礼圆满成功！💒✨**

---

## 🎁 额外资源

### 设计灵感
- [Dribbble](https://dribbble.com/search/wedding-invitation)
- [Behance](https://www.behance.net/search/projects?search=wedding+invitation)

### 图片素材
- [Unsplash](https://unsplash.com/)
- [Pexels](https://www.pexels.com/)
- [千图网](https://www.58pic.com/)

### 音乐素材
- [网易云音乐](https://music.163.com/)
- [Free Music Archive](https://freemusicarchive.org/)

### 学习资源
- [MDN Web Docs](https://developer.mozilla.org/)
- [CSS-Tricks](https://css-tricks.com/)
- [Swiper API 文档](https://swiperjs.com/swiper-api)

---

**最后更新：** 2026年2月1日
