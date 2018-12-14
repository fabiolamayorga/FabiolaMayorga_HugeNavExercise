/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return findAll; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__request__ = __webpack_require__(2);


let findAll = () => {
    return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__request__["a" /* default */])({url:"data.json"})
        .then(data => data = JSON.parse(data)) 
} 



/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__service__ = __webpack_require__(0);
/**
 * Creates a mainNavigation
 * class represents a mainNavigation
 * @param {string} mainNavigationParent Parent of the mainNavigation reference.
 * @param {string} selectedIndex Index of the selected slide reference,
 * @param {array} mainNavigationData Populates the data from the fetch service, 
 */



class MainNavigation {

    constructor(gp) {
        this.mainNavigationParent = gp;
        this.selectedIndex = 1;
        this.mainNavigationData = []; 
    };

    /** 
    * Render the thumbnails
    * @param {array} mainNavigationData
    */

    renderThumbs(mainNavigationData) {
        let html = "";
        let data = mainNavigationData;

        data.forEach(mainNavigationItem => {
            html += `<li data-id=${mainNavigationItem.id} class="mainNavigation-item ${mainNavigationItem.id == 1 ? 'selected' : ''}">
                        <img src='${mainNavigationItem.picture}' alt="${mainNavigationItem.description}"/>
                    </li>`;
        });

        return `<ul class="mainNavigation-items"> ${html} </ul>`;
    }

    /** 
    * Render the big image above the thumbnails
    * @param {number} image to render
    */

    renderFullImage(currentImage) {
        return `<div class="full-image">
                    <img class="current-image" src="${currentImage}" />
                        <button class="control disable prev" data-type="prev"></button>
                        <button class="control next" data-type="next"></button>
                </div>`;
    }

    /** 
    * Render the thumbnails and the full image all together
    * @param {array} mainNavigationData
    */
    render(mainNavigationData) {
        let html = "";
        let data = mainNavigationData || this.mainNavigationData;
        let currentImage = data.find(item => item.id == this.selectedIndex );

        this.mainNavigationParent.innerHTML = `
            ${this.renderFullImage(currentImage.picture)}
            ${this.renderThumbs(data)} 
        `
    }



    /** 
    * Adds the event handlers to the needed buttons
    */

    addEventHandlers() {


    }






 
    /** 
    * Function that fetchs the necessary data for the mainNavigation
    *  @param {boolean} isPrev
    */

    fetchData() {
        __WEBPACK_IMPORTED_MODULE_0__service__["a" /* findAll */]()
            .then(mainNavigationData => {
                console.log(mainNavigationData)
                this.mainNavigationData = mainNavigationData;
                this.render(mainNavigationData);
                this.addEventHandlers();
            })
            .catch(error => console.log(error)
        );
    }

    init() {
        this.fetchData();
    }
}
/* harmony export (immutable) */ __webpack_exports__["default"] = MainNavigation;
 

const mainNavigationParent = document.getElementById('mainNavigation');
const mainNavigation = new MainNavigation(mainNavigationParent);
mainNavigation.init();



/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = (obj => {
    return new Promise((resolve, reject) => {
        let xhr = new XMLHttpRequest();
        xhr.open(obj.method || "GET", obj.url);
        if (obj.headers) {
            Object.keys(obj.headers).forEach(key => {
                xhr.setRequestHeader(key, obj.headers[key]);
            });
        }
        xhr.onload = () => {
            if (xhr.status >= 200 && xhr.status < 300) {
                resolve(xhr.response);
            } else {
                reject(xhr.statusText);
            }
        };
        xhr.onerror = () => reject(xhr.statusText);
        xhr.send(obj.body);
    }); 
});

/***/ })
/******/ ]);