/**
 * 资产加载与自动色键 (Chroma Key) 处理
 * 将美术交付的 #FF00FF (RGB 255,0,255) 纯色底精准转为高质量透明底 (Alpha = 0)
 * 保护正常的红色、紫红色、粉色等角色细节不被误抠
 */
export class AssetLoader {
  constructor() {
    this.cache = {};
  }

  loadWithChromaKey(src) {
    if (!src) return null;
    if (typeof window === 'undefined' || typeof Image === 'undefined') return null;
    if (this.cache[src]) return this.cache[src];

    const img = new Image();
    const resultObj = { img: null, loaded: false };
    this.cache[src] = resultObj;

    // file:// 协议（Electron 桌面端）下设置 crossOrigin 会触发 CORS 流程，
    // 而 file:// 无 CORS 响应头，导致所有图片加载失败（黑屏）。
    // 此时页面与图片同源，Canvas 去色键不依赖 CORS，故跳过。
    if (typeof location === 'undefined' || location.protocol !== 'file:') {
      img.crossOrigin = 'anonymous';
    }
    img.src = src;

    img.onload = () => {
      // 离屏 Canvas 去色键
      const offCanvas = document.createElement('canvas');
      offCanvas.width = img.naturalWidth || img.width;
      offCanvas.height = img.naturalHeight || img.height;
      const ctx = offCanvas.getContext('2d');

      ctx.drawImage(img, 0, 0);
      const imgData = ctx.getImageData(0, 0, offCanvas.width, offCanvas.height);
      const data = imgData.data;

      // 扫描色键 #FF00FF
      for (let i = 0; i < data.length; i += 4) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];

        // 欧氏色彩距离：与标准色键 #FF00FF (255, 0, 255) 的距离
        const magentaDist = Math.sqrt((r - 255) ** 2 + (g - 0) ** 2 + (b - 255) ** 2);

        // 1. 纯洋红底色与硬边缘彻底透明 (距离小于 68，确保不伤及正常红色/紫色)
        if (magentaDist < 68) {
          data[i + 3] = 0;
          continue;
        }

        // 2. 边缘半透明洋红毛边柔和化 (仅在 G 非常低 < 45，且 R,B 极高 > 180 的极窄边缘过渡区生效)
        if (magentaDist < 95 && g < 45 && r > 180 && b > 180) {
          // 按距离比例淡化 Alpha，平滑抗锯齿边缘
          const alphaFactor = (magentaDist - 68) / 27;
          data[i + 3] = Math.round(data[i + 3] * alphaFactor);
        }
      }

      ctx.putImageData(imgData, 0, 0);
      resultObj.img = offCanvas;
      resultObj.loaded = true;
    };

    img.onerror = () => {
      resultObj.error = true;
    };

    return resultObj;
  }

  getImage(src) {
    const res = this.loadWithChromaKey(src);
    return (res && res.loaded) ? res.img : null;
  }
}

export const assetLoader = new AssetLoader();
