import { Injectable } from '@angular/core';
import 'rxjs/Rx';
import { Http } from '@angular/http';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { LocalStorageService } from 'angular-2-local-storage';

// Providers
import { BaseService } from './base-provider';

// Models
import { ListModelGeneral } from '../models/listModelGeneral';
import { ListModelSpecific } from '../models/listModelSpecific';

@Injectable()
export class ListsService extends BaseService {

    lists: ListModelGeneral[] = [];

    constructor(public http: Http, public localStorage: LocalStorageService) {
        super(http, localStorage);
    }

    // postListBasket function: create, or delete list in
    //                    specific client
    postListBasket(baseUrl, payload, task) {

        let observer = new BehaviorSubject(null);

        payload['task'] = task;

        console.log("PAYLOAD LIST USER", payload);
        this.saveBase(baseUrl , 'client/store/newlist/basket/', payload, 
                      this.headerAuthentication())
            .subscribe(data => {
                observer.next(data);
            }, error => {
                observer.next(error);
            });  
        return observer;
    }


    // postListOrder function: create, or delete list in
    //                         specific client
    postListOrder(baseUrl,payload, task) {

        let observer = new BehaviorSubject(null);

        payload['task'] = task;

        console.log("PAYLOAD LIST USER", payload);
        this.saveBase(baseUrl , 'client/store/newlist/order/', payload, 
                      this.headerAuthentication())
            .subscribe(data => {
                observer.next(data);
            }, error => {
                observer.next(error);
            });  
        return observer;
    }

    // getLists function: obtain all lists of specific user
    getLists(baseUrl, applicationId, userId, storeId) {

        this.lists = [];

        let observer = new BehaviorSubject(null);

        this.getBase(baseUrl , 'application/' + applicationId + '/client/' + userId
                     + '/store/' + storeId + '/lists/', this.headerAuthentication())
            .subscribe(lists => {
                for (var list of <ListModelGeneral[]>lists) {
                    var listClient: ListModelGeneral = new ListModelGeneral(list);
                    this.lists.push(listClient);
                }
                observer.next(this.lists);
            }, error => {
                observer.next(error);
            });
        return observer;   
    }

    // getList function: obtain specific list of specific user
    getList(baseUrl, applicationId, userId, storeId, listId) {

        let observer = new BehaviorSubject(null);

        this.getBase(baseUrl , 'application/' + applicationId + '/client/' + userId
                     + '/store/' + storeId + '/list/' + listId + '/', this.headerAuthentication())
            .subscribe(list => {
                for (var i of list['items']) {
                    if (i.productId != null) {
                        i.productId['loadedProduct'] = new BehaviorSubject(null);
                    }
                }
                var listClient: ListModelSpecific = new ListModelSpecific(list);
                observer.next(listClient);
            }, error => {
                observer.next(error);
            });
        return observer;   
    }

    // postListDelete function: post client list to delete in backend
    postListDelete(baseUrl, payload, task) {

        let observer = new BehaviorSubject(null);

        payload['task'] = task;

        console.log("PAYLOAD LIST USER", payload);
        this.saveBase(baseUrl , 'client/store/deletelist/', payload, 
                      this.headerAuthentication())
            .subscribe(data => {
                observer.next(data);
            }, error => {
                observer.next(error);
            });  
        return observer;
    }
    
}