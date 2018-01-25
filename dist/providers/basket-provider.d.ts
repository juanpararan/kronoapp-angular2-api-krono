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
    getBasket(applicationId: any, userId: any, storeId: any): BehaviorSubject<any>;
    postItemsDelete(payload: any): BehaviorSubject<any>;
    postItem(item: any, itemId: any, typeTask: any): any;
}
