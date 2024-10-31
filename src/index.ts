import { AppApi } from './components/AppApi';
import { Api } from './components/base/api';
import { AppState } from './components/base/AppData';
import { BasketModal } from './components/base/Basket';
import { BasketData } from './components/base/BasketData';
import { Contacts } from './components/base/Contacts';
import { EventEmitter } from './components/base/events';
import { Modal } from './components/base/Modal';
import { Order } from './components/base/Order';


import { Product } from './components/base/Product';
import { ProductList } from './components/base/ProductList';
import { ProductListData } from './components/base/ProductListData';
import { Success } from './components/base/Success';
import './scss/styles.scss';
import { IApi, IOrder, IProduct } from './types';
import { API_URL, CDN_URL, settings } from './utils/constants';
import { cloneTemplate, ensureElement } from './utils/utils';


const events = new EventEmitter();

const basketData = new BasketData(events);
const productListData = new ProductListData(events);
const appData = new AppState({}, events)
const basketModalTemplate: HTMLTemplateElement =  ensureElement<HTMLTemplateElement>('#basket');


const productList = new ProductList(document.querySelector('.gallery'), events)
const basketList = new BasketModal(cloneTemplate(basketModalTemplate), events)

const baseApi: IApi = new Api(API_URL, settings);
const api = new AppApi(CDN_URL, baseApi);

const cardGalleryTemplate: HTMLTemplateElement = ensureElement<HTMLTemplateElement>('#card-catalog')
const cardPreviewTemplate: HTMLTemplateElement =  ensureElement<HTMLTemplateElement>('#card-preview')
const cardBasketTemplate: HTMLTemplateElement =  ensureElement<HTMLTemplateElement>('#card-basket')

const modalOrderTemplate: HTMLTemplateElement =  ensureElement<HTMLTemplateElement>('#order');
const modalContactsTemplate: HTMLTemplateElement =  ensureElement<HTMLTemplateElement>('#contacts');
const modalSuccessTemplate: HTMLTemplateElement =  ensureElement<HTMLTemplateElement>('#success');

const orderModal = new Order(cloneTemplate(modalOrderTemplate), events);
const contactsModal = new Contacts(cloneTemplate(modalContactsTemplate), events)


const cardsContainer = document.querySelector('.gallery')

const styleCategories =  {
    _other: 'другое',
    _soft: 'софт-скил',
    _additional: 'дополнительное',
    _button: 'кнопка',
    _hard: 'хард-скил'
}

const getKeyByValue = (object: any, value: string) => {
    return Object.keys(object).find(key =>
        object[key] === value);
}


const modal = new Modal(document.querySelector('#modal-container'), events);

events.onAll((event) => {
    console.log(event.eventName, event.data)
})


api.getCards()
.then((res) => {
    console.log(res)
    appData.items = res;
    events.emit('initialData:loaded')

    
} )
.catch((error) => {
console.log(error)
});



events.on('initialData:loaded', () => {
    const cardsArray = appData.items.map((item) => {
        const cardInstant = new Product(cloneTemplate(cardGalleryTemplate), events, {
            onClick: () => {
                events.emit('card:select', item)
            }
        });     
        // if (item.category = 'софт-скил') {
            
        // }
        cardInstant.elementCategory.classList.add(`card__category${getKeyByValue(styleCategories, item.category)}`);

        return cardInstant.render(item);   
    });
    productList.render({catalog: cardsArray})
})

// Открыть товар
events.on('card:select', (item: Product) => {
    appData.setPreview(item);
    productList.PageLocked(true);
});



events.on('preview:changed', (item: IProduct) => {
    const cardInstant = new Product(cloneTemplate(cardPreviewTemplate), events)
    
    if (item.price === null) {
        cardInstant.addBasketButton.disabled = true;
        cardInstant.addBasketButton.classList.add('button_disabled');
    }

    const card = cardInstant.render(item);
    
    cardInstant.elementCategory.classList.add(`card__category${getKeyByValue(styleCategories, item.category)}`);

    if (appData.basket.some((el) => {return el === cardInstant.id})) {
        cardInstant.addBasketButton.textContent = 'Убрать из корзины'
    }
    else {
        cardInstant.addBasketButton.textContent = 'В корзину'
    }
    modal.render({content: card})
})

events.on('product:add', (item: Product) => {
    const itemId = item.id;
    if (!appData.basket.some((el) => {return el === itemId}) ) {
    appData.addProduct(itemId);
item.addBasketButton.textContent = 'Убрать из корзины'
    }
    else {
        appData.deleteProduct(itemId);
        item.addBasketButton.textContent = 'В корзину'
    }
})

events.on('product:delete', (item: Product) => {
    const itemId = item.id;
    appData.deleteProduct(itemId);

    events.emit('basket:open')

})



events.on('basket:open', () => {
    const basketItems = appData.basket.map((item) => {

        const basketItem = appData.items.find((element) => {
            if (element.id === item){
        return element;
            }});
            const cardInstant = new Product(cloneTemplate(cardBasketTemplate), events); 
            cardInstant.itemIndex.textContent = (appData.basket.indexOf(item) + 1).toString()
        return cardInstant.render(basketItem); 
        })

        productList.PageLocked(true);
        basketList.checkButton(appData.basket.length === 0);

    modal.render({content: basketList.render({catalog: basketItems})})
});

events.on('basket:close', () => {
    productList.PageLocked(false);
    orderModal.close();
    contactsModal.close();
})


events.on('basketData:change', () => {
    productList.basketСounter.textContent = appData.basket.length.toString();
    const total = appData.basket.reduce((a, c) => a + appData.items.find(el => el.id === c).price, 0).toString();
    basketList.basketСounter.textContent = `${total} синапсов`
})

events.on('order:open', () => {
    appData.order.items = appData.basket;
    const total = appData.basket.reduce((a, c) => a + appData.items.find(el => el.id === c).price, 0);
    appData.order.total = total;
    console.log(appData.order)
    modal.render({content: orderModal.render()})
    orderModal.enableValidation()
})


events.on(`order:submit`, (order: IOrder) => {
    appData.order.payment = order.payment;
    appData.order.address = order.address;
    console.log(appData.order)
});

events.on('payment:selected', (element: Order) => {
console.log(element.buttonSelected)
})

events.on('contacts:open', () => {

    modal.render({content: contactsModal.render()})
    contactsModal.enableValidation()
})


events.on(`contacts:submit`, (order: IOrder) => {
    appData.order.email = order.email;
    appData.order.phone = order.phone;
    console.log(appData.order)
});


events.on('order:post', () => {
    console.log(appData.order)
    api.makeOrder(appData.order)
    .then((result) => {
        const success = new Success(cloneTemplate(modalSuccessTemplate), events, {
            onClick: () => {
                events.emit('modal:close');
                modal.close();
                appData.cleanBasket();
                events.emit('basketData:change')
           }
        });
            const total = appData.basket.reduce((a, c) => a + appData.items.find(el => el.id === c).price, 0).toString();
            success.orderSuccessDescription.textContent = `Списано ${total} синапсов`
        modal.render({content: success.render()})

        appData.cleanBasket();
        events.emit('basketData:change')
   })
    .catch(err => {
        console.error(err);
    });
});