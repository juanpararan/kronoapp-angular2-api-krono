import 'rxjs/Rx';
import { Http } from '@angular/http';
import { LocalStorageService } from 'angular-2-local-storage';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { BaseService } from './base-provider';
import { ChainModel } from '../models/chainModel';
export declare class ChainsService extends BaseService {
    http: Http;
    localStorage: LocalStorageService;
    chains: ChainModel[];
    chainsStorage: {};
    constructor(http: Http, localStorage: LocalStorageService);
    getChains(baseUrl: any, applicationId: any, cityId: any): BehaviorSubject<any>;
}
