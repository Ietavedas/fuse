export default class Modal {
    constructor() {
        this.link = document.querySelector('[registration]');
        this.modal = document.querySelector('[registration-modal]');
        this.overlay = document.querySelector('.overlay');
        this.body = document.querySelector('body');
        this.closeButton = document.querySelector('.close');

        this.init()
    }

    init() {
        this.link.addEventListener('click', this.open.bind(this));
        this.closeButton.addEventListener('click', this.close.bind(this))
    }

    open() {
        this.modal.classList.add('modal--visible');
        this.overlay.classList.add('visible');
        this.body.classList.add('fixed');
    }

    close() {
        this.modal.classList.remove('modal--visible');
        this.overlay.classList.remove('visible');
        this.body.classList.remove('fixed');
    }
}