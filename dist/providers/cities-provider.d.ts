import 'rxjs/Rx';
import { Http } from '@angular/http';
import { LocalStorageService } from 'angular-2-local-storage';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { BaseService } from './base-provider';
import { CityModel } from '../models/cityModel';
export declare class CitiesService extends BaseService {
    http: Http;
    localStorage: LocalStorageService;
    cities: CityModel[];
    constructor(http: Http, localStorage: LocalStorageService);
    getCities(baseUrl: any, applicationId: any): BehaviorSubject<any>;
}
