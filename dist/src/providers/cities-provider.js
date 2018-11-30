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
import { Http } from '@angular/http';
import { LocalStorageService } from 'angular-2-local-storage';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
// Providers
import { BaseService } from './base-provider';
// Models
import { CityModel } from '../models/cityModel';
var CitiesService = (function (_super) {
    __extends(CitiesService, _super);
    function CitiesService(http, localStorage) {
        var _this = _super.call(this, http, localStorage) || this;
        _this.http = http;
        _this.localStorage = localStorage;
        // Cities array
        _this.cities = [];
        return _this;
    }
    // getCategories function: obtain information of categories in Botica store
    // getCategories function: obtain information of categories in Botica store
    CitiesService.prototype.getCities = 
    // getCategories function: obtain information of categories in Botica store
    function (baseUrl, applicationId) {
        var _this = this;
        this.cities = [];
        // Initial value to the observer is null
        var observer = new BehaviorSubject(null);
        this.getBase(baseUrl, 'application/' + applicationId + '/cities/active/', null)
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
    CitiesService.ctorParameters = function () { return [
        { type: Http, },
        { type: LocalStorageService, },
    ]; };
    return CitiesService;
}(BaseService));
export { CitiesService };
//# sourceMappingURL=cities-provider.js.map