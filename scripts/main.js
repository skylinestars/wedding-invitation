// 婚礼请柬主交互脚本

// 预加载资源
function preloadResources() {
  return new Promise((resolve) => {
    // 需要预加载的资源列表
    const resources = [

      './assets/images/background.webp',
      './assets/images/top.webp',
      './assets/images/bottom_left.webp',
      './assets/images/bottom_right.webp',
      './assets/images/lantern.png',
      './assets/images/map.png',
      './assets/images/ogImg.jpg',
      './assets/images/person_background.webp',

      './assets/images/r1.jpg',
      './assets/images/r2.jpg',
      './assets/images/r5.jpg',
      './assets/images/top.webp',

      // 音乐文件
      './assets/music/zmjhb.mp3'
    ];
    
    const totalResources = resources.length;
    let loadedResources = 0;
    
    const loadingProgressBar = document.getElementById('loadingProgressBar');
    const loadingTip = document.getElementById('loadingTip');
    
    // 更新加载进度
    function updateProgress() {
      const progress = (loadedResources / totalResources) * 100;
      if (loadingProgressBar) {
        loadingProgressBar.style.width = `${progress}%`;
      }
      
      if (loadingTip) {
        loadingTip.textContent = `正在加载资源 ${loadedResources}/${totalResources}...`;
      }
      
      console.log(`资源加载进度: ${Math.round(progress)}%`);
      
      if (loadedResources >= totalResources) {
        console.log('🎉 所有资源加载完成');
        resolve();
      }
    }
    
    // 加载单个资源
  function loadResource(url) {
    if (url.endsWith('.mp3') || url.endsWith('.wav') || url.endsWith('.ogg')) {
      // 使用 Audio 元素预加载音频（避免 CORS 问题）
      const bgMusic = document.getElementById('bgMusic');
      if (bgMusic) {
        const onCanPlay = function() {
          bgMusic.removeEventListener('canplaythrough', onCanPlay);
          console.log('✅ 音乐文件预加载成功:', url);
          loadedResources++;
          updateProgress();
        };
        const onError = function() {
          bgMusic.removeEventListener('error', onError);
          console.warn(`音频加载失败: ${url}`);
          loadedResources++;
          updateProgress();
        };
        // 如果已经可以播放，直接计数
        if (bgMusic.readyState >= 4) {
          console.log('✅ 音乐文件已就绪:', url);
          loadedResources++;
          updateProgress();
        } else {
          bgMusic.addEventListener('canplaythrough', onCanPlay);
          bgMusic.addEventListener('error', onError);
        }
      } else {
        loadedResources++;
        updateProgress();
      }
    } else {
      // 加载图片
      const img = new Image();
      img.src = url;
      img.addEventListener('load', function() {
        loadedResources++;
        updateProgress();
      });
      img.addEventListener('error', function() {
        console.warn(`图片加载失败: ${url}`);
        loadedResources++;
        updateProgress();
      });
    }
  }
    
    // 开始加载所有资源
    resources.forEach(loadResource);
    
    // 防止资源加载超时
    setTimeout(() => {
      if (loadedResources < totalResources) {
        console.warn('⚠️ 资源加载超时，继续初始化');
        resolve();
      }
    }, 10000); // 10秒超时
  });
}

// 隐藏加载页面
function hideLoadingPage() {
  const loadingPage = document.getElementById('loadingPage');
  if (loadingPage) {
    loadingPage.classList.add('hidden');
    // 延迟后完全移除加载页面
    setTimeout(() => {
      loadingPage.style.display = 'none';
    }, 1000);
  }
}


// ========== 等待 DOM 加载完成 ==========
document.addEventListener('DOMContentLoaded', async function() {
  console.log('开始预加载资源...');
  
  try {
    // 预加载资源
    await preloadResources();
    
    // 隐藏加载页面
    hideLoadingPage();
    
    // ========== 初始化配置 ==========
    initializeConfig();
    
    // ========== 初始化 Swiper ==========
    initializeSwiper();
    
    // ========== 初始化音乐控制 ==========
    initializeMusicControl();
    
    // ========== 初始化地图导航 ==========
    initializeMapNavigation();
    
    // ========== 初始化祝福语功能 ==========
    initializeBlessingSystem();
    
    // ========== 初始化主题切换 ==========
    initializeThemeSwitcher();
    
    // ========== 初始化微信分享（如果需要） ==========
    // initializeWeChatShare(); // 需要后端支持
    
    console.log('✅ 所有功能初始化完成');
  } catch (error) {
    console.error('初始化失败:', error);
    // 即使出错也显示页面
    hideLoadingPage();
    // 尝试初始化核心功能
    initializeConfig();
    initializeSwiper();
  }
});

// ========== 初始化配置信息 ==========
function initializeConfig() {
  if (typeof weddingConfig === 'undefined') {
    console.warn('配置文件未加载，请检查 config.js');
    return;
  }
  
  // 填充新人姓名
  const groomNameEl = document.getElementById('groomName');
  const brideNameEl = document.getElementById('brideName');
  if (groomNameEl) groomNameEl.textContent = weddingConfig.groom;
  if (brideNameEl) brideNameEl.textContent = weddingConfig.bride;
  
  // 填充婚礼日期
  const weddingDateEl = document.getElementById('weddingDateTime');
  if (weddingDateEl)
  {
    weddingDateEl.textContent = `${weddingConfig.date} ${weddingConfig.time}`;
  }

  
  // 填充邀请函页面信息（第2页）
  const invitationDateTimeEl = document.getElementById('invitationDateTime');
  if (invitationDateTimeEl) {
    invitationDateTimeEl.textContent = `${weddingConfig.date} ${weddingConfig.time}`;
  }
  
  const invitationLocationEl = document.getElementById('invitationLocation');
  if (invitationLocationEl) {
    // 组合完整地址
    const fullLocation = weddingConfig.locationDetail 
      ? `${weddingConfig.locationDetail}${weddingConfig.location}`
      : weddingConfig.location;
    invitationLocationEl.textContent = fullLocation;
  }
  
  // 填充地图页面信息
  const mapLocationNameEl = document.getElementById('mapLocationName');
  const mapLocationAddressEl = document.getElementById('mapLocationAddress');
  const mapNameEl = document.getElementById('mapName');
  const mapAddressEl = document.getElementById('mapAddress');
  if (mapLocationNameEl) mapLocationNameEl.textContent = weddingConfig.map.name;
  if (mapLocationAddressEl) mapLocationAddressEl.textContent = weddingConfig.map.address;
  if (mapNameEl) mapNameEl.textContent = weddingConfig.map.name;
  if (mapAddressEl) mapAddressEl.textContent = weddingConfig.map.address;
  
  // 填充联系方式
  const contactPhoneEl = document.getElementById('contactPhone');
  const contactWechatEl = document.getElementById('contactWechat');
  if (contactPhoneEl && weddingConfig.contact) contactPhoneEl.textContent = weddingConfig.contact.phone;
  if (contactWechatEl && weddingConfig.contact) contactWechatEl.textContent = weddingConfig.contact.wechat;
  
  // 填充结尾页签名
  const endingSignatureEl = document.getElementById('endingSignature');
  if (endingSignatureEl) {
    endingSignatureEl.textContent = `${weddingConfig.groom} & ${weddingConfig.bride}`;
  }
  
  // 应用主题
  applyTheme(weddingConfig.theme || 'classic');
}

// ========== 初始化 Swiper 滑动 ==========
function initializeSwiper() {
  const swiper = new Swiper('.wedding-swiper', {
    direction: 'vertical',         // 竖向滑动（古风感）
    slidesPerView: 1,
    spaceBetween: 0,
    mousewheel: true,              // 支持鼠标滚轮
    keyboard: true,                // 支持键盘控制
    speed: 800,                    // 切换速度
    effect: 'slide',               // 滑动效果
    autoplay: {
      delay: 3000,                 // 自动轮播间隔时间（毫秒）
      disableOnInteraction: false, // 用户交互后是否继续自动轮播
      pauseOnMouseEnter: true      // 鼠标悬停时暂停自动轮播
    },
    
    // 分页器
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
      renderBullet: function (index, className) {
        return '<span class="' + className + '"></span>';
      },
    },
    
    // 页面切换动画
    on: {
      slideChange: function () {
        console.log('当前页面:', this.activeIndex + 1);
        // 重新触发当前页面的入场动画
        replayPageAnimations(this.activeIndex);
        
        // 检查是否到达最后一个页面
        if (this.activeIndex === this.slides.length - 1) {
          console.log('到达最后一页，停止自动轮播');
          this.autoplay.stop();
        }
      },
      init: function() {
        console.log('Swiper 初始化完成');
        // 初始化时播放第一页动画
        replayPageAnimations(0);
      }
    }
  });
  
  // 将 swiper 实例存储到全局，方便调试
  window.weddingSwiper = swiper;
}

// ========== 初始化音乐控制 ==========
function initializeMusicControl() {
  const musicControl = document.getElementById('musicControl');
  const bgMusic = document.getElementById('bgMusic');
  
  if (!musicControl || !bgMusic) {
    console.warn('音乐控制元素未找到');
    return;
  }
  
  // 音乐播放状态
  let isPlaying = false;
  let hasInteracted = false;
  
  // 检查音乐文件是否正确加载
  bgMusic.addEventListener('loadeddata', function() {
    console.log('✅ 音乐文件加载成功:', bgMusic.src);
    console.log('音乐时长:', bgMusic.duration, '秒');
  });
  
  bgMusic.addEventListener('error', function(e) {
    console.error('❌ 音乐文件加载失败:', bgMusic.src);
    console.error('错误详情:', e);
    alert('背景音乐加载失败，请检查文件路径是否正确');
  });
  
  // 尝试自动播放（某些浏览器需要用户交互）
  if (weddingConfig && weddingConfig.music && weddingConfig.music.autoplay) {
    setTimeout(() => {
      tryPlayMusic();
    }, 500);
  }
  
  // 点击控制按钮
  musicControl.addEventListener('click', function(e) {
    e.stopPropagation();
    hasInteracted = true;
    if (isPlaying) {
      pauseMusic();
    } else {
      playMusic();
    }
  });
  
  // 页面首次交互时尝试播放（解决浏览器限制）
  const handleUserInteraction = function() {
    if (!hasInteracted && !isPlaying) {
      hasInteracted = true;
      playMusic();
      // 移除监听器
      document.removeEventListener('click', handleUserInteraction);
      document.removeEventListener('touchstart', handleUserInteraction);
      document.removeEventListener('keydown', handleUserInteraction);
    }
  };
  
  // 添加多种交互事件监听器
  document.addEventListener('click', handleUserInteraction);
  document.addEventListener('touchstart', handleUserInteraction);
  document.addEventListener('touchend', handleUserInteraction);
  document.addEventListener('keydown', handleUserInteraction);
  
  // 监听 Swiper 滑动作为用户交互（微信中滑动是最常见的首次交互）
  if (window.weddingSwiper) {
    window.weddingSwiper.on('slideChange', handleUserInteraction);
    window.weddingSwiper.on('touchStart', handleUserInteraction);
  }
  
  // 尝试播放音乐（不强制重新加载）
  function tryPlayMusic() {
    if (bgMusic.paused) {
      bgMusic.play()
        .then(() => {
          isPlaying = true;
          musicControl.querySelector('.music-icon').classList.add('playing');
          console.log('🎵 音乐开始播放');
        })
        .catch(error => {
          console.log('自动播放被阻止，等待用户交互:', error);
          isPlaying = false;
          musicControl.querySelector('.music-icon').classList.remove('playing');
          // 不做特殊处理，等待用户点击
        });
    }
  }
  
  // 播放音乐
  function playMusic() {
    // 直接播放，不重新加载（避免额外的网络请求）
    bgMusic.play()
      .then(() => {
        isPlaying = true;
        musicControl.querySelector('.music-icon').classList.add('playing');
        console.log('🎵 音乐开始播放');
      })
      .catch(error => {
        console.warn('⚠️ 音乐播放失败:', error);
        isPlaying = false;
        musicControl.querySelector('.music-icon').classList.remove('playing');
        
        // 如果是首次尝试且失败，添加闪烁提示
        if (!hasInteracted) {
          musicControl.classList.add('pulse');
          setTimeout(() => {
            musicControl.classList.remove('pulse');
          }, 3000);
        }
      });
  }
  
  // 暂停音乐
  function pauseMusic() {
    bgMusic.pause();
    isPlaying = false;
    musicControl.querySelector('.music-icon').classList.remove('playing');
    console.log('⏸️ 音乐已暂停');
  }
  
  // 监听音乐播放结束（如果不循环）
  bgMusic.addEventListener('ended', function() {
    isPlaying = false;
    musicControl.querySelector('.music-icon').classList.remove('playing');
  });
  
  // 监听音乐实际开始播放
  bgMusic.addEventListener('playing', function() {
    console.log('🎵 音乐正在播放中...');
  });
  
  // 页面可见性变化时处理音乐
  document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
      // 页面隐藏时暂停音乐
      if (isPlaying) {
        bgMusic.pause();
      }
    } else {
      // 页面显示时恢复音乐
      if (isPlaying) {
        bgMusic.play().catch(e => console.warn('恢复播放失败:', e));
      }
    }
  });
}

// ========== 初始化地图导航 ==========
function initializeMapNavigation() {
  const navButton = document.getElementById('navButton');
  const navigateBtn = document.getElementById('navigateBtn');
  const copyAddressButton = document.getElementById('copyAddressButton');
  
  if (!weddingConfig || !weddingConfig.map) {
    console.warn('地图配置未找到');
    return;
  }
  
  const { lat, lng, name, address } = weddingConfig.map;
  
  // 一键导航
  if (navButton) {
    navButton.addEventListener('click', function() {
      openMapNavigation(lat, lng, name);
    });
  }
  
  // 第4页的导航按钮
  if (navigateBtn) {
    navigateBtn.addEventListener('click', function(e) {
      e.preventDefault();
      openMapNavigation(lat, lng, name);
    });
  }
  
  // 地图图片点击也触发导航
  const mapDiv = document.getElementById('map');
  if (mapDiv) {
    mapDiv.style.cursor = 'pointer';
    mapDiv.addEventListener('click', function() {
      openMapNavigation(lat, lng, name);
    });
  }
  
  // 复制地址
  if (copyAddressButton) {
    copyAddressButton.addEventListener('click', function() {
      copyToClipboard(weddingConfig.location);
    });
  }
}

// 打开地图导航
function openMapNavigation(lat, lng, name) {
  // 编码地址名称
  const encodedName = encodeURIComponent(name);
  
  // 地图链接
  const mapUrls = {
    tencent: `https://apis.map.qq.com/uri/v1/marker?marker=coord:${lat},${lng};title:${encodedName}&referer=wedding`,
    baidu: `https://api.map.baidu.com/marker?location=${lat},${lng}&title=${encodedName}&content=${encodedName}&output=html`,
    amap: `https://uri.amap.com/marker?position=${lng},${lat}&name=${encodedName}&src=wedding`
  };
  
  // 创建自定义选择弹窗（包括微信环境）
  showMapSelector(mapUrls);
}

// 显示地图选择弹窗
function showMapSelector(mapUrls) {
  // 移除已有弹窗
  const existing = document.getElementById('mapSelectorOverlay');
  if (existing) existing.remove();
  
  // 创建遮罩层
  const overlay = document.createElement('div');
  overlay.id = 'mapSelectorOverlay';
  overlay.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.5);z-index:10000;display:flex;justify-content:center;align-items:center;';
  
  // 创建弹窗
  const dialog = document.createElement('div');
  dialog.style.cssText = 'background:#fff;border-radius:12px;padding:24px 20px 16px;width:280px;text-align:center;box-shadow:0 4px 20px rgba(0,0,0,0.3);';
  
  const title = document.createElement('div');
  title.textContent = '选择导航方式';
  title.style.cssText = 'font-size:17px;font-weight:bold;color:#333;margin-bottom:18px;';
  dialog.appendChild(title);
  
  const maps = [
    { label: '腾讯地图', url: mapUrls.tencent, color: '#07C160' },
    { label: '百度地图', url: mapUrls.baidu, color: '#3385FF' },
    { label: '高德地图', url: mapUrls.amap, color: '#1E90FF' }
  ];
  
  maps.forEach(function(item) {
    const btn = document.createElement('button');
    btn.textContent = item.label;
    btn.style.cssText = 'display:block;width:100%;padding:12px 0;margin-bottom:10px;border:none;border-radius:8px;font-size:16px;color:#fff;cursor:pointer;background:' + item.color + ';';
    btn.addEventListener('click', function() {
      overlay.remove();
      window.open(item.url);
    });
    dialog.appendChild(btn);
  });
  
  // 取消按钮
  const cancelBtn = document.createElement('button');
  cancelBtn.textContent = '取消';
  cancelBtn.style.cssText = 'display:block;width:100%;padding:12px 0;border:none;border-radius:8px;font-size:16px;color:#666;cursor:pointer;background:#f5f5f5;margin-top:4px;';
  cancelBtn.addEventListener('click', function() {
    overlay.remove();
  });
  dialog.appendChild(cancelBtn);
  
  overlay.appendChild(dialog);
  
  // 点击遮罩关闭
  overlay.addEventListener('click', function(e) {
    if (e.target === overlay) overlay.remove();
  });
  
  document.body.appendChild(overlay);
}

// 复制到剪贴板
function copyToClipboard(text) {
  // 创建临时文本框
  const textarea = document.createElement('textarea');
  textarea.value = text;
  textarea.style.position = 'fixed';
  textarea.style.opacity = '0';
  document.body.appendChild(textarea);
  
  try {
    textarea.select();
    document.execCommand('copy');
    alert('地址已复制到剪贴板 ✓\n' + text);
  } catch (err) {
    console.error('复制失败:', err);
    alert('复制失败，请手动复制：\n' + text);
  } finally {
    document.body.removeChild(textarea);
  }
}

// ========== 初始化主题切换器 ==========
function initializeThemeSwitcher() {
  const themeSwitcher = document.getElementById('themeSwitcher');
  if (!themeSwitcher) return;
  
  const themeButtons = themeSwitcher.querySelectorAll('.theme-btn');
  
  themeButtons.forEach(button => {
    button.addEventListener('click', function() {
      const theme = this.dataset.theme;
      applyTheme(theme);
      
      // 更新按钮状态
      themeButtons.forEach(btn => btn.classList.remove('active'));
      this.classList.add('active');
    });
  });
  
  // 设置默认激活状态
  const defaultTheme = (weddingConfig && weddingConfig.theme) || 'classic';
  const defaultButton = themeSwitcher.querySelector(`[data-theme="${defaultTheme}"]`);
  if (defaultButton) {
    defaultButton.classList.add('active');
  }
}

// 应用主题
function applyTheme(theme) {

}

// ========== 初始化微信分享（需要后端支持获取签名） ==========
function initializeWeChatShare() {
  // 检测是否在微信中
  const isWeChat = /MicroMessenger/i.test(navigator.userAgent);
  if (!isWeChat) {
    console.log('非微信环境，跳过微信分享配置');
    return;
  }
  
  // 注意：微信 JSSDK 需要后端提供签名
  // 以下代码仅为示例，实际使用需要配置后端接口
  
  /*
  // 引入微信 JSSDK
  const script = document.createElement('script');
  script.src = 'https://res.wx.qq.com/open/js/jweixin-1.6.0.js';
  document.head.appendChild(script);
  
  script.onload = function() {
    // 向后端请求签名
    fetch('/api/wechat/signature?url=' + encodeURIComponent(location.href))
      .then(res => res.json())
      .then(data => {
        wx.config({
          debug: false,
          appId: data.appId,
          timestamp: data.timestamp,
          nonceStr: data.nonceStr,
          signature: data.signature,
          jsApiList: ['updateAppMessageShareData', 'updateTimelineShareData']
        });
        
        wx.ready(function() {
          const shareData = {
            title: weddingConfig.og.title,
            desc: weddingConfig.og.description,
            link: weddingConfig.og.url,
            imgUrl: weddingConfig.og.image
          };
          
          // 分享给朋友
          wx.updateAppMessageShareData(shareData);
          
          // 分享到朋友圈
          wx.updateTimelineShareData(shareData);
          
          console.log('微信分享配置成功');
        });
      })
      .catch(err => console.error('微信分享配置失败:', err));
  };
  */
  
  console.log('微信分享需要后端支持，当前使用 Open Graph 默认分享');
}

// ========== 工具函数：检测设备 ==========
function isMobile() {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

// ========== 工具函数：获取 URL 参数 ==========
function getUrlParam(name) {
  const reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
  const r = window.location.search.substr(1).match(reg);
  if (r != null) return decodeURIComponent(r[2]);
  return null;
}

// ========== 重新播放页面动画 ==========
function replayPageAnimations(pageIndex) {
  const currentSlide = document.querySelector(`.swiper-slide:nth-child(${pageIndex + 1})`);
  if (!currentSlide) return;
  
  // 获取当前页面所有带动画的元素
  const animatedElements = currentSlide.querySelectorAll('[style*="animation"], [class*="lantern"], [class*="decoration"], [class*="title"], [class*="avatar"], [class*="subtitle"], [class*="couple-names"], [class*="wedding-info"], [class*="bottom-text"], [class*="couple-photo"], [class*="vertical-text"], [class*="invitation-text"]');
  
  // 移除并重新添加动画类来触发重播
  animatedElements.forEach(element => {
    // 克隆元素来重置动画
    const clone = element.cloneNode(true);
    element.parentNode.replaceChild(clone, element);
  });
  
  console.log(`✨ 页面 ${pageIndex + 1} 动画已重新播放`);
}

// ========== 调试信息 ==========
// ========== 初始化祝福语系统 ==========
function initializeBlessingSystem() {
  const blessingInput = document.getElementById('blessingInput');
  const sendBlessingBtn = document.getElementById('sendBlessingBtn');
  const danmakuContainer = document.getElementById('danmakuContainer');
  
  if (!blessingInput || !sendBlessingBtn || !danmakuContainer) {
    console.warn('祝福语系统元素未找到');
    return;
  }
  
  // 示例祝福语
  const defaultBlessings = [
    '百年好合，永结同心',
    '早生贵子，幸福美满',
    '执子之手，与子偕老',
    '珠联璧合，佳偶天成',
    '天作之合，鸾凤和鸣',
    '花好月圆，百年琴瑟',
    '美满良缘，白首成约',
    '恩爱有加，相敬如宾'
  ];
  
  // 存储所有祝福语
  let blessings = [...defaultBlessings];
  
  // 初始化默认弹幕（分散显示）
  defaultBlessings.forEach((blessing, index) => {
    setTimeout(() => {
      createDanmaku(blessing);
    }, index * 1500); // 增加延迟时间，确保弹幕分散显示
  });
  
  // 发送祝福语
  sendBlessingBtn.addEventListener('click', function() {
    const blessingText = blessingInput.value.trim();
    if (blessingText) {
      // 添加到祝福语数组
      blessings.push(blessingText);
      
      // 创建弹幕
      createDanmaku(blessingText);
      
      // 清空输入框
      blessingInput.value = '';
      
      // 显示成功提示
      alert('祝福语发送成功！');
    } else {
      alert('请输入祝福语');
    }
  });
  
  // 回车发送
  blessingInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
      sendBlessingBtn.click();
    }
  });
  
  // 自动循环播放弹幕
  let danmakuIndex = 0;
  setInterval(() => {
    if (blessings.length > 0) {
      const blessing = blessings[danmakuIndex % blessings.length];
      createDanmaku(blessing);
      danmakuIndex++;
    }
  }, 3000);
  
  // 创建弹幕
  function createDanmaku(text) {
    const danmaku = document.createElement('div');
    danmaku.className = 'danmaku-item';
    danmaku.textContent = text;
    
    // 随机位置（垂直方向）
    const containerHeight = danmakuContainer.offsetHeight;
    const danmakuHeight = 40; // 估计的弹幕高度
    const top = Math.random() * (containerHeight - danmakuHeight);
    danmaku.style.top = `${top}px`;
    
    // 随机速度（8-15秒）
    const duration = 8 + Math.random() * 7;
    danmaku.style.animationDuration = `${duration}s`;
    
    // 随机颜色
    const colors = [
      'rgba(255, 215, 0, 0.8)',  // 金色
      'rgba(255, 105, 180, 0.8)', // 粉色
      'rgba(144, 238, 144, 0.8)', // 浅绿色
      'rgba(135, 206, 235, 0.8)', // 浅蓝色
      'rgba(255, 165, 0, 0.8)'     // 橙色
    ];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    danmaku.style.background = randomColor;
    
    // 添加到容器
    danmakuContainer.appendChild(danmaku);
    
    // 动画结束后移除
    setTimeout(() => {
      danmaku.remove();
    }, duration * 1000);
  }
}

console.log('%c婚礼请柬加载完成 💒', 'color: #CD5C5C; font-size: 16px; font-weight: bold;');
console.log('设备类型:', isMobile() ? '移动设备' : '桌面设备');
console.log('浏览器UA:', navigator.userAgent);

if (typeof weddingConfig !== 'undefined') {
  console.log('配置信息:', weddingConfig);
}
