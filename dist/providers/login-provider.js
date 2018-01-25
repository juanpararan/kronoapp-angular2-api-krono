var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
import { Injectable } from '@angular/core';
import 'rxjs/Rx';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Http } from '@angular/http';
import { LocalStorageService } from 'angular-2-local-storage';
import { BaseService } from './base-provider';
export var LoginService = (function (_super) {
    __extends(LoginService, _super);
    function LoginService(http, localStorage) {
        _super.call(this, http, localStorage);
        this.http = http;
        this.localStorage = localStorage;
    }
    // postLoginBotica function: post email and password to authenticate
    LoginService.prototype.postLoginBotica = function (payload) {
        // Initial value to the observer is null
        var observer = new BehaviorSubject(null);
        console.log("PAYLOAD USER LOGIN BOTICA", payload);
        this.saveBase('api-token-auth-client/', payload, this.headerLogin())
            .subscribe(function (data) {
            observer.next(data);
        }, function (error) {
            observer.next(error);
        });
        return observer;
    };
    // authFacebook void: post user to login in facebook with the backend
    LoginService.prototype.authFacebook = function (payload, observer) {
        var _this = this;
        this.saveBase('api-token-auth-client-facebook/', payload, this.headerLogin())
            .subscribe(function (data) {
            _this.localStorage.set('facebook', true);
            observer.next(data);
        }, function (error) {
            observer.next(error);
        });
    };
    // authGoogle void: post user to login in google with the backend
    LoginService.prototype.authGoogle = function (payload, observer) {
        var _this = this;
        this.saveBase('api-token-auth-client-google/', payload, this.headerLogin())
            .subscribe(function (data) {
            _this.localStorage.set('google', true);
            observer.next(data);
        }, function (error) {
            observer.next(error);
        });
    };
    // postLoginAfterRegisterGoogle function: after register user, login with google
    LoginService.prototype.postloginAfterRegisterGoogle = function (payload) {
        payload['id_token'] = this.localStorage.get('tokenUser');
        // Initial value to the observer is null
        var observer = new BehaviorSubject(null);
        this.saveBase('api-token-auth-client-google/', payload, this.headerLogin())
            .subscribe(function (data) {
            observer.next(data);
        }, function (error) {
            observer.next(error);
        });
        return observer;
    };
    // postLoginAfterRegisterFacebook function: after register user, login with facebook
    LoginService.prototype.postLoginAfterRegisterFacebook = function (payload) {
        payload['access_token'] = this.localStorage.get('tokenUser');
        // Initial value to the observer is null
        var observer = new BehaviorSubject(null);
        this.saveBase('api-token-auth-client-facebook/', payload, this.headerLogin())
            .subscribe(function (data) {
            observer.next(data);
        }, function (error) {
            observer.next(error);
        });
        return observer;
    };
    // forgotPassword function: user forgot password and send to backend
    //                          to verify and send e-mail to recover password
    LoginService.prototype.forgotPassword = function (payload) {
        // Initial value to the observer is null
        var observer = new BehaviorSubject(null);
        this.saveBase('changepassword/user/application/', payload, this.headerLogin())
            .subscribe(function (data) {
            observer.next(data);
        }, function (error) {
            observer.next(error);
        });
        return observer;
    };
    LoginService.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    LoginService.ctorParameters = [
        { type: Http, },
        { type: LocalStorageService, },
    ];
    return LoginService;
}(BaseService));
//# sourceMappingURL=login-provider.js.map