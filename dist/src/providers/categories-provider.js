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
//import 'rxjs/Rx';
import { Http } from '@angular/http';
import { LocalStorageService } from 'angular-2-local-storage';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
// Providers
import { BaseService } from './base-provider';
// Models
import { CategoryModel } from '../models/categoryModel';
var CategoriesService = (function (_super) {
    __extends(CategoriesService, _super);
    function CategoriesService(http, localStorage) {
        var _this = _super.call(this, http, localStorage) || this;
        _this.http = http;
        _this.localStorage = localStorage;
        // Categories array
        _this.categories = [];
        return _this;
    }
    // getCategories function: obtain information of categories in Botica store
    // getCategories function: obtain information of categories in Botica store
    CategoriesService.prototype.getCategories = 
    // getCategories function: obtain information of categories in Botica store
    function (baseUrl, chainId, storeId) {
        var _this = this;
        this.categories = [];
        // Initial value to the observer is null
        var observer = new BehaviorSubject(null);
        this.getBase(baseUrl, 'chain/' + chainId + '/store/' + storeId +
            '/categories/active/', null)
            .subscribe(function (categories) {
            for (var _i = 0, _a = categories; _i < _a.length; _i++) {
                var cat = _a[_i];
                var category = new CategoryModel(cat);
                _this.categories.push(category);
            }
            observer.next(_this.categories);
        }, function (error) {
            observer.next(error);
        });
        return observer;
    };
    // getCategories function: obtain information of category in Krono Market
    // getCategories function: obtain information of category in Krono Market
    CategoriesService.prototype.getCategory = 
    // getCategories function: obtain information of category in Krono Market
    function (baseUrl, chainId, storeId, categoryId) {
        // Initial value to the observer is null
        var observer = new BehaviorSubject(null);
        this.getBase(baseUrl, 'chain/' + chainId + '/store/' + storeId +
            '/category/' + categoryId, null)
            .subscribe(function (categoryData) {
            var category = new CategoryModel(categoryData);
            observer.next(category);
        }, function (error) {
            observer.next(error);
        });
        return observer;
    };
    CategoriesService.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    CategoriesService.ctorParameters = function () { return [
        { type: Http, },
        { type: LocalStorageService, },
    ]; };
    return CategoriesService;
}(BaseService));
export { CategoriesService };
//# sourceMappingURL=categories-provider.js.map