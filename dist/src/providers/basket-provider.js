var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import { Injectable } from '@angular/core';
import 'rxjs/Rx';
import { Http } from '@angular/http';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { LocalStorageService } from 'angular-2-local-storage';
// Providers
import { BaseService } from './base-provider';
// Models
import { BasketModel } from '../models/basketModel';
var BasketService = (function (_super) {
    __extends(BasketService, _super);
    function BasketService(http, localStorage) {
        var _this = _super.call(this, http, localStorage) || this;
        _this.http = http;
        _this.localStorage = localStorage;
        return _this;
    }
    // getBasket function: obtain information of basket
    //                     of specific client in Botica store
    // getBasket function: obtain information of basket
    //                     of specific client in Botica store
    BasketService.prototype.getBasket = 
    // getBasket function: obtain information of basket
    //                     of specific client in Botica store
    function (baseUrl, applicationId, userId, storeId) {
        // Initial value to the observer is null
        var observer = new BehaviorSubject(null);
        this.getBase(baseUrl, 'application/' + applicationId + '/client/' + userId +
            '/store/' + storeId + '/basket/', this.headerAuthentication())
            .subscribe(function (basket) {
            var basketClient = new BasketModel(basket);
            observer.next(basketClient);
        }, function (error) {
            observer.next(error);
        });
        return observer;
    };
    BasketService.prototype.validVersion = function (baseUrl, applicationId) {
        // Initial value to the observer is null, version is null without Token,
        var observer = new BehaviorSubject(null);
        this.getBase(baseUrl, "v2/application/" + applicationId + "/application/" + applicationId +
            "/version/", null)
            .subscribe(function (data) {
            var version = data;
            observer.next(version);
        }, function (error) {
            observer.next(error);
        });
        return observer;
    };
    // postItems function: post items inside basket of specific
    //                     client in Botica store
    // postItems function: post items inside basket of specific
    //                     client in Botica store
    BasketService.prototype.postItemsDelete = 
    // postItems function: post items inside basket of specific
    //                     client in Botica store
    function (baseUrl, payload) {
        payload['task'] = 'delete_items';
        console.log("payload de lo que hare post", payload);
        // Initial value to the observer is null
        var observer = new BehaviorSubject(null);
        this.saveBase(baseUrl, 'client/store/basket/deleteitems/', payload, this.headerAuthentication())
            .subscribe(function (data) {
            observer.next(data);
        }, function (error) {
            observer.next(error);
        });
        return observer;
    };
    // postItem function: post item inside basket of specific
    //                    client in Botica store
    // postItem function: post item inside basket of specific
    //                    client in Botica store
    BasketService.prototype.postItem = 
    // postItem function: post item inside basket of specific
    //                    client in Botica store
    function (baseUrl, item, itemId, typeTask) {
        var _this = this;
        if (itemId === void 0) { itemId = null; }
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
            };
            this.saveBase(baseUrl, 'client/store/basket/items/', this.itemPost, this.headerAuthentication())
                .subscribe(function (data) {
                console.log("ITEMPOST AL AGREGAR", _this.itemPost);
                item.loadedProduct.next(data);
            }, function (error) {
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
            };
            this.saveBase(baseUrl, 'client/store/basket/items/', this.itemPost, this.headerAuthentication())
                .subscribe(function (data) {
                console.log("ITEMPOST AL EDITAR", _this.itemPost);
            }, function (error) {
                console.log("ESTE FUE EL ERROR", error);
            });
        }
        else if (typeTask == 'delete') {
            this.itemPost = {
                task: typeTask,
                id: itemId
            };
            this.saveBase(baseUrl, 'client/store/basket/items/', this.itemPost, this.headerAuthentication())
                .subscribe(function (data) {
                console.log("ITEMPOST AL ELIMINAR", _this.itemPost);
            }, function (error) {
                console.log("ESTE FUE EL ERROR", error);
            });
            item.loadedProduct = new BehaviorSubject(null);
        }
    };
    BasketService.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    BasketService.ctorParameters = function () { return [
        { type: Http, },
        { type: LocalStorageService, },
    ]; };
    return BasketService;
}(BaseService));
export { BasketService };
//# sourceMappingURL=basket-provider.js.map