import { Injectable } from '@angular/core';
import 'rxjs/Rx';
import { Http } from '@angular/http';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { LocalStorageService } from 'angular-2-local-storage';

// Providers
import { BaseService } from './base-provider';

// Models
import { BasketModel } from '../models/basketModel';

@Injectable()
export class BasketService extends BaseService {

    // Basket local
    basket: Object = {};
    itemId: number;

    // Basket user
    basketServerReady: boolean = false;
    itemPost: Object = {};

    constructor(public http: Http, public localStorage: LocalStorageService) {
                    
        super(http, localStorage);
        this.basket = {
            items: [],
            subtotal: 0,
            total: 0,
            count: 0,
            indexedItems: {}
        };
        this.itemPost = {};
    }

    // addItem function: add item inside basket in Botica store
    addItem(product, quantity=1) {

        let basketItem = this.basket['indexedItems'][product.id];

        if (!basketItem) {
            basketItem = product;
            basketItem.quantity = 0;
            this._add(basketItem);
        }

        basketItem.quantity += quantity;

        // basketServerReady indicate I'm going to edit items once I've already put all the 
        // items I got from the server into the internal basket
        if (this.basketServerReady) {

            // The products that doesn't exist initially in the basket and are new
            if (!basketItem.itemId) {

                console.log("AGREGO/AUMENTO ITEMS QUE NO EXISTEN EN EL BASKET")
                basketItem.loadedProduct.subscribe(data => {
                    if (data) {
                        this.itemId = data.id;
                        this.setItemQuantityUser(basketItem, this.itemId);
                    }
                })
            }

            // The products that have the itemId field are the ones that you add initially 
            // from the server basket and you edit this item
            else {
                console.log("AUMENTO ITEMS QUE YA EXISTEN EN EL BASKET")
                this.setItemQuantityUser(basketItem, basketItem.itemId);
            }

        }

        return this.calculateTotal();

    }

    // add function: add item in local basket or post to backend
    _add(item) {

        this.basket['items'].unshift(item);
        this.basket['indexedItems'][item.id] = item;

        if (this.basketServerReady) {
            this.addItemUser(item);
        }
    }

    // removeItem function: remove item inside basket in Botica store
    removeItem(product, removeAll=false) {

        let basketItem = this.basket['indexedItems'][product.id];
        
        if (basketItem) {
            basketItem.quantity--;

            if (this.basketServerReady) {

                if (basketItem.quantity >= 1 && removeAll == false) {

                    if (!basketItem.itemId) {

                        console.log("DISMINUYO ITEMS QUE NO EXISTIAN EN EL BASKET")
                        basketItem.loadedProduct.subscribe(data => {
                            if (data) {
                                this.itemId = data.id;
                                this.setItemQuantityUser(basketItem, this.itemId);
                            }
                        })
                    }

                    // The products that have the itemId field are the ones that you add initially 
                    // from the server basket and you edit this item
                    else {
                        console.log("DISMINUYO ITEMS QUE YA EXISTEN EN EL BASKET")
                        this.setItemQuantityUser(basketItem, basketItem.itemId);
                    }
                }
            }

            if (removeAll || basketItem.quantity < 1) {
                this._remove(basketItem);
            }
            this.calculateTotal();
        }
    }

    // remove function: remove item from basket local or in backend
    _remove(item) {
        var index = this.basket['items'].indexOf(item);
        this.basket['items'].splice(index, 1);
        delete this.basket['indexedItems'][item.id];

        if (this.basketServerReady) {

            if (!item.itemId) {
                item.loadedProduct.subscribe(data => {
                    if (data) {
                        this.itemId = data.id;
                        this.removeItemUser(item, this.itemId);
                    }
                })
            }
            else {
                this.removeItemUser(item, item.itemId);
            }
        }
           
    }

    // calculateTotal function: calculate total of price to pay when create order
    //                          calculate count of items inside basket
    calculateTotal() {

        let total = 0;
        let subtotal = 0;
        let count = 0;
        this.basket['items'].forEach(item => {
            subtotal += item.unit_default.price * item.quantity;
            if (item.has_coupon) {
                total += this.calculateCoupon(item) * item.quantity;
            }
            else {
                total += item.unit_default.price * item.quantity;
            }
            count += item.quantity;               
        })
        this.basket['subtotal'] = subtotal;
        this.basket['total'] = total;
        this.basket['count'] = count;

        if (!this.localStorage.get('userId')) {
            this.localStorage.set('basket', this.basket);
        }

    }

    // count function: is the number of total items in the basket
    //                 to show in header component on the basket icon
    count() {
        return this.basket['count']; 
    }

    // find function: find product in the basket to know if show quantity in
    //                home or products view
    find(productId) {
        let item = this.basket['indexedItems'][productId];
        if (item) {
            return item;
        }
        else {
            return 0;
        }
 
    }

    // resetBasket function: reset basket when order is done or when
    //                       change city
    resetBasket() {
        this.basket['items'] = [];
        this.basket['total'] = 0;
        this.basket['subtotal'] = 0;
        this.basket['count'] = 0;
        this.basket['indexedItems'] = {};
    }


    // getBasket function: obtain information of basket
    //                     of specific client in Botica store
    getBasket(applicationId, userId, storeId) {

        // Initial value to the observer is null
        let observer = new BehaviorSubject(null);

        this.getBase('application/' + applicationId + '/client/' + userId + 
                     '/store/' + storeId + '/basket/', 
                     this.headerAuthentication())
            .subscribe(basket => {
                var basketClient: BasketModel = new BasketModel(basket);
                observer.next(basketClient);
            }, error => {
                observer.next(error);
            }); 
        return observer;
    }

    // postItems function: post items inside basket of specific
    //                     client in Botica store
    postItemsDelete(payload) {
        
        payload['task'] = 'delete_items';
        console.log("payload de lo que hare post", payload);

        // Initial value to the observer is null
        let observer = new BehaviorSubject(null);
        this.saveBase('client/store/basket/deleteitems/', payload,
                      this.headerAuthentication())
            .subscribe(data => {
                observer.next(data);
            }, error => {
                observer.next(error);
            });
        return observer;
    }

    // postItem function: post item inside basket of specific
    //                    client in Botica store
    postItem(item, itemId=null, typeTask) {

        if (typeTask == 'add') {

            this.itemPost = {
                task: typeTask,
                observation: null,
                quantity: item.quantity,
                checked: false,
                cost: 0,
                color_prim: item.color_prim,
                color_sec: item.color_sec,
                image_default: item.images[0].image,
                unit_default: item.unit_default.unit_type,
                price_default: item.unit_default.price,
                weight_default: item.unit_default.weight,
                quantity_default: item.unit_default.quantity,
                description: item.description,
                name: item.name,
                has_prom: item.has_prom,
                has_prescription: item.has_prescription,
                percentage: item.percentage,
                orderId: null,
                basketId: this.localStorage.get('basketId'),
                listId: null,
                productId: item.id
            }
            
            this.saveBase('client/store/basket/items/', this.itemPost,
                          this.headerAuthentication())
                .subscribe(data => {
                    console.log("ITEMPOST AL AGREGAR", this.itemPost);
                    item.loadedProduct.next(data);
                }, error => {
                    item.loadedProduct.next(error);
                    console.log("ESTE FUE EL ERROR", error);
                });
            return item.loadedProduct;
      
        }

        else if (typeTask == 'edit') {

            this.itemPost = {
                task: typeTask,
                id: itemId,
                observation: null,
                quantity: item.quantity,
                checked: false,
                cost: 0,
                color_prim: item.color_prim,
                color_sec: item.color_sec,
                image_default: item.images[0].image,
                unit_default: item.unit_default.unit_type,
                price_default: item.unit_default.price,
                weight_default: item.unit_default.weight,
                quantity_default: item.unit_default.quantity,
                description: item.description,
                name: item.name,
                has_prom: item.has_prom,
                has_prescription: item.has_prescription,
                percentage: item.percentage,
                orderId: null,
                basketId: this.localStorage.get('basketId'),
                listId: null,
                productId: item.id
            }

            this.saveBase('client/store/basket/items/', this.itemPost,
                          this.headerAuthentication())                 
                .subscribe(data => {
                    console.log("ITEMPOST AL EDITAR", this.itemPost);
                }, error => {
                    console.log("ESTE FUE EL ERROR", error);
                });  
        }

        else if (typeTask == 'delete') {

            this.itemPost = {
                task: typeTask,
                id: itemId
            }

            this.saveBase('client/store/basket/items/', this.itemPost,
                          this.headerAuthentication())
                .subscribe(data => {
                    console.log("ITEMPOST AL ELIMINAR", this.itemPost);
                }, error => {
                    console.log("ESTE FUE EL ERROR", error);
                });
            item.loadedProduct = new BehaviorSubject(null);
        }
    }


    // createOrderItems function: create items to pass to the final order
    createOrderItems() {
        let items = [];

        for (var item of this.basket['items']) {
            items.push(item);
        }

        return {
            'subtotal': this.basket['subtotal'],
            'total': this.basket['total'],
            'items' : items
        }
    }

    // basketFromBackend void: Take the items in the server basket, and with 
    //                         the product on the item, and quantity in the item,
    //                         add item in the intern struct basket
    basketFromBackend(data) {

        // The basket is reset when get is done so that it is not 
        // added multiple times the same items in the local basket
        this.resetBasket();
        if (data.items.length > 0) {
            for (var item of data.items) {
                item.productId['itemId'] = item.id;
                this.addItem(item.productId, item.quantity);
            }
        }

    }

    // basketToBackend void: Take the items in the local basket and
    //                       put in the backend basket of the user 
    basketToBackend() {

        for (var item of this.basket['items']) {
            item.loadedProduct = new BehaviorSubject(null);
            this.postItem(item, null, 'add');
        }

    }

    // addItemUser void: post new item in the server in the client basket
    addItemUser(item) {
        this.postItem(item, null, 'add');
    }

    // removeItemUser void: post item in the server to remove in the client basket
    removeItemUser(item, itemId) {
        this.postItem(item, itemId, 'delete');
    }

    // setItemQuantityUser void: post item in the server with new quantity in the 
    //                               client basket
    setItemQuantityUser(item, itemId) {
        this.postItem(item, itemId, 'edit');
    }

    // containsProducts function: the basket already contains products 
    containsProducts() {
        return this.basket['items'].length != 0;
    }
    
    // calculateDiscount function: with the price of product and percentage promotion calculates the new price
    calculateDiscount(item) {

        // calculates previous price of product with the promotion percentage
        if (item.has_prom) {
            return ( (item.unit_default.price * 100) / (100 - item.percentage) );
        }    
    }

    // calculateDiscountOrderOrList function: with the price of product and percentage promotion calculates the new price
    calculateDiscountOrderOrList(item) {

        // calculates previous price of product with the promotion percentage
        if (item.has_prom) {
            return ( (item.price_default * 100) / (100 - item.percentage) );
        }    
    }

    // calculateCoupon function: with the price of product and percentage coupon calculates the new price
    calculateCoupon(item) {

        // calculates price with the coupon percentage
        if (item.has_coupon) {
            return ( item.unit_default.price - ( (item.unit_default.price * item.percentage_coupon) / 100 ) );
        }
    }

    // calculateCouponOrderOrList function: with the price of product and percentage coupon calculates the new price
    calculateCouponOrderOrList(item) {

        // calculates previous price of product with the coupon percentage
        if (item.has_coupon) {
            return ( item.price_default - ( (item.price_default * item.percentage_coupon) / 100 ) );
        }    
    }

    // localBasket void: fill the local basket with the variable of basket in
    //                   localstorage
    localBasket() {
        
        let localBasket = this.localStorage.get('basket');
        for (var item of localBasket['items']) {
            this.addItem(item, item.quantity);
        }
    }

}