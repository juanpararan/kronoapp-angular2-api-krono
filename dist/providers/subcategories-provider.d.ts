import 'rxjs/Rx';
import { Http } from '@angular/http';
import { LocalStorageService } from 'angular-2-local-storage';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { BaseService } from './base-provider';
import { SubcategoryModel } from '../models/subcategoryModel';
export declare class SubcategoriesService extends BaseService {
    http: Http;
    localStorage: LocalStorageService;
    subcategories: SubcategoryModel[];
    constructor(http: Http, localStorage: LocalStorageService);
    getSubcategories(chainId: any, storeId: any, categId: any): BehaviorSubject<any>;
}
