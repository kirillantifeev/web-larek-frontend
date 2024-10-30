import { IEvents } from "./events";
import { Form } from "./Form";



export class Contacts extends Form {

    constructor(protected container: HTMLFormElement, events: IEvents) {
        super(container, events);
        this.submitButton = this.container.querySelector('.contacts_button');
        this.buttonSelected = 'selected';

        this.submitButton.addEventListener('click', (evt) => {
            evt.preventDefault();
            this.events.emit(`contacts:submit`, this.getInputValues());
            this.events.emit('order:post')
            
			
        })
    }


    protected getInputValues() {
        const valuesObject: Record<string, string> = {};
        this.inputs.forEach((element) => {
            valuesObject[element.name] = element.value;
        });
        return valuesObject;
    }
}