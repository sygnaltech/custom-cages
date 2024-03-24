(() => {
  // src/info.ts
  var CC_INFO = "cc-info";
  var WebflowInfoElementCollection = class {
    constructor() {
    }
    init() {
    }
  };
  var WebflowInfoElement = class {
    constructor(name) {
      this.default = "";
      this.valid = false;
      this.name = name;
    }
    init() {
      if (!this.name) {
        throw new Error("No name specified.");
      }
      const selector = `[${CC_INFO}="${this.name}"]`;
      const element = document.querySelector(selector);
      if (element == null) {
        console.warn("Element with the specified cc-info value not found.");
        return;
      }
      this.infoElem = element;
      this.default = element.textContent || "";
      console.log("default is", this.default);
      this.valid = true;
    }
    clear() {
      this.infoElem.innerText = this.default;
    }
    set(text) {
      console.log("setting text", text);
      this.infoElem.innerText = text;
    }
  };
})();
//# sourceMappingURL=info.js.map
