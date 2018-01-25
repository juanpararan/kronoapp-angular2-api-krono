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
import { TagModel } from '../models/tagModel';
export var TagsService = (function (_super) {
    __extends(TagsService, _super);
    function TagsService(http, localStorage) {
        _super.call(this, http, localStorage);
        this.http = http;
        this.localStorage = localStorage;
        // tags array 
        this.tags = [];
    }
    // getTags function: obtain information of tags in Botica store
    TagsService.prototype.getTags = function (chainId, storeId, categId, subcategId) {
        var _this = this;
        this.tags = [];
        var observer = new BehaviorSubject(null);
        this.getBase('chain/' + chainId + '/store/' + storeId
            + '/category/' + categId + '/subcategory/' +
            subcategId + '/tags/active/', null)
            .subscribe(function (tags) {
            for (var _i = 0, _a = tags; _i < _a.length; _i++) {
                var tagObject = _a[_i];
                var tag = new TagModel(tagObject);
                _this.tags.push(tag);
            }
            observer.next(tags);
        }, function (error) {
            observer.next(error);
        });
        return observer;
    };
    TagsService.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    TagsService.ctorParameters = [
        { type: Http, },
        { type: LocalStorageService, },
    ];
    return TagsService;
}(BaseService));
//# sourceMappingURL=tags-provider.js.map