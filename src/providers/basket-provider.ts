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

    itemPost: any;

    constructor(public http: Http, public localStorage: LocalStorageService) {               
        super(http, localStorage);
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

}