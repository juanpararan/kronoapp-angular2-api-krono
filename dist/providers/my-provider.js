import { Injectable } from '@angular/core';
var MyProvider = /** @class */ (function () {
    function MyProvider() {
    }
    MyProvider.prototype.myMethod = function () {
        console.log("I'm afraid I can't do that.");
    };
    MyProvider.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    MyProvider.ctorParameters = function () { return []; };
    return MyProvider;
}());
export { MyProvider };
//# sourceMappingURL=my-provider.js.map