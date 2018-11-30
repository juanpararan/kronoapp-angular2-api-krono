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
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { LocalStorageService } from 'angular-2-local-storage';
// Providers
import { BaseService } from './base-provider';
// Models
import { ProductModel } from '../models/productModel';
var ProductsService = (function (_super) {
    __extends(ProductsService, _super);
    function ProductsService(http, localStorage) {
        var _this = _super.call(this, http, localStorage) || this;
        _this.http = http;
        _this.localStorage = localStorage;
        _this.loadedProduct = new BehaviorSubject(null);
        // Products array from subcategory
        _this.products = [];
        // Products array from seach
        _this.productsSought = [];
        // Products array from tag
        _this.productsTags = [];
        _this.searching = false;
        return _this;
    }
    // getStoreProducts function: obtain information of products from specific subcategory in Botica store
    // getStoreProducts function: obtain information of products from specific subcategory in Botica store
    ProductsService.prototype.getProducts = 
    // getStoreProducts function: obtain information of products from specific subcategory in Botica store
    function (baseUrl, chainId, storeId, categId, subcategId, ini, fin) {
        var _this = this;
        this.products = [];
        var observer = new BehaviorSubject(null);
        this.getBase(baseUrl, 'chain/' + chainId + '/store/' + storeId + '/category/'
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
    // getProductsPerTag function: obtain information of products from specific subcategory and tag
    //                             in Botica store
    ProductsService.prototype.getProductsPerTag = 
    // getProductsPerTag function: obtain information of products from specific subcategory and tag
    //                             in Botica store
    function (baseUrl, chainId, storeId, categId, subcategId, tagId, ini, fin) {
        var _this = this;
        this.productsTags = [];
        var observer = new BehaviorSubject(null);
        this.getBase(baseUrl, 'chain/' + chainId + '/store/' + storeId + '/category/'
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
    // getStoreProduct function: obtain information of product in Botica store
    ProductsService.prototype.getProduct = 
    // getStoreProduct function: obtain information of product in Botica store
    function (baseUrl, chainId, storeId, productId) {
        var observer = new BehaviorSubject(null);
        this.getBase(baseUrl, 'chain/' + chainId + '/store/' + storeId + '/product/' + productId + '/', null)
            .subscribe(function (product) {
            var productStore = new ProductModel(product);
            observer.next(productStore);
        }, function (error) {
            observer.next(error);
        });
        return observer;
    };
    // getProductsSought function: obtain products with search in backend
    // getProductsSought function: obtain products with search in backend
    ProductsService.prototype.getProductsSought = 
    // getProductsSought function: obtain products with search in backend
    function (baseUrl, chainId, storeId, text, ini, fin) {
        var _this = this;
        // Initial value to the observer is null
        var observer = new BehaviorSubject(null);
        if (text.length > 3) {
            this.searching = true;
            this.productsSought = [];
            this.getBase(baseUrl, 'chain/' + chainId + '/store/' + storeId +
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
    // filterProducts function: filter products by the name or description
    ProductsService.prototype.filterProducts = 
    // filterProducts function: filter products by the name or description
    function (products, searchText) {
        return products.filter(function (product) {
            return ((product.name.toLowerCase().indexOf(searchText.toLowerCase()) > -1) ||
                (product.description.toLowerCase().indexOf(searchText.toLowerCase()) > -1));
        });
    };
    ProductsService.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    ProductsService.ctorParameters = function () { return [
        { type: Http, },
        { type: LocalStorageService, },
    ]; };
    return ProductsService;
}(BaseService));
export { ProductsService };
//# sourceMappingURL=products-provider.js.map