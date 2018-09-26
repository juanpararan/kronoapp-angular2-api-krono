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
import { SubcategoryModel } from '../models/subcategoryModel';
export var SubcategoriesService = (function (_super) {
    __extends(SubcategoriesService, _super);
    function SubcategoriesService(http, localStorage) {
        _super.call(this, http, localStorage);
        this.http = http;
        this.localStorage = localStorage;
        // Subcategories array 
        this.subcategories = [];
    }
    // getSubcategories function: obtain information of subcategories in Botica store
    SubcategoriesService.prototype.getSubcategories = function (baseUrl, chainId, storeId, categId) {
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
    SubcategoriesService.prototype.getSubcategory = function (baseUrl, chainId, storeId, categoryId, subcategoryId) {
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
    SubcategoriesService.ctorParameters = [
        { type: Http, },
        { type: LocalStorageService, },
    ];
    return SubcategoriesService;
}(BaseService));
//# sourceMappingURL=subcategories-provider.js.map