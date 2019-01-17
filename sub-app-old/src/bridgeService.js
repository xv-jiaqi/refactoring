import md5 from 'md5';
// import { window, document } from 'global';

export default class BridgeMessage {
  constructor({
                sendWindow = window,
                receiveWindow = window,
                handshakeKey = null,
                targetOrigin = '*',

                receive = f => f,
              } = {}) {

    Object.assign(this, {
      sendWindow,
      receiveWindow,
      targetOrigin,
      receiveHook: receive,
      handshakeKey: handshakeKey ? md5(`${handshakeKey}`) : null,
    });

    this.callbackList = new Map();
    this.originRegExp = new RegExp(/^https?:\/{2}[\w\.]+(\:\d+)?(?=\/?)/);
    this.init();
  }

  init() {
    const listenerOpts = ['message', this.receive.bind(this), false];

    this.receiveWindow.addEventListener(...listenerOpts);
  }

  parseOrigin(url = '') {
    const match = this.originRegExp.exec(url);

    if (match) {
      return match[0];
    }
  }

  isVaild(receiveData = {}) {
    const { data: { handshakeKey } = {}, origin } = receiveData;

    if (this.handshakeKey) {
      if (this.handshakeKey !== handshakeKey) {
        return false;
      }
    }

    return this.parseOrigin(origin) === this.parseOrigin(this.targetOrigin);
  }

  send(data, callback, opts = {}) {
    let cbKey = null;
    if (typeof callback === 'function') {
      cbKey = new Date().getTime();
      this.callbackList.set(cbKey, callback);
    }

    const msg = {
      data,
      handshakeKey: this.handshakeKey,
      receipt: cbKey,
      ...opts
    };

    this.sendWindow.postMessage(msg, this.targetOrigin);
  }

  receive(recData) {
    const { data: { data, cbKey, receipt } = {}} = recData;

    // 收到 cbKey 表示消息已接收到
    if (cbKey && this.callbackList.has(cbKey)) {
      this.callbackList.get(cbKey)();
      this.callbackList.delete(cbKey);
      return;
    }

    // 收到 receipt 表示需要发送回执消息
    if(receipt) {
      this.send(null, null, { cbKey: receipt });
    }

    if (this.isVaild(recData)) {
      this.receiveHook(data, this);
    } else {
      console.error('invalid hook', recData.data);
    }
  }
}
