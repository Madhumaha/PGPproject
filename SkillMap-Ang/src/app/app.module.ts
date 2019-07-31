import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import {FormsModule} from'@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ToastrModule} from 'ngx-toastr';
import { UserComponent } from './Users/user/user.component';
import { UserlistComponent } from './Users/userlist/userlist.component';
import { UserformComponent } from './Users/userform/userform.component';
import { UserdetailServiceService } from './Users/userdetail-service.service';
import { UserskillsPipe } from './Users/FilterUser/userskills.pipe';



@NgModule({
  declarations: [
    AppComponent,
    UserlistComponent,
    UserformComponent,
    UserskillsPipe,
    UserComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot()
  ],
  providers: [UserdetailServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
