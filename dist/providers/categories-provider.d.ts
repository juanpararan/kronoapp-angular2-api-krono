import 'rxjs/Rx';
import { Http } from '@angular/http';
import { LocalStorageService } from 'angular-2-local-storage';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { MyProvider } from './my-provider';
import { CategoryModel } from '../models/categoryModel';
export declare class CategoriesProvider extends MyProvider {
    http: Http;
    localStorage: LocalStorageService;
    categories: CategoryModel[];
    constructor(http: Http, localStorage: LocalStorageService);
    getCategories(chainId: any, storeId: any): BehaviorSubject<any>;
}
