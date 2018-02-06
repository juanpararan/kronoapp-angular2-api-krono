import { Injectable } from '@angular/core';
import 'rxjs/Rx';
import { Http } from '@angular/http';
import { LocalStorageService } from 'angular-2-local-storage';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

// Providers
import { BaseService } from './base-provider';

@Injectable()
export class FeedbackService extends BaseService {

    constructor(public http: Http, public localStorage: LocalStorageService) {
        super(http, localStorage);
    }

    // postFeedback function: post feedback 
    postFeedback(payload, applicationId) {

        payload['task'] = 'add';

        let observer = new BehaviorSubject(null);

        let date = new Date();
        let user = this.localStorage.get('user');
        payload['date'] =  date.getUTCFullYear() + '-' + (date.getUTCMonth() + 1) + "-" + date.getUTCDate();
        payload['applicationId'] = applicationId;

        if (user) {
            payload.userId = user['id']
        }

        console.log("payload feedback", payload);
        this.saveBase('/feedbacks/post/', payload, {})
                .subscribe(data => {
                    observer.next(data);
                }, error => {
                    observer.next(error);
                });
        return observer;
    }

}