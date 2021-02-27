import CommercialDetailController from './controllers/CommercialDetailController.js';
import LoaderController from './controllers/LoaderController.js';
import ErrorController from './controllers/ErrorController.js';
import BackController from './controllers/BackController.js';

window.addEventListener('DOMContentLoaded', async (event) => {
    const queryParam = window.location.search.replace('?','');
    const queryParamcontrol = queryParam.split('=');
    if(queryParamcontrol.length===2 && queryParamcontrol[0]==='id'){
        const loader = document.querySelector('.lds-ring');
        new LoaderController(loader);

        const element = document.querySelector('.commercial-datail');
        const controller = new CommercialDetailController(element);
        controller.loadCommercial(queryParam);

        const errorsElement = document.querySelector('.global-errors');
        new ErrorController(errorsElement);

        const backButton = document.querySelector('.back');
        new BackController(backButton);
    }else{
        throw new Error('Parametros incorrectos');
    }
});
