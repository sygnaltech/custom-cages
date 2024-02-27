

import { loadModels, createModel, selectModel, clearModels } from './filter';

const modelsDataSourceElems = document.querySelectorAll('[cc-datasource="models"]');
var modelsSelectElem = document.querySelector('[fs-cmsfilter-field="Model"]');
const modelsNavElem = document.querySelector('.select-model nav');



  // https://finsweet.com/attributes/api/cms-filter 
//  window.fsAttributes.cmsfilter.init();
  
  // Do something with the matching models, like logging them to the console
//  console.log(matchingModels);




// Extend the Window interface to include fsAttributes
declare global {
    interface Window {
      fsAttributes: [string, (filterInstances: any[]) => void][];
    }
  }
  
  // Check if fsAttributes exists, if not initialize it
  window.fsAttributes = window.fsAttributes || [];
  
  // Push your custom attribute and function into the fsAttributes array
  window.fsAttributes.push([
    'cmsfilter',
    (filterInstances: any[]) => { // Assuming 'any[]' for filterInstances type, adjust as known
      console.log('cmsfilter Successfully loaded!');
      console.log(filterInstances);
      
      // Assuming you want to store the first instance globally on the window object
      // First, extend the Window interface to include filterInstance
      [window.filterInstance] = filterInstances;
    },
  ]);
  
  // Additional declaration to inform TypeScript about the new property
  declare global {
    interface Window {
      filterInstance?: any; // Adjust the type according to what filterInstance actually is
    }
  }
  



  function init(): void {
  
    console.log("init.");
    
    // Select all radio buttons within the .dyn-brand elements
    const radioButtons = document.querySelectorAll('.brands-menu .dyn-brand .w-form-formradioinput.radio-button') as NodeListOf<HTMLInputElement>;
    
    // Iterate over each radio button to add the event listener
    radioButtons.forEach((radioButton: HTMLInputElement) => {
        radioButton.addEventListener('change', (event: Event) => {
            
            // Cast the event target back to an input element to access 'checked'
            const target = event.target as HTMLInputElement;
            
            // Check if the radio button is being selected
            if (target.checked) {
                // Navigate to the sibling span to get the brand name
                // Note: nextElementSibling could be null, so we check for it
                const brandName: string | null = target.nextElementSibling ? target.nextElementSibling.textContent : '';
                console.log("Brand selected:", brandName);
                // Perform your actions with the brandName here
              
              if(!brandName)
              console.error('Brand name is null'); 

                // Clear Models list
                clearModels(); // Assuming clearModels exists and has been properly typed
                loadModels(brandName as string); // Assuming loadModels exists and accepts a string parameter
              
            }
        });
    });
}


  init(); 
  
