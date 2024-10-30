import { IProductList, IProduct, IBasketData, TProductBasket } from "../../types";
import { IEvents } from "./events";


export class BasketData implements IBasketData {
    protected _items: IProduct[] = [];
    protected events: IEvents;

    constructor(events: IEvents) {
    this.events = events;
    }

    addProduct(product: IProduct) {
        //if (this._items.some(function (prod) {return prod === product})) {
        this._items = [product, ...this._items]
        
    }

    set items(items: IProduct[]) {
        this._items = items;
        this.events.emit('basketData:change')
        }
        
    get items() {
            return this._items;
        }

        

    deleteProduct(productId: string) {
        this._items = this._items.filter(item => item.id !== productId);
        this.events.emit('basketData:change')
    }
}