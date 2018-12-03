export default class Select{
    constructor() {
        this.select = document.querySelectorAll('.select');
        this.dropdown = document.querySelectorAll('.select__options');

        this.init();
    }

    init() {
        document.addEventListener('click', this.closeDropdown.bind(this))

        this.select.forEach((element) => {
            element.addEventListener('click', this.handleClick.bind(this));
            element.addEventListener('click', this.selectOption.bind(this));
        });
    }

    handleClick(event) {
        const { target } = event;
        const dropdown = this.findElement(event, 'select__options');
        
        if(!target.classList.contains('select__option')){
            const filterDropdown = [...this.dropdown].filter(element => element.classList.contains('visible'))
            filterDropdown.forEach(options => this.closeOptions(options))
        }

        dropdown.classList.contains('visible')
            ? this.closeOptions(dropdown)
            : this.openOptions(dropdown);
    }

    selectOption(event) {
        const dropdown = this.findElement(event, 'select__options');
        const input = this.findElement(event, 'select__input');
        const text = this.findElement(event, 'select__text');
        const label = this.findElement(event, 'select__label');
        const { target } = event;
        
        if(!dropdown.classList.contains('visible')
            && target.classList.contains('select__option')) {
            const option = target.dataset.option;
            
            label.classList.add('select__label--small');
            text.textContent = option;
            input.value = option;
        }
    }

    openOptions(childElement) {
        return childElement.classList.add('visible')
    }
    
    closeOptions(childElement) {
        return childElement.classList.remove('visible')
    }

    closeDropdown() {
        this.dropdown.forEach((options) => this.closeOptions(options))
    }

    findElement(event, selector) {
        event.stopPropagation();
        const parent = event.target === 'div.select' 
            ? event.target 
            : event.target.closest('div.select')
        const childs = parent.children;
        const arr = [...childs].filter(childElement => childElement.classList.contains(selector));

        return arr[0];
    }
}