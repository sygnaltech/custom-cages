(() => {
  // src/dropdown.ts
  var WebflowDropdown = class {
    get isOpen() {
      return this.dropdownListElem.classList.contains("w--open");
    }
    constructor(elem) {
      if (!elem.classList.contains("w-dropdown")) {
        throw new Error("The provided element is not a Webflow dropdown element.");
      }
      this.dropdownElem = elem;
      const toggleElem = elem.querySelector(".w-dropdown-toggle");
      const listElem = elem.querySelector(".w-dropdown-list");
      if (!toggleElem || !listElem) {
        throw new Error("The dropdown element does not have the required child elements.");
      }
      this.dropdownToggleElem = toggleElem;
      this.dropdownListElem = listElem;
    }
    init() {
    }
    click() {
      const mouseDownEvent = new MouseEvent("mousedown", {
        bubbles: true,
        cancelable: true
      });
      this.dropdownToggleElem.dispatchEvent(mouseDownEvent);
      const mouseUpEvent = new MouseEvent("mouseup", {
        bubbles: true,
        cancelable: true
      });
      this.dropdownToggleElem.dispatchEvent(mouseUpEvent);
    }
    open() {
      console.log("state", this.isOpen);
      if (!this.isOpen) {
        this.click();
      }
    }
    close() {
      console.log("close handler");
      console.log("state", this.isOpen);
      if (this.isOpen) {
        this.click();
      }
    }
    toggle() {
      this.isOpen ? this.close() : this.open();
    }
  };
})();
//# sourceMappingURL=dropdown.js.map
