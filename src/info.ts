
/*
 * Webflow Info Element
 * used to display basic info in an element, with a default state.  
 */ 

// TESTING:
// https://x-dropdown.design.webflow.com/?pageId=65ee695cf730614c28b248ae 

const CC_INFO: string = "cc-info"; 

export class WebflowInfoElementCollection {

  constructor() {
  }

  init() {
  }

}

export class WebflowInfoElement {

  // Dropdown element parts

  name: string;
  infoElem: HTMLElement; // [cc-info]
  default: string = ''; 
  valid: boolean = false;


  // // Determines if the dropdown is open
  // get isOpen(): boolean {
  //   return this.dropdownListElem.classList.contains('w--open');
  // } 


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

  constructor(name: string) {

    this.name = name;

  }

  init() {
    
    if(!this.name) {
      throw new Error("No name specified.");
    }

    const selector: string = `[${CC_INFO}="${this.name}"]`; // Construct a selector for the custom attribute
    const element: HTMLElement | null = document.querySelector(selector);
    
    if (element == null) {
      console.warn("Element with the specified cc-info value not found.");
      return;
    }

    this.infoElem = element; 
    this.default = element.textContent || '';
console.log("default is", this.default)
    // Element is ready for modification
    this.valid = true; 

  }

  clear(): void {

    this.infoElem.innerText = this.default; 

  }

  set(text: string) {

console.log("setting text", text); 

    this.infoElem.innerText = text;

  }    

}
