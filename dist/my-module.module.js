import { NgModule } from '@angular/core';
import { MyComponent } from './components/my-component';
import { BaseService } from './providers/base.service';
var MyModule = /** @class */ (function () {
    function MyModule() {
    }
    MyModule.forRoot = function () {
        return {
            ngModule: MyModule,
            providers: [BaseService]
        };
    };
    MyModule.decorators = [
        { type: NgModule, args: [{
                    declarations: [
                        // declare all components that your module uses
                        MyComponent
                    ],
                    exports: [
                        // export the component(s) that you want others to be able to use
                        MyComponent
                    ]
                },] },
    ];
    /** @nocollapse */
    MyModule.ctorParameters = function () { return []; };
    return MyModule;
}());
export { MyModule };
//# sourceMappingURL=my-module.module.js.map