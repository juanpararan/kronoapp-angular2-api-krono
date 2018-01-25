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
import { CategoryModel } from '../models/categoryModel';
export var CategoriesService = (function (_super) {
    __extends(CategoriesService, _super);
    function CategoriesService(http, localStorage) {
        _super.call(this, http, localStorage);
        this.http = http;
        this.localStorage = localStorage;
        // Categories array
        this.categories = [];
    }
    // getCategories function: obtain information of categories in Botica store
    CategoriesService.prototype.getCategories = function (chainId, storeId) {
        var _this = this;
        this.categories = [];
        // Initial value to the observer is null
        var observer = new BehaviorSubject(null);
        this.getBase('chain/' + chainId + '/store/' + storeId +
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
    CategoriesService.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    CategoriesService.ctorParameters = [
        { type: Http, },
        { type: LocalStorageService, },
    ];
    return CategoriesService;
}(BaseService));
//# sourceMappingURL=categories-provider.js.map