export default class SessionStore {
  constructor(key = 'key') {
    this.key = key;

    if (key in sessionStorage) {
      this.value = new Map(JSON.parse(sessionStorage[key]));
    } else {
      this.value = new Map();
    }
  }

  getItem(id) {
    return this.value.get(id);
  }

  setItem(id, val) {
    this.value.set(id, val);

    const serializeData = JSON.stringify([...this.value]);
    sessionStorage.setItem(this.key, serializeData);

    return serializeData;
  }
}
