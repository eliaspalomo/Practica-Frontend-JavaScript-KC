import BaseController from './BaseController.js';

export default class LoaderController extends BaseController {
    constructor(element){
        super(element);
        this.subcribe(this.events.START_LOADING, () =>{
            this.showLoading();
        });
        this.subcribe(this.events.FINISH_LOADING, () => {
            this.hideLoading();
        })
    }

    showLoading(){
        this.element.classList.remove('hidden');
    } 
    hideLoading(){
        this.element.classList.add('hidden');
    } 
}