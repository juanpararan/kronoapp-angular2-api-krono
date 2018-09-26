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
import { BaseService } from './base-provider';
import { UserModel } from '../models/userModel';
export var UsersService = (function (_super) {
    __extends(UsersService, _super);
    function UsersService(http, localStorage) {
        _super.call(this, http, localStorage);
        this.http = http;
        this.localStorage = localStorage;
        // user array
        this.user = [];
    }
    // getUser function: obtain information of user in Botica Junin
    UsersService.prototype.getUser = function (baseUrl, applicationId, userId) {
        // Initial value to the observer is null
        var observer = new BehaviorSubject(null);
        this.getBase(baseUrl, 'application/' + applicationId + '/client/' + userId + '/', this.headerAuthentication())
            .subscribe(function (userData) {
            var user = new UserModel(userData);
            observer.next(user);
        }, function (error) {
            observer.next(error);
        });
        return observer;
    };
    // postUser function: create new user in application Botica
    UsersService.prototype.postUser = function (baseUrl, payload, task) {
        // Initial value to the observer is null
        var observer = new BehaviorSubject(null);
        payload['task'] = task;
        console.log("PAYLOAD USER REGISTRO", payload);
        this.saveBase(baseUrl, 'application/clients/', payload, null)
            .subscribe(function (data) {
            observer.next(data);
        }, function (error) {
            observer.next(error);
        });
        return observer;
    };
    // postAddress function: create or delete address in
    //                       specific client profile
    UsersService.prototype.postAddress = function (baseUrl, payload, task) {
        // Initial value to the observer is null
        var observer = new BehaviorSubject(null);
        payload['task'] = task;
        console.log("PAYLOAD ADDRESS USER", payload);
        this.saveBase(baseUrl, 'application/client/address/', payload, this.headerAuthentication())
            .subscribe(function (data) {
            observer.next(data);
        }, function (error) {
            observer.next(error);
        });
        return observer;
    };
    UsersService.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    UsersService.ctorParameters = [
        { type: Http, },
        { type: LocalStorageService, },
    ];
    return UsersService;
}(BaseService));
//# sourceMappingURL=users-provider.js.map