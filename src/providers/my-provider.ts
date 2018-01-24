import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { LocalStorageService } from 'angular-2-local-storage';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/Rx';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';

import { JwtHelper } from "angular2-jwt";
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class MyProvider {
  
	// Base path
    path: string = "https://api.kronogroup.co/";

    info: any;
    headerObject: any;

    jwtHelper = new JwtHelper();

    constructor(public http: Http, public localStorage: LocalStorageService) {

    }

    // getBase function: get information from server with base path url 
    getBase(path2, options=null) {

        let d = new Date();
        let actualTime = Math.floor(d.getTime()/1000);
        let tokenExp: any = this.localStorage.get('tokenExp');

        if ( (this.localStorage.get('tokenExp') != null) && 
             (actualTime >= parseInt(tokenExp)-60) ) {
            console.log("VOY A REFRESCAR TOKEN EN GET")
            // Initial value to the observer is null
            return new Observable(observer => {
                this.postRefreshToken().subscribe(data => {
                    if (data) {
                        this.http.get(this.path + path2, this.headerAuthentication())
                        .map(res => res.json())
                        .catch(this.handleError)
                        .retry(5)
                        .subscribe( res => observer.next(res))
                    }
                })
                return observer;    
            });
        }
        else {
            return this.http.get(this.path + path2, options)
                .map(res => res.json())
                .catch(this.handleError)
                .retry(5)  
        }
 
    }

    // saveBase function: post in server with base path url
    saveBase(path2, payload, options=null) {

        let d = new Date();
        let actualTime = Math.floor(d.getTime()/1000);

        if ( (this.localStorage.get('tokenExp') != null) && 
             (actualTime >= this.localStorage.get('tokenExp')) ) {
            console.log("VOY A REFRESCAR TOKEN EN POST")
            // Initial value to the observer is null
            return new Observable(observer => {
                this.postRefreshToken().subscribe(data => {
                    if (data) {
                        this.http.post(this.path + path2, payload, this.headerAuthentication())
                        .map(res => res.json())
                        .catch(this.handleError)
                        .retry(5) 
                        .subscribe( res => observer.next(res))
                    }
                })
                return observer;    
            });
        }
        else {
            return this.http.post(this.path + path2, payload, options)
                        .map(res => res.json())
                        .catch(this.handleError)
                        .retry(5)  
        }
 
    }

    // handleError function: throw error catched to specific service and specific component,
    //                       server error or client error
    handleError = (response: Response) => {

        console.log("ERROR EN HANDLE ERROR", response);

        // If error is SERVER ERROR or CLIENT ERROR
        if ( (response.status >= 401 && response.status <= 511) || (response.status >= 2 && response.status <= 324)) {
            return Observable.throw({'error': response.status});
        }

        // If error is created in backend
        else {

            // Signature has expired. Refresh token
            /*if (response.json().error == 9) {


            }*/

            // Refresh has expired. Logout
            if (response.json().error == 14) {
                console.log("ME DIO ERROR 14 CERRARE SESION")
                this.localStorage.remove('userId');
                this.localStorage.remove('basket');
                this.localStorage.remove('basketId');
                this.localStorage.remove('tokenUser');
                this.localStorage.remove('tokenExp');
                console.log("response de error 14", response.json())
                return Observable.throw(response.json());
            }

            // Others errors
            else {
                return Observable.throw(response.json());
            }
        }  
    }

    // postRefreshToken function: if token of user is expired, send post to 
    //                            request new token
    postRefreshToken() {

        // Initial value to the observer is null
        let observer = new BehaviorSubject(null);

        let postToken = {
            'token': this.localStorage.get('tokenUser')
        }

        this.http.post(this.path + 'api-token-refresh-client/', postToken, null)
                .map(res => res.json())
                .catch(this.handleError)
                .subscribe(data => {
                    console.log("REFRESQUE TOKEN", data);
                    this.localStorage.set('tokenUser', data.token);
                    let user = this.jwtHelper.decodeToken(data.token);
                    this.localStorage.set('tokenExp', user.exp);
                    observer.next(data);
                }, error => {
                    console.log("Error", error)
                    observer.next(error);
                });
            return observer;
    }

    // headerLogin function: create header object to pass like header 
    //                       in every login post
    headerLogin = () => {

        let header = {
            'Content-Type': 'application/json'
        };

        this.headerObject = {
            headers: new Headers(header)
        };

        return this.headerObject;
    }

    // headerAuthentication function: header neccesary to every request in the app with
    //                                client in specific
    headerAuthentication = () => {

        let headers = new Headers({
            'Authorization': "JWT " + this.localStorage.get('tokenUser'),
            'Content-Type': 'application/json'
        });

        let options = new RequestOptions({ headers: headers })

        return options;
    }

}