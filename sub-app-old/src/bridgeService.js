import md5 from 'md5';
// import { window, document } from 'global';

export default class BridgeMessage {
  constructor(postMessageWindow, handshakeKey, {
    targetOrigin = '*',
    receive: receiveCb = f => f ,
  } = {}) {
    this.postMessageWindow = postMessageWindow;
    this.targetOrigin = targetOrigin;
    this.handshakeKey = handshakeKey ? md5(`${handshakeKey}`) : undefined;

    this.init();
  }

  init() {
    window.receiveHandler = (window.receiveHandler || this.receive.bind(this));

    const listenerOpts = ['message', receiveHandler, false];

    window.removeEventListener(...listenerOpts);
    window.addEventListener(...listenerOpts);
  }

  handshake(shakeKey = this.handshakeKey) {
    this.send(shakeKey, this.targetOrigin, true);

    return new Promise((resolve => {
      const handshakeHandler = e => {
        console.log('handshakeHandler fn');
        const { data: { data, handshakeKey, isHandshake } = {}} = e;

        if (isHandshake && handshakeKey === shakeKey) {
          e.stopPropagation();
          window.removeEventListener('message', handshakeHandler, true);
          resolve(data);
        }
      };

      window.addEventListener('message', handshakeHandler, true);
    }));
  }

  send(data, targetOrigin = this.targetOrigin, isHandshake = false) {
    this.targetOrigin = targetOrigin;

    const msg = {
      data,
      handshakeKey: this.handshakeKey,
      isHandshake,
    };

    this.postMessageWindow.postMessage(msg, targetOrigin);
  }

  receive(recData) {
    const { data: { data, handshakeKey, isHandshake } = {} } = recData;

    if (handshakeKey !== this.handshakeKey) {
      console.log(recData);
      return Promise.reject(new Error('Error handshake key !'));
    }

    if (!this.targetOrigin) {
      this.targetOrigin = event.origin;
    }

    if (isHandshake) {
      return this.send('ok', this.targetOrigin, true);
    }

    console.log('receive: ', data);

    return Promise.resolve(data);
  }
}