import BaseController from './BaseController.js';

export default class BackController extends BaseController {
    constructor(element){
        super(element);
        this.attachEventListener();
    }

    attachEventListener(){
        this.element.addEventListener('click', async (event) =>{
            window.location.href = '/'; 
        });
    }
}