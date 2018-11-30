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
import { StoreModel } from '../models/storeModel';
import { ProductModel } from '../models/productModel';
import { ScheduleModel } from '../models/scheduleModel';
import { PaymentsModel } from '../models/paymentsModel';
import { DelivStoreModel } from '../models/delivStoreModel';
import { BannerModel } from '../models/bannerModel';
import { DelivZoneModel } from '../models/delivZoneModel';
var StoreService = (function (_super) {
    __extends(StoreService, _super);
    function StoreService(http, localStorage) {
        var _this = _super.call(this, http, localStorage) || this;
        _this.http = http;
        _this.localStorage = localStorage;
        // Products array
        _this.products = [];
        // Schedules array
        _this.schedules = [];
        _this.payments = [];
        // Array to save object storeModel
        _this.stores = [];
        // Forms of delivery array
        _this.delivStore = [];
        _this.delivZone = [];
        // Banners array
        _this.banners = [];
        return _this;
    }
    // getStore function: obtain information of store Botica Junin
    // getStore function: obtain information of store Botica Junin
    StoreService.prototype.getStore = 
    // getStore function: obtain information of store Botica Junin
    function (baseUrl, chainId, storeId) {
        // Initial value to the observer is null
        var observer = new BehaviorSubject(null);
        this.getBase(baseUrl, 'chain/' + chainId + '/store/' + storeId
            + '/active/', null)
            .subscribe(function (storeData) {
            var store = new StoreModel(storeData);
            observer.next(store);
        }, function (error) {
            observer.next(error);
        });
        return observer;
    };
    // getBanners function: obtain banners from specific store Botica Junin
    // getBanners function: obtain banners from specific store Botica Junin
    StoreService.prototype.getBanners = 
    // getBanners function: obtain banners from specific store Botica Junin
    function (baseUrl, chainId, storeId) {
        var _this = this;
        this.banners = [];
        // Initial value to the observer is null
        var observer = new BehaviorSubject(null);
        this.getBase(baseUrl, 'chain/' + chainId + '/store/' + storeId
            + '/banners/active/', null)
            .subscribe(function (banners) {
            for (var _i = 0, _a = banners; _i < _a.length; _i++) {
                var ban = _a[_i];
                var banner = new BannerModel(ban);
                _this.banners.push(banner);
            }
            observer.next(_this.banners);
        }, function (error) {
            observer.next(error);
        });
        return observer;
    };
    // getBestsellersProductsStore function: obtain information of bestsellers products in Botica store
    //                                       when user is not logged
    // getBestsellersProductsStore function: obtain information of bestsellers products in Botica store
    //                                       when user is not logged
    StoreService.prototype.getBestsellersProductsStore = 
    // getBestsellersProductsStore function: obtain information of bestsellers products in Botica store
    //                                       when user is not logged
    function (baseUrl, chainId, storeId) {
        var _this = this;
        this.products = [];
        // Initial value to the observer is null
        var observer = new BehaviorSubject(null);
        this.getBase(baseUrl, 'chain/' + chainId + '/store/' + storeId +
            '/bestsellers/', null)
            .subscribe(function (products) {
            for (var _i = 0, _a = products; _i < _a.length; _i++) {
                var prod = _a[_i];
                var product = new ProductModel(prod);
                _this.products.push(product);
            }
            observer.next(_this.products);
        }, function (error) {
            observer.next(error);
        });
        return observer;
    };
    // getBestsellersProductsUser function: obtain information of bestsellers products in Botica store
    //                                      from specific user
    // getBestsellersProductsUser function: obtain information of bestsellers products in Botica store
    //                                      from specific user
    StoreService.prototype.getBestsellersProductsUser = 
    // getBestsellersProductsUser function: obtain information of bestsellers products in Botica store
    //                                      from specific user
    function (baseUrl, applicationId, userId, storeId) {
        var _this = this;
        this.products = [];
        // Initial value to the observer is null
        var observer = new BehaviorSubject(null);
        this.getBase(baseUrl, 'application/' + applicationId + '/client/' + userId +
            '/store/' + storeId + '/bestsellers/', null)
            .subscribe(function (products) {
            for (var _i = 0, _a = products; _i < _a.length; _i++) {
                var prod = _a[_i];
                var product = new ProductModel(prod);
                _this.products.push(product);
            }
            observer.next(_this.products);
        }, function (error) {
            observer.next(error);
        });
        return observer;
    };
    // getSchedule function: obtain information of schedule in Botica store
    // getSchedule function: obtain information of schedule in Botica store
    StoreService.prototype.getSchedule = 
    // getSchedule function: obtain information of schedule in Botica store
    function (baseUrl, chainId, storeId) {
        var _this = this;
        // Initial value to the observer is null
        var observer = new BehaviorSubject(null);
        this.schedules = [];
        this.getBase(baseUrl, 'chain/' + chainId + '/store/' + storeId +
            '/schedules/', this.headerAuthentication())
            .subscribe(function (schedulesData) {
            var schedule = new ScheduleModel(schedulesData);
            _this.schedules.push(schedule);
            observer.next(_this.schedules);
        }, function (error) {
            observer.next(error);
        });
        return observer;
    };
    // getSchedule function: obtain information of schedule in Botica store
    // getSchedule function: obtain information of schedule in Botica store
    StoreService.prototype.getPayments = 
    // getSchedule function: obtain information of schedule in Botica store
    function (baseUrl, chainId, storeId) {
        var _this = this;
        // Initial value to the observer is null
        var observer = new BehaviorSubject(null);
        this.payments = [];
        this.getBase(baseUrl, 'chain/' + chainId + '/store/' + storeId +
            '/payments/', this.headerAuthentication())
            .subscribe(function (payments) {
            for (var _i = 0, _a = payments; _i < _a.length; _i++) {
                var pay = _a[_i];
                var payment = new PaymentsModel(pay);
                _this.payments.push(payment);
            }
            observer.next(_this.payments);
        }, function (error) {
            observer.next(error);
        });
        return observer;
    };
    // getDelivStores function: obtain information of existent type of delivery in
    //                          Botica store
    // getDelivStores function: obtain information of existent type of delivery in
    //                          Botica store
    StoreService.prototype.getDelivStores = 
    // getDelivStores function: obtain information of existent type of delivery in
    //                          Botica store
    function (baseUrl, chainId, storeId) {
        var _this = this;
        this.delivStore = [];
        // Initial value to the observer is null
        var observer = new BehaviorSubject(null);
        this.getBase(baseUrl, 'chain/' + chainId + '/store/' + storeId +
            '/delivstores/', this.headerAuthentication())
            .subscribe(function (delivStore) {
            for (var _i = 0, _a = delivStore; _i < _a.length; _i++) {
                var deliv = _a[_i];
                var deliv = new DelivStoreModel(deliv);
                _this.delivStore.push(deliv);
            }
            observer.next(_this.delivStore);
        }, function (error) {
            observer.next(error);
        });
        return observer;
    };
    // getStores function: obtain information of different Botica Junin stores       
    // getStores function: obtain information of different Botica Junin stores
    StoreService.prototype.getStores = 
    // getStores function: obtain information of different Botica Junin stores
    function (baseUrl, chainId) {
        var _this = this;
        this.stores = [];
        // Initial value to the observer is null
        var observer = new BehaviorSubject(null);
        this.getBase(baseUrl, 'chain/' + chainId + '/stores/active/', null)
            .subscribe(function (stores) {
            for (var _i = 0, _a = stores; _i < _a.length; _i++) {
                var store = _a[_i];
                var store = new StoreModel(store);
                _this.stores.push(store);
            }
            observer.next(_this.stores);
        }, function (error) {
            observer.next(error);
        });
        return observer;
    };
    // getDelivZones function: obtain information of different Delivery Krono Zones
    // getDelivZones function: obtain information of different Delivery Krono Zones
    StoreService.prototype.getDelivZones = 
    // getDelivZones function: obtain information of different Delivery Krono Zones
    function (baseUrl, chainId, storeId) {
        var _this = this;
        this.delivZone = [];
        // Initial value to the observer is null
        var observer = new BehaviorSubject(null);
        this.getBase(baseUrl, 'chain/' + chainId + '/store/' + storeId +
            '/delivzones/', this.headerAuthentication())
            .subscribe(function (delivZones) {
            for (var _i = 0, _a = delivZones; _i < _a.length; _i++) {
                var deliv = _a[_i];
                var deliv = new DelivZoneModel(deliv);
                _this.delivZone.push(deliv);
            }
            observer.next(_this.delivZone);
        }, function (error) {
            observer.next(error);
        });
        return observer;
    };
    StoreService.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    StoreService.ctorParameters = function () { return [
        { type: Http, },
        { type: LocalStorageService, },
    ]; };
    return StoreService;
}(BaseService));
export { StoreService };
//# sourceMappingURL=store-provider.js.map