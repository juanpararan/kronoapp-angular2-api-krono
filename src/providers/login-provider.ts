/*import { Injectable } from '@angular/core';
import 'rxjs/Rx';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Http } from '@angular/http';
import { LocalStorageService } from 'angular-2-local-storage';

// Plugins
import { GooglePlus } from '@ionic-native/google-plus';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';

// Providers
import { BaseService } from './my-provider';

@Injectable()
export class LoginService extends BaseService {

    userRegister: boolean = false;
    user: any;
    l: any;
    name: any;
    picture: any;
    email: any;

    constructor(public http: Http, 
                public localStorage: LocalStorageService,
                public googlePlus: GooglePlus, 
                public facebook: Facebook) {
        
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

    // postLoginFacebook function: post email and password to authenticate
    postLoginFacebook(payload) {

        // Initial value to the observer is null
        let observer = new BehaviorSubject(null);

        this.facebook.login(['public_profile', 'email'])
            .then((res: FacebookLoginResponse) => {

                this.facebook.api('me?fields=id,name,email,first_name,picture.width(720).height(720).as(picture_large)', []).then(profile => {

                    // Obtain information user to show in register view in profile
                    this.email = profile['email'];
                    this.picture = profile['picture_large']['data']['url'];
                    this.name = profile['first_name'];
                });
                
                payload['access_token'] = res.authResponse.accessToken;
                this.localStorage.set('tokenUser', res.authResponse.accessToken);

                this.saveBase('api-token-auth-client-facebook/', payload, this.headerLogin())
                    .subscribe(data => {
                        this.localStorage.set('facebook', true);
                        observer.next(data);
                    }, error => {
                        observer.next(error);
                    });
            })
            .catch(error => {
                console.log('Error logging into Facebook', error);
                observer.next(error);
            });

        return observer;
    }

    // postLoginGoogle function: post email and password to authenticate
    postLoginGoogle(payload, googleWebKey) {

        // Initial value to the observer is null
        let observer = new BehaviorSubject(null);

        // webClientId is WEB CLIENT ID, NOT ANDROID CLIENT ID (in developers.google)
        this.googlePlus.login({
            'webClientId': googleWebKey,
            'offline': true
        }).then(res => {
            payload['id_token'] = res.idToken;
            this.localStorage.set('tokenUser', res.idToken);

            // Obtain information user to show in register view in profile
            this.email = res.email;
            this.picture = res.imageUrl;
            this.name = res.displayName;

            this.saveBase('api-token-auth-client-google/', payload, this.headerLogin())
                .subscribe(data => {
                    this.localStorage.set('google', true);
                    observer.next(data);                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            
                }, error => {
                    observer.next(error);
                });
        })
        .catch(error => {
            console.error(error);
            observer.next(error);
        });

        return observer;
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

    // logoutFacebook void: logout from facebook successfully
    logoutFacebook() {
        this.facebook.logout().then(res => {
            //alert(JSON.stringify(res));
        }, error => {
            //alert(error);
        });
    }

    // disconnectGoogle void: logout and disconnect account from 
    //                        google successfully
    disconnectGoogle() {
        this.googlePlus.disconnect().then(res => {
            //alert(JSON.stringify(res));
        }, error => {
            //alert(error);
        });
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

}*/