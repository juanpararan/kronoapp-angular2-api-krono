import { Injectable } from '@angular/core';
import 'rxjs/Rx';
import { Http } from '@angular/http';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { LocalStorageService } from 'angular-2-local-storage';

// Providers
import { BaseService } from './base-provider';

// Models
import { UserModel } from '../models/userModel';

@Injectable()
export class UsersService extends BaseService {

    // user array
    user: UserModel[] = [];

    constructor(public http: Http, public localStorage: LocalStorageService) {
        super(http, localStorage);
    }

    // getUser function: obtain information of user in Botica Junin
    getUser(baseUrl, applicationId, userId) {

        // Initial value to the observer is null
        let observer = new BehaviorSubject(null);

        this.getBase(baseUrl , 'application/' + applicationId + '/client/' + userId + '/', 
                     this.headerAuthentication())
            .subscribe(userData => {
                var user: UserModel = new UserModel(userData);
                observer.next(user);
            }, error => {
                observer.next(error);
            });
         return observer;             
    }

    // postUser function: create new user in application Botica
    postUser(baseUrl, payload, task) {

        // Initial value to the observer is null
        let observer = new BehaviorSubject(null);

        payload['task'] = task;

        console.log("PAYLOAD USER REGISTRO", payload);
        this.saveBase(baseUrl , 'application/clients/', payload, null)
            .subscribe(data => {
                observer.next(data);
            }, error => {
                observer.next(error);
            });
        return observer;        
    }

    // postAddress function: create or delete address in
    //                       specific client profile
    postAddress(baseUrl,payload, task) {

        // Initial value to the observer is null
        let observer = new BehaviorSubject(null);

        payload['task'] = task;

        console.log("PAYLOAD ADDRESS USER", payload);
        this.saveBase(baseUrl , 'application/client/address/', payload, 
                      this.headerAuthentication())
            .subscribe(data => {
                observer.next(data);
            }, error => {
                observer.next(error);
            });
        return observer;  
    }

}