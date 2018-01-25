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
import { ProductModel } from '../models/productModel';
export var ProductsService = (function (_super) {
    __extends(ProductsService, _super);
    function ProductsService(http, localStorage) {
        _super.call(this, http, localStorage);
        this.http = http;
        this.localStorage = localStorage;
        this.loadedProduct = new BehaviorSubject(null);
        // Products array from subcategory
        this.products = [];
        // Products array from seach
        this.productsSought = [];
        // Products array from tag
        this.productsTags = [];
        this.searching = false;
    }
    // getStoreProducts function: obtain information of products from specific subcategory in Botica store
    ProductsService.prototype.getProducts = function (chainId, storeId, categId, subcategId, ini, fin) {
        var _this = this;
        this.products = [];
        var observer = new BehaviorSubject(null);
        this.getBase('chain/' + chainId + '/store/' + storeId + '/category/'
            + categId + '/subcategory/' + subcategId + '/products/active/'
            + ini + '/' + fin + '/', null)
            .subscribe(function (products) {
            for (var _i = 0, _a = products; _i < _a.length; _i++) {
                var prod = _a[_i];
                var product = new ProductModel(prod);
                _this.products.push(product);
            }
            observer.next(_this.products);
        }, function (error) {
            observer.next(error);
        });
        return observer;
    };
    // getProductsPerTag function: obtain information of products from specific subcategory and tag
    //                             in Botica store
    ProductsService.prototype.getProductsPerTag = function (chainId, storeId, categId, subcategId, tagId, ini, fin) {
        var _this = this;
        this.productsTags = [];
        var observer = new BehaviorSubject(null);
        this.getBase('chain/' + chainId + '/store/' + storeId + '/category/'
            + categId + '/subcategory/' + subcategId + '/tag/' + tagId +
            '/products/active/' + ini + '/' + fin + '/', null)
            .subscribe(function (products) {
            for (var _i = 0, _a = products; _i < _a.length; _i++) {
                var prod = _a[_i];
                var product = new ProductModel(prod);
                _this.productsTags.push(product);
            }
            observer.next(_this.productsTags);
        }, function (error) {
            observer.next(error);
        });
        return observer;
    };
    // getStoreProduct function: obtain information of product in Botica store
    ProductsService.prototype.getProduct = function (chainId, storeId, productId) {
        var observer = new BehaviorSubject(null);
        this.getBase('chain/' + chainId + '/store/' + storeId + '/product/' + productId + '/', null)
            .subscribe(function (product) {
            var productStore = new ProductModel(product);
            observer.next(productStore);
        }, function (error) {
            observer.next(error);
        });
        return observer;
    };
    // getProductsSought function: obtain products with search in backend
    ProductsService.prototype.getProductsSought = function (chainId, storeId, text, ini, fin) {
        var _this = this;
        // Initial value to the observer is null
        var observer = new BehaviorSubject(null);
        if (text.length > 3) {
            this.searching = true;
            this.productsSought = [];
            this.getBase('chain/' + chainId + '/store/' + storeId +
                '/products/active/' + ini + '/' + fin + '/' + encodeURI(text) + '/', null)
                .subscribe(function (products) {
                _this.searching = false;
                for (var _i = 0, _a = products; _i < _a.length; _i++) {
                    var prod = _a[_i];
                    var product = new ProductModel(prod);
                    _this.productsSought.push(product);
                }
                observer.next(_this.productsSought);
            }, function (error) {
                observer.next(error);
            });
            return observer;
        }
        else {
            return observer;
        }
    };
    // filterProducts function: filter products by the name or description
    ProductsService.prototype.filterProducts = function (products, searchText) {
        return products.filter(function (product) {
            return ((product.name.toLowerCase().indexOf(searchText.toLowerCase()) > -1) ||
                (product.description.toLowerCase().indexOf(searchText.toLowerCase()) > -1));
        });
    };
    ProductsService.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    ProductsService.ctorParameters = [
        { type: Http, },
        { type: LocalStorageService, },
    ];
    return ProductsService;
}(BaseService));
//# sourceMappingURL=products-provider.js.map