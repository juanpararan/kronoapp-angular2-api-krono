import { NgModule } from '@angular/core';
import { MyComponent } from './components/my-component';
import { BaseService } from './providers/my-provider';
import { CategoriesService } from './providers/categories-provider';
import { StoreService } from './providers/store-provider';
export var MyModule = (function () {
    function MyModule() {
    }
    MyModule.forRoot = function () {
        return {
            ngModule: MyModule,
            providers: [
                BaseService,
                CategoriesService,
                StoreService
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