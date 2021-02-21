import { errorView } from '../views/errorView.js';
import BaseController from './BaseController.js';

export default class ErrorController extends BaseController {
    constructor(element){
        super(element);
        this.subcribe(this.events.ERROR, (error) => {
            this.showError(error);
        })
    }

    showError(errorMessage){
        this.element.innerHTML = errorView(errorMessage);
        this.element.classList.remove('hidden');

        this.element.addEventListener('click', (event) => {
            if(event.target == this.element || event.target.classList.contains('delete')) {
                this.element.classList.add('hidden');
            }
        })
    }


}