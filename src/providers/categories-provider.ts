import { Injectable } from '@angular/core';
import 'rxjs/Rx';
import { Http } from '@angular/http';
import { LocalStorageService } from 'angular-2-local-storage';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

// Providers
import { BaseService } from './my-provider';

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
    getCategories(chainId, storeId) {

        this.categories = [];

        // Initial value to the observer is null
        let observer = new BehaviorSubject(null);

        this.getBase('chain/' + chainId + '/store/' + storeId + 
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

}