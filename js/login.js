import LoaderController from './controllers/LoaderController.js';
import ErrorController from './controllers/ErrorController.js';
import LoginFormController from './controllers/LoginFormController.js';
import BackController from './controllers/BackController.js';

window.addEventListener('DOMContentLoaded', () => {
    const loader = document.querySelector('.lds-ring');
    new LoaderController(loader);

    const errorsElement = document.querySelector('.global-errors');
    new ErrorController(errorsElement);

    const formElement = document.querySelector('form');
    new LoginFormController(formElement);

    const backButton = document.querySelector('.back');
    new BackController(backButton);
})