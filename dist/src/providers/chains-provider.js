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
// Models
import { ChainModel } from '../models/chainModel';
var ChainsService = (function (_super) {
    __extends(ChainsService, _super);
    function ChainsService(http, localStorage) {
        var _this = _super.call(this, http, localStorage) || this;
        _this.http = http;
        _this.localStorage = localStorage;
        // chains array
        _this.chains = [];
        return _this;
    }
    // getChains function: obtain information of chains 
    // getChains function: obtain information of chains
    ChainsService.prototype.getChains = 
    // getChains function: obtain information of chains
    function (baseUrl, applicationId, cityId) {
        var _this = this;
        this.chains = [];
        this.chainsStorage = {};
        // Initial value to the observer is null
        var observer = new BehaviorSubject(null);
        this.getBase(baseUrl, 'application/' + applicationId + '/city/' + cityId + '/chains/active/')
            .subscribe(function (chains) {
            for (var _i = 0, _a = chains; _i < _a.length; _i++) {
                var cha = _a[_i];
                var chain = new ChainModel(cha);
                _this.chains.push(chain);
                _this.chainsStorage[chain.id] = chain;
            }
            _this.localStorage.set('chains', _this.chainsStorage);
            observer.next(_this.chains);
        }, function (error) {
            observer.next(error);
        });
        return observer;
    };
    ChainsService.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    ChainsService.ctorParameters = function () { return [
        { type: Http, },
        { type: LocalStorageService, },
    ]; };
    return ChainsService;
}(BaseService));
export { ChainsService };
//# sourceMappingURL=chains-provider.js.map