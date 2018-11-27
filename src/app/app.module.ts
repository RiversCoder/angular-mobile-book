import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'; // <-- NgModel lives here

import { AppComponent } from './app.component';
import { LockPageComponent } from './pages/lock-page/lock-page.component';
import { AppRoutingModule } from './routes/app-routing.module';
import { ListPageComponent } from './pages/list-page/list-page.component';


@NgModule({
  declarations: [
    AppComponent,
    LockPageComponent,
    ListPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule {}
