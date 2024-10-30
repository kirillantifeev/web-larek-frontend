import { IOrder } from "../../types";
import { Component } from "./Component";
import { IEvents } from "./events";

interface ISuccess {
    total: HTMLElement;
}

interface ISuccessActions {
    onClick: () => void;
}

export class Success extends Component<ISuccess> implements ISuccess{
    orderSuccessDescription: HTMLElement;
    closeButton: HTMLButtonElement;

    constructor(protected container: HTMLElement, events: IEvents, actions: ISuccessActions) {
        super(container);

this.closeButton = this.container.querySelector('.order-success__close');
this.orderSuccessDescription = this.container.querySelector('.order-success__description')



        if (actions?.onClick) {
            this.closeButton.addEventListener('click', actions.onClick);
        }
    }


    get total () {
        return this.orderSuccessDescription
    }
}