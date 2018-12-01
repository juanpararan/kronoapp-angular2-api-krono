import { Http } from '@angular/http';
import { LocalStorageService } from 'angular-2-local-storage';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { BaseService } from './base-provider';
import { CategoryModel } from '../models/categoryModel';
export declare class CategoriesService extends BaseService {
    http: Http;
    localStorage: LocalStorageService;
    categories: CategoryModel[];
    constructor(http: Http, localStorage: LocalStorageService);
    getCategories(baseUrl: any, chainId: any, storeId: any): BehaviorSubject<any>;
    getCategory(baseUrl: any, chainId: any, storeId: any, categoryId: any): BehaviorSubject<any>;
}
