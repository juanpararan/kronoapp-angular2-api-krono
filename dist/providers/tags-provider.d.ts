import 'rxjs/Rx';
import { Http } from '@angular/http';
import { LocalStorageService } from 'angular-2-local-storage';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { BaseService } from './my-provider';
import { TagModel } from '../models/tagModel';
export declare class TagsService extends BaseService {
    http: Http;
    localStorage: LocalStorageService;
    tags: TagModel[];
    constructor(http: Http, localStorage: LocalStorageService);
    getTags(chainId: any, storeId: any, categId: any, subcategId: any): BehaviorSubject<any>;
}
