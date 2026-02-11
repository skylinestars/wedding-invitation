// 婚礼请柬配置文件
// 请根据实际情况修改以下信息

const weddingConfig = {
  // ========== 新人信息 ==========
  groom: '王路',
  bride: '张小芳',
  
  // ========== 婚礼信息 ==========
  // 请在确定后填写具体日期和时间
  date: '2026年2月22日（农历正月初六）',  // 例如：2026年3月15日
  weekday: '星期日',        // 例如：星期日
  time: '中午11:00',       // 例如：上午10:18
  
  // 婚礼地点
  location: '窑山村石排村王为纲家',
  locationDetail: '铅山县虹桥乡',
  
  // ========== 地图配置 ==========
  map: {
    lat: 28.186597,      // 纬度（需要根据实际地址修改）
    lng: 117.655879,     // 经度（需要根据实际地址修改）
    name: '窑山村石排村王为纲家',
    address: '铅山县虹桥乡'
  },
  

  // ========== 音乐配置 ==========
  music: {
    src: './assets/music/zmjhb.mp3',  // 背景音乐路径
    autoplay: true,                  // 是否自动播放（注意：某些浏览器需要用户交互后才能播放）
    loop: true                       // 是否循环播放
  },
  
  // ========== Open Graph 配置（用于微信朋友圈分享） ==========
  og: {
    title: '王路 ❤️ 张小芳 我们结婚啦！',
    description: '诚挚邀请您参加我们的婚礼 🌸',
    image: 'https://your-domain.com/assets/images/cover.jpg',  // 需要替换为实际的HTTPS图片链接
    url: 'https://your-domain.com/index.html'  // 需要替换为实际的部署URL
  },
  
  // ========== 联系方式（可选） ==========
  contact: {
    phone: '17889846353',  // 联系电话（选填）
    wechat: '17889846353'  // 微信号（选填）
  }
};

// 导出配置（用于ES6模块）
if (typeof module !== 'undefined' && module.exports) {
  module.exports = weddingConfig;
}
