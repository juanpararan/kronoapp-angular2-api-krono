import 'rxjs/Rx';
import { Http } from '@angular/http';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { LocalStorageService } from 'angular-2-local-storage';
import { BaseService } from '../providers/my-provider';
import { StoreModel } from '../models/storeModel';
import { ProductModel } from '../models/productModel';
import { BannerModel } from '../models/bannerModel';
export declare class StoreService extends BaseService {
    http: Http;
    localStorage: LocalStorageService;
    products: ProductModel[];
    stores: StoreModel[];
    banners: BannerModel[];
    constructor(http: Http, localStorage: LocalStorageService);
    getStore(chainId: any, storeId: any): BehaviorSubject<any>;
    getBanners(chainId: any, storeId: any): BehaviorSubject<any>;
}
