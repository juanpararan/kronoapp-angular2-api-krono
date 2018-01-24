import { NgModule } from '@angular/core';
import { MyComponent } from './components/my-component';
import { BaseService } from './base.service';
export var MyModule = (function () {
    function MyModule() {
    }
    MyModule.forRoot = function () {
        return {
            ngModule: MyModule
        };
    };
    MyModule.decorators = [
        { type: NgModule, args: [{
                    declarations: [
                        MyComponent
                    ],
                    exports: [
                        MyComponent
                    ],
                    providers: [
                        BaseService
                    ]
                },] },
    ];
    /** @nocollapse */
    MyModule.ctorParameters = [];
    return MyModule;
}());
//# sourceMappingURL=my-module.module.js.map