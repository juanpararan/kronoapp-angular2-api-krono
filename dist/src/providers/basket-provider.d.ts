import 'rxjs/Rx';
import { Http } from '@angular/http';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { LocalStorageService } from 'angular-2-local-storage';
import { BaseService } from './base-provider';
export declare class BasketService extends BaseService {
    http: Http;
    localStorage: LocalStorageService;
    itemPost: any;
    constructor(http: Http, localStorage: LocalStorageService);
    getBasket(baseUrl: any, applicationId: any, userId: any, storeId: any): BehaviorSubject<any>;
    validVersion(baseUrl: any, applicationId: any): BehaviorSubject<any>;
    postItemsDelete(baseUrl: any, payload: any): BehaviorSubject<any>;
    postItem(baseUrl: any, item: any, itemId: any, typeTask: any): any;
}
