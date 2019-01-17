export default class FramePreload {
  constructor(url = '') {
    this.src = url;
    this.createElement();

    this.styleGradient = {
      width: ['1', '100%'],
      height: ['1', '100%'],
      opacity: [0, 1],
      pointerEvents: ['none', 'auto'],
    };
    this.styleKeys = Object.keys(this.styleGradient);
  }

  createElement() {
    const elementName = 'iframe';
    this.frame = document.createElement(elementName);
    this.frame.src = this.src;
  }

  preload() {
    const styles = {
      position: 'fixed',
      overflow: 'hidden',
      willChange: 'transform', // 创建新的渲染层, 增强页面渲染性能
    };

    this.styleKeys.forEach(attr => {
      this.frame.style[attr] = this.styleGradient[attr][0];
    });

    Object.assign(this.frame.style, styles);

    return this;
  }

  loaded() {
    this.styleKeys.forEach(attr => {
      this.frame.style[attr] = this.styleGradient[attr][1];
    });

    return this;
  }
}
