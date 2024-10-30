import { IProduct } from "../../types";
import { cloneTemplate } from "../../utils/utils";
import { Component } from "./Component";
import { IEvents } from "./events";

export interface IProductActions {
    onClick: (event: MouseEvent) => void;
}

export class Product extends Component<IProduct>{
    //protected element: HTMLElement;
    protected events: IEvents;
    protected actions: IProductActions;
    protected productId: string;
    protected preview: IProduct;
    protected productImage: any;
    protected productDescription: HTMLElement;
    protected productTitle: HTMLElement;
    protected productCategory: HTMLElement;
    protected productPrice: HTMLElement;
    protected deleteButton: HTMLButtonElement;
    addBasketButton: HTMLButtonElement;
    itemIndex: HTMLElement;

    constructor(protected container: HTMLElement, events: IEvents, actions?: IProductActions) {
        super(container);
        this.events = events;
        //this.actions?: IProductActions
        // this.preview = preview;
        //this.element = cloneTemplate(template);

        this.productTitle = this.container.querySelector('.card__title');
        this.productCategory = this.container.querySelector('.card__category');
        this.productImage = this.container.querySelector('.card__image');
        this.productDescription = this.container.querySelector('.card__text');
        this.productPrice = this.container.querySelector('.card__price');

        this.deleteButton = this.container.querySelector('.basket__item-delete');
        this.addBasketButton = this.container.querySelector('.card__button-add');
        this.itemIndex = this.container.querySelector('.basket__item-index');

        // if (this.container) {
        // this.container.addEventListener('click', () => 
        //     this.events.emit('card:select', {card: this})
        // );
        // }

        if (actions?.onClick) {
            if (this.container) {
                this.container.addEventListener('click', actions.onClick);
            } else {
                container.addEventListener('click', actions.onClick);
            }
        }
    

        if (this.deleteButton) {
        this.deleteButton.addEventListener('click', () => 
            this.events.emit('product:delete', this)
        );
        }



        if (this.addBasketButton) {
        this.addBasketButton.addEventListener('click', () => {
            this.events.emit('product:add', this);
        }
        );
        }

        
    
    }

// setAddButton() {
//     if (this.addBasketButton) {
//         this.a
//         }
// }

    render(ProductData: Partial<IProduct>) {

        const {...otherProductData} = ProductData;
        return super.render(otherProductData)

    }

    set id (id: string) {
        this.productId = id;
    };

    set title (title: string) {
        if (this.productTitle) {
        this.productTitle.textContent = title;
        }
    };

    set description (description: string) {
        if (this.productDescription) {
        this.productDescription.textContent = description;
        }
    };

    set price (price: string) {
        if (this.productPrice) {
            if (price === null) {
            this.productPrice.textContent = `Бесценно`; 
            }
            else {
            this.productPrice.textContent = `${price} синапсов`;
            }
        }
    };

    set category (category: string) {
        if (this.productCategory) {
        this.productCategory.textContent = category;
        }
    };

    set image (image: string) {
        if (this.productImage) {
        this.productImage.src = image
        }
    };

    get id () {
        return this.productId
    }

    deleteProduct() {
        this.container.remove;
        this.container = null;
    }

    setPreview(item: IProduct) {
    this.preview = item;
    this.events.emit('preview:change', item)
    }
}