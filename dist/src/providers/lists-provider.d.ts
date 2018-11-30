import 'rxjs/Rx';
import { Http } from '@angular/http';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { LocalStorageService } from 'angular-2-local-storage';
import { BaseService } from './base-provider';
import { ListModelGeneral } from '../models/listModelGeneral';
export declare class ListsService extends BaseService {
    http: Http;
    localStorage: LocalStorageService;
    lists: ListModelGeneral[];
    constructor(http: Http, localStorage: LocalStorageService);
    postListBasket(baseUrl: any, payload: any, task: any): BehaviorSubject<any>;
    postListOrder(baseUrl: any, payload: any, task: any): BehaviorSubject<any>;
    getLists(baseUrl: any, applicationId: any, userId: any, storeId: any): BehaviorSubject<any>;
    getList(baseUrl: any, applicationId: any, userId: any, storeId: any, listId: any): BehaviorSubject<any>;
    postListDelete(baseUrl: any, payload: any, task: any): BehaviorSubject<any>;
}
