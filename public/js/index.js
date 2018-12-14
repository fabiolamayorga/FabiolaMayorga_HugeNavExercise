/**
 * Creates a mainNavigation
 * class represents a mainNavigation
 * @param {string} mainNavigationParent Parent of the mainNavigation reference.
 * @param {string} selectedIndex Index of the selected slide reference,
 * @param {array} mainNavigationData Populates the data from the fetch service, 
 */

import * as service from "./service";

export default class MainNavigation {

    constructor(parent, hamburguerButton) {
        this.mainNavigationParent = parent;
        this.hamburguerButton = hamburguerButton;
        this.mainNavigationData = []; 
    };

    /** 
    * Render the Navigation Items
    * @param {array} mainNavigationData
    */

    renderNavigation(mainNavigationData) {
        let html = "";
        let data = mainNavigationData.navItems;


        data.forEach(mainNavigationItem => {
            html += `<li class="mainNavigation-item ${ (mainNavigationItem.subItems.length > 0) ? 'has-subitems':'' }">
                        <a href="${mainNavigationItem.url}">${mainNavigationItem.label}</a>
                        ${ (mainNavigationItem.subItems.length > 0) 
                            ?
                            this.renderSubNavigation(mainNavigationItem) 
                            : ''
                        }
                    </li>`;
        });

        return `
                <ul class="mainNavigation show-desktop">
                    ${html} 
                </ul>`;
    }


    renderSubNavigation(item) {
        let subNavigation = "";
        let subItems = "";

        item.subItems.map((subitem) =>{
            subItems += `
                        <li class="subnavigation-subitem">
                            <a href="${subitem.url}">${subitem.label}</a>
                        </li>`;
        })

        return `<span class="chevron"></span><ul class="subnavigation">${subItems}</ul>`
    }

    /** 
    * Render the whole navigation
    * @param {array} mainNavigationData
    */
    render(mainNavigationData) {
        let html = "";
        let data = mainNavigationData || this.mainNavigationData;
        this.mainNavigationParent.innerHTML = `
            ${this.renderNavigation(data)} 
        `
    }

    /** 
    * Adds the event handlers to the needed buttons
    */

    addEventHandlers() {
        let subItems = document.querySelectorAll('.has-subitems');
        let mainNavigation = document.querySelector('.mainNavigation');
        
        let chevron = "";

        for (let i = 0; i < subItems.length; i++){
            chevron = subItems[i].querySelector('.chevron');
            chevron.addEventListener("click", e => this.openSubNav(e, subItems[i], subItems), false);
        }
        this.hamburguerButton.addEventListener("click",e => this.toggleMenu(e), false);
        
    };

    toggleMenu(e) {
        let navigation = document.querySelector('.mainNavigation');
        let logo = document.querySelector('.logo');

        if (navigation.classList.contains('show-desktop')) {
            navigation.classList.remove('show-desktop');
            logo.classList.remove('show-desktop');
            this.hamburguerButton.innerHTML = `<img src="images/toggle-close.svg" />`;
            
        }else {
            navigation.classList.add('show-desktop');
            logo.classList.add('show-desktop');
            this.hamburguerButton.innerHTML = `<img src="images/toggle-open.svg" />`
        }
    }

    openSubNav(e, subitem, siblings) {
        let parent = subitem;

        siblings.forEach(sibling => {
            if(sibling !== parent) {
                sibling.classList.remove('open');
            }
        })

        if (parent.classList.contains('open')) {
            parent.classList.remove('open');
        }else {
            parent.classList.add('open');

        }
    }


    /** 
    * Function that fetchs the necessary data for the mainNavigation
    *  @param {boolean} isPrev
    */

    fetchData() {
        service.findAll()
            .then(mainNavigationData => {
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

const mainNavigationParent = document.getElementById('main-navigation');
const hamburguerButton = document.querySelector(".hamburguer");
const mainNavigation = new MainNavigation(mainNavigationParent, hamburguerButton);
mainNavigation.init();

