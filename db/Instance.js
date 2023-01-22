class Instance {
  constructor(instance, connectionOptions) {
    this._instance = instance;
    this._connectionOptions = connectionOptions;
    this._();
  }

  _() {
    const _proto = Object.getPrototypeOf(this._instance)
    Object.keys(_proto).forEach(
      (_p) => (this[_p] = _proto[_p].bind(this._instance))
    );
    Object.keys(this._instance).forEach(
      (_k) => (this[_k] = typeof this._instance[_k] === 'function' ?this._instance[_k].bind(this._instance): this._instance[_k])
    );

    delete this._instance;
  }

  getConnectionOptions(){
    return this._connectionOptions;
  }
}

export default Instance;
