var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
import { Injectable } from '@angular/core';
import 'rxjs/Rx';
import { Http } from '@angular/http';
import { LocalStorageService } from 'angular-2-local-storage';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { BaseService } from './base-provider';
import { CouponModel } from '../models/couponModel';
export var CouponsService = (function (_super) {
    __extends(CouponsService, _super);
    function CouponsService(http, localStorage) {
        _super.call(this, http, localStorage);
        this.http = http;
        this.localStorage = localStorage;
        // coupons Array
        this.coupons = [];
    }
    // getCoupons function: get coupons of specific client in Botica Junín
    CouponsService.prototype.getCoupons = function (baseUrl, chainId, storeId) {
        var _this = this;
        this.coupons = [];
        // Initial value to the observer is null
        var observer = new BehaviorSubject(null);
        this.getBase(baseUrl, 'chain/' + chainId + '/store/' + storeId +
            '/coupons/active/', null)
            .subscribe(function (coupons) {
            for (var _i = 0, _a = coupons; _i < _a.length; _i++) {
                var coup = _a[_i];
                var coupon = new CouponModel(coup);
                _this.coupons.push(coupon);
            }
            observer.next(_this.coupons);
        }, function (error) {
            observer.next(error);
        });
        return observer;
    };
    // getCoupon function: get specific coupon from specific client in Botica Junín
    CouponsService.prototype.getCoupon = function (baseUrl, chainId, storeId, couponId) {
        // Initial value to the observer is null
        var observer = new BehaviorSubject(null);
        this.getBase(baseUrl, 'chain/' + chainId + '/store/' + storeId +
            '/coupon/' + couponId + '/active/', null)
            .subscribe(function (couponData) {
            for (var _i = 0, _a = couponData['products']; _i < _a.length; _i++) {
                var i = _a[_i];
                i['loadedProduct'] = new BehaviorSubject(null);
            }
            var couponSpecific = new CouponModel(couponData);
            observer.next(couponSpecific);
        }, function (error) {
            observer.next(error);
        });
        return observer;
    };
    // getCouponWithPromCode function: get specific coupon with the promotional code
    CouponsService.prototype.getCouponWithPromCode = function (baseUrl, applicationId, userId, storeId, code) {
        // Initial value to the observer is null
        var observer = new BehaviorSubject(null);
        this.getBase(baseUrl, 'application/' + applicationId + '/client/' + userId +
            '/store/' + storeId + '/coupon/active/code/' + code + '/', this.headerAuthentication())
            .subscribe(function (couponData) {
            for (var _i = 0, _a = couponData['products']; _i < _a.length; _i++) {
                var i = _a[_i];
                i['loadedProduct'] = new BehaviorSubject(null);
            }
            var couponSpecific = new CouponModel(couponData);
            observer.next(couponSpecific);
        }, function (error) {
            observer.next(error);
        });
        return observer;
    };
    // getVerifyCouponRules function: get if coupon is valid or not 
    CouponsService.prototype.getVerifyCouponRules = function (baseUrl, applicationId, userId, storeId, couponId) {
        // Initial value to the observer is null
        var observer = new BehaviorSubject(null);
        this.getBase(baseUrl, 'application/' + applicationId + '/client/' + userId +
            '/store/' + storeId + '/valid/coupon/' + couponId + '/', this.headerAuthentication())
            .subscribe(function (couponData) {
            observer.next(couponData);
        }, function (error) {
            observer.next(error);
        });
        return observer;
    };
    CouponsService.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    CouponsService.ctorParameters = [
        { type: Http, },
        { type: LocalStorageService, },
    ];
    return CouponsService;
}(BaseService));
//# sourceMappingURL=coupons-provider.js.map