import { Component } from "./Component";
import { IEvents } from "./events";

interface IBasketModal {
    catalog: HTMLElement[];
}


export class BasketModal extends Component<IBasketModal>{
    protected _catalog: HTMLElement;
    protected basketButton: HTMLButtonElement;
    basketСounter: HTMLElement;
    protected events: IEvents;
    protected content: HTMLElement;

    constructor(protected container: HTMLElement, events: IEvents) {
        super(container);
        this.events = events;
        this.content = container.querySelector('.basket__list');
        this.basketButton = container.querySelector('.basket__button');
        this.basketСounter = container.querySelector('.basket__price');

        this.basketButton.addEventListener('click', () => {
            this.events.emit('order:open');
        })

        
    }

    checkButton (value: boolean) {
        // Если есть хотя бы один невалидный инпут
        
        if (value) {
            this.basketButton.disabled = true;
            this.basketButton.classList.add('button_disabled');
        }
        
          else {
        // иначе сделай кнопку активной
                this.basketButton.disabled = false;
            this.basketButton.classList.remove('button_disabled');
          }
        };


    set catalog(items: HTMLElement[]) {
        this.content.replaceChildren(...items);
    };

}