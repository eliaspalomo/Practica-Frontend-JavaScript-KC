import BaseController from './BaseController.js';
import dataService from '../services/DataService.js';

export default class NewCommercialFormController extends BaseController {
    constructor(element){
        super(element);
        this.checkIfUserIsLogged();
        this.attachEventListeners();
        this.focusInArticulo();
    }

    async checkIfUserIsLogged(){
        const userIsLogged = await dataService.isUserLogged();
        if(!userIsLogged) {
            window.location.href = '/login.html?next=/new-commercial.html';
        }else{
            this.publish(this.events.FINISH_LOADING);
        }
    }

    focusInArticulo(){
        const articulo = this.element.querySelector('input#articulo');
        articulo.focus();
    }
    
    attachEventListeners(){
        const textarea = this.element.querySelector('textarea');
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
                articulo: this.element.elements.articulo.value,
                price: this.element.elements.price.value,
                venta: this.element.elements.venta.value,
                description: this.element.elements.description.value,
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

