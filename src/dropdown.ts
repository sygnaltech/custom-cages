
/*
 * Page | Filter 
 */ 

// TESTING:
// https://x-dropdown.design.webflow.com/?pageId=65ee695cf730614c28b248ae 

export class WebflowDropdown {

  // Clickable item

// .w-dropdown

  dropdownElem: HTMLElement;
  dropdownToggleElem: HTMLElement;
  dropdownListElem: HTMLElement; 


  // Getter to determine if the dropdown is open
  get isOpen(): boolean {
    return this.dropdownListElem.classList.contains('w--open');
  } 


// .w-dropdown-toggle

// Style changes on open too
// goes on DIV and NAV 
// .w--open
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
    if (!elem.classList.contains('w-dropdown')) {
      throw new Error("The provided element is not a Webflow dropdown element.");
    }
    this.dropdownElem = elem;

    const toggleElem = elem.querySelector('.w-dropdown-toggle');
    const listElem = elem.querySelector('.w-dropdown-list');

    if (!toggleElem || !listElem) {
      throw new Error("The dropdown element does not have the required child elements.");
    }

    this.dropdownToggleElem = toggleElem as HTMLElement;
    this.dropdownListElem = listElem as HTMLElement;

    // Initialization complete, you can add more logic here if necessary
  }
  
  init() {


                  
  }

// Function to simulate a click event at the position of an element
simulateClickOnElement(elem: HTMLElement): void {
  // Get the element's position relative to the viewport
  const rect = elem.getBoundingClientRect();



  // Calculate the position for the click
  // Here we choose the center of the element as the click position
  const clientX = rect.left + rect.width / 2;
  const clientY = rect.top + rect.height / 2;

console.log("simclick", clientX, clientY); 

  // Create the click event
  const clickEvent = new MouseEvent('click', {
    bubbles: true,      // The event bubbles up through the DOM
    cancelable: true,   // The event can be canceled
    view: window,       // The event's view is the current window
    clientX: clientX,   // The calculated X position
    clientY: clientY    // The calculated Y position
  });

  // Dispatch the event from the document to simulate a click at the window level
  document.dispatchEvent(clickEvent);
}

simulatePointerOnElement(elem: HTMLElement): void {
  // Get the element's position relative to the viewport
  const rect = elem.getBoundingClientRect();



  // Calculate the position for the click
  // Here we choose the center of the element as the click position
  const clientX = rect.left + rect.width / 2;
  const clientY = rect.top + rect.height / 2;

console.log("simclick", clientX, clientY); 

  // Create the click event
  const clickEvent = new MouseEvent('click', {
    bubbles: true,      // The event bubbles up through the DOM
    cancelable: true,   // The event can be canceled
    view: window,       // The event's view is the current window
    clientX: clientX,   // The calculated X position
    clientY: clientY    // The calculated Y position
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
    pointerType: 'mouse',
    isPrimary: true,
    isTrusted: true,
    clientX: clientX,   // The calculated X position
    clientY: clientY,    // The calculated Y position
    screenX: clientX,
    screenY: clientY + 121 
  };

  if (this.dropdownToggleElem) { 

console.log("clicking pointer event"); 

const pointerclick = new PointerEvent('click', pointerEventInit);


    // const pointerdown = new PointerEvent('pointerdown', pointerEventInit);
    // const pointerup = new PointerEvent('pointerup', pointerEventInit);
    // const click = new MouseEvent('click', {
    //   bubbles: true,
    //   cancelable: true
    // });
    this.dropdownToggleElem.dispatchEvent(pointerclick);

    // this.dropdownToggleElem.dispatchEvent(pointerdown);
    // this.dropdownToggleElem.dispatchEvent(pointerup);
    // this.dropdownToggleElem.dispatchEvent(click); // Might still be necessary for full click action simulation
  }


  // Dispatch the event from the document to simulate a click at the window level
//  document.dispatchEvent(clickEvent);
// this.dropdownToggleElem.dispatchEvent(clickEvent);

}



  click(): void {

this.simulatePointerOnElement(this.dropdownToggleElem); 

//     setTimeout(() => {

//       // this.dropdownToggleElem.click();
//       // console.log("Clicked close after a 1-second delay");
// //debugger; 
// console.log(this.dropdownListElem)

//       const event = new MouseEvent('click', {
//         bubbles: true,
//         cancelable: true,
//         view: window,
//       });
//       this.dropdownToggleElem.dispatchEvent(event);
//       console.log("Dispatched custom click event for closing");
//     }, 3000); // Delay in milliseconds (1000 ms = 1 second)

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

}
