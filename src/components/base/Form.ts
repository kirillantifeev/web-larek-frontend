import { Component } from "./Component";
import { IEvents } from "./events";

interface IModalForm {
	valid: boolean;
	inputValues: Record<string, string>;
	error: Record<string, string>;
}

export abstract class Form extends Component<IModalForm>{


    protected inputs: NodeListOf<HTMLInputElement>;
    protected submitButton: HTMLButtonElement;
    inputList: HTMLInputElement[];
    input: HTMLInputElement;
    buttonSelected: string = '';

    constructor(protected container: HTMLFormElement, protected events: IEvents) {
        super(container);
        this.events = events;
		this.inputs =
			this.container.querySelectorAll<HTMLInputElement>('.form__input');
            //this.submitButton = this.container.querySelector('.order__button');
            this.inputList = Array.from(this.container.querySelectorAll('.form__input'));
            this.input = this.container.querySelector('.form__input')
    }
    
    



    enableValidation () {
            this.setEventListeners (this.container);
        };

    setEventListeners (formElement: HTMLFormElement) {
            // Находим все поля внутри формы,// сделаем из них массив методом Array.from
            
            
            this.toggleButtonState(this.submitButton);
            // Обойдём все элементы полученной коллекции
            this.inputList.forEach((inputElement) => {
            inputElement.addEventListener('input', () => {
                  this.isValid(this.container, inputElement)
                  this.toggleButtonState(this.submitButton);
                });
                
              });
            };




    toggleButtonState (buttonElement: HTMLButtonElement) {
                // Если есть хотя бы один невалидный инпут
                
                if (this.buttonSelected ==='' || this.hasInvalidInput()) {
                    this.disableSubmitButton (buttonElement);
                }
                
                  else {
                // иначе сделай кнопку активной
                        buttonElement.disabled = false;
                    buttonElement.classList.remove('button_disabled');
                  }
                };

    isValid (formElement: HTMLFormElement, inputElement: HTMLInputElement) {
                    if (inputElement.validity.patternMismatch) {
                      // встроенный метод setCustomValidity принимает на вход строку
                      
                      // и заменяет ею стандартное сообщение об ошибке
                      inputElement.setCustomValidity(inputElement.dataset.errorMessage);
                        } else {
                      // если передать пустую строку, то будут доступны
                      
                      // стандартные браузерные сообщения
                          inputElement.setCustomValidity('');
                        }
                  
                    if (!inputElement.validity.valid) {
                  // Если поле не проходит валидацию, покажем ошибку
                      this.showInputError(formElement, inputElement, inputElement.validationMessage);
                    } else {
                  // Если проходит, скроем
                      this.hideInputError(formElement, inputElement);
                    }
                  };

    showInputError (formElement: HTMLFormElement, inputElement: HTMLInputElement, errorMessage: string) {
                    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
                    inputElement.classList.add('form__input__error_text');
                    errorElement.textContent = errorMessage;
                    errorElement.classList.add('form__input__error_text');
                  };
                  
                  // Функция, которая удаляет класс с ошибкой
    hideInputError (formElement: HTMLFormElement, inputElement: HTMLInputElement) {
                    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
                    inputElement.classList.remove('form__input__error_text');
                    errorElement.classList.remove('form__input__error_text');
                    errorElement.textContent = '';
                  };
              

    hasInvalidInput () {
                    // проходим по этому массиву методом some
                    return this.inputList.some((inputElement) => {
                    // Если поле не валидно, колбэк вернёт true
                    // Обход массива прекратится и вся функция
                    // hasInvalidInput вернёт true
                    return !inputElement.validity.valid;
                      })
                    };


    clearValidation () {
                        const formList = Array.from(this.container.querySelectorAll('.form__input'));
                        //const buttonElement = profileForm.querySelector(config.submitButtonSelector);
                        formList.forEach((inputElement) => {
                          this.disableSubmitButton (this.submitButton);
                          this.hideInputError(this.container, this.input);
                        });
                      };
                      
    disableSubmitButton (button: HTMLButtonElement) {
                        button.disabled = true;
                        button.classList.add('button_disabled');
                      }



                      close() {
                        // this.buttonSelected = '';
                        this.container.reset();
                        this.inputList.forEach((element) => {
                            this.hideInputError(this.container, element);
                        });
                
                    }
}