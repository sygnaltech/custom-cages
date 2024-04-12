
/*
 * Page | Filter 
 *
 */

import { WebflowDropdown } from "../dropdown";
import { FSFilterUtils } from "../fs-filter-utils";
import { WebflowInfoElement } from "../info";

 

export class FilterPage {

  modelDropdown: WebflowDropdown; 
  selectedBrandName: WebflowInfoElement;
  selectedModelName: WebflowInfoElement;

  constructor() {
  }
  
  /**
   * Initialize filter page
   */ 

  init() {

    window.debug.log("Filter page init."); 

    // Get info elements
    // TODO: Build as a central manager with an update overall function
    // However this should be isolated separately in Custom Form Selects 
    this.selectedBrandName = new WebflowInfoElement("brand-name");
    this.selectedBrandName.init();
    this.selectedModelName = new WebflowInfoElement("model-name");
    this.selectedModelName.init();

    this.initBrandRadioButtons(); 

    const dropdownElement = document.querySelector('.select-model > .w-dropdown') as HTMLElement;
    if (dropdownElement) {
      // Element found, you can work with dropdownElement here
      this.modelDropdown = new WebflowDropdown(dropdownElement)
    //  window.debug.log('Dropdown element found:', dropdownElement);
    } else {
      console.error('Model dropdown element not found.');
    }

    // Setup reset click handler
    // [fs-cmsfilter-element=reset]
    const resetElements: NodeListOf<Element> = document.querySelectorAll('[fs-cmsfilter-element="reset"]');
        
    resetElements.forEach((element: Element) => {
        element.addEventListener('click', (event: Event) => {
            this.resetFilter();
        });
    });
  }

  // Does additional filter reset work
  // for our customized bits 
  resetFilter() {

    // Clear brand and model name
    this.selectedBrandName.clear();
    this.clearModels();  
    
  }



  /**
   * Init brand radio buttons
   */

  initBrandRadioButtons() {

    // Select all radio buttons within the .dyn-brand elements
    const radioButtons = document.querySelectorAll('.brands-menu .dyn-brand .w-form-formradioinput.radio-button') as NodeListOf<HTMLInputElement>;
    
//    window.debug.log("radio buttons", radioButtons); 

    // Add the change event listener to each rbn
    radioButtons.forEach((radioButton: HTMLInputElement) => {
        radioButton.addEventListener('change', (event: Event) => { 

            // Cast the event target back to an input element to access 'checked'
            const target = event.target as HTMLInputElement;

            window.debug.log(`brand clicked`, target); 
            
            // Check if the radio button is being selected
            if (target.checked) {

                // Navigate to the sibling span to get the brand name
                const brandNameElement: Element | null = this.findSiblingWithAttribute(target);

                const brandName: string | null = brandNameElement ? brandNameElement.textContent : '';
//                this.findSiblingWithAttribute(target)
//                target.nextElementSibling ? target.nextElementSibling.textContent : '';
                window.debug.log("Brand selected:", brandName);
                // Perform your actions with the brandName here
              
                if(!brandName) {
                  console.error('Brand name is null'); 
                  return;
                }

                this.selectedBrandName.set(brandName);

                // Clear Models list
                this.clearModels(); // Assuming clearModels exists and has been properly typed
                this.loadModels(brandName as string); // Assuming loadModels exists and accepts a string parameter
              
            }
        });
    });
                  
  }
  
  

  
loadModels(make: string): void {

    // Normalize make to a slug-compatible identifier
    // Lowercase, spaces-to-hyphens
    make = make.toLowerCase().replace(/\s+/g, '-');
//    window.debug.log("MATCH TO", make);
  
    // Load data source "models"
    const modelsDataSourceElems: NodeListOf<HTMLElement> = 
      document.querySelectorAll('[cc-datasource="models"]');
  
    const matchingModels: string[] = [];
  
    // Clear the selected model name
    // since the list is being rebuilt
    this.selectedModelName.clear();

    modelsDataSourceElems.forEach((element: HTMLElement) => {

      // Find all child elements with the class 'cms-select-model-type'
      const modelTypes: NodeListOf<HTMLElement> = element.querySelectorAll('.cms-select-model-type');
  
      modelTypes.forEach((modelType: HTMLElement) => {
        // Check if this modelType has a child with class 'data_model-make' that matches the make parameter
        const modelMake: HTMLElement | null = modelType.querySelector('.data_model-make');

        if (!(modelMake && modelMake.textContent))
          return;

        const matchMakeID = modelMake.textContent.trim().toLowerCase().replace(/\s+/g, '-');
        window.debug.log("matching", matchMakeID, make.toLowerCase());

        if (matchMakeID === make.toLowerCase()) {

          window.debug.log("MATCHED")

          // If a matching model make is found, collect the model's name
          const modelNameElem: HTMLElement | null = modelType.querySelector('.model-name');
          if (modelNameElem && modelNameElem.textContent) {
            let modelName: string = modelNameElem.textContent.trim(); 
            matchingModels.push(modelName);
            
            window.debug.log(modelName);
            
            // Create the model in its lists
            this.createModel(modelName);
          }
        }
      });
    });
  
    // Re-initialize
    window.debug.log("re-initializing dropdowns"); 
    WebflowDropdown.initWebflowJS();

    // re-initiate webflow ix2 
    // https://discourse.webflow.com/t/how-to-change-webflow-animation-properties-with-js/193404/2
    // (window as any).Webflow && (window as any).Webflow.destroy();
    // (window as any).Webflow && (window as any).Webflow.ready();
//    (window as any).Webflow && (window as any).Webflow.require( 'ix2' ).init();
    // (window as any).Webflow.require('dropdown').ready(); 
    // document.dispatchEvent( new Event( 'readystatechange' ) );
  
  }
  
  // Create the model option in the Models select & dropdown 
  createModel(name: string): void {
    window.debug.log(`creating model - ${name}`);
  
    // Assuming modelsSelectElem and modelsNavElem are already defined somewhere as HTMLElements
    // const modelsSelectElem: HTMLElement | null = document.querySelector('.models-select'); // Update selector as necessary
    // const modelsNavElem: HTMLElement | null = document.querySelector('.models-nav'); // Update selector as necessary
    const modelsSelectElem: HTMLSelectElement | undefined = (window as any).modelsSelectElem;
    const modelsNavElem: HTMLElement | undefined = (window as any).modelsNavElem;
  
    // Create model in select elem
    if (modelsSelectElem) {
      const option = document.createElement('option');
      option.value = name;
      option.textContent = name;
  
      // TypeScript knows modelsSelectElem is an HTMLElement, but we know it's more specific, a select element
      (modelsSelectElem as HTMLSelectElement).appendChild(option);
  
      window.debug.log('Model option created');
    } else {
      window.debug.log('Select element not found');
    }
  
    // Create model in nav elem
    if (modelsNavElem) {
      const linkElement = document.createElement('a');
      linkElement.href = '#';
      linkElement.classList.add('sort_field', 'w-dropdown-link');
      linkElement.tabIndex = -1;
      linkElement.setAttribute('role', 'option');
      linkElement.setAttribute('aria-selected', 'false');
      linkElement.textContent = name;
  
      modelsNavElem.appendChild(linkElement);
  
window.debug.log("CREATING")

      linkElement.addEventListener('click', event => {
//        event.preventDefault();
        this.selectModel(name); // Ensure selectModel is also properly typed in TypeScript
      });
    } else {
      console.error('The specific nav element was not found.');
    }
  }
  
  // Handles select events on the model 
  selectModel(name: string): void {
    // Access the select element; assuming it's globally available
    // Ensure that modelsSelectElem is declared and correctly typed elsewhere in your TypeScript code
    const modelsSelectElem: HTMLSelectElement | undefined = (window as any).modelsSelectElem;

    // Close the model dropdown
    this.modelDropdown.close();


  // // Create the click event
  // const clickEvent = new MouseEvent('click', {
  //   bubbles: true,      // The event bubbles up through the DOM
  //   cancelable: true,   // The event can be canceled
  //   view: window,       // The event's view is the current window
  //   clientX: 10,   // The calculated X position
  //   clientY: 300    // The calculated Y position
  // });

  // // Dispatch the event from the document to simulate a click at the window level
  // document.dispatchEvent(clickEvent);



    window.debug.log ("selectModel select", modelsSelectElem); 
    window.debug.log(`selecting model - ${name}`);
  
    // Display model name
    this.selectedModelName.set(name);

    if (modelsSelectElem) {
      let found = false; // Flag to indicate if the option is found
      for (let i = 0; i < modelsSelectElem.options.length; i++) {
        if (modelsSelectElem.options[i].value === name) {
          modelsSelectElem.selectedIndex = i; // Change the selected index to the found option
  
          // Create and dispatch a 'change' event that bubbles
          let changeEvent = new Event('change', { bubbles: true, cancelable: true });
          modelsSelectElem.dispatchEvent(changeEvent);
  
          // Optionally dispatch an 'input' event if necessary
          changeEvent = new Event('input', { bubbles: true, cancelable: true });
          modelsSelectElem.dispatchEvent(changeEvent);
  
          found = true;
          window.debug.log(`Model '${name}' selected.`);
          break; // Exit the loop once the matching option is found
        }
      }
  
      if (!found) {
        window.debug.log(`Model '${name}' not found in the select options.`);
      }
    } else {
      console.error('modelsSelectElem is not defined on window.');
    }
  }
  
  // dropdownClear(): void {

  //   // Empty dropdown except first item
  //   this.modelDropdown.clear(true);

  // }

  clearModels(): void {

    // Accessing global elements; ensure they are declared and typed appropriately elsewhere in your TypeScript code
    const modelsSelectElem: HTMLSelectElement | undefined = (window as any).modelsSelectElem;
    const modelsNavElem: HTMLElement | undefined = (window as any).modelsNavElem;
  
    // Clear name
    this.selectedModelName.clear();


window.debug.log ("Models select elem", modelsSelectElem); 

    if (modelsSelectElem) {
      // Clear all existing options
      modelsSelectElem.innerHTML = '';

      window.debug.log(modelsSelectElem.innerHTML);
  
      // Create the new default option
      const defaultOption = document.createElement('option');
      defaultOption.value = '';
      defaultOption.textContent = 'Select Model...';
  
      // Add the default option to the select element
      modelsSelectElem.appendChild(defaultOption);
  
      // Assuming removeFilterTagByName is correctly typed and declared elsewhere
//      this.removeFilterTagByName("Model");
      FSFilterUtils.removeFilterTagByName("Model");
  
      window.debug.log('Models cleared');
  
    } else {
      window.debug.log('Select element not found');
    }
  
    if (modelsNavElem) {
      // Remove existing links
      const links = modelsNavElem.querySelectorAll('a');
      links.forEach(link => link.parentNode?.removeChild(link));
  
      // Create and append the new default link
      const linkElement = document.createElement('a');
      linkElement.href = '#';
      linkElement.classList.add('sort_field', 'w-dropdown-link', 'w--current');
      linkElement.tabIndex = -1;
      linkElement.role = 'option';
      linkElement.setAttribute('aria-selected', 'false');
      linkElement.textContent = 'Select Model...';
  
      modelsNavElem.appendChild(linkElement);
  
    } else {
      window.debug.log('Nav element not found');
    }
  }
  
  
  // removeFilterTagByName(tagName: string): void {
  //   // Find all elements that contain the tag text
  //   const tagElements = document.querySelectorAll<HTMLDivElement>('div[fs-cmsfilter-element="tag-text"]');
  
  //   tagElements.forEach(element => {
  //     // Check if the current element's text includes the tagName
  //     if (element.textContent && element.textContent.includes(tagName)) {
  //       // Find the close icon in the same tag-template parent
  //       const closeIcon = element.closest('div[fs-cmsfilter-element="tag-template"]')?.querySelector<HTMLImageElement>('img[fs-cmsfilter-element="tag-remove"]');
  //       if (closeIcon) {
  //         // Trigger a click event on the close icon
  //         closeIcon.click();
  //       }
  //     }
  //   });
  // }

  /**
   * Utility
   */

  // Locates the radio button label from the fs attribute 
  findSiblingWithAttribute(target: Element): Element | null {
    // Start with the next sibling of the target element
    let sibling = target.nextElementSibling;

    // Loop through the siblings until a match is found or no more siblings are left
    while (sibling) {
        // Check if this sibling has the specific attribute
        if (sibling.getAttribute('fs-cmsfilter-tagcategory') !== null) {
            return sibling; // Return the matching sibling element
        }
        // Move to the next sibling
        sibling = sibling.nextElementSibling;
    }

    // If no matching sibling is found, return null
    return null;
``}  

}
