import 'rxjs/Rx';
import { Http } from '@angular/http';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { LocalStorageService } from 'angular-2-local-storage';
import { BaseService } from './base-provider';
import { ProductModel } from '../models/productModel';
export declare class ProductsService extends BaseService {
    http: Http;
    localStorage: LocalStorageService;
    loadedProduct: BehaviorSubject<any>;
    products: ProductModel[];
    productsSought: ProductModel[];
    productsTags: ProductModel[];
    searching: boolean;
    constructor(http: Http, localStorage: LocalStorageService);
    getProducts(baseUrl: any, chainId: any, storeId: any, categId: any, subcategId: any, ini: any, fin: any): BehaviorSubject<any>;
    getProductsPerTag(baseUrl: any, chainId: any, storeId: any, categId: any, subcategId: any, tagId: any, ini: any, fin: any): BehaviorSubject<any>;
    getProduct(baseUrl: any, chainId: any, storeId: any, productId: any): BehaviorSubject<any>;
    getProductsSought(baseUrl: any, chainId: any, storeId: any, text: any, ini: any, fin: any): BehaviorSubject<any>;
    filterProducts(products: any, searchText: any): any;
}
