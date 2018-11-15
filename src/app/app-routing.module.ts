import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LockPageComponent } from './pages/lock-page/lock-page.component'

const routes: Routes = [
    { path: 'lock', component: LockPageComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})

export class AppRoutingModule {  }
