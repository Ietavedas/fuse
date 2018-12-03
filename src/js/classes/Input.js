export default class Input{
    constructor() {
        this.input = document.querySelectorAll('.input');

        this.init();
    }

    init() {
        this.input.forEach((element) => {
            element.addEventListener('input', this.handleInput.bind(this));
            element.addEventListener('click', this.handleClick.bind(this));
        })
        
    }

    handleClick(event) {
        const input = this.findElement(event, 'input__input');
        
        input.focus();
    }

    handleInput(event) {
        const input = this.findElement(event, 'input__input');
        const label = this.findElement(event, 'input__label');

        const inputValue = input.value.trim();

        !!inputValue 
            ? label.classList.add('input__label--small')
            : label.classList.remove('input__label--small');
    }

    findElement(event, selector) {
        const parent = event.target === 'div.input' 
            ? event.target 
            : event.target.closest('div.input')
        const childs = parent.children;
        console.log(parent)
        const arr = [...childs].filter(childElement => {
            
            return childElement.classList.contains(selector)
        });

        return arr[0];
    }
}