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
import { CityModel } from '../models/cityModel';
export var CitiesService = (function (_super) {
    __extends(CitiesService, _super);
    function CitiesService(http, localStorage) {
        _super.call(this, http, localStorage);
        this.http = http;
        this.localStorage = localStorage;
        // Cities array
        this.cities = [];
    }
    // getCategories function: obtain information of categories in Botica store
    CitiesService.prototype.getCities = function (applicationId) {
        var _this = this;
        this.cities = [];
        // Initial value to the observer is null
        var observer = new BehaviorSubject(null);
        this.getBase('application/' + applicationId + '/cities/active/', null)
            .subscribe(function (cities) {
            for (var _i = 0, _a = cities; _i < _a.length; _i++) {
                var cit = _a[_i];
                var city = new CityModel(cit);
                _this.cities.push(city);
            }
            observer.next(_this.cities);
        }, function (error) {
            observer.next(error);
        });
        return observer;
    };
    CitiesService.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    CitiesService.ctorParameters = [
        { type: Http, },
        { type: LocalStorageService, },
    ];
    return CitiesService;
}(BaseService));
//# sourceMappingURL=cities-provider.js.map