
/*
 * Custom Form Select Dropdown Element
 * modeled after Finsweet's Custom Form Select Attribute 
 * 
 * Has;
 * - a label area to show the current item
 * - a select list for binding FS attributes
 * - a Webflow dropdown element for interaction
 * 
 * Provides;
 * - Loading
 * - Clearing
 * - Loading from a specific dataset
 * - Update heading on select
 * - Reset selection
 * - Add item, remove item
 * 
 * sa-selectcustom-element = dropdown
 */

import { WebflowDropdown } from "./dropdown";

 


export class CustomFormSelect extends WebflowDropdown {

  // Dropdown element parts

  // Determines if the dropdown is open
  // get isOpen(): boolean {
  //   return this.dropdownListElem.classList.contains('w--open');
  // } 

  // second DIV within toggle
  // DIV - main > DIV.w-dropdown-toggle > second DIV
  dropdownText: HTMLElement; // .w-dropdown-toggle

  // One and only <select> within dropdown element
  selectElem: HTMLSelectElement;



  

  constructor(elem: HTMLElement) { 

    super(elem); 

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

 

  clear(keepFirstItem: boolean = false): void {

    // Clear the <select> 

    // Clear the dropdown
    super.clear(keepFirstItem);

    // TODO: update FS filter? 

  }

}
