import md5 from 'md5';
export default class BridgeMessage {
  constructor(postMessageWindow, handshakeKey, {
    receive: receiveCb = f => f ,
  } = {}) {
    this.postMessageWindow = postMessageWindow;
    this.handshakeKey = md5(`${handshakeKey}`);
    this.receiveCb = receiveCb;

    this.handshake();
  }

  handshake() {
    window.handler = (window.handler || handlerFn.bind(this));

    const listenerOpts = ['message', handler, false];

    window.removeEventListener(...listenerOpts);
    window.addEventListener(...listenerOpts);

    this.send('', '*');

    function handlerFn (event) {
      const { handshakeKey, data } = event.data || {};

      if (handshakeKey === this.handshakeKey) {
        this.receive(data);
      }

      if (!this.targetOrigin) {
        this.targetOrigin = event.origin;
      }
    }
  }

  send(data, targetOrigin = this.targetOrigin) {
    const msg = {
      data,
      handshakeKey: this.handshakeKey,
    };

    this.postMessageWindow.postMessage(msg, '*' || targetOrigin);
  }

  receive(data) {
    console.log('receive', data);

    this.receiveCb(data);
  }
}
