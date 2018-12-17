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
    window.addEventListener(
      'message',
      (event) => {
        console.log('%c>%c[NEW]: ', 'background:red', 'color:yellow', event.data);

        const { handshakeKey, data } = event.data || {};

        if (handshakeKey === this.handshakeKey) {
          this.receive(data);
        }

        if (!this.targetOrigin) {
          this.targetOrigin = event.origin;
        }
      },
      false,
    );

    this.send('', '*');
  }

  send(data, targetOrigin = this.targetOrigin) {
    const msg = {
      data,
      handshakeKey: this.handshakeKey,
    };

    console.log('%c<%c[NEW]: ', 'background:blue', 'color:yellow',  msg, targetOrigin);

    this.postMessageWindow.postMessage(msg, '*' || targetOrigin);
  }

  receive(data) {
    this.receiveCb(data);
  }
}
