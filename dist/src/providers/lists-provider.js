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
import { ListModelGeneral } from '../models/listModelGeneral';
import { ListModelSpecific } from '../models/listModelSpecific';
var ListsService = (function (_super) {
    __extends(ListsService, _super);
    function ListsService(http, localStorage) {
        var _this = _super.call(this, http, localStorage) || this;
        _this.http = http;
        _this.localStorage = localStorage;
        _this.lists = [];
        return _this;
    }
    // postListBasket function: create, or delete list in
    //                    specific client
    // postListBasket function: create, or delete list in
    //                    specific client
    ListsService.prototype.postListBasket = 
    // postListBasket function: create, or delete list in
    //                    specific client
    function (baseUrl, payload, task) {
        var observer = new BehaviorSubject(null);
        payload['task'] = task;
        console.log("PAYLOAD LIST USER", payload);
        this.saveBase(baseUrl, 'client/store/newlist/basket/', payload, this.headerAuthentication())
            .subscribe(function (data) {
            observer.next(data);
        }, function (error) {
            observer.next(error);
        });
        return observer;
    };
    // postListOrder function: create, or delete list in
    //                         specific client
    // postListOrder function: create, or delete list in
    //                         specific client
    ListsService.prototype.postListOrder = 
    // postListOrder function: create, or delete list in
    //                         specific client
    function (baseUrl, payload, task) {
        var observer = new BehaviorSubject(null);
        payload['task'] = task;
        console.log("PAYLOAD LIST USER", payload);
        this.saveBase(baseUrl, 'client/store/newlist/order/', payload, this.headerAuthentication())
            .subscribe(function (data) {
            observer.next(data);
        }, function (error) {
            observer.next(error);
        });
        return observer;
    };
    // getLists function: obtain all lists of specific user
    // getLists function: obtain all lists of specific user
    ListsService.prototype.getLists = 
    // getLists function: obtain all lists of specific user
    function (baseUrl, applicationId, userId, storeId) {
        var _this = this;
        this.lists = [];
        var observer = new BehaviorSubject(null);
        this.getBase(baseUrl, 'application/' + applicationId + '/client/' + userId
            + '/store/' + storeId + '/lists/', this.headerAuthentication())
            .subscribe(function (lists) {
            for (var _i = 0, _a = lists; _i < _a.length; _i++) {
                var list = _a[_i];
                var listClient = new ListModelGeneral(list);
                _this.lists.push(listClient);
            }
            observer.next(_this.lists);
        }, function (error) {
            observer.next(error);
        });
        return observer;
    };
    // getList function: obtain specific list of specific user
    // getList function: obtain specific list of specific user
    ListsService.prototype.getList = 
    // getList function: obtain specific list of specific user
    function (baseUrl, applicationId, userId, storeId, listId) {
        var observer = new BehaviorSubject(null);
        this.getBase(baseUrl, 'application/' + applicationId + '/client/' + userId
            + '/store/' + storeId + '/list/' + listId + '/', this.headerAuthentication())
            .subscribe(function (list) {
            for (var _i = 0, _a = list['items']; _i < _a.length; _i++) {
                var i = _a[_i];
                if (i.productId != null) {
                    i.productId['loadedProduct'] = new BehaviorSubject(null);
                }
            }
            var listClient = new ListModelSpecific(list);
            observer.next(listClient);
        }, function (error) {
            observer.next(error);
        });
        return observer;
    };
    // postListDelete function: post client list to delete in backend
    // postListDelete function: post client list to delete in backend
    ListsService.prototype.postListDelete = 
    // postListDelete function: post client list to delete in backend
    function (baseUrl, payload, task) {
        var observer = new BehaviorSubject(null);
        payload['task'] = task;
        console.log("PAYLOAD LIST USER", payload);
        this.saveBase(baseUrl, 'client/store/deletelist/', payload, this.headerAuthentication())
            .subscribe(function (data) {
            observer.next(data);
        }, function (error) {
            observer.next(error);
        });
        return observer;
    };
    ListsService.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    ListsService.ctorParameters = function () { return [
        { type: Http, },
        { type: LocalStorageService, },
    ]; };
    return ListsService;
}(BaseService));
export { ListsService };
//# sourceMappingURL=lists-provider.js.map