import 'rxjs/Rx';
import { Http } from '@angular/http';
import { LocalStorageService } from 'angular-2-local-storage';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { BaseService } from './base-provider';
import { CouponModel } from '../models/couponModel';
export declare class CouponsService extends BaseService {
    http: Http;
    localStorage: LocalStorageService;
    coupons: CouponModel[];
    constructor(http: Http, localStorage: LocalStorageService);
    getCoupons(baseUrl: any, chainId: any, storeId: any): BehaviorSubject<any>;
    getCoupon(baseUrl: any, chainId: any, storeId: any, couponId: any): BehaviorSubject<any>;
    getCouponWithPromCode(baseUrl: any, applicationId: any, userId: any, storeId: any, code: any): BehaviorSubject<any>;
    getVerifyCouponRules(baseUrl: any, applicationId: any, userId: any, storeId: any, couponId: any): BehaviorSubject<any>;
}
