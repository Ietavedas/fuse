import flatpickr from "flatpickr";

export default class Datapicker {
    constructor() {
        this.datapicker = document.querySelector('.datapicker');
        this.config = {
            altInput: true,
            altFormat: "F j, Y",
            dateFormat: "Y-m-d",
        };

        this.init();
    }

    init() {
        const fp = flatpickr(this.datapicker, this.config);
    }
}