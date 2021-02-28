import BaseController from './BaseController.js';
import dataService from '../services/DataService.js';
import {commercialView, noCommercial} from '../views/commercialView.js';

export default class CommercialListController extends BaseController {

    render(commercials){
        this.element.innerHTML;
        if(commercials.length !== 0) {
            let column = 0;
            let div = document.createElement('div');
            div.classList.add('columns');
            for (const commercial of commercials) {
                const article = document.createElement('div');
                article.classList.add('column');
                article.classList.add('is-one-quarter');
                article.innerHTML = commercialView(commercial);
                div.appendChild(article);
                article.addEventListener('click', async ev => {
                    window.location.href = `/commercialDetail.html?id=${commercial.id}` ; 
                });
                column++;
                if (column === 4) {
                    this.element.appendChild(div);
                    div = document.createElement('div');
                    div.classList.add('columns');
                    column = 0;
                }
            }
            this.element.appendChild(div);
        }else{
            const article = document.createElement('article');
            article.innerHTML = noCommercial();
            this.element.appendChild(article);
        }
    }

    async loadCommercial() {
        this.publish(this.events.START_LOADING,{});

        try {
            const commercials = await dataService.getCommercials(); 
            this.render(commercials);
        } catch (error) {
            console.log(error);
            this.publish(this.events.ERROR, error);
        } finally {
            this.publish(this.events.FINISH_LOADING, {});
        }
    }
}