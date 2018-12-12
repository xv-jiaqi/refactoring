import md5 from 'md5';
export default class BridgeMessage {
  constructor(win, handshakeKey) {
    this.win = win;

    const key = `${handshakeKey}`;

    this.handshakeKey = md5(key);

    this.handshake();
  }

  handshake() {
    window.addEventListener(
      'message',
      (event) => {
        console.log('>[NEW]: ', event.data);

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

    console.log('<[NEW]: ', msg, targetOrigin);

    this.win.postMessage(msg, '*' || targetOrigin);
  }

  receive(data) {
    return data;
  }
}
