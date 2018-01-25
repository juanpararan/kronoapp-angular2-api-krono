import { Injectable } from '@angular/core';
import 'rxjs/Rx';
import { Http } from '@angular/http';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { LocalStorageService } from 'angular-2-local-storage';

// Providers
import { BaseService } from './base-provider';

// Models
import { ProductModel } from '../models/productModel';

@Injectable()
export class ProductsService extends BaseService {

    public loadedProduct = new BehaviorSubject(null);
    
    // Products array from subcategory
    products: ProductModel[] = [];

    // Products array from seach
    productsSought: ProductModel[] = [];

    // Products array from tag
    productsTags: ProductModel[] = [];

    searching: boolean = false;

    constructor(public http: Http, public localStorage: LocalStorageService) {
        super(http, localStorage);
    }

    // getStoreProducts function: obtain information of products from specific subcategory in Botica store
    getProducts(chainId, storeId, categId, subcategId, ini, fin) {

        this.products = [];

        let observer = new BehaviorSubject(null);

        this.getBase('chain/' + chainId + '/store/' + storeId + '/category/' 
                     + categId + '/subcategory/' + subcategId + '/products/active/'
                    + ini + '/' + fin + '/', null)
            .subscribe(products => {
                for (var prod of <ProductModel[]>products) {
                    var product: ProductModel = new ProductModel(prod);
                    this.products.push(product);
                }
                observer.next(this.products);
            }, error => {
                observer.next(error);
            });
        return observer;   
    }

    // getProductsPerTag function: obtain information of products from specific subcategory and tag
    //                             in Botica store
    getProductsPerTag(chainId, storeId, categId, subcategId, tagId, ini, fin) {

        this.productsTags = [];

        let observer = new BehaviorSubject(null);

        this.getBase('chain/' + chainId + '/store/' + storeId + '/category/' 
                     + categId + '/subcategory/' + subcategId + '/tag/' + tagId +
                     '/products/active/' + ini + '/' + fin + '/', null)
            .subscribe(products => {
                for (var prod of <ProductModel[]>products) {
                    var product: ProductModel = new ProductModel(prod);
                    this.productsTags.push(product);
                }
                observer.next(this.productsTags);
            }, error => {
                observer.next(error);
            });
        return observer;
    }

    // getStoreProduct function: obtain information of product in Botica store
    getProduct(chainId, storeId, productId) {

        let observer = new BehaviorSubject(null);

        this.getBase('chain/' + chainId + '/store/' + storeId + '/product/' + productId + '/', null)
            .subscribe(product => {
                var productStore: ProductModel = new ProductModel(product);
                observer.next(productStore);
            }, error => {
                observer.next(error);
            });
        return observer;   
    }

    // getProductsSought function: obtain products with search in backend
    getProductsSought(chainId, storeId, text, ini, fin) {

        // Initial value to the observer is null
        let observer = new BehaviorSubject(null);

        if (text.length > 3) {

            this.searching = true;
            this.productsSought = [];

            this.getBase('chain/' + chainId + '/store/' + storeId + 
                         '/products/active/' + ini + '/' + fin + '/' + encodeURI(text) + '/', null)
                .subscribe(products => {
                    this.searching = false;
                    for (var prod of <ProductModel[]>products) {
                        var product: ProductModel = new ProductModel(prod);
                        this.productsSought.push(product);
                    }  
                    observer.next(this.productsSought);                   
                }, error => {
                    observer.next(error);
                });
            return observer;
        }

        else {
            return observer;
        }
        
    }

    // filterProducts function: filter products by the name or description
    filterProducts(products, searchText) {

        return products.filter((product) => {
            return ( (product.name.toLowerCase().indexOf(searchText.toLowerCase()) > -1) || 
                     (product.description.toLowerCase().indexOf(searchText.toLowerCase()) > -1) );
        });     
    }  

}