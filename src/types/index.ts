import { ApiPostMethods } from "../components/base/api";

export interface IProduct {
    id: string;
    title: string;
    category: string;
    price: number;
    description: string;
    image: string;

}

export interface IAppState {
    catalog: IProduct[];
    basket: string[];
    preview: string | null;
    order: IOrder | null;
    loading: boolean;
    total: number;
}


export interface IOrder {
    payment: string;
    email: string;
    phone: string;
    address: string;
    items: string[];
    total: number;
}

export interface IProductList {
    items: IProduct[];
    preview: string | null;
}

export interface IBasketData {
    items: IProduct[];
    addProduct(product: IProduct): void;
    deleteProduct(productId: string): void;
}


export type TProductBasket = Pick<IProduct, 'title' | 'price'>[];

export type TOrderPayment = Pick<IOrder, 'payment' | 'address'>;

export type TOrderUser = Pick<IOrder, 'email' | 'phone'>;

export type TProductList = Pick<IProduct, 'id' | 'price' | 'category' | 'image' | 'title'>;

export type TApiPostMethods = 'POST' | 'PUT' | 'DELETE' | 'PATCH';


export interface IApi {
    baseUrl: string;
    get<T>(uri :string) :Promise<T>;
    post<T>(uri: string, data: object, method?: TApiPostMethods): Promise<T>;
}