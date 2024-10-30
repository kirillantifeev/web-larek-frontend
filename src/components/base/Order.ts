import { IEvents } from "./events";
import { Form } from "./Form";


export class Order extends Form {

buttonCard: HTMLButtonElement;
buttonCash: HTMLButtonElement;


    constructor(protected container: HTMLFormElement, events: IEvents) {
        super(container, events);
        this.submitButton = this.container.querySelector('.order__button');
        this.buttonCard = this.container.querySelector('.button_card')
        this.buttonCash = this.container.querySelector('.button_cash');

        this.submitButton.addEventListener('click', (evt) => {
            events.emit('contacts:open')
            evt.preventDefault();
			this.events.emit(`order:submit`, this.getInputValues());
        })
        //this.buttonSelected = this.container.querySelector('.button_alt-active');


        
this.buttonCard.addEventListener('click', () => {
    this.buttonCard.classList.add('button_alt-active');
    this.buttonSelected = 'online';
    events.emit('payment:selected', this);
    this.buttonCash.classList.remove('button_alt-active');
    this.toggleButtonState(this.submitButton);
});

this.buttonCash.addEventListener('click', () => {
    this.buttonCash.classList.add('button_alt-active');
    this.buttonSelected = 'cash';
    events.emit('payment:selected', this);
    this.buttonCard.classList.remove('button_alt-active');
    this.toggleButtonState(this.submitButton);
});

}

protected getInputValues() {
    const valuesObject: Record<string, string> = {};
    this.inputs.forEach((element) => {
        valuesObject[element.name] = element.value;
    });
    valuesObject['payment'] = this.buttonSelected;
    return valuesObject;
}

close() {
    super.close()
    this.buttonSelected = '';
    this.buttonCard.classList.remove('button_alt-active');
    this.buttonCash.classList.remove('button_alt-active');
}
}