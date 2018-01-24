import { Injectable } from '@angular/core';
export var MyProvider = (function () {
    function MyProvider() {
    }
    MyProvider.prototype.myMethod = function () {
        console.log("I'm afraid I can't do that.");
    };
    MyProvider.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    MyProvider.ctorParameters = [];
    return MyProvider;
}());
//# sourceMappingURL=my-provider.js.map