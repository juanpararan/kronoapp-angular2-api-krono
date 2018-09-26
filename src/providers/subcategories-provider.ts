import { Injectable } from '@angular/core';
import 'rxjs/Rx';
import { Http } from '@angular/http';
import { LocalStorageService } from 'angular-2-local-storage';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

// Providers
import { BaseService } from './base-provider';

// Models
import { SubcategoryModel } from '../models/subcategoryModel';

@Injectable()
export class SubcategoriesService extends BaseService {

    // Subcategories array 
    subcategories: SubcategoryModel[] = [];

    constructor(public http: Http, public localStorage: LocalStorageService) {
        super(http, localStorage);
    }

    // getSubcategories function: obtain information of subcategories in Botica store
    getSubcategories(baseUrl, chainId, storeId, categId) {

        this.subcategories = [];

        // Initial value to the observer is null
        let observer = new BehaviorSubject(null);

        this.getBase(baseUrl, 'chain/' + chainId + '/store/' + storeId + 
                     '/category/' + categId + '/subcategories/active/', null)
            .subscribe(subcategories => {
                for (var subcat of <SubcategoryModel[]>subcategories) {
                    var subcategory: SubcategoryModel = new SubcategoryModel(subcat);
                    this.subcategories.push(subcategory);
                }
                observer.next(this.subcategories)  
            }, error => {
                observer.next(error);
            });
        return observer;
    }
    
    // getSubcategory function: obtain information of subcategory in Krono Market
    getSubcategory(baseUrl, chainId, storeId, categoryId, subcategoryId) {

        // Initial value to the observer is null
        let observer = new BehaviorSubject(null);

        this.getBase(baseUrl , 'chain/' + chainId + '/store/' + storeId + 
                     '/category/' + categoryId + '/subcategory/' +
                     subcategoryId, null)
            .subscribe(subcategoryData => {
                let subcategory: SubcategoryModel = new SubcategoryModel(subcategoryData);
                observer.next(subcategory);
            }, error => {
                observer.next(error);
            });
        return observer;
    }
    
}