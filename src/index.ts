/*
 * Custom Cages 
 * Main entry point
 * 
 */

 import { FilterPage } from './page/filter';
import { TestPage } from './page/test';
import { RouteDispatcher } from './routeDispatcher';

// Global vars
const SITE_NAME = 'CustomCages';
const VERSION = 'v0.1.2';

// Global object
window[SITE_NAME] = window[SITE_NAME] || {}; 
var Rise = window[SITE_NAME];

// const modelsDataSourceElems = document.querySelectorAll('[cc-datasource="models"]');
// var modelsSelectElem = document.querySelector('[fs-cmsfilter-field="Model"]');
// const modelsNavElem = document.querySelector('.select-model nav');

// https://finsweet.com/attributes/api/cms-filter 
//  window.fsAttributes.cmsfilter.init();
  
// Do something with the matching models, like logging them to the console
//  console.log(matchingModels);




// Extend the Window interface to include fsAttributes
declare global {
    interface Window {
      fsAttributes: [string, (filterInstances: any[]) => void][];

      modelsDataSourceElems: NodeListOf<HTMLElement>;
      modelsSelectElem: HTMLElement | null;
      modelsNavElem: HTMLElement | null;
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
  

  window.modelsDataSourceElems = document.querySelectorAll('[cc-datasource="models"]');
  window.modelsSelectElem = document.querySelector('[fs-cmsfilter-field="Model"]');
  window.modelsNavElem = document.querySelector('.select-model nav');


  // Additional declaration to inform TypeScript about the new property
  declare global {
    interface Window {
      filterInstance?: any; // Adjust the type according to what filterInstance actually is

      modelsDataSourceElems: NodeListOf<HTMLElement>;
      modelsSelectElem: HTMLElement | null;
      modelsNavElem: HTMLElement | null;
    }
  }
  



  function init(): void {
  
    console.log(`${SITE_NAME} package init ${VERSION}`);

    // (new Modal()).init();  

    var routeDispatcher = new RouteDispatcher();
    routeDispatcher.routes = {
        '/categories/roll-cage-kits': () => {

            (new FilterPage()).init();

        },
        '/test': () => {

            (new TestPage()).init();

        }
    };
    routeDispatcher.dispatchRoute(); 

}

init(); 
  
