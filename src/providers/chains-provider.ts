import { Injectable } from '@angular/core';
import 'rxjs/Rx';
import { Http } from '@angular/http';
import { LocalStorageService } from 'angular-2-local-storage';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

// Providers
import { BaseService } from './base-provider';

// Models
import { ChainModel } from '../models/chainModel';
import { CityModel } from '../models/cityModel';

@Injectable()
export class ChainsService extends BaseService {

    // chains array
    chains: ChainModel[] = [];
    chainsStorage: {};

    constructor(public http: Http, public localStorage: LocalStorageService) {
        super(http, localStorage);
    }

    // getChains function: obtain information of chains 
    getChains(baseUrl, applicationId, cityId) {

        this.chains = [];
        this.chainsStorage = {};

        // Initial value to the observer is null
        let observer = new BehaviorSubject(null);

        this.getBase(baseUrl, 'application/' + applicationId + '/city/' + cityId + '/chains/active/')
            .subscribe(chains => {
                    for (var cha of <ChainModel[]>chains) {
                        var chain: ChainModel = new ChainModel(cha);
                        this.chains.push(chain);
                        this.chainsStorage[chain.id] = chain;
                    }
                    this.localStorage.set('chains', this.chainsStorage);
                    observer.next(this.chains);
                }, error => {
                    observer.next(error);
                });
        return observer; 

    }     

}