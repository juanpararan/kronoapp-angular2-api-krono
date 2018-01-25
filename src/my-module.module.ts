import { Observable } from 'rxjs';
import { NgModule, ModuleWithProviders } from '@angular/core';

// Components
import { MyComponent } from './components/my-component';

// Providers
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
//import { LoginService } from './providers/login-provider';
import { BasketService } from './providers/basket-provider';

@NgModule({
	declarations: [
	    MyComponent
	],
	exports: [
	    MyComponent
	]
})
export class MyModule {
	static forRoot(): ModuleWithProviders {
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
	}
}