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
import { MyProvider } from '../providers/my-provider';
import { StoreModel } from '../models/storeModel';
import { BannerModel } from '../models/bannerModel';
export var StoreProvider = (function (_super) {
    __extends(StoreProvider, _super);
    function StoreProvider(http, localStorage) {
        _super.call(this, http, localStorage);
        this.http = http;
        this.localStorage = localStorage;
        // Products array
        this.products = [];
        // Schedules array
        //schedules: ScheduleModel[] = [];
        //payments: PaymentsModel[] = [];
        // Array to save object storeModel
        this.stores = [];
        // Forms of delivery array
        //delivStore: DelivStoreModel[] = [];
        // Banners array
        this.banners = [];
    }
    // getStore function: obtain information of store Botica Junin
    StoreProvider.prototype.getStore = function (chainId, storeId) {
        // Initial value to the observer is null
        var observer = new BehaviorSubject(null);
        this.getBase('chain/' + chainId + '/store/' + storeId
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
    StoreProvider.prototype.getBanners = function (chainId, storeId) {
        var _this = this;
        this.banners = [];
        // Initial value to the observer is null
        var observer = new BehaviorSubject(null);
        this.getBase('chain/' + chainId + '/store/' + storeId
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
    /*getBestsellersProductsStore(chainId, storeId) {

        this.products = [];

        // Initial value to the observer is null
        let observer = new BehaviorSubject(null);

        this.getBase('chain/' + chainId + '/store/' + storeId +
                     '/bestsellers/', null)
            .subscribe(products => {
                products.forEach(productsData => {
                    var product: ProductModel = new ProductModel(productsData);
                    this.products.push(product);
                });
                observer.next(this.products);
            }, error => {
                observer.next(error);
            });
        return observer;
    }

    // getBestsellersProductsUser function: obtain information of bestsellers products in Botica store
    //                                      from specific user
    getBestsellersProductsUser(applicationId, userId, storeId) {

        this.products = [];

        // Initial value to the observer is null
        let observer = new BehaviorSubject(null);

        this.getBase('application/' + applicationId + '/client/' + userId +
                     '/store/' + storeId + '/bestsellers/', null)
            .subscribe(products => {
                products.forEach(productsData => {
                    var product: ProductModel = new ProductModel(productsData);
                    this.products.push(product);
                });
                observer.next(this.products);
            }, error => {
                observer.next(error);
            });
        return observer;
    }

    // getSchedule function: obtain information of schedule in Botica store
    /*getSchedule(chainId, storeId) {

        // Initial value to the observer is null
        let observer = new BehaviorSubject(null);

        this.schedules = [];

        this.getBase('chain/' + chainId + '/store/' + storeId +
                     '/schedules/', this.headerAuthentication())
            .subscribe(schedulesData => {
                var schedule: ScheduleModel = new ScheduleModel(schedulesData);
                this.schedules.push(schedule);
                observer.next(this.schedules);
            }, error => {
                observer.next(error);
            });
        return observer;
    }

    // getSchedule function: obtain information of schedule in Botica store
    getPayments(chainId, storeId) {

        // Initial value to the observer is null
        let observer = new BehaviorSubject(null);

        this.payments = [];

        this.getBase('chain/' + chainId + '/store/' + storeId +
                     '/payments/', this.headerAuthentication())
            .subscribe(payments => {
                payments.forEach(paymentData => {
                    var payment: PaymentsModel = new PaymentsModel(paymentData);
                    this.payments.push(payment);
                });
                observer.next(this.payments);
            }, error => {
                observer.next(error);
            });
        return observer;
    }

    // getDelivStores function: obtain information of existent type of delivery in
    //                          Botica store
    getDelivStores(chainId, storeId) {

        this.delivStore = [];

        // Initial value to the observer is null
        let observer = new BehaviorSubject(null);

        this.getBase('chain/' + chainId + '/store/' + storeId +
                     '/delivstores/', this.headerAuthentication())
            .subscribe(delivStore => {
                delivStore.forEach(delivStoreData => {
                    var deliv: DelivStoreModel = new DelivStoreModel(delivStoreData);
                    this.delivStore.push(deliv);
                });
                observer.next(this.delivStore);
            }, error => {
                observer.next(error);
            });
        return observer;
    }*/
    // getStores function: obtain information of different Botica Junin stores       
    /*getStores(chainId) {

        this.stores = [];

        // Initial value to the observer is null
        let observer = new BehaviorSubject(null);

        this.getBase('chain/' + chainId + '/stores/active/', null)
            .subscribe(stores => {
                stores.forEach(storeData => {
                    var store: StoreModel = new StoreModel(storeData);
                    this.stores.push(store);
                })
                observer.next(this.stores);
            }, error => {
                observer.next(error);
            });
        return observer;
    }*/
    StoreProvider.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    StoreProvider.ctorParameters = [
        { type: Http, },
        { type: LocalStorageService, },
    ];
    return StoreProvider;
}(MyProvider));
//# sourceMappingURL=store-provider.js.map