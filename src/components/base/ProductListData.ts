import { IProductList, IProduct } from "../../types";
import { IEvents } from "./events";



export class ProductListData implements IProductList {
protected _items: IProduct[];
protected _preview: string | null;
protected events: IEvents;


constructor(events: IEvents) {
this.events = events;
}

set items(items: IProduct[]) {
this._items = items;
this.events.emit('items:change')
}

get items() {
    return this._items;
}

get preview() {
    return this._preview
}
}