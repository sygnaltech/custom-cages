
/*
 * Webflow Dropdown Element
 * used to manipulate the element.  
 */ 

// TESTING:
// https://x-dropdown.design.webflow.com/?pageId=65ee695cf730614c28b248ae 

export class WebflowDropdown {

  // Dropdown element parts

  dropdownElem: HTMLElement; // .w-dropdown
  dropdownToggleElem: HTMLElement; // .w-dropdown-toggle
  dropdownListElem: HTMLElement; // .w-dropdown-list

  // Determines if the dropdown is open
  get isOpen(): boolean {
    return this.dropdownListElem.classList.contains('w--open');
  } 


// This is a typical dropdown element
// in Webflow 

/*
<div data-hover="false" data-delay="0" class="w-dropdown" style="">
   <div class="w-dropdown-toggle" id="w-dropdown-toggle-0" aria-controls="w-dropdown-list-0" aria-haspopup="menu" aria-expanded="false" role="button" tabindex="0">
      <div class="w-icon-dropdown-toggle" aria-hidden="true"></div>
      <div>Dropdown</div>
   </div>
   <nav class="w-dropdown-list" id="w-dropdown-list-0" aria-labelledby="w-dropdown-toggle-0"><a href="#" class="w-dropdown-link" tabindex="0">Link 1</a><a href="#" class="w-dropdown-link" tabindex="0">Link 2</a><a href="#" class="w-dropdown-link" tabindex="0">Link 3</a></nav>
</div>
*/ 

  

  constructor(elem: HTMLElement) { 

    // Get the dropdown primary element
    if (!elem.classList.contains('w-dropdown')) {
      throw new Error("The provided element is not a Webflow dropdown element.");
    }
    this.dropdownElem = elem;

    // Get the toggle
    const toggleElem = elem.querySelector('.w-dropdown-toggle');

    // Get the list
    const listElem = elem.querySelector('.w-dropdown-list');

    if (!toggleElem || !listElem) {
      throw new Error("The dropdown element does not have the required child elements.");
    }

    this.dropdownToggleElem = toggleElem as HTMLElement;
    this.dropdownListElem = listElem as HTMLElement;

  }

  init() {
                  
  }

  click(): void {

    // To click Webflow's dropdowns,
    // we must target the toggle element,
    // and send both a mousedown and mouseup event ( not a click event )

    // Create & dispatch the mousedown event
    const mouseDownEvent = new MouseEvent('mousedown', {
      bubbles: true, // Allows the event to bubble up the DOM tree
      cancelable: true, // Allows the event to be cancelable
    });
    this.dropdownToggleElem.dispatchEvent(mouseDownEvent);

    // Create & dispatch the mouseup event
    const mouseUpEvent = new MouseEvent('mouseup', {
      bubbles: true, // Allows the event to bubble up the DOM tree
      cancelable: true, // Allows the event to be cancelable
    });
    this.dropdownToggleElem.dispatchEvent(mouseUpEvent);

  }

  open(): void {

    console.log("state", this.isOpen) 


    if (!this.isOpen) {

// this.dropdownToggleElem.classList.add("w--open");
// this.dropdownListElem.classList.add("w--open");
// this.dropdownToggleElem.setAttribute("aria-expanded", "true");
// this.dropdownElem.style.zIndex = '901';

      this.click(); 
//      this.dropdownToggleElem.click();
    }
  }

  close(): void {
    console.log("close handler")
    console.log("state", this.isOpen) 
    // if (this.isOpen) {
    //   this.dropdownToggleElem.click();
    //   console.log("clicked close"); 
    // }

    if (this.isOpen) {
      // this.dropdownToggleElem.classList.remove("w--open");
      // this.dropdownListElem.classList.remove("w--open");
      // this.dropdownToggleElem.setAttribute("aria-expanded", "false");
      // this.dropdownElem.style.zIndex = '';
      this.click(); 
    }
    


  }
  
  toggle(): void {

    this.isOpen ? this.close() : this.open();

  }

  clear(keepFirstItem: boolean = false): void {

      // Select all direct child anchor elements of the parent element
      const listItems: NodeListOf<HTMLAnchorElement> = this.dropdownListElem.querySelectorAll('a');

      // Iterate over the NodeList, and optionally keep the first item based on keepFirstItem flag
      listItems.forEach((anchor, index) => {
        if (keepFirstItem && index === 0) {
          // Skip the first item
        } else {
          // Delete the anchor element
          anchor.remove();
        }
      });

  }

}
