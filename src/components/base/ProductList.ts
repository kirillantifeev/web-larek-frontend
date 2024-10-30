import { Component } from "./Component";
import { IEvents } from "./events";

interface IProductList {
    catalog: HTMLElement[];
}

export class ProductList extends Component<IProductList>{
    protected _catalog: HTMLElement;
    protected basketButton: HTMLButtonElement;
    basketСounter: HTMLElement;
    protected events: IEvents;

    constructor(protected container: HTMLElement, events: IEvents) {
        super(container);
        this.events = events;
        this.basketButton = document.querySelector('.header__basket');
        this.basketСounter = document.querySelector('.header__basket-counter');

        this.basketButton.addEventListener('click', () => {
            this.events.emit('basket:open');
        })
    };

    set catalog(items: HTMLElement[]) {
        this.container.replaceChildren(...items);
    };

    PageLocked(value: boolean) {
        if (value) {
        this.container.classList.add('page__wrapper_locked')
        }
        else {
            this.container.classList.remove('page__wrapper_locked')
        }
    }
    
}