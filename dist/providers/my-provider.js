import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { LocalStorageService } from 'angular-2-local-storage';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/Rx';
import { JwtHelper } from "angular2-jwt";
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { _ERROR } from './errors';
export var BaseService = (function () {
    function BaseService(http, localStorage) {
        var _this = this;
        this.http = http;
        this.localStorage = localStorage;
        // Base path
        this.path = "https://api.kronogroup.co/";
        this.jwtHelper = new JwtHelper();
        // handleError function: throw error catched to specific service and specific component,
        //                       server error or client error
        this.handleError = function (response) {
            console.log("ERROR EN HANDLE ERROR", response);
            // If error is SERVER ERROR or CLIENT ERROR
            if ((response.status >= 401 && response.status <= 511) || (response.status >= 2 && response.status <= 324)) {
                return Observable.throw({ 'error': response.status });
            }
            else {
                // Signature has expired. Refresh token
                /*if (response.json().error == 9) {
    
    
                }*/
                // Refresh has expired. Logout
                if (response.json().error == 14) {
                    console.log("ME DIO ERROR 14 CERRARE SESION");
                    _this.localStorage.remove('userId');
                    _this.localStorage.remove('basket');
                    _this.localStorage.remove('basketId');
                    _this.localStorage.remove('tokenUser');
                    _this.localStorage.remove('tokenExp');
                    console.log("response de error 14", response.json());
                    return Observable.throw(response.json());
                }
                else {
                    return Observable.throw(response.json());
                }
            }
        };
        // headerLogin function: create header object to pass like header 
        //                       in every login post
        this.headerLogin = function () {
            var header = {
                'Content-Type': 'application/json'
            };
            _this.headerObject = {
                headers: new Headers(header)
            };
            return _this.headerObject;
        };
        // headerAuthentication function: header neccesary to every request in the app with
        //                                client in specific
        this.headerAuthentication = function () {
            var headers = new Headers({
                'Authorization': "JWT " + _this.localStorage.get('tokenUser'),
                'Content-Type': 'application/json'
            });
            var options = new RequestOptions({ headers: headers });
            return options;
        };
        this.errors = function (response) {
            var _error = new _ERROR().error;
            console.log({ 'error': _error[response.json().error] });
            if (response.json().error == 9 || response.json().error == 14) {
                console.log('Token has expired');
                _this.expired_token();
            }
            else if (response.status >= 401 && response.status <= 511) {
                return Observable.throw({ 'error': response.status });
            }
            else {
                if (response.json().error) {
                    return Observable.throw({ 'error': _error[response.json().error] });
                }
                else {
                    return Observable.throw(response.json());
                }
            }
        };
    }
    // getBase function: get information from server with base path url 
    BaseService.prototype.getBase = function (path2, options) {
        var _this = this;
        if (options === void 0) { options = null; }
        var d = new Date();
        var actualTime = Math.floor(d.getTime() / 1000);
        var tokenExp = this.localStorage.get('tokenExp');
        if ((this.localStorage.get('tokenExp') != null) &&
            (actualTime >= parseInt(tokenExp) - 60)) {
            console.log("VOY A REFRESCAR TOKEN EN GET");
            // Initial value to the observer is null
            return new Observable(function (observer) {
                _this.postRefreshToken().subscribe(function (data) {
                    if (data) {
                        _this.http.get(_this.path + path2, _this.headerAuthentication())
                            .map(function (res) { return res.json(); })
                            .catch(_this.handleError)
                            .retry(5)
                            .subscribe(function (res) { return observer.next(res); });
                    }
                });
                return observer;
            });
        }
        else {
            return this.http.get(this.path + path2, options)
                .map(function (res) { return res.json(); })
                .catch(this.handleError)
                .retry(5);
        }
    };
    // saveBase function: post in server with base path url
    BaseService.prototype.saveBase = function (path2, payload, options) {
        var _this = this;
        if (options === void 0) { options = null; }
        var d = new Date();
        var actualTime = Math.floor(d.getTime() / 1000);
        if ((this.localStorage.get('tokenExp') != null) &&
            (actualTime >= this.localStorage.get('tokenExp'))) {
            console.log("VOY A REFRESCAR TOKEN EN POST");
            // Initial value to the observer is null
            return new Observable(function (observer) {
                _this.postRefreshToken().subscribe(function (data) {
                    if (data) {
                        _this.http.post(_this.path + path2, payload, _this.headerAuthentication())
                            .map(function (res) { return res.json(); })
                            .catch(_this.handleError)
                            .retry(5)
                            .subscribe(function (res) { return observer.next(res); });
                    }
                });
                return observer;
            });
        }
        else {
            return this.http.post(this.path + path2, payload, options)
                .map(function (res) { return res.json(); })
                .catch(this.handleError)
                .retry(5);
        }
    };
    // postRefreshToken function: if token of user is expired, send post to 
    //                            request new token
    BaseService.prototype.postRefreshToken = function () {
        var _this = this;
        // Initial value to the observer is null
        var observer = new BehaviorSubject(null);
        var postToken = {
            'token': this.localStorage.get('tokenUser')
        };
        this.http.post(this.path + 'api-token-refresh-client/', postToken, null)
            .map(function (res) { return res.json(); })
            .catch(this.handleError)
            .subscribe(function (data) {
            console.log("REFRESQUE TOKEN", data);
            _this.localStorage.set('tokenUser', data.token);
            var user = _this.jwtHelper.decodeToken(data.token);
            _this.localStorage.set('tokenExp', user.exp);
            observer.next(data);
        }, function (error) {
            console.log("Error", error);
            observer.next(error);
        });
        return observer;
    };
    // ******************************** BASE SERVICE ADMIN *************************** //
    BaseService.prototype.headerAuthenticationAdmin = function () {
        var authToken = JSON.parse(localStorage.getItem('currentUser')).token;
        var headers = new Headers({
            'Authorization': 'JWT ' + authToken,
            'Content-Type': 'application/json',
        });
        var options = new RequestOptions({ headers: headers });
        return options;
    };
    BaseService.prototype.getAdmin = function (a, options) {
        if (options === void 0) { options = null; }
        //console.log(options);
        return this.http.get(this.path + a, this.headerAuthenticationAdmin())
            .map(function (res) { return res.json(); })
            .catch(this.errors);
    };
    BaseService.prototype.saveAdmin = function (endpoint, payload, options) {
        if (options === void 0) { options = null; }
        console.log('payload --> ', payload);
        return this.http.post(this.path + endpoint, payload, this.headerAuthenticationAdmin())
            .map(function (res) { return res.json(); })
            .catch(this.errors);
    };
    ;
    BaseService.prototype.postAdmin = function (endpoint, payload) {
        console.log('payload --> ', payload);
        var body = JSON.stringify({ email: payload.email, password: payload.password });
        var headers = new Headers({ 'Content-Type': 'application/json' });
        var options = new RequestOptions({ headers: headers });
        return this.http.post(this.path + endpoint, body, options)
            .map(function (res) { return res.json(); })
            .catch(this.errors);
    };
    ;
    BaseService.prototype.expired_token = function () {
        localStorage.removeItem('currentUser');
        localStorage.removeItem('admin');
        //this.router.navigateByUrl('/login');
        window.location.replace("/login");
    };
    ;
    BaseService.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    BaseService.ctorParameters = [
        { type: Http, },
        { type: LocalStorageService, },
    ];
    return BaseService;
}());
//# sourceMappingURL=my-provider.js.map