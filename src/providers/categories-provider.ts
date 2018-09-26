import { Injectable } from '@angular/core';
import 'rxjs/Rx';
import { Http } from '@angular/http';
import { LocalStorageService } from 'angular-2-local-storage';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

// Providers
import { BaseService } from './base-provider';

// Models
import { CategoryModel } from '../models/categoryModel';

@Injectable()
export class CategoriesService extends BaseService {

    // Categories array
    categories: CategoryModel[] = [];

    constructor(public http: Http, public localStorage: LocalStorageService) {
        super(http, localStorage);
    }

    // getCategories function: obtain information of categories in Botica store
    getCategories(baseUrl, chainId, storeId) {

        this.categories = [];

        // Initial value to the observer is null
        let observer = new BehaviorSubject(null);

        this.getBase(baseUrl , 'chain/' + chainId + '/store/' + storeId + 
                     '/categories/active/', null)
            .subscribe(categories => {
                for (var cat of <CategoryModel[]>categories) {
                    var category: CategoryModel = new CategoryModel(cat);
                    this.categories.push(category);
                }
                observer.next(this.categories);                                              
            }, error => {
                observer.next(error);
            }); 
        return observer;
    }

    // getCategories function: obtain information of category in Krono Market
    getCategory(baseUrl, chainId, storeId, categoryId) {

        // Initial value to the observer is null
        let observer = new BehaviorSubject(null);

        this.getBase(baseUrl , 'chain/' + chainId + '/store/' + storeId + 
                     '/category/' + categoryId, null)
            .subscribe(categoryData => {
                let category: CategoryModel = new CategoryModel(categoryData);
                observer.next(category);
            }, error => {
                observer.next(error);
            });
        return observer;
    }

}