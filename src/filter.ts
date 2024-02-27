

export function loadModels(make: string): void {
    // Assuming modelsDataSourceElems is an array of HTMLElements
    const modelsDataSourceElems: NodeListOf<HTMLElement> = document.querySelectorAll('[cc-datasource="models"]');
  
    const matchingModels: string[] = [];
  
    modelsDataSourceElems.forEach((element: HTMLElement) => {
      // Find all child elements with the class 'cms-select-model-type'
      const modelTypes: NodeListOf<HTMLElement> = element.querySelectorAll('.cms-select-model-type');
  
      modelTypes.forEach((modelType: HTMLElement) => {
        // Check if this modelType has a child with class 'data_model-make' that matches the make parameter
        const modelMake: HTMLElement | null = modelType.querySelector('.data_model-make');
        if (modelMake && modelMake.textContent && modelMake.textContent.trim().toLowerCase() === make.toLowerCase()) {
          // If a matching model make is found, collect the model's name
          const modelNameElem: HTMLElement | null = modelType.querySelector('.model-name');
          if (modelNameElem && modelNameElem.textContent) {
            let modelName: string = modelNameElem.textContent.trim(); 
            matchingModels.push(modelName);
            
            console.log(modelName);
            // Assuming createModel is a function that accepts a string and does something with it
            createModel(modelName);
          }
        }
      });
    });
  }
  
  export function createModel(name: string): void {
    console.log(`creating model - ${name}`);
  
    // Assuming modelsSelectElem and modelsNavElem are already defined somewhere as HTMLElements
    const modelsSelectElem: HTMLElement | null = document.querySelector('.models-select'); // Update selector as necessary
    const modelsNavElem: HTMLElement | null = document.querySelector('.models-nav'); // Update selector as necessary
  
    if (modelsSelectElem) {
      const option = document.createElement('option');
      option.value = name;
      option.textContent = name;
  
      // TypeScript knows modelsSelectElem is an HTMLElement, but we know it's more specific, a select element
      (modelsSelectElem as HTMLSelectElement).appendChild(option);
  
      console.log('Model option created');
    } else {
      console.log('Select element not found');
    }
  
    if (modelsNavElem) {
      const linkElement = document.createElement('a');
      linkElement.href = '#';
      linkElement.classList.add('sort_field', 'w-dropdown-link');
      linkElement.tabIndex = -1;
      linkElement.setAttribute('role', 'option');
      linkElement.setAttribute('aria-selected', 'false');
      linkElement.textContent = name;
  
      modelsNavElem.appendChild(linkElement);
  
      linkElement.addEventListener('click', event => {
        event.preventDefault();
        selectModel(name); // Ensure selectModel is also properly typed in TypeScript
      });
    } else {
      console.error('The specific nav element was not found.');
    }
  }
  

  export function selectModel(name: string): void {
    // Access the select element; assuming it's globally available
    // Ensure that modelsSelectElem is declared and correctly typed elsewhere in your TypeScript code
    const modelsSelectElem: HTMLSelectElement | undefined = (window as any).modelsSelectElem;
  
    console.log(`selecting model - ${name}`);
  
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
          console.log(`Model '${name}' selected.`);
          break; // Exit the loop once the matching option is found
        }
      }
  
      if (!found) {
        console.log(`Model '${name}' not found in the select options.`);
      }
    } else {
      console.error('modelsSelectElem is not defined on window.');
    }
  }
  

  export function clearModels(): void {
    // Accessing global elements; ensure they are declared and typed appropriately elsewhere in your TypeScript code
    const modelsSelectElem: HTMLSelectElement | undefined = (window as any).modelsSelectElem;
    const modelsNavElem: HTMLElement | undefined = (window as any).modelsNavElem;
  
    if (modelsSelectElem) {
      // Clear all existing options
      modelsSelectElem.innerHTML = '';
  
      console.log(modelsSelectElem.innerHTML);
  
      // Create the new default option
      const defaultOption = document.createElement('option');
      defaultOption.value = '';
      defaultOption.textContent = 'Select Model...';
  
      // Add the default option to the select element
      modelsSelectElem.appendChild(defaultOption);
  
      // Assuming removeFilterTagByName is correctly typed and declared elsewhere
      removeFilterTagByName("Model");
  
      console.log('Models cleared');
  
    } else {
      console.log('Select element not found');
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
      console.log('Nav element not found');
    }
  }
  
  
function removeFilterTagByName(tagName: string): void {
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