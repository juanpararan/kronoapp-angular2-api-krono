var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
import { Injectable } from '@angular/core';
import 'rxjs/Rx';
import { Http } from '@angular/http';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { LocalStorageService } from 'angular-2-local-storage';
import { BaseService } from './base-provider';
import { BasketModel } from '../models/basketModel';
export var BasketService = (function (_super) {
    __extends(BasketService, _super);
    function BasketService(http, localStorage) {
        _super.call(this, http, localStorage);
        this.http = http;
        this.localStorage = localStorage;
        // Basket user
        this.basketServerReady = false;
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
    BasketService.prototype.addItem = function (product, quantity) {
        var _this = this;
        if (quantity === void 0) { quantity = 1; }
        var basketItem = this.basket.indexedItems[product.id];
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
                console.log("AGREGO/AUMENTO ITEMS QUE NO EXISTEN EN EL BASKET");
                basketItem.loadedProduct.subscribe(function (data) {
                    if (data) {
                        _this.itemId = data.id;
                        _this.setItemQuantityUser(basketItem, _this.itemId);
                    }
                });
            }
            else {
                console.log("AUMENTO ITEMS QUE YA EXISTEN EN EL BASKET");
                this.setItemQuantityUser(basketItem, basketItem.itemId);
            }
        }
        return this.calculateTotal();
    };
    // add function: add item in local basket or post to backend
    BasketService.prototype._add = function (item) {
        this.basket.items.unshift(item);
        this.basket.indexedItems[item.id] = item;
        if (this.basketServerReady) {
            this.addItemUser(item);
        }
    };
    // removeItem function: remove item inside basket in Botica store
    BasketService.prototype.removeItem = function (product, removeAll) {
        var _this = this;
        if (removeAll === void 0) { removeAll = false; }
        var basketItem = this.basket.indexedItems[product.id];
        if (basketItem) {
            basketItem.quantity--;
            if (this.basketServerReady) {
                if (basketItem.quantity >= 1 && removeAll == false) {
                    if (!basketItem.itemId) {
                        console.log("DISMINUYO ITEMS QUE NO EXISTIAN EN EL BASKET");
                        basketItem.loadedProduct.subscribe(function (data) {
                            if (data) {
                                _this.itemId = data.id;
                                _this.setItemQuantityUser(basketItem, _this.itemId);
                            }
                        });
                    }
                    else {
                        console.log("DISMINUYO ITEMS QUE YA EXISTEN EN EL BASKET");
                        this.setItemQuantityUser(basketItem, basketItem.itemId);
                    }
                }
            }
            if (removeAll || basketItem.quantity < 1) {
                this._remove(basketItem);
            }
            this.calculateTotal();
        }
    };
    // remove function: remove item from basket local or in backend
    BasketService.prototype._remove = function (item) {
        var _this = this;
        var index = this.basket.items.indexOf(item);
        this.basket.items.splice(index, 1);
        delete this.basket.indexedItems[item.id];
        if (this.basketServerReady) {
            if (!item.itemId) {
                item.loadedProduct.subscribe(function (data) {
                    if (data) {
                        _this.itemId = data.id;
                        _this.removeItemUser(item, _this.itemId);
                    }
                });
            }
            else {
                this.removeItemUser(item, item.itemId);
            }
        }
    };
    // calculateTotal function: calculate total of price to pay when create order
    //                          calculate count of items inside basket
    BasketService.prototype.calculateTotal = function () {
        var _this = this;
        var total = 0;
        var subtotal = 0;
        var count = 0;
        this.basket.items.forEach(function (item) {
            subtotal += item.unit_default.price * item.quantity;
            if (item.has_coupon) {
                total += _this.calculateCoupon(item) * item.quantity;
            }
            else {
                total += item.unit_default.price * item.quantity;
            }
            count += item.quantity;
        });
        this.basket.subtotal = subtotal;
        this.basket.total = total;
        this.basket.count = count;
        if (!this.localStorage.get('userId')) {
            this.localStorage.set('basket', this.basket);
        }
    };
    // count function: is the number of total items in the basket
    //                 to show in header component on the basket icon
    BasketService.prototype.count = function () {
        return this.basket.count;
    };
    // find function: find product in the basket to know if show quantity in
    //                home or products view
    BasketService.prototype.find = function (productId) {
        var item = this.basket.indexedItems[productId];
        if (item) {
            return item;
        }
        else {
            return 0;
        }
    };
    // resetBasket function: reset basket when order is done or when
    //                       change city
    BasketService.prototype.resetBasket = function () {
        this.basket.items = [];
        this.basket.total = 0;
        this.basket.subtotal = 0;
        this.basket.count = 0;
        this.basket.indexedItems = {};
    };
    // getBasket function: obtain information of basket
    //                     of specific client in Botica store
    BasketService.prototype.getBasket = function (applicationId, userId, storeId) {
        // Initial value to the observer is null
        var observer = new BehaviorSubject(null);
        this.getBase('application/' + applicationId + '/client/' + userId +
            '/store/' + storeId + '/basket/', this.headerAuthentication())
            .subscribe(function (basket) {
            var basketClient = new BasketModel(basket);
            observer.next(basketClient);
        }, function (error) {
            observer.next(error);
        });
        return observer;
    };
    // postItems function: post items inside basket of specific
    //                     client in Botica store
    BasketService.prototype.postItemsDelete = function (payload) {
        payload['task'] = 'delete_items';
        console.log("payload de lo que hare post", payload);
        // Initial value to the observer is null
        var observer = new BehaviorSubject(null);
        this.saveBase('client/store/basket/deleteitems/', payload, this.headerAuthentication())
            .subscribe(function (data) {
            observer.next(data);
        }, function (error) {
            observer.next(error);
        });
        return observer;
    };
    // postItem function: post item inside basket of specific
    //                    client in Botica store
    BasketService.prototype.postItem = function (item, itemId, typeTask) {
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
            this.saveBase('client/store/basket/items/', this.itemPost, this.headerAuthentication())
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
            this.saveBase('client/store/basket/items/', this.itemPost, this.headerAuthentication())
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
            this.saveBase('client/store/basket/items/', this.itemPost, this.headerAuthentication())
                .subscribe(function (data) {
                console.log("ITEMPOST AL ELIMINAR", _this.itemPost);
            }, function (error) {
                console.log("ESTE FUE EL ERROR", error);
            });
            item.loadedProduct = new BehaviorSubject(null);
        }
    };
    // createOrderItems function: create items to pass to the final order
    BasketService.prototype.createOrderItems = function () {
        var items = [];
        for (var _i = 0, _a = this.basket.items; _i < _a.length; _i++) {
            var item = _a[_i];
            items.push(item);
        }
        return {
            'subtotal': this.basket.subtotal,
            'total': this.basket.total,
            'items': items
        };
    };
    // basketFromBackend void: Take the items in the server basket, and with 
    //                         the product on the item, and quantity in the item,
    //                         add item in the intern struct basket
    BasketService.prototype.basketFromBackend = function (data) {
        // The basket is reset when get is done so that it is not 
        // added multiple times the same items in the local basket
        this.resetBasket();
        if (data.items.length > 0) {
            for (var _i = 0, _a = data.items; _i < _a.length; _i++) {
                var item = _a[_i];
                item.productId['itemId'] = item.id;
                this.addItem(item.productId, item.quantity);
            }
        }
    };
    // basketToBackend void: Take the items in the local basket and
    //                       put in the backend basket of the user 
    BasketService.prototype.basketToBackend = function () {
        for (var _i = 0, _a = this.basket.items; _i < _a.length; _i++) {
            var item = _a[_i];
            item.loadedProduct = new BehaviorSubject(null);
            this.postItem(item, null, 'add');
        }
    };
    // addItemUser void: post new item in the server in the client basket
    BasketService.prototype.addItemUser = function (item) {
        this.postItem(item, null, 'add');
    };
    // removeItemUser void: post item in the server to remove in the client basket
    BasketService.prototype.removeItemUser = function (item, itemId) {
        this.postItem(item, itemId, 'delete');
    };
    // setItemQuantityUser void: post item in the server with new quantity in the 
    //                               client basket
    BasketService.prototype.setItemQuantityUser = function (item, itemId) {
        this.postItem(item, itemId, 'edit');
    };
    // containsProducts function: the basket already contains products 
    BasketService.prototype.containsProducts = function () {
        return this.basket.items.length != 0;
    };
    // calculateDiscount function: with the price of product and percentage promotion calculates the new price
    BasketService.prototype.calculateDiscount = function (item) {
        // calculates previous price of product with the promotion percentage
        if (item.has_prom) {
            return ((item.unit_default.price * 100) / (100 - item.percentage));
        }
    };
    // calculateDiscountOrderOrList function: with the price of product and percentage promotion calculates the new price
    BasketService.prototype.calculateDiscountOrderOrList = function (item) {
        // calculates previous price of product with the promotion percentage
        if (item.has_prom) {
            return ((item.price_default * 100) / (100 - item.percentage));
        }
    };
    // calculateCoupon function: with the price of product and percentage coupon calculates the new price
    BasketService.prototype.calculateCoupon = function (item) {
        // calculates price with the coupon percentage
        if (item.has_coupon) {
            return (item.unit_default.price - ((item.unit_default.price * item.percentage_coupon) / 100));
        }
    };
    // calculateCouponOrderOrList function: with the price of product and percentage coupon calculates the new price
    BasketService.prototype.calculateCouponOrderOrList = function (item) {
        // calculates previous price of product with the coupon percentage
        if (item.has_coupon) {
            return (item.price_default - ((item.price_default * item.percentage_coupon) / 100));
        }
    };
    // localBasket void: fill the local basket with the variable of basket in
    //                   localstorage
    BasketService.prototype.localBasket = function () {
        var localBasket = this.localStorage.get('basket');
        for (var _i = 0, _a = localBasket['items']; _i < _a.length; _i++) {
            var item = _a[_i];
            this.addItem(item, item.quantity);
        }
    };
    BasketService.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    BasketService.ctorParameters = [
        { type: Http, },
        { type: LocalStorageService, },
    ];
    return BasketService;
}(BaseService));
//# sourceMappingURL=basket-provider.js.map