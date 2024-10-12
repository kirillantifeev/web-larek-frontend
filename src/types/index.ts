export interface IProduct {
    _id: string;
    title: string;
    category: string;
    price: string;
    description: string;
    link: string;

}

export interface IOrder {
    payment: string;
    email: string;
    phone: number;
    address: string;
    total: number;
    items: string[];
}

export interface IProductList {
    items: IProduct[];
    preview: string | null;
}

export interface IBasketData {
    items: TProductBasket[];
    addProduct(product: TProductBasket): void;
    deleteProduct(productId: string): void;
    checkValidation(items: TProductBasket[]): boolean;
}

//export interface IOrder

export type TProductBasket = Pick<IProduct, 'title' | 'price'>[];

export type TOrderPayment = Pick<IOrder, 'payment' | 'address'>;

export type TOrderUser = Pick<IOrder, 'email' | 'phone'>;

export type TProductList = Pick<IProduct, '_id' | 'price' | 'category' | 'link' | 'title'>;