import { Observable } from 'rxjs';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { MyComponent } from './components/my-component';
import { BaseService } from './base.service';

@NgModule({
  declarations: [
    MyComponent
  ],
  exports: [
    MyComponent
  ],
  providers: [
    BaseService
  ]
})
export class MyModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: MyModule
    };
  }
}

