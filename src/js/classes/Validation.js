export default class Validation {
    constructor() {
        this.formElements = document.querySelectorAll('[validation]');
        this.submit = document.querySelector('.js-submit');

        this.submitClicked = false;
        this.model = [];

        this.init();
    }

    init() {
        this.submit.addEventListener('click', this.handleClick.bind(this));

        
        this.formElements.forEach((element) => {
            element.parentNode.classList.add('validation');
            element.addEventListener('input', this.handleInput.bind(this));
        })
    }

    handleClick(event) {
        this.submitClicked = true;
        this.model = [];

        this.formElements.forEach(element => {
            let val = element.value.trim();

            if (element.dataset.type === 'email') {
                val = this.validEmail(element.value);
            }

            this.model.push(!!val)
        });

        const filterInvalid = this.model.filter(el => el === false);

        

        this.model.forEach((el, index) => {
            if(this.formElements[index].dataset.type === 'email' && !el) {
                return (
                    this.addErrorMessage(this.formElements[index]),
                    this.renderError(index)
                )
            } else {
                
                return el === false && this.renderError(index)
            }
        })

        return filterInvalid.length !== 0 && event.preventDefault();
    }

    handleInput(event) {
        const input = this.findElement(event, 'input__input');
        const inputValue = input.value.trim();
        
        if (this.submitClicked === true && !!inputValue) {
            if(input.dataset.type === 'email' && !this.validEmail(inputValue)){
                return;
            } else {
                this.removeError(event)
                this.removeErrorMessage(event)
                this.renderSucsess(event)
            }
            
        } else {
            this.removeSucsess(event)
        }
    }

    renderError(index) {
        const error = this.formElements[index].querySelector('.icon-error');
        
        error === null && this.formElements[index].insertAdjacentHTML('beforebegin',
        `<svg class="icon icon-error">
            <use xlink:href="#icon-error"></use>
        </svg>`)
    }

    renderSucsess(event) {
        const success = event.target.parentNode.querySelector('.icon-success');
        const element = this.findElement(event, 'input__input');
        success === null && element.insertAdjacentHTML('beforebegin',
        `<svg class="icon icon-success">
            <use xlink:href="#icon-success"></use>
        </svg>`)
    }

    removeSucsess(event) {
        const success = event.target.parentNode.querySelector('.icon-success');

        success !== null && success.remove();
    }

    removeError(event) {
        const error = event.target.parentNode.querySelector('.icon-error');
        
        error !== null && error.remove();
    }

    findElement(event, selector) {
        const parent = event.target === 'div.validation'
            ? event.target 
            : event.target.closest('div.validation')
        const childs = parent.children;
        const arr = [...childs].filter(childElement => childElement.classList.contains(selector));

        return arr[0];
    }

    validEmail(el) {
        var filter = /^\s*[\w\-\+_]+(\.[\w\-\+_]+)*\@[\w\-\+_]+\.[\w\-\+_]+(\.[\w\-\+_]+)*\s*$/;
        return String(el).search (filter) != -1;
    }

    addErrorMessage(el) {
        const parent = el.parentNode;
        const errorMessage = parent.querySelector('.error-message');

        errorMessage === null && parent.insertAdjacentHTML('beforeend',
            `<div class='error-message form__error-message'>Invalid format</div>`)
        
    }

    removeErrorMessage(event) {
        const errorMessage = event.target.parentNode.querySelector('.error-message');
        
        errorMessage !== null && errorMessage.remove();
    }
}