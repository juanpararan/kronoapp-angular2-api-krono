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

@Injectable()
export class StoreService extends BaseService {

    // Products array
    products: ProductModel[] = [];

    // Schedules array
    schedules: ScheduleModel[] = [];
    payments: PaymentsModel[] = [];

    // Array to save object storeModel
    stores: StoreModel[] = [];

    // Forms of delivery array
    delivStore: DelivStoreModel[] = [];
    delivZone: DelivZoneModel[] = [];

    // Banners array
    banners: BannerModel[] = [];

    constructor(public http: Http, public localStorage: LocalStorageService) {
        super(http, localStorage);
    }

    // getStore function: obtain information of store Botica Junin
    getStore(baseUrl, chainId, storeId) {

        // Initial value to the observer is null
        let observer = new BehaviorSubject(null);

        this.getBase(baseUrl, 'chain/' + chainId + '/store/' + storeId 
                     + '/active/', null)
            .subscribe(storeData => {
                var store: StoreModel = new StoreModel(storeData);
                observer.next(store);
            }, error => {
                observer.next(error);
            });
        return observer;          
    }

    // getBanners function: obtain banners from specific store Botica Junin
    getBanners(baseUrl, chainId, storeId) {

        this.banners = [];

        // Initial value to the observer is null
        let observer = new BehaviorSubject(null);

        this.getBase(baseUrl, 'chain/' + chainId + '/store/' + storeId 
                     + '/banners/active/', null)
            .subscribe(banners => {
                for (var ban of <BannerModel[]>banners) {
                    var banner: BannerModel = new BannerModel(ban);
                    this.banners.push(banner);
                }
                observer.next(this.banners);
            }, error => {
                observer.next(error);
            });
        return observer;    
    }

    // getBestsellersProductsStore function: obtain information of bestsellers products in Botica store
    //                                       when user is not logged
    getBestsellersProductsStore(baseUrl, chainId, storeId) {

        this.products = [];

        // Initial value to the observer is null
        let observer = new BehaviorSubject(null);

        this.getBase(baseUrl, 'chain/' + chainId + '/store/' + storeId + 
                     '/bestsellers/', null)
            .subscribe(products => {
                for (var prod of <ProductModel[]>products) {
                    var product: ProductModel = new ProductModel(prod);
                    this.products.push(product);
                }
                observer.next(this.products);
            }, error => {
                observer.next(error);
            });
        return observer;   
    }

    // getBestsellersProductsUser function: obtain information of bestsellers products in Botica store
    //                                      from specific user
    getBestsellersProductsUser(baseUrl, applicationId, userId, storeId) {

        this.products = [];

        // Initial value to the observer is null
        let observer = new BehaviorSubject(null);

        this.getBase(baseUrl, 'application/' + applicationId + '/client/' + userId + 
                     '/store/' + storeId + '/bestsellers/', null)
            .subscribe(products => {
                for (var prod of <ProductModel[]>products) {
                    var product: ProductModel = new ProductModel(prod);
                    this.products.push(product);
                }
                observer.next(this.products);
            }, error => {
                observer.next(error);
            });
        return observer;   
    }

    // getSchedule function: obtain information of schedule in Botica store
    getSchedule(baseUrl, chainId, storeId) {

        // Initial value to the observer is null
        let observer = new BehaviorSubject(null);

        this.schedules = [];

        this.getBase(baseUrl, 'chain/' + chainId + '/store/' + storeId + 
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
    getPayments(baseUrl, chainId, storeId) {

        // Initial value to the observer is null
        let observer = new BehaviorSubject(null);

        this.payments = [];

        this.getBase(baseUrl , 'chain/' + chainId + '/store/' + storeId + 
                     '/payments/', this.headerAuthentication())
            .subscribe(payments => {
                for (var pay of <PaymentsModel[]>payments) {
                    var payment: PaymentsModel = new PaymentsModel(pay);
                    this.payments.push(payment);
                }
                observer.next(this.payments);
            }, error => {
                observer.next(error);
            });
        return observer; 
    }     

    // getDelivStores function: obtain information of existent type of delivery in
    //                          Botica store
    getDelivStores(baseUrl , chainId, storeId) {

        this.delivStore = [];

        // Initial value to the observer is null
        let observer = new BehaviorSubject(null);

        this.getBase(baseUrl,  'chain/' + chainId + '/store/' + storeId + 
                     '/delivstores/', this.headerAuthentication())
            .subscribe(delivStore => {
                for (var deliv of <DelivStoreModel[]>delivStore) {
                    var deliv: DelivStoreModel = new DelivStoreModel(deliv);
                    this.delivStore.push(deliv);
                }
                observer.next(this.delivStore);
            }, error => {
                observer.next(error);
            });
        return observer; 
    }
  
    // getStores function: obtain information of different Botica Junin stores       
    getStores(baseUrl, chainId) {

        this.stores = [];

        // Initial value to the observer is null
        let observer = new BehaviorSubject(null);

        this.getBase(baseUrl, 'chain/' + chainId + '/stores/active/', null)
            .subscribe(stores => {
                for (var store of <StoreModel[]>stores) {
                    var store: StoreModel = new StoreModel(store);
                    this.stores.push(store);
                }
                observer.next(this.stores);
            }, error => {
                observer.next(error);
            });
        return observer; 
    }

    // getDelivZones function: obtain information of different Delivery Krono Zones
    getDelivZones(baseUrl, chainId, storeId){
        
        this.delivZone = [];
        
        // Initial value to the observer is null
        let observer = new BehaviorSubject(null);

        this.getBase(baseUrl,'chain/' + chainId + '/store/' + storeId + 
                        '/delivzones/', this.headerAuthentication())
            .subscribe(delivZones => {
                for (var deliv of <DelivZoneModel[]>delivZones) {
                    var deliv: DelivZoneModel = new DelivZoneModel(deliv);
                    this.delivZone.push(deliv);
                }
                observer.next(this.delivZone);
            }, error => {
                observer.next(error);
            });
        return observer; 
    }
    
}