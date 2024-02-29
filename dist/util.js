(() => {
  // src/util.ts
  function findAncestorWithAttribute(element, attributeName) {
    let currentElement = element;
    while (currentElement) {
      if (currentElement.hasAttribute(attributeName)) {
        return currentElement;
      }
      currentElement = currentElement.parentElement;
    }
    return null;
  }
  function getAncestorAttributeValue(element, attributeName) {
    let currentElement = element;
    while (currentElement) {
      if (currentElement.hasAttribute(attributeName)) {
        return currentElement.getAttribute(attributeName);
      }
      currentElement = currentElement.parentElement;
    }
    return null;
  }
  function hasAncestorWithAttribute(element, attributeName) {
    return findAncestorWithAttribute(element, attributeName) !== null;
  }
  function convertToPixels(value, contextElement = document.documentElement) {
    const match = value.match(/^(-?\d+\.?\d*)(rem|em|px|vh|vw|%)$/);
    if (!match)
      throw new Error("Invalid value format");
    const [, amountStr, unit] = match;
    const amount = parseFloat(amountStr);
    switch (unit) {
      case "px":
        return amount;
      case "rem":
        return amount * parseFloat(getComputedStyle(document.documentElement).fontSize);
      case "em":
        return amount * parseFloat(getComputedStyle(contextElement).fontSize);
      case "vh":
        return amount * window.innerHeight / 100;
      case "vw":
        return amount * window.innerWidth / 100;
      case "%":
        return amount * contextElement.clientWidth / 100;
      default:
        throw new Error("Unsupported unit");
    }
  }
})();
//# sourceMappingURL=util.js.map
