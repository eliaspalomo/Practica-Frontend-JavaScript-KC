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
        const article = this.element.querySelector('input#articulo');
        article.addEventListener('keyup', () =>{
            this.validateElement()
            if(article.validity.valid){
                article.classList.add('is-success');
                article.classList.remove('is-danger');
            }else{
                article.classList.add('is-danger');
                article.classList.remove('is-success');
            }
        });

        const price = this.element.querySelector('input#price');
        price.addEventListener('keyup', () =>{
            this.validateElement()
            if(price.validity.valid){
                price.classList.add('is-success');
                price.classList.remove('is-danger');
            }else{
                price.classList.add('is-danger');
                price.classList.remove('is-success');
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
    
    validateElement(){
        const button = this.element.querySelector('button');
        if(this.element.checkValidity()){
            button.removeAttribute('disabled');
        }else {
            button.setAttribute('disabled', true);
        }
    }
}

