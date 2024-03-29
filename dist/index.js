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
      window.debug.log("state", this.isOpen);
      if (!this.isOpen) {
        this.click();
      }
    }
    close() {
      window.debug.log("close handler");
      window.debug.log("state", this.isOpen);
      if (this.isOpen) {
        this.click();
      }
    }
    toggle() {
      this.isOpen ? this.close() : this.open();
    }
    clear(keepFirstItem = false) {
      const listItems = this.dropdownListElem.querySelectorAll("a");
      listItems.forEach((anchor, index) => {
        if (keepFirstItem && index === 0) {
        } else {
          anchor.remove();
        }
      });
    }
    static initWebflowJS() {
      window.Webflow.require("dropdown").ready();
      document.dispatchEvent(new Event("readystatechange"));
    }
  };

  // src/fs-filter-utils.ts
  var FSFilterUtils = class {
    constructor(elem) {
    }
    init() {
    }
    refresh() {
    }
    static removeFilterTagByName(tagName) {
      const tagElements = document.querySelectorAll('div[fs-cmsfilter-element="tag-text"]');
      tagElements.forEach((element) => {
        if (element.textContent && element.textContent.includes(tagName)) {
          const closeIcon = element.closest('div[fs-cmsfilter-element="tag-template"]')?.querySelector('img[fs-cmsfilter-element="tag-remove"]');
          if (closeIcon) {
            closeIcon.click();
          }
        }
      });
    }
  };

  // src/info.ts
  var CC_INFO = "cc-info";
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
      window.debug.log("default is", this.default);
      this.valid = true;
    }
    clear() {
      this.infoElem.innerText = this.default;
    }
    set(text) {
      window.debug.log("setting text", text);
      this.infoElem.innerText = text;
    }
  };

  // src/page/filter.ts
  var FilterPage = class {
    constructor() {
    }
    init() {
      window.debug.log("Filter page init.");
      this.selectedBrandName = new WebflowInfoElement("brand-name");
      this.selectedBrandName.init();
      this.selectedModelName = new WebflowInfoElement("model-name");
      this.selectedModelName.init();
      this.initBrandRadioButtons();
      const dropdownElement = document.querySelector(".select-model > .w-dropdown");
      if (dropdownElement) {
        this.modelDropdown = new WebflowDropdown(dropdownElement);
      } else {
        console.error("Model dropdown element not found.");
      }
      const resetElements = document.querySelectorAll('[fs-cmsfilter-element="reset"]');
      resetElements.forEach((element) => {
        element.addEventListener("click", (event) => {
          this.resetFilter();
        });
      });
    }
    resetFilter() {
      this.selectedBrandName.clear();
      this.clearModels();
    }
    initBrandRadioButtons() {
      const radioButtons = document.querySelectorAll(".brands-menu .dyn-brand .w-form-formradioinput.radio-button");
      radioButtons.forEach((radioButton) => {
        radioButton.addEventListener("change", (event) => {
          window.debug.log(`brand clicked`);
          const target = event.target;
          if (target.checked) {
            const brandName = target.nextElementSibling ? target.nextElementSibling.textContent : "";
            window.debug.log("Brand selected:", brandName);
            if (!brandName) {
              console.error("Brand name is null");
              return;
            }
            this.selectedBrandName.set(brandName);
            this.clearModels();
            this.loadModels(brandName);
          }
        });
      });
    }
    loadModels(make) {
      make = make.toLowerCase().replace(/\s+/g, "-");
      const modelsDataSourceElems = document.querySelectorAll('[cc-datasource="models"]');
      const matchingModels = [];
      this.selectedModelName.clear();
      modelsDataSourceElems.forEach((element) => {
        const modelTypes = element.querySelectorAll(".cms-select-model-type");
        modelTypes.forEach((modelType) => {
          const modelMake = modelType.querySelector(".data_model-make");
          if (!(modelMake && modelMake.textContent))
            return;
          const matchMakeID = modelMake.textContent.trim().toLowerCase().replace(/\s+/g, "-");
          window.debug.log("matching", matchMakeID, make.toLowerCase());
          if (matchMakeID === make.toLowerCase()) {
            window.debug.log("MATCHED");
            const modelNameElem = modelType.querySelector(".model-name");
            if (modelNameElem && modelNameElem.textContent) {
              let modelName = modelNameElem.textContent.trim();
              matchingModels.push(modelName);
              window.debug.log(modelName);
              this.createModel(modelName);
            }
          }
        });
      });
      window.debug.log("re-initializing dropdowns");
      WebflowDropdown.initWebflowJS();
    }
    createModel(name) {
      window.debug.log(`creating model - ${name}`);
      const modelsSelectElem = window.modelsSelectElem;
      const modelsNavElem = window.modelsNavElem;
      if (modelsSelectElem) {
        const option = document.createElement("option");
        option.value = name;
        option.textContent = name;
        modelsSelectElem.appendChild(option);
        window.debug.log("Model option created");
      } else {
        window.debug.log("Select element not found");
      }
      if (modelsNavElem) {
        const linkElement = document.createElement("a");
        linkElement.href = "#";
        linkElement.classList.add("sort_field", "w-dropdown-link");
        linkElement.tabIndex = -1;
        linkElement.setAttribute("role", "option");
        linkElement.setAttribute("aria-selected", "false");
        linkElement.textContent = name;
        modelsNavElem.appendChild(linkElement);
        window.debug.log("CREATING");
        linkElement.addEventListener("click", (event) => {
          this.selectModel(name);
        });
      } else {
        console.error("The specific nav element was not found.");
      }
    }
    selectModel(name) {
      const modelsSelectElem = window.modelsSelectElem;
      this.modelDropdown.close();
      window.debug.log("selectModel select", modelsSelectElem);
      window.debug.log(`selecting model - ${name}`);
      this.selectedModelName.set(name);
      if (modelsSelectElem) {
        let found = false;
        for (let i = 0; i < modelsSelectElem.options.length; i++) {
          if (modelsSelectElem.options[i].value === name) {
            modelsSelectElem.selectedIndex = i;
            let changeEvent = new Event("change", { bubbles: true, cancelable: true });
            modelsSelectElem.dispatchEvent(changeEvent);
            changeEvent = new Event("input", { bubbles: true, cancelable: true });
            modelsSelectElem.dispatchEvent(changeEvent);
            found = true;
            window.debug.log(`Model '${name}' selected.`);
            break;
          }
        }
        if (!found) {
          window.debug.log(`Model '${name}' not found in the select options.`);
        }
      } else {
        console.error("modelsSelectElem is not defined on window.");
      }
    }
    clearModels() {
      const modelsSelectElem = window.modelsSelectElem;
      const modelsNavElem = window.modelsNavElem;
      this.selectedModelName.clear();
      window.debug.log("Models select elem", modelsSelectElem);
      if (modelsSelectElem) {
        modelsSelectElem.innerHTML = "";
        window.debug.log(modelsSelectElem.innerHTML);
        const defaultOption = document.createElement("option");
        defaultOption.value = "";
        defaultOption.textContent = "Select Model...";
        modelsSelectElem.appendChild(defaultOption);
        FSFilterUtils.removeFilterTagByName("Model");
        window.debug.log("Models cleared");
      } else {
        window.debug.log("Select element not found");
      }
      if (modelsNavElem) {
        const links = modelsNavElem.querySelectorAll("a");
        links.forEach((link) => link.parentNode?.removeChild(link));
        const linkElement = document.createElement("a");
        linkElement.href = "#";
        linkElement.classList.add("sort_field", "w-dropdown-link", "w--current");
        linkElement.tabIndex = -1;
        linkElement.role = "option";
        linkElement.setAttribute("aria-selected", "false");
        linkElement.textContent = "Select Model...";
        modelsNavElem.appendChild(linkElement);
      } else {
        window.debug.log("Nav element not found");
      }
    }
  };

  // src/page/test.ts
  var TestPage = class {
    constructor() {
    }
    init() {
      window.debug.log("Test page init.");
      const dropdownElement = document.querySelector(".select-model > .w-dropdown");
      if (dropdownElement) {
        this.modelDropdown = new WebflowDropdown(dropdownElement);
      } else {
        console.error("Model dropdown element not found.");
      }
      const buttons = document.querySelectorAll("[test]");
      buttons.forEach((button) => {
        button.addEventListener("click", () => {
          const action = button.getAttribute("test");
          switch (action) {
            case "open":
              window.debug.log("open");
              this.modelDropdown.open();
              break;
            case "close":
              window.debug.log("close");
              this.modelDropdown.close();
              break;
            case "toggle":
              window.debug.log("toggle");
              this.modelDropdown.isOpen ? this.modelDropdown.close() : this.modelDropdown.open();
              break;
            default:
              console.error("Invalid action.");
          }
        });
      });
    }
  };

  // src/routeDispatcher.ts
  var RouteDispatcher = class {
    constructor() {
    }
    matchRoute(path) {
      for (const route in this.routes) {
        if (route.endsWith("*")) {
          const baseRoute = route.slice(0, -1);
          if (path.startsWith(baseRoute)) {
            return this.routes[route];
          }
        } else if (route === path) {
          return this.routes[route];
        }
      }
      return null;
    }
    dispatchRoute() {
      const path = window.location.pathname;
      const handler = this.matchRoute(path);
      if (handler) {
        handler();
      } else {
        window.debug.log("No specific function for this path.");
      }
    }
  };

  // src/index.ts
  var SITE_NAME = "CustomCages";
  var VERSION = "v0.1.4";
  window[SITE_NAME] = window[SITE_NAME] || {};
  var Rise = window[SITE_NAME];
  window.fsAttributes = window.fsAttributes || [];
  window.fsAttributes.push([
    "cmsfilter",
    (filterInstances) => {
      window.debug.log("cmsfilter Successfully loaded!");
      window.debug.log(filterInstances);
      [window.filterInstance] = filterInstances;
    }
  ]);
  window.modelsDataSourceElems = document.querySelectorAll('[cc-datasource="models"]');
  window.modelsSelectElem = document.querySelector('[fs-cmsfilter-field="Model"]');
  window.modelsNavElem = document.querySelector(".select-model nav");
  function init() {
    window.debug = new Sa5Debug();
    if (window.location.hostname.endsWith("webflow.io"))
      window.debug.enabled = true;
    if (new URLSearchParams(window.location.search).has("debug"))
      window.debug.enabled = true;
    window.debug.log(`${SITE_NAME} package init ${VERSION}`);
    var routeDispatcher = new RouteDispatcher();
    routeDispatcher.routes = {
      "/categories/roll-cage-kits": () => {
        new FilterPage().init();
      },
      "/test": () => {
        new TestPage().init();
      }
    };
    routeDispatcher.dispatchRoute();
  }
  init();
})();
//# sourceMappingURL=index.js.map
