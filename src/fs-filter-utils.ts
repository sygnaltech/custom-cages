
/*
 * FS Filter Extensions
 * 
 */

import { WebflowDropdown } from "./dropdown";

 


export class FSFilterUtils {

  // Dropdown element parts

  // Determines if the dropdown is open
  // get isOpen(): boolean {
  //   return this.dropdownListElem.classList.contains('w--open');
  // } 

// Make it work on an instance 

  constructor(elem: HTMLElement) { 

    // // Get the dropdown primary element
    // if (!elem.classList.contains('w-dropdown')) {
    //   throw new Error("The provided element is not a Webflow dropdown element.");
    // }
    // this.dropdownElem = elem;

    // // Get the toggle
    // const toggleElem = elem.querySelector('.w-dropdown-toggle');

    // // Get the list
    // const listElem = elem.querySelector('.w-dropdown-list');

    // if (!toggleElem || !listElem) {
    //   throw new Error("The dropdown element does not have the required child elements.");
    // }

    // this.dropdownToggleElem = toggleElem as HTMLElement;
    // this.dropdownListElem = listElem as HTMLElement;

  }

  init() {
                  
  }

  /**
   * Core
   */

  refresh() {

  }

  /**
   * Filter field handlers
   */

  // Set

  // Clear

  /**
   * Tag handlers
   */

  /**
   * Utilities
   */

  // Closes a filter tag by click
  static removeFilterTagByName(tagName: string): void {
    // Find all elements that contain the tag text
    const tagElements = document.querySelectorAll<HTMLDivElement>('div[fs-cmsfilter-element="tag-text"]');
  
    tagElements.forEach(element => {
      // Check if the current element's text includes the tagName
      if (element.textContent && element.textContent.includes(tagName)) {
        // Find the close icon in the same tag-template parent
        const closeIcon = element.closest('div[fs-cmsfilter-element="tag-template"]')?.querySelector<HTMLImageElement>('img[fs-cmsfilter-element="tag-remove"]');
        if (closeIcon) {
          // Trigger a click event on the close icon
          closeIcon.click();
        }
      }
    });
  }

}
