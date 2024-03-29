(() => {
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
})();
//# sourceMappingURL=fs-filter-utils.js.map
