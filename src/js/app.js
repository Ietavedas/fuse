import "babel-polyfill";

import svg4everybody from 'svg4everybody'
window.svg4everybody = svg4everybody;

//Load modules
import SvgUse from './classes/svgUse';
import './classes/polyfills';

import Select from './classes/Select';
import Input from './classes/Input';
import Datapicker from './classes/Datapicker';
import Validation from './classes/Validation';
import Modal from './classes/Modal';

// Run components

window.App = {
    debug: false,
    lang: 'ru'
};

// debug detect

if (window.location.href.indexOf('.ru') !== -1 || window.location.href.indexOf('/en') !== -1) {
    App.debug = false;
}

if (window.SITE_LANG) {
    App.lang = window.SITE_LANG;
}

if (App.debug) {
    console.log('Debug: ' + App.debug);
}


document.addEventListener('DOMContentLoaded', () => {
    
    App.SvgUse = new SvgUse();
    
    App.Select = new Select();
    App.Input = new Input();
    App.Datapicker = new Datapicker();
    App.Validation = new Validation();
    App.Modal = new Modal();
});