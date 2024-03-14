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
      this.simulatePointerOnElement(this.dropdownToggleElem);
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

  // src/page/filter.ts
  var FilterPage = class {
    constructor() {
    }
    init() {
      console.log("Filter page init.");
      this.initBrandRadioButtons();
      const dropdownElement = document.querySelector(".select-model > .w-dropdown");
      if (dropdownElement) {
        this.modelDropdown = new WebflowDropdown(dropdownElement);
      } else {
        console.error("Model dropdown element not found.");
      }
    }
    initBrandRadioButtons() {
      const radioButtons = document.querySelectorAll(".brands-menu .dyn-brand .w-form-formradioinput.radio-button");
      console.log("radio buttons", radioButtons);
      radioButtons.forEach((radioButton) => {
        radioButton.addEventListener("change", (event) => {
          console.log(`brand clicked`);
          const target = event.target;
          if (target.checked) {
            const brandName = target.nextElementSibling ? target.nextElementSibling.textContent : "";
            console.log("Brand selected:", brandName);
            if (!brandName) {
              console.error("Brand name is null");
              return;
            }
            this.clearModels();
            this.loadModels(brandName);
          }
        });
      });
    }
    loadModels(make) {
      const modelsDataSourceElems = document.querySelectorAll('[cc-datasource="models"]');
      const matchingModels = [];
      modelsDataSourceElems.forEach((element) => {
        const modelTypes = element.querySelectorAll(".cms-select-model-type");
        modelTypes.forEach((modelType) => {
          const modelMake = modelType.querySelector(".data_model-make");
          if (modelMake && modelMake.textContent && modelMake.textContent.trim().toLowerCase() === make.toLowerCase()) {
            const modelNameElem = modelType.querySelector(".model-name");
            if (modelNameElem && modelNameElem.textContent) {
              let modelName = modelNameElem.textContent.trim();
              matchingModels.push(modelName);
              console.log(modelName);
              this.createModel(modelName);
            }
          }
        });
      });
      console.log("re-initializing dropdowns");
      window.Webflow.require("dropdown").ready();
      document.dispatchEvent(new Event("readystatechange"));
    }
    createModel(name) {
      console.log(`creating model - ${name}`);
      const modelsSelectElem = window.modelsSelectElem;
      const modelsNavElem = window.modelsNavElem;
      if (modelsSelectElem) {
        const option = document.createElement("option");
        option.value = name;
        option.textContent = name;
        modelsSelectElem.appendChild(option);
        console.log("Model option created");
      } else {
        console.log("Select element not found");
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
        linkElement.addEventListener("click", (event) => {
          this.selectModel(name);
        });
      } else {
        console.error("The specific nav element was not found.");
      }
    }
    selectModel(name) {
      const modelsSelectElem = window.modelsSelectElem;
      console.log("closing");
      console.log(this.modelDropdown);
      this.modelDropdown.close();
      console.log("selectModel select", modelsSelectElem);
      console.log(`selecting model - ${name}`);
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
            console.log(`Model '${name}' selected.`);
            break;
          }
        }
        if (!found) {
          console.log(`Model '${name}' not found in the select options.`);
        }
      } else {
        console.error("modelsSelectElem is not defined on window.");
      }
    }
    clearModels() {
      const modelsSelectElem = window.modelsSelectElem;
      const modelsNavElem = window.modelsNavElem;
      console.log("select elem", modelsSelectElem);
      if (modelsSelectElem) {
        modelsSelectElem.innerHTML = "";
        console.log(modelsSelectElem.innerHTML);
        const defaultOption = document.createElement("option");
        defaultOption.value = "";
        defaultOption.textContent = "Select Model...";
        modelsSelectElem.appendChild(defaultOption);
        this.removeFilterTagByName("Model");
        console.log("Models cleared");
      } else {
        console.log("Select element not found");
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
        console.log("Nav element not found");
      }
    }
    removeFilterTagByName(tagName) {
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

  // src/page/test.ts
  var TestPage = class {
    constructor() {
    }
    init() {
      console.log("Test page init.");
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
              console.log("open");
              this.modelDropdown.open();
              break;
            case "close":
              console.log("close");
              this.modelDropdown.close();
              break;
            case "toggle":
              console.log("toggle");
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
        console.log("No specific function for this path.");
      }
    }
  };

  // src/index.ts
  var SITE_NAME = "CustomCages";
  var VERSION = "v0.1.1";
  window[SITE_NAME] = window[SITE_NAME] || {};
  var Rise = window[SITE_NAME];
  window.fsAttributes = window.fsAttributes || [];
  window.fsAttributes.push([
    "cmsfilter",
    (filterInstances) => {
      console.log("cmsfilter Successfully loaded!");
      console.log(filterInstances);
      [window.filterInstance] = filterInstances;
    }
  ]);
  window.modelsDataSourceElems = document.querySelectorAll('[cc-datasource="models"]');
  window.modelsSelectElem = document.querySelector('[fs-cmsfilter-field="Model"]');
  window.modelsNavElem = document.querySelector(".select-model nav");
  function init() {
    console.log(`${SITE_NAME} package init ${VERSION}`);
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
