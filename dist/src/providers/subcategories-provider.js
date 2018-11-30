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
import { SubcategoryModel } from '../models/subcategoryModel';
var SubcategoriesService = (function (_super) {
    __extends(SubcategoriesService, _super);
    function SubcategoriesService(http, localStorage) {
        var _this = _super.call(this, http, localStorage) || this;
        _this.http = http;
        _this.localStorage = localStorage;
        // Subcategories array
        _this.subcategories = [];
        return _this;
    }
    // getSubcategories function: obtain information of subcategories in Botica store
    // getSubcategories function: obtain information of subcategories in Botica store
    SubcategoriesService.prototype.getSubcategories = 
    // getSubcategories function: obtain information of subcategories in Botica store
    function (baseUrl, chainId, storeId, categId) {
        var _this = this;
        this.subcategories = [];
        // Initial value to the observer is null
        var observer = new BehaviorSubject(null);
        this.getBase(baseUrl, 'chain/' + chainId + '/store/' + storeId +
            '/category/' + categId + '/subcategories/active/', null)
            .subscribe(function (subcategories) {
            for (var _i = 0, _a = subcategories; _i < _a.length; _i++) {
                var subcat = _a[_i];
                var subcategory = new SubcategoryModel(subcat);
                _this.subcategories.push(subcategory);
            }
            observer.next(_this.subcategories);
        }, function (error) {
            observer.next(error);
        });
        return observer;
    };
    // getSubcategory function: obtain information of subcategory in Krono Market
    // getSubcategory function: obtain information of subcategory in Krono Market
    SubcategoriesService.prototype.getSubcategory = 
    // getSubcategory function: obtain information of subcategory in Krono Market
    function (baseUrl, chainId, storeId, categoryId, subcategoryId) {
        // Initial value to the observer is null
        var observer = new BehaviorSubject(null);
        this.getBase(baseUrl, 'chain/' + chainId + '/store/' + storeId +
            '/category/' + categoryId + '/subcategory/' +
            subcategoryId, null)
            .subscribe(function (subcategoryData) {
            var subcategory = new SubcategoryModel(subcategoryData);
            observer.next(subcategory);
        }, function (error) {
            observer.next(error);
        });
        return observer;
    };
    SubcategoriesService.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    SubcategoriesService.ctorParameters = function () { return [
        { type: Http, },
        { type: LocalStorageService, },
    ]; };
    return SubcategoriesService;
}(BaseService));
export { SubcategoriesService };
//# sourceMappingURL=subcategories-provider.js.map