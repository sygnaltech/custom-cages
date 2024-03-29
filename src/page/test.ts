
/*
 * Page | Filter 
 */
import { WebflowDropdown } from "../dropdown";

 

export class TestPage {

  modelDropdown: WebflowDropdown; 

  constructor() {
  }
  
  init() {

    window.debug.log("Test page init."); 

    const dropdownElement = document.querySelector('.select-model > .w-dropdown') as HTMLElement;
    if (dropdownElement) {
      // Element found, you can work with dropdownElement here
      this.modelDropdown = new WebflowDropdown(dropdownElement)
    //  window.debug.log('Dropdown element found:', dropdownElement);
    } else {
      console.error('Model dropdown element not found.');
    }

  // Wire up buttons
  // Select all buttons with the 'test' attribute
  const buttons = document.querySelectorAll('[test]');
  buttons.forEach(button => {
    button.addEventListener('click', () => {
      const action = button.getAttribute('test');
      switch (action) {
        case 'open':
          window.debug.log('open')
          this.modelDropdown.open();
          break;
        case 'close':
          window.debug.log('close')
          this.modelDropdown.close();
          break;
        case 'toggle':
          window.debug.log('toggle')
          this.modelDropdown.isOpen ? this.modelDropdown.close() : this.modelDropdown.open();
          break;
        default:
          console.error('Invalid action.');
      }
    });
  });


  }

}
