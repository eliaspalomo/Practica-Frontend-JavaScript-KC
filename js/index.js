import CommercialListController from './controllers/CommercialListController.js';
import LoaderController from './controllers/LoaderController.js';
import ErrorController from './controllers/ErrorController.js';
import NewCommercialOrLogginController from './controllers/NewCommercialOrLogginController.js';

window.addEventListener('DOMContentLoaded', async (event) => {

    const loader = document.querySelector('.lds-ring');
    new LoaderController(loader);

    const element = document.querySelector('.commercial-list');
    const controller = new CommercialListController(element);
    controller.loadCommercial();

    const errorsElement = document.querySelector('.global-errors');
    new ErrorController(errorsElement);

    const newCommercialButton = document.querySelector('.new-commercial');
    new NewCommercialOrLogginController(newCommercialButton);
});
