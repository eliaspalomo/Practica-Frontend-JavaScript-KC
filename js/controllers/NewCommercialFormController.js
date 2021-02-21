import BaseController from './BaseController.js';
import dataService from '../services/DataService.js';

export default class RegisterFormController extends BaseController {
    constructor(element){
        super(element);
        this.checkIfUserIsLogged();
        this.attachEventListeners();
        this.focusInTextArea();
    }

    async checkIfUserIsLogged(){
        const userIsLogged = await dataService.isUserLogged();
        if(!userIsLogged) {
            window.location.href = '/login.html?next=/new-commercial.html';
        }else{
            this.publish(this.events.FINISH_LOADING);
        }
    }

    focusInTextArea(){
        const textArea = this.element.querySelector('textarea');
        textArea.focus();
    }
    
    attachEventListeners(){
        const textarea= this.element.querySelector('textarea');
        textarea.addEventListener('keyup', () =>{
            const button = this.element.querySelector('button');
            if(this.element.checkValidity()){
                button.removeAttribute('disabled');
            }else {
                button.setAttribute('disabled', true);
            }
        });

        this.element.addEventListener('submit', async (event) =>{
            event.preventDefault();
            const commercial = {
                message: this.element.elements.message.value,
                image: null
            }
            if(this.element.elements.file.files.length > 0){
                commercial.image = this.element.elements.file.files[0]
            }
            this.publish(this.events.START_LOADING);
            try{
                await dataService.saveCommercial(commercial);
                window.location.href = '/?mensaje=commercialOK'; 
            }catch(error){
                this.publish(this.events.ERROR, error);
            }finally{
                this.publish(this.events.FINISH_LOADING);
            }
        });
    }
}

