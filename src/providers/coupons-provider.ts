import { Injectable } from '@angular/core';
import 'rxjs/Rx';
import { Http } from '@angular/http';
import { LocalStorageService } from 'angular-2-local-storage';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

// Providers
import { BaseService } from './base-provider';

// Models
import { CouponModel } from '../models/couponModel';
import { ProductModel } from '../models/productModel';

@Injectable()
export class CouponsService extends BaseService {

    // coupons Array
    coupons: CouponModel[] = [];

    constructor(public http: Http, public localStorage: LocalStorageService) {
        super(http, localStorage);
    }

    // getCoupons function: get coupons of specific client in Botica Junín
    getCoupons(baseUrl, chainId, storeId) {

        this.coupons = [];

        // Initial value to the observer is null
        let observer = new BehaviorSubject(null);

        this.getBase(baseUrl , 'chain/' + chainId + '/store/' + storeId + 
                     '/coupons/active/', null)
            .subscribe(coupons => {
                for (var coup of <CouponModel[]>coupons) {
                    var coupon: CouponModel = new CouponModel(coup);
                    this.coupons.push(coupon);                    
                }
                observer.next(this.coupons);                                              
            }, error => {
                observer.next(error);
            }); 
        return observer;
    }

    // getCoupon function: get specific coupon from specific client in Botica Junín
    getCoupon(baseUrl, chainId, storeId, couponId) {

        // Initial value to the observer is null
        let observer = new BehaviorSubject(null);

        this.getBase(baseUrl , 'chain/' + chainId + '/store/' + storeId + 
                     '/coupon/' + couponId + '/active/', null)
            .subscribe(couponData => {
                for (var i of <CouponModel[]>couponData['products']) {
                    i['loadedProduct'] = new BehaviorSubject(null);
                }
                var couponSpecific: CouponModel = new CouponModel(couponData);
                observer.next(couponSpecific);                                              
            }, error => {
                observer.next(error);
            }); 
        return observer;
    }

    // getCouponWithPromCode function: get specific coupon with the promotional code
    getCouponWithPromCode(baseUrl, applicationId, userId, storeId, code) {

        // Initial value to the observer is null
        let observer = new BehaviorSubject(null);

        this.getBase(baseUrl , 'application/' + applicationId + '/client/' + userId + 
                     '/store/' + storeId + '/coupon/active/code/' + code + '/', this.headerAuthentication())
            .subscribe(couponData => {
                for (var i of <CouponModel[]>couponData['products']) {
                    i['loadedProduct'] = new BehaviorSubject(null);
                }
                var couponSpecific: CouponModel = new CouponModel(couponData);
                observer.next(couponSpecific);                                              
            }, error => {
                observer.next(error);
            }); 
        return observer;        
    }

    // getVerifyCouponRules function: get if coupon is valid or not 
    getVerifyCouponRules(baseUrl, applicationId, userId, storeId, couponId) {

         // Initial value to the observer is null
        let observer = new BehaviorSubject(null);

        this.getBase(baseUrl , 'application/' + applicationId + '/client/' + userId + 
                     '/store/' + storeId + '/valid/coupon/' + couponId + '/', this.headerAuthentication())
            .subscribe(couponData => {
                observer.next(couponData);                                              
            }, error => {
                observer.next(error);
            }); 
        return observer;         
    }

}