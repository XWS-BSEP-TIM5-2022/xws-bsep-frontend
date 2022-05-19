import { TokenInterceptor } from './interceptor/token-interceptor';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from "@angular/common/http";
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TestComponent } from './components/test/test.component';
import { LoginComponent } from './components/login/login.component';
import { FormsModule } from '@angular/forms';
import { UserFeedComponent } from './components/user-feed/user-feed.component';
import { AuthGuardService } from './services/auth-guard.service';
import { JwtHelperService, JwtModule } from '@auth0/angular-jwt';
import { RoleGuardService } from './services/role-guard.service';
import { AccountRecoveryComponent } from './components/account-recovery/account-recovery.component';

@NgModule({
  declarations: [
    AppComponent,
    TestComponent,
    LoginComponent,
    UserFeedComponent,
    AccountRecoveryComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    {
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptor,
    multi: true
    }, 
    AuthGuardService,
    JwtHelperService,
    RoleGuardService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
