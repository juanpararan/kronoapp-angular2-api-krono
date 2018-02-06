import 'rxjs/Rx';
import { Http } from '@angular/http';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { LocalStorageService } from 'angular-2-local-storage';
import { BaseService } from './base-provider';
import { PrescriptionModel } from '../models/prescriptionModel';
import { OrderModel } from '../models/orderModel';
export declare class OrdersService extends BaseService {
    http: Http;
    localStorage: LocalStorageService;
    prescriptions: PrescriptionModel[];
    orders: OrderModel[];
    constructor(http: Http, localStorage: LocalStorageService);
    postOrder(payload: any): BehaviorSubject<any>;
    getPrescription(applicationId: any, userId: any): BehaviorSubject<any>;
    getOrders(applicationId: any, userId: any, storeId: any): BehaviorSubject<any>;
    getOrdersKrono(applicationId: any, userId: any): BehaviorSubject<any>;
    getOrder(applicationId: any, userId: any, storeId: any, orderId: any): BehaviorSubject<any>;
}
