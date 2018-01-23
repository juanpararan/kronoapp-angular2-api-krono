# angular2-api-krono

This is a template for building your own reusable Angular2/Ionic2 module using TypeScript. Supports Angular's ngc and Ahead-of-Time compiling out of the box.

## Install package

npm install git+ssh://git@github.com/fabiocasmar/angular2-api-krono.git

## Developing

Develop your module like any other Angular 2 module. Then, run `npm run build` to build a local copy. (NECESSARY each time a change is made and it will be uploaded to the github)

If you'd like to test this package, run `npm install ionic-module-template`

## Using your module in an Ionic 2 app / Angular 2 app

```typescript
import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';

// Import your module
import { MyModule } from 'angular2-api-krono';

@NgModule({
  declarations: [
    MyApp,
    HomePage
  ],
  imports: [
    IonicModule.forRoot(MyApp),

    MyModule // Put your module here
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage
  ],
  providers: []
})
export class AppModule {}
```