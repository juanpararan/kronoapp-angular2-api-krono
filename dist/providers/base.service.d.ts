import { Http, Response, RequestOptions } from '@angular/http';
import { LocalStorageService } from 'angular-2-local-storage';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/Rx';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { JwtHelper } from "angular2-jwt";
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
export declare class BaseService {
    http: Http;
    localStorage: LocalStorageService;
    path: string;
    info: any;
    headerObject: any;
    jwtHelper: JwtHelper;
    constructor(http: Http, localStorage: LocalStorageService);
    getBase(path2: any, options?: any): Observable<{}>;
    saveBase(path2: any, payload: any, options?: any): Observable<{}>;
    handleError: (response: Response) => ErrorObservable;
    postRefreshToken(): BehaviorSubject<any>;
    headerLogin: () => any;
    headerAuthentication: () => RequestOptions;
}
