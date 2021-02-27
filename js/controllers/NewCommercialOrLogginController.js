import BaseController from './BaseController.js'
import dataService from '../services/DataService.js'

export default class NewCommercialOrLogginController extends BaseController{
    constructor(element){
        super(element);
        this.checkIfUserIsLogged();
        this.attachEventListener();
    }

    async checkIfUserIsLogged(){
        const usesIsLogged = await dataService.isUserLogged();
        if(usesIsLogged) {
            const newCommercialButton = this.element.querySelector('.new-commercial-logoff-button');
            newCommercialButton.classList.remove('is-hidden');
        } else {
            const loginRegisterButton = this.element.querySelector('.login-register-buttons');
            loginRegisterButton.classList.remove('is-hidden');
        }
    }

    attachEventListener(){
        const buttonLogoff = this.element.querySelector('.logoff');
        buttonLogoff.addEventListener('click', event =>{
            dataService.deleteToken()
            window.location.href = '/'; 
        })
    }
}