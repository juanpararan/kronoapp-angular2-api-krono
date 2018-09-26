import { Injectable } from '@angular/core';
import 'rxjs/Rx';
import { Http } from '@angular/http';
import { LocalStorageService } from 'angular-2-local-storage';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

// Providers
import { BaseService } from './base-provider';

// Models
import { CityModel } from '../models/cityModel';

@Injectable()
export class CitiesService extends BaseService {

    // Cities array
    cities: CityModel[] = [];

    constructor(public http: Http, public localStorage: LocalStorageService) {
        super(http, localStorage);
    }

    // getCategories function: obtain information of categories in Botica store
    getCities(baseUrl, applicationId) {

        this.cities = [];

        // Initial value to the observer is null
        let observer = new BehaviorSubject(null);

        this.getBase(baseUrl , 'application/'+applicationId+'/cities/active/', null)
            .subscribe(cities => {
                for (var cit of <CityModel[]>cities) {
                    var city: CityModel = new CityModel(cit);
                    this.cities.push(city);
                }
                observer.next(this.cities);                                              
            }, error => {
                observer.next(error);
            }); 
        return observer;
    }

}