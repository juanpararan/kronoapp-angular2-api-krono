import { Observable } from 'rxjs';
import { NgModule, ModuleWithProviders } from '@angular/core';

// Components
import { MyComponent } from './components/my-component';

// Providers
import { BaseService } from './providers/my-provider';
import { CategoriesService } from './providers/categories-provider';
import { SubcategoriesService } from './providers/subcategories-provider';
import { StoreService } from './providers/store-provider';
import { TagsService } from './providers/tags-provider';

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
        StoreService
      ]
    };
  }
}

