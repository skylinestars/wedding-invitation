# 字体使用说明

## 推荐字体

本项目使用在线字体，无需下载字体文件。

### 古风主题推荐字体

1. **Noto Serif SC** (思源宋体 - Google Fonts)
   - 优雅的宋体风格，适合正文显示
   - CDN链接：`https://fonts.googleapis.com/css2?family=Noto+Serif+SC:wght@400;500;700&display=swap`

2. **ZCOOL XiaoWei** (站酷小薇体 - Google Fonts)
   - 手写书法风格，适合标题和装饰文字
   - CDN链接：`https://fonts.googleapis.com/css2?family=ZCOOL+XiaoWei&display=swap`

3. **Ma Shan Zheng** (马善政楷书体 - Google Fonts)
   - 楷书风格，适合诗词引用
   - CDN链接：`https://fonts.googleapis.com/css2?family=Ma+Shan+Zheng&display=swap`

### 现代主题推荐字体

1. **Noto Sans SC** (思源黑体)
   - CDN链接：`https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@300;400;500;700&display=swap`

2. **Long Cang** (龙藏体)
   - CDN链接：`https://fonts.googleapis.com/css2?family=Long+Cang&display=swap`

## 使用方法

在 CSS 文件中引入字体：

```css
@import url('https://fonts.googleapis.com/css2?family=Noto+Serif+SC:wght@400;500;700&display=swap');

body {
  font-family: 'Noto Serif SC', serif;
}
```

## 备用方案

如果 Google Fonts 加载失败，系统会自动回退到以下字体：
- 中文：宋体 (SimSun)、微软雅黑 (Microsoft YaHei)
- 英文：Georgia、Times New Roman
