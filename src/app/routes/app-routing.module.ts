import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LockPageComponent } from 'app/pages/lock-page/lock-page.component';
import { ListPageComponent } from 'app/pages/list-page/list-page.component';

const routes: Routes = [
    { path: 'lock', component: LockPageComponent },
    { path: 'list', component: ListPageComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})

export class AppRoutingModule {  }
