import { NgModule } from '@angular/core';
import { MyComponent } from './components/my-component';
import { MyProvider } from './providers/my-provider';
import { CategoriesProvider } from './providers/categories-provider';
import { StoreProvider } from './providers/store-provider';
export var MyModule = (function () {
    function MyModule() {
    }
    MyModule.forRoot = function () {
        return {
            ngModule: MyModule,
            providers: [
                MyProvider,
                CategoriesProvider,
                StoreProvider
            ]
        };
    };
    MyModule.decorators = [
        { type: NgModule, args: [{
                    declarations: [
                        MyComponent
                    ],
                    exports: [
                        MyComponent
                    ]
                },] },
    ];
    /** @nocollapse */
    MyModule.ctorParameters = [];
    return MyModule;
}());
//# sourceMappingURL=my-module.module.js.map