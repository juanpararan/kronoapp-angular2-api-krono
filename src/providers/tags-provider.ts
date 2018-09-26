import { Injectable } from '@angular/core';
import 'rxjs/Rx';
import { Http } from '@angular/http';
import { LocalStorageService } from 'angular-2-local-storage';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

// Providers
import { BaseService } from './base-provider';

// Models
import { TagModel } from '../models/tagModel';

@Injectable()
export class TagsService extends BaseService {

    // tags array 
    tags: TagModel[] = [];

    constructor(public http: Http, public localStorage: LocalStorageService) {
        super(http, localStorage);
    }

    // getTags function: obtain information of tags in Botica store
    getTags(baseUrl , chainId, storeId, categId, subcategId) {

        this.tags = [];

        let observer = new BehaviorSubject(null);

        this.getBase(baseUrl , 'chain/' + chainId + '/store/' + storeId 
                    + '/category/' + categId + '/subcategory/' + 
                    subcategId + '/tags/active/', null)
            .subscribe(tags => {
                for (var tagObject of <TagModel[]>tags) {
                    var tag: TagModel = new TagModel(tagObject);
                    this.tags.push(tag);  
                }
                observer.next(tags);
            }, error => {
                observer.next(error);
            });
        return observer;
    }
    
}