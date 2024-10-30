import { IApi, IOrder, IProduct } from "../types";

export type ApiListResponse<Type> = {
    items: Type[];
};


export class AppApi {
    _baseApi: IApi;
    readonly cdn: string;

    constructor(cdn: string, _baseApi: IApi) {
        this._baseApi = _baseApi;
        this.cdn = cdn;
    }

    // constructor(_baseApi: IApi) {
    //     this._baseApi = _baseApi;
    // }

    getCards(): Promise<IProduct[]> {
        return this._baseApi.get('/product').then((data: ApiListResponse<IProduct>) => 
            data.items.map((item) => ({
                ...item,
                image: this.cdn + item.image
            }))
        
        );

}

makeOrder(order:IOrder): Promise<IOrder> {
            return this._baseApi.post('/order', order).then(
                (data: IOrder) => data)
}
}