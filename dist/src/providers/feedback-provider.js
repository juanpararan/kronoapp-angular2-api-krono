var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import { Injectable } from '@angular/core';
import 'rxjs/Rx';
import { Http } from '@angular/http';
import { LocalStorageService } from 'angular-2-local-storage';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
// Providers
import { BaseService } from './base-provider';
var FeedbackService = (function (_super) {
    __extends(FeedbackService, _super);
    function FeedbackService(http, localStorage) {
        var _this = _super.call(this, http, localStorage) || this;
        _this.http = http;
        _this.localStorage = localStorage;
        return _this;
    }
    // postFeedback function: post feedback 
    // postFeedback function: post feedback
    FeedbackService.prototype.postFeedback = 
    // postFeedback function: post feedback
    function (baseUrl, payload, applicationId) {
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
        this.saveBase(baseUrl, '/feedbacks/post/', payload, {})
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
    FeedbackService.ctorParameters = function () { return [
        { type: Http, },
        { type: LocalStorageService, },
    ]; };
    return FeedbackService;
}(BaseService));
export { FeedbackService };
//# sourceMappingURL=feedback-provider.js.map