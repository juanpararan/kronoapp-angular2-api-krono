import 'rxjs/Rx';
import { Http } from '@angular/http';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { LocalStorageService } from 'angular-2-local-storage';
import { BaseService } from './base-provider';
import { UserModel } from '../models/userModel';
export declare class UsersService extends BaseService {
    http: Http;
    localStorage: LocalStorageService;
    user: UserModel[];
    constructor(http: Http, localStorage: LocalStorageService);
    getUser(applicationId: any, userId: any): BehaviorSubject<any>;
    postUser(payload: any, task: any): BehaviorSubject<any>;
    postAddress(payload: any, task: any): BehaviorSubject<any>;
}
