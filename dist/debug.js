(() => {
  // src/debug.ts
  var Sa5Debug = class {
    constructor(label = "") {
      this.localStorageDebugFlag = "sa5-debug";
      this._enabled = false;
      this._label = label;
    }
    get persistentDebug() {
      return Boolean(localStorage.getItem(this.localStorageDebugFlag));
    }
    set persistentDebug(active) {
      if (active) {
        localStorage.setItem(this.localStorageDebugFlag, "true");
        console.debug("sa5-core debug enabled (persistent).");
      } else {
        localStorage.removeItem(this.localStorageDebugFlag);
        console.debug("sa5-core debug disabled (persistent).");
      }
    }
    get enabled() {
      var wfuDebugValue = Boolean(localStorage.getItem(this.localStorageDebugFlag));
      wfuDebugValue = wfuDebugValue || this._enabled;
      return wfuDebugValue;
    }
    set enabled(active) {
      this._enabled = active;
    }
    group(name) {
      if (this.enabled)
        console.group(name);
    }
    groupEnd() {
      if (this.enabled)
        console.groupEnd();
    }
    log(...args) {
      if (!this.enabled)
        return;
      if (this._label)
        console.log(this._label, ...args);
      else
        console.log(...args);
    }
    debug(...args) {
      if (!this.enabled)
        return;
      if (this._label)
        console.debug(this._label, ...args);
      else
        console.debug(...args);
    }
  };
})();
//# sourceMappingURL=debug.js.map
