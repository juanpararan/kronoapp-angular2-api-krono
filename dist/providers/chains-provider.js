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
import { ChainModel } from '../models/chainModel';
export var ChainsService = (function (_super) {
    __extends(ChainsService, _super);
    function ChainsService(http, localStorage) {
        _super.call(this, http, localStorage);
        this.http = http;
        this.localStorage = localStorage;
        // chains array
        this.chains = [];
    }
    // getChains function: obtain information of chains 
    ChainsService.prototype.getChains = function (applicationId, cityId) {
        var _this = this;
        this.chains = [];
        this.chainsStorage = {};
        // Initial value to the observer is null
        var observer = new BehaviorSubject(null);
        this.getBase('application/' + applicationId + '/city/' + cityId + '/chains/active/')
            .subscribe(function (chains) {
            for (var _i = 0, _a = chains; _i < _a.length; _i++) {
                var cha = _a[_i];
                var chain = new ChainModel(cha);
                _this.chains.push(chain);
                _this.chainsStorage[chain.id] = chain;
            }
            observer.next(_this.chains);
            _this.localStorage.set('chains', _this.chainsStorage);
        }, function (error) {
            observer.next(error);
        });
        return observer;
    };
    ChainsService.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    ChainsService.ctorParameters = [
        { type: Http, },
        { type: LocalStorageService, },
    ];
    return ChainsService;
}(BaseService));
//# sourceMappingURL=chains-provider.js.map