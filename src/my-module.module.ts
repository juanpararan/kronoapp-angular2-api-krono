import { Observable } from 'rxjs';
import { NgModule, ModuleWithProviders } from '@angular/core';

// Components
import { MyComponent } from './components/my-component';

// Providers
import { MyProvider } from './providers/my-provider';
import { CategoriesProvider } from './providers/categories-provider';
import { StoreProvider } from './providers/store-provider';

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
        MyProvider,
        CategoriesProvider,
        StoreProvider
      ]
    };
  }
}

