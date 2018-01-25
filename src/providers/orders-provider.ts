import { Injectable } from '@angular/core';
import 'rxjs/Rx';
import { Http } from '@angular/http';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { LocalStorageService } from 'angular-2-local-storage';

// Providers
import { BaseService } from './my-provider';

// Models 
import { PrescriptionModel } from '../models/prescriptionModel';
import { OrderModel } from '../models/orderModel';

@Injectable()
export class OrdersService extends BaseService {

    prescriptions: PrescriptionModel[] = [];

    // Orders array
    orders: OrderModel[] = [];

    constructor(public http: Http, public localStorage: LocalStorageService) {

        super(http, localStorage);
    }

    // postOrder function: post order inside orders of specific
    //                     client in Botica store
    postOrder(payload) {
        
        payload['task'] = 'add';

        let observer = new BehaviorSubject(null);

        console.log("payload de lo que hare post con order", payload);
        this.saveBase('chain/store/client/basket/payment/prescription/orders/', payload, 
                      this.headerAuthentication())
            .subscribe(data => {              
                observer.next(data);
            }, error => {
                observer.next(error);
            });
        return observer;
    }

    // getPrescription function: obtain information of user last prescription in Botica store
    getPrescription(applicationId, userId) {

        this.prescriptions = [];

        let observer = new BehaviorSubject(null);

        this.getBase('application/' + applicationId + '/client/' + userId + '/prescriptions/last/',
                     this.headerAuthentication())
            .subscribe(prescriptions => {
                for (var presc of <PrescriptionModel[]>prescriptions) {
                    var prescription: PrescriptionModel = new PrescriptionModel(presc);
                    this.prescriptions.push(prescription);                    
                }
                observer.next(this.prescriptions);                                              
            }, error => {
                observer.next(error);
            }); 
        return observer;
    }

    // getOrders function: obtain information of orders of specific client
    //                     in Botica store
    getOrders(applicationId, userId, storeId) {

        this.orders = [];

        let observer = new BehaviorSubject(null);

        this.getBase('application/' + applicationId + '/client/' + userId + '/store/' + 
                     storeId + '/orders/', this.headerAuthentication())
            .subscribe(orders => {
                for (var ord of <OrderModel[]>orders) {
                    var order: OrderModel = new OrderModel(ord);
                    this.orders.push(order);
                }
                observer.next(this.orders);                                              
            }, error => {
                observer.next(error);
            }); 
        return observer;
    }

    // getOrder function: obtain information of specific client order
    getOrder(applicationId, userId, storeId, orderId) {

        let observer = new BehaviorSubject(null);

        this.getBase('application/' + applicationId + '/client/' + userId + '/store/' + 
                     storeId + '/order/' + orderId + '/', this.headerAuthentication())
            .subscribe(order => {
                for (var i of order['items']) {
                    if (i.productId != null) {
                        i.productId['loadedProduct'] = new BehaviorSubject(null);
                    }
                }
                var orderClient: OrderModel = new OrderModel(order);
                observer.next(orderClient);                                              
            }, error => {
                observer.next(error);
            }); 
        return observer;
    }

}
