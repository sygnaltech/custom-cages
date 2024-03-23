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
    simulateClickOnElement(elem) {
      const rect = elem.getBoundingClientRect();
      const clientX = rect.left + rect.width / 2;
      const clientY = rect.top + rect.height / 2;
      console.log("simclick", clientX, clientY);
      const clickEvent = new MouseEvent("click", {
        bubbles: true,
        cancelable: true,
        view: window,
        clientX,
        clientY
      });
      document.dispatchEvent(clickEvent);
    }
    simulatePointerOnElement(elem) {
      const rect = elem.getBoundingClientRect();
      const clientX = rect.left + rect.width / 2;
      const clientY = rect.top + rect.height / 2;
      console.log("simclick", clientX, clientY);
      const clickEvent = new MouseEvent("click", {
        bubbles: true,
        cancelable: true,
        view: window,
        clientX,
        clientY
      });
      const pointerEventInit = {
        bubbles: true,
        cancelable: true,
        pointerId: 1,
        width: 1,
        height: 1,
        pressure: 0.5,
        tiltX: 0,
        tiltY: 0,
        pointerType: "mouse",
        isPrimary: true,
        isTrusted: true,
        clientX,
        clientY,
        screenX: clientX,
        screenY: clientY + 121
      };
      if (this.dropdownToggleElem) {
        console.log("clicking pointer event");
        const pointerclick = new PointerEvent("click", pointerEventInit);
        this.dropdownToggleElem.dispatchEvent(pointerclick);
      }
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
