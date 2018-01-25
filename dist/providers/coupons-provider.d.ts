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
    getCoupons(chainId: any, storeId: any): BehaviorSubject<any>;
    getCoupon(chainId: any, storeId: any, couponId: any): BehaviorSubject<any>;
    getCouponWithPromCode(applicationId: any, userId: any, storeId: any, code: any): BehaviorSubject<any>;
    getVerifyCouponRules(applicationId: any, userId: any, storeId: any, couponId: any): BehaviorSubject<any>;
}
