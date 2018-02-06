import 'rxjs/Rx';
import { Http } from '@angular/http';
import { LocalStorageService } from 'angular-2-local-storage';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { BaseService } from './base-provider';
export declare class FeedbackService extends BaseService {
    http: Http;
    localStorage: LocalStorageService;
    constructor(http: Http, localStorage: LocalStorageService);
    postFeedback(payload: any, applicationId: any): BehaviorSubject<any>;
}
