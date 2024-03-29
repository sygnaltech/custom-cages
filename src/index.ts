/*
 * Custom Cages 
 * Main entry point
 * 
 */

import { Sa5Debug } from './debug';
import { FilterPage } from './page/filter';
import { TestPage } from './page/test';
import { RouteDispatcher } from './routeDispatcher';

// Global vars
const SITE_NAME = 'CustomCages';
const VERSION = 'v0.1.3';

// Global object
window[SITE_NAME] = window[SITE_NAME] || {}; 
var Rise = window[SITE_NAME];

// const modelsDataSourceElems = document.querySelectorAll('[cc-datasource="models"]');
// var modelsSelectElem = document.querySelector('[fs-cmsfilter-field="Model"]');
// const modelsNavElem = document.querySelector('.select-model nav');

// https://finsweet.com/attributes/api/cms-filter 
//  window.fsAttributes.cmsfilter.init();
  
// Do something with the matching models, like logging them to the console
//  window.debug.log(matchingModels);



// Add debug logging
// and debug mode
// ?debug=true
// or, webflow.io
// or, dev. 



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
    window.debug.log('cmsfilter Successfully loaded!');
    window.debug.log(filterInstances);
    
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

    debug: Sa5Debug;
  }
}
  



function init(): void {

  window.debug = new Sa5Debug(); 
  window.debug.enabled = true;

  window.debug.log(`${SITE_NAME} package init ${VERSION}`);

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
  
