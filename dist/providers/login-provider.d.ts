import 'rxjs/Rx';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Http } from '@angular/http';
import { LocalStorageService } from 'angular-2-local-storage';
import { BaseService } from './base-provider';
export declare class LoginService extends BaseService {
    http: Http;
    localStorage: LocalStorageService;
    constructor(http: Http, localStorage: LocalStorageService);
    postLoginBotica(baseUrl: any, payload: any): BehaviorSubject<any>;
    authFacebook(baseUrl: any, payload: any, observer: any): void;
    authGoogle(baseUrl: any, payload: any, observer: any): void;
    postloginAfterRegisterGoogle(baseUrl: any, payload: any): BehaviorSubject<any>;
    postLoginAfterRegisterFacebook(baseUrl: any, payload: any): BehaviorSubject<any>;
    forgotPassword(baseUrl: any, payload: any): BehaviorSubject<any>;
}
