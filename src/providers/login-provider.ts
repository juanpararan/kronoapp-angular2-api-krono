import { Injectable } from '@angular/core';
import 'rxjs/Rx';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Http } from '@angular/http';
import { LocalStorageService } from 'angular-2-local-storage';

// Providers
import { BaseService } from './base-provider';

@Injectable()
export class LoginService extends BaseService {

    userRegister: boolean = false;
    user: any;
    l: any;
    name: any;
    picture: any;
    email: any;

    constructor(public http: Http, 
                public localStorage: LocalStorageService) {
        
        super(http, localStorage);
    }

    // postLoginBotica function: post email and password to authenticate
    postLoginBotica(payload) {

        // Initial value to the observer is null
        let observer = new BehaviorSubject(null);

        console.log("PAYLOAD USER LOGIN BOTICA", payload);
        this.saveBase('api-token-auth-client/', payload, this.headerLogin())
            .subscribe(data => {
                observer.next(data);
            }, error => {
                observer.next(error);
            });
        return observer;        
    }

    authFacebook(payload, observer) {

        this.saveBase('api-token-auth-client-facebook/', payload, this.headerLogin())
            .subscribe(data => {
                this.localStorage.set('facebook', true);
                observer.next(data);
            }, error => {
                observer.next(error);
            });
    }

    authGoogle(payload, observer) {

        this.saveBase('api-token-auth-client-google/', payload, this.headerLogin())
            .subscribe(data => {
                this.localStorage.set('google', true);
                observer.next(data);                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            
            }, error => {
                observer.next(error);
            });
    }

    // postLoginAfterRegisterGoogle function: after register user, login with google
    postloginAfterRegisterGoogle(payload) {

        payload['id_token'] = this.localStorage.get('tokenUser');

        // Initial value to the observer is null
        let observer = new BehaviorSubject(null);

        this.saveBase('api-token-auth-client-google/', payload, this.headerLogin())
            .subscribe(data => {
                observer.next(data);                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            
            }, error => {
                observer.next(error);
            });

        return observer;
    }

    // postLoginAfterRegisterFacebook function: after register user, login with facebook
    postLoginAfterRegisterFacebook(payload) {

        payload['access_token'] = this.localStorage.get('tokenUser');

        // Initial value to the observer is null
        let observer = new BehaviorSubject(null);

        this.saveBase('api-token-auth-client-facebook/', payload, this.headerLogin())
            .subscribe(data => {
                observer.next(data);
            }, error => {
                observer.next(error);
            }); 

        return observer;    
    }

    // forgotPassword function: user forgot password and send to backend
    //                          to verify and send e-mail to recover password
    forgotPassword(payload) {

        // Initial value to the observer is null
        let observer = new BehaviorSubject(null);

        this.saveBase('changepassword/user/application/', payload, this.headerLogin())
            .subscribe(data => {
                observer.next(data);                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            
            }, error => {
                observer.next(error);
            });

        return observer;
    }

}