import 'rxjs/Rx';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Http } from '@angular/http';
import { LocalStorageService } from 'angular-2-local-storage';
import { BaseService } from './base-provider';
export declare class LoginService extends BaseService {
    http: Http;
    localStorage: LocalStorageService;
    userRegister: boolean;
    user: any;
    l: any;
    name: any;
    picture: any;
    email: any;
    constructor(http: Http, localStorage: LocalStorageService);
    postLoginBotica(payload: any): BehaviorSubject<any>;
    authFacebook(payload: any, observer: any): void;
    authGoogle(payload: any, observer: any): void;
    postloginAfterRegisterGoogle(payload: any): BehaviorSubject<any>;
    postLoginAfterRegisterFacebook(payload: any): BehaviorSubject<any>;
    forgotPassword(payload: any): BehaviorSubject<any>;
}
