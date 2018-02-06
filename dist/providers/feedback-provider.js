var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
import { Injectable } from '@angular/core';
import 'rxjs/Rx';
import { Http } from '@angular/http';
import { LocalStorageService } from 'angular-2-local-storage';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { BaseService } from './base-provider';
export var FeedbackService = (function (_super) {
    __extends(FeedbackService, _super);
    function FeedbackService(http, localStorage) {
        _super.call(this, http, localStorage);
        this.http = http;
        this.localStorage = localStorage;
    }
    // postFeedback function: post feedback 
    FeedbackService.prototype.postFeedback = function (payload, applicationId) {
        payload['task'] = 'add';
        var observer = new BehaviorSubject(null);
        var date = new Date();
        var user = this.localStorage.get('user');
        payload['date'] = date.getUTCFullYear() + '-' + (date.getUTCMonth() + 1) + "-" + date.getUTCDate();
        payload['applicationId'] = applicationId;
        if (user) {
            payload.userId = user['id'];
        }
        console.log("payload feedback", payload);
        this.saveBase('/feedbacks/post/', payload, {})
            .subscribe(function (data) {
            observer.next(data);
        }, function (error) {
            observer.next(error);
        });
        return observer;
    };
    FeedbackService.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    FeedbackService.ctorParameters = [
        { type: Http, },
        { type: LocalStorageService, },
    ];
    return FeedbackService;
}(BaseService));
//# sourceMappingURL=feedback-provider.js.map