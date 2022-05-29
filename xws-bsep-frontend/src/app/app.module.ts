import { TokenInterceptor } from './interceptor/token-interceptor';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from "@angular/common/http";
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import {RouterModule} from "@angular/router";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TestComponent } from './components/test/test.component';
import { LoginComponent } from './components/login/login.component';
import { FormsModule } from '@angular/forms';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { ActivateAccountComponent } from './components/activate-account/activate-account.component';
import { UserFeedComponent } from './components/user-feed/user-feed.component';
import { AuthGuardService } from './services/auth-guard.service';
import { JwtHelperService, JwtModule } from '@auth0/angular-jwt';
import { RoleGuardService } from './services/role-guard.service';
import { AccountRecoveryComponent } from './components/account-recovery/account-recovery.component';
import { PasswordlessLoginComponent } from './components/passwordless-login/passwordless-login.component';
import { CommonModule } from '@angular/common';
import { AccountSettingsComponent } from './components/account-settings/account-settings.component'; 
import { NewPostComponent } from './components/new-post/new-post.component'; 
import { MatDialogModule } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSliderModule } from '@angular/material/slider';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule} from '@angular/material/snack-bar';
import { MatDividerModule} from '@angular/material/divider';
import { MatInputModule} from '@angular/material/input';
import { PostLikesComponent } from './components/post-likes/post-likes.component';
import { PostDislikesComponent } from './components/post-dislikes/post-dislikes.component';
import { ProfilesComponent } from './components/profiles/profiles.component';
import { HeaderComponent } from './components/header/header.component';
import { UnregisteredUserFeedComponent } from './components/unregistered-user-feed/unregistered-user-feed.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { UserProfilePublicComponent } from './components/user-profile-public/user-profile-public.component';

@NgModule({
  declarations: [
    AppComponent,
    TestComponent,
    LoginComponent,
    SignUpComponent,
    ActivateAccountComponent,
    UserFeedComponent,
    AccountRecoveryComponent,
    PasswordlessLoginComponent,
    AccountSettingsComponent,
    NewPostComponent,
    PostLikesComponent,
    PostDislikesComponent,
    ProfilesComponent,
    HeaderComponent,
    UnregisteredUserFeedComponent,
    UserProfileComponent,
    UserProfilePublicComponent,
  ],
  imports: [
    BrowserModule,
    CommonModule, 
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatSliderModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatDividerModule,
    MatInputModule,
    MatSnackBarModule,
    RouterModule
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
