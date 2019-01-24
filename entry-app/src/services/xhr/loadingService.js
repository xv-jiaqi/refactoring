// import { Loading } from 'element-ui';
import Vue from 'vue';
const $Loading = Vue.prototype.$loading;

export default class {
  constructor() {
    this.init();
  }

  init() {
    this.queryCount = 0;
  }

  start() {
    this.init();
    this.loading = $Loading({
      lock: true,
      text: 'Loading',
      spinner: 'el-icon-loading',
      background: 'rgba(0, 0, 0, 0.5)',
    });
  }

  end() {
    this.init();
    this.loading.close();
  }

  plus() {
    this.queryCount++;
  }

  minus() {
    this.queryCount--;
  }

  showLoading() {
    if (this.queryCount === 0) {
      this.start();
    }

    this.plus();
  }

  tryHideLoading() {
    this.minus();

    if (this.queryCount <= 0) {
      this.end();
    }
  }

  focusHideLoading() {
    this.end();
  }
}
