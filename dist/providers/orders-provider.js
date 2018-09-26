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
import { PrescriptionModel } from '../models/prescriptionModel';
import { OrderModel } from '../models/orderModel';
export var OrdersService = (function (_super) {
    __extends(OrdersService, _super);
    function OrdersService(http, localStorage) {
        _super.call(this, http, localStorage);
        this.http = http;
        this.localStorage = localStorage;
        this.prescriptions = [];
        // Orders array
        this.orders = [];
    }
    // postOrder function: post order inside orders of specific
    //                     client in Botica store
    OrdersService.prototype.postOrder = function (baseUrl, payload) {
        payload['task'] = 'add';
        var observer = new BehaviorSubject(null);
        console.log("payload de lo que hare post con order", payload);
        this.saveBase(baseUrl, 'chain/store/client/basket/payment/prescription/orders/', payload, this.headerAuthentication())
            .subscribe(function (data) {
            observer.next(data);
        }, function (error) {
            observer.next(error);
        });
        return observer;
    };
    // getPrescription function: obtain information of user last prescription in Botica store
    OrdersService.prototype.getPrescription = function (baseUrl, applicationId, userId) {
        var _this = this;
        this.prescriptions = [];
        var observer = new BehaviorSubject(null);
        this.getBase(baseUrl, 'application/' + applicationId + '/client/' + userId + '/prescriptions/last/', this.headerAuthentication())
            .subscribe(function (prescriptions) {
            for (var _i = 0, _a = prescriptions; _i < _a.length; _i++) {
                var presc = _a[_i];
                var prescription = new PrescriptionModel(presc);
                _this.prescriptions.push(prescription);
            }
            observer.next(_this.prescriptions);
        }, function (error) {
            observer.next(error);
        });
        return observer;
    };
    // getOrders function: obtain information of orders of specific client
    //                     in Botica store
    OrdersService.prototype.getOrders = function (baseUrl, applicationId, userId, storeId) {
        var _this = this;
        this.orders = [];
        var observer = new BehaviorSubject(null);
        this.getBase(baseUrl, 'application/' + applicationId + '/client/' + userId + '/store/' +
            storeId + '/orders/', this.headerAuthentication())
            .subscribe(function (orders) {
            for (var _i = 0, _a = orders; _i < _a.length; _i++) {
                var ord = _a[_i];
                var order = new OrderModel(ord);
                _this.orders.push(order);
            }
            observer.next(_this.orders);
        }, function (error) {
            observer.next(error);
        });
        return observer;
    };
    // getOrders function: obtain information of orders of specific client
    //                     in Botica store
    OrdersService.prototype.getOrdersKrono = function (baseUrl, applicationId, userId) {
        var _this = this;
        this.orders = [];
        var observer = new BehaviorSubject(null);
        this.getBase(baseUrl, 'application/' + applicationId + '/client/' + userId + '/orders/', this.headerAuthentication())
            .subscribe(function (orders) {
            for (var _i = 0, _a = orders; _i < _a.length; _i++) {
                var ord = _a[_i];
                var order = new OrderModel(ord);
                _this.orders.push(order);
            }
            observer.next(_this.orders);
        }, function (error) {
            observer.next(error);
        });
        return observer;
    };
    // getOrder function: obtain information of specific client order
    OrdersService.prototype.getOrder = function (baseUrl, applicationId, userId, storeId, orderId) {
        var observer = new BehaviorSubject(null);
        this.getBase(baseUrl, 'application/' + applicationId + '/client/' + userId + '/store/' +
            storeId + '/order/' + orderId + '/', this.headerAuthentication())
            .subscribe(function (order) {
            for (var _i = 0, _a = order['items']; _i < _a.length; _i++) {
                var i = _a[_i];
                if (i.productId != null) {
                    i.productId['loadedProduct'] = new BehaviorSubject(null);
                }
            }
            var orderClient = new OrderModel(order);
            observer.next(orderClient);
        }, function (error) {
            observer.next(error);
        });
        return observer;
    };
    OrdersService.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    OrdersService.ctorParameters = [
        { type: Http, },
        { type: LocalStorageService, },
    ];
    return OrdersService;
}(BaseService));
//# sourceMappingURL=orders-provider.js.map