import pubSub from '../services/Pubsub.js';
export default class BaseController {
    constructor(element){
        this.element = element;
        this.pubSub = pubSub;
        this.events = {
            START_LOADING: 'starLoading',
            FINISH_LOADING: 'finishLoading',
            ERROR: 'error'
        }
    }

    subcribe(eventName, eventHander) {
        this.pubSub.subscribe(eventName, eventHander);
    }

    publish(eventName, eventData) {
        this.pubSub.publish(eventName, eventData);
    }

}