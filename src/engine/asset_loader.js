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
    const resultObj = { img: null, loaded: false, error: false };
    this.cache[src] = resultObj;
    resultObj.ready = new Promise((resolve) => {
      img.onload = () => {
        try {
          const offCanvas = document.createElement('canvas');
          offCanvas.width = img.naturalWidth || img.width;
          offCanvas.height = img.naturalHeight || img.height;
          const ctx = offCanvas.getContext('2d');
          ctx.drawImage(img, 0, 0);
          const imgData = ctx.getImageData(0, 0, offCanvas.width, offCanvas.height);
          const data = imgData.data;

          for (let i = 0; i < data.length; i += 4) {
            const r = data[i];
            const g = data[i + 1];
            const b = data[i + 2];
            const magentaDist = Math.sqrt((r - 255) ** 2 + g ** 2 + (b - 255) ** 2);
            if (magentaDist < 68) {
              data[i + 3] = 0;
            } else if (magentaDist < 95 && g < 45 && r > 180 && b > 180) {
              data[i + 3] = Math.round(data[i + 3] * (magentaDist - 68) / 27);
            }
          }

          ctx.putImageData(imgData, 0, 0);
          resultObj.img = offCanvas;
          resultObj.loaded = true;
          resolve(true);
        } catch (error) {
          resultObj.error = true;
          resolve(false);
        }
      };

      img.onerror = () => {
        resultObj.error = true;
        resolve(false);
      };
    });

    // file:// 下设置 crossOrigin 会触发没有响应头的 CORS 检查。
    if (typeof location === 'undefined' || location.protocol !== 'file:') {
      img.crossOrigin = 'anonymous';
    }
    img.src = src;

    return resultObj;
  }

  async waitFor(src, timeoutMs = 8000) {
    const resource = this.loadWithChromaKey(src);
    if (!resource) return false;
    if (resource.loaded || resource.error) return resource.loaded;
    let timer;
    try {
      return await Promise.race([
        resource.ready,
        new Promise(resolve => { timer = setTimeout(() => resolve(false), timeoutMs); })
      ]);
    } finally {
      clearTimeout(timer);
    }
  }

  getImage(src) {
    const res = this.loadWithChromaKey(src);
    return (res && res.loaded) ? res.img : null;
  }
}

export const assetLoader = new AssetLoader();
