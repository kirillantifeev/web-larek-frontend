import { ensureElement } from "../../utils/utils";
import { Component } from "./Component";
import { IEvents } from "./events";

interface IModalData {
    content: HTMLElement;
}


export class Modal<T> extends Component<IModalData> {
    protected modal: HTMLElement;
    protected events: IEvents;
    protected _content: HTMLElement;

    constructor (container: HTMLElement, events: IEvents) {
        super(container);
        this.events = events;
        const closeButtonElement = ensureElement<HTMLButtonElement>('.modal__close', container);

        closeButtonElement.addEventListener('click', this.close.bind(this));

        //this._content = this.container.querySelector('.modal__content');
        this._content = ensureElement('.modal__content', container);

        this._content.addEventListener('click', (event) => event.stopPropagation());

        this.container.addEventListener('mousedown', (evt) => {
        if(evt.target === evt.currentTarget) {
        this.close();
        }
        })
        this.handleEscUp = this.handleEscUp.bind(this);
    };

    open() {
        this.container.classList.add('modal__actions');
        document.addEventListener('keyup', this.handleEscUp);

    }

    close() {
        this.container.classList.remove('modal__actions');
        document.removeEventListener('keyup', this.handleEscUp);
        this.events.emit('basket:close')
    }

    handleEscUp(evt: KeyboardEvent) {
        if (evt.key === "Escape") {
            this.close();
        }
    }

    set content(value: HTMLElement) {
        this._content.replaceChildren(value);
    }

    render(data: IModalData): HTMLElement {
        super.render(data);
        this.open();
        return this.container;
    }
}