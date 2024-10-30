import { IAppState, IOrder, IProduct, IProductList } from "../../types";
import { IEvents } from "./events";
import { Model } from "./Model";
import { Product } from "./Product";
import { ProductListData } from "./ProductListData";

export class AppState extends Model<IAppState> implements IProductList{
    protected _basket: string[] = [];
    protected catalog: IProduct[];
    protected _preview: string | null;
    protected loading: boolean;
    _total: number;
    order: IOrder = {
        payment: '',
        email: '',
        phone: '',
        address: '',
        items: [],
        total:0
    };
    

    // GetTotal() {
    //     this.order.total = this._basket.reduce((a, c) => a + this.catalog.find(el => el.id === c).price, 0);
    //     return this.total
    // }

    set items(items: IProduct[]) {
        this.catalog = items;
        this.emitChanges('items:change', { catalog: this.catalog });
        }
        
    get items() {
            return this.catalog;
        }
        
    get preview() {
            return this._preview
        }
    
        setPreview(item: Product) {
            this._preview = item.id;
            this.emitChanges('preview:changed', item);
        }


        addProduct(product: string) {
            //if (this._items.some(function (prod) {return prod === product})) {
            this._basket = [product, ...this._basket]
            this.events.emit('basketData:change')
        }

        deleteProduct(productId: string) {
            this._basket = this._basket.filter(item => item !== productId);
            this.events.emit('basketData:change')
        }

        get basket() {
            return this._basket;
        }

        cleanBasket () {
            this._basket = [];
        }

        // cleanOrder () {
        //     this.order = {
        //         payment: '',
        //         email: '',
        //         phone: '',
        //         address: '',
        //         items: [],
        //         total:0
        //     };
        // }
}