import md5 from 'md5';
export default class BridgeMessage {
  constructor(win, handshakeKey) {
    this.win = win;

    const key = `${handshakeKey}`;

    this.handshakeKey = md5(key);

    this.handshake();
  }

  handshake() {
    this.win.postMessage(this.handshakeKey, '*');

    window.addEventListener(
      'message',
      (event) => {
        const originData = event.data;

        if (typeof originData === 'string' && originData === this.handshakeKey) {
          this.targetOrigin = event.origin;
          return;
        }

        const { handshakeKey, data } = originData;

        if (handshakeKey === this.handshakeKey) {
          this.receive(data);
        }
      },
      false,
    );
  }

  send(data, targetOrigin = this.targetOrigin) {
    const msg = {
      data,
      handshakeKey: this.handshakeKey,
    };
    this.win.postMessage(msg, targetOrigin);
  }

  receive(data) {
    return data;
  }
}
