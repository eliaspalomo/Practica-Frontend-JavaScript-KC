import BaseController from './BaseController.js';
import dataService from '../services/DataService.js';
import {commercialDetail} from '../views/commercialDetail.js';

export default class CommercialDetailController extends BaseController {

    render(commercial){
        this.element.innerHTML;
        if(commercial.length !== 0) {
            const article = document.createElement('article');
            article.innerHTML = commercialDetail(commercial);

            const deleteButton = article.querySelector('button');
            if(deleteButton){
                deleteButton.addEventListener('click', async ev => {
                    const deleteConfirmed = confirm("¿Seguro que quieres borrarlo?");
                    if (deleteConfirmed) {
                        await dataService.deleteCommercial(commercial);
                        article.remove();
                        window.location.href = '/';
                    }
                });
            }

            this.element.appendChild(article);
        }else{
            throw new Error('Datos no cargado');
        }
    }

    async loadCommercial(commercialID) {
        this.publish(this.events.START_LOADING,{});

        try {
            const commercialData = await dataService.getCommercial(commercialID);
            this.render(commercialData[0]);
        } catch (error) {
            console.log(error);
            this.publish(this.events.ERROR, error);
        } finally {
            this.publish(this.events.FINISH_LOADING, {});
        }
    }
}