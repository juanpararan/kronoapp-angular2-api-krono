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
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Http } from '@angular/http';
import { LocalStorageService } from 'angular-2-local-storage';
// Providers
import { BaseService } from './base-provider';
var LoginService = (function (_super) {
    __extends(LoginService, _super);
    function LoginService(http, localStorage) {
        var _this = _super.call(this, http, localStorage) || this;
        _this.http = http;
        _this.localStorage = localStorage;
        return _this;
    }
    // postLoginBotica function: post email and password to authenticate
    // postLoginBotica function: post email and password to authenticate
    LoginService.prototype.postLoginBotica = 
    // postLoginBotica function: post email and password to authenticate
    function (baseUrl, payload) {
        // Initial value to the observer is null
        var observer = new BehaviorSubject(null);
        console.log("PAYLOAD USER LOGIN", payload);
        this.saveBase(baseUrl, 'api-token-auth-client/', payload, this.headerLogin())
            .subscribe(function (data) {
            observer.next(data);
        }, function (error) {
            observer.next(error);
        });
        return observer;
    };
    // authFacebook void: post user to login in facebook with the backend
    // authFacebook void: post user to login in facebook with the backend
    LoginService.prototype.authFacebook = 
    // authFacebook void: post user to login in facebook with the backend
    function (baseUrl, payload, observer) {
        var _this = this;
        this.saveBase(baseUrl, 'api-token-auth-client-facebook/', payload, this.headerLogin())
            .subscribe(function (data) {
            _this.localStorage.set('facebook', true);
            observer.next(data);
        }, function (error) {
            observer.next(error);
        });
    };
    // authGoogle void: post user to login in google with the backend
    // authGoogle void: post user to login in google with the backend
    LoginService.prototype.authGoogle = 
    // authGoogle void: post user to login in google with the backend
    function (baseUrl, payload, observer) {
        var _this = this;
        this.saveBase(baseUrl, 'api-token-auth-client-google/', payload, this.headerLogin())
            .subscribe(function (data) {
            _this.localStorage.set('google', true);
            observer.next(data);
        }, function (error) {
            observer.next(error);
        });
    };
    // postLoginAfterRegisterGoogle function: after register user, login with google
    // postLoginAfterRegisterGoogle function: after register user, login with google
    LoginService.prototype.postloginAfterRegisterGoogle = 
    // postLoginAfterRegisterGoogle function: after register user, login with google
    function (baseUrl, payload) {
        // Initial value to the observer is null
        var observer = new BehaviorSubject(null);
        this.saveBase(baseUrl, 'api-token-auth-client-google/', payload, this.headerLogin())
            .subscribe(function (data) {
            observer.next(data);
        }, function (error) {
            observer.next(error);
        });
        return observer;
    };
    // postLoginAfterRegisterFacebook function: after register user, login with facebook
    // postLoginAfterRegisterFacebook function: after register user, login with facebook
    LoginService.prototype.postLoginAfterRegisterFacebook = 
    // postLoginAfterRegisterFacebook function: after register user, login with facebook
    function (baseUrl, payload) {
        // Initial value to the observer is null
        var observer = new BehaviorSubject(null);
        this.saveBase(baseUrl, 'api-token-auth-client-facebook/', payload, this.headerLogin())
            .subscribe(function (data) {
            observer.next(data);
        }, function (error) {
            observer.next(error);
        });
        return observer;
    };
    // forgotPassword function: user forgot password and send to backend
    //                          to verify and send e-mail to recover password
    // forgotPassword function: user forgot password and send to backend
    //                          to verify and send e-mail to recover password
    LoginService.prototype.forgotPassword = 
    // forgotPassword function: user forgot password and send to backend
    //                          to verify and send e-mail to recover password
    function (baseUrl, payload) {
        // Initial value to the observer is null
        var observer = new BehaviorSubject(null);
        this.saveBase(baseUrl, 'changepassword/user/application/', payload, this.headerLogin())
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
    LoginService.ctorParameters = function () { return [
        { type: Http, },
        { type: LocalStorageService, },
    ]; };
    return LoginService;
}(BaseService));
export { LoginService };
//# sourceMappingURL=login-provider.js.map