import { NgModule } from '@angular/core';
import { MyComponent } from './components/my-component';
import { BaseService } from './providers/base-provider';
import { CategoriesService } from './providers/categories-provider';
import { SubcategoriesService } from './providers/subcategories-provider';
import { StoreService } from './providers/store-provider';
import { TagsService } from './providers/tags-provider';
import { CouponsService } from './providers/coupons-provider';
import { ProductsService } from './providers/products-provider';
import { UsersService } from './providers/users-provider';
import { OrdersService } from './providers/orders-provider';
import { ListsService } from './providers/lists-provider';
import { BasketService } from './providers/basket-provider';
export var MyModule = (function () {
    function MyModule() {
    }
    MyModule.forRoot = function () {
        return {
            ngModule: MyModule,
            providers: [
                BaseService,
                CategoriesService,
                SubcategoriesService,
                TagsService,
                StoreService,
                CouponsService,
                ProductsService,
                UsersService,
                OrdersService,
                ListsService,
                //LoginService,
                BasketService
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