import { ProfilesComponent } from './components/profiles/profiles.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { TestComponent } from './components/test/test.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { ActivateAccountComponent } from './components/activate-account/activate-account.component';
import { UserFeedComponent } from './components/user-feed/user-feed.component';
import { PasswordlessLoginComponent } from './components/passwordless-login/passwordless-login.component';
import { 
  AuthGuardService as AuthGuard 
} from './services/auth-guard.service';
import { RoleGuardService 
as RoleGuard } from './services/role-guard.service';
import { AccountRecoveryComponent } from './components/account-recovery/account-recovery.component';
import { AccountSettingsComponent } from './components/account-settings/account-settings.component';

const routes: Routes = [
  {
    path: 'test',
    component: TestComponent,
    canActivate: [AuthGuard],   // AUTH GUARD - bilo koji ulgovani korisnik moze da pristupi stranici
  },
  {
    path: '',
    component: LoginComponent,
  },
  {
    path: 'sign-up',
    component: SignUpComponent,
  },
  {
    path: 'activate-account/:id',
    component: ActivateAccountComponent,
  },
  {
    path: 'passwordless-login',
    component: PasswordlessLoginComponent,
  },
  {
    path: 'confirmed-mail/:jwt',
    component: PasswordlessLoginComponent,
  },
  {
    path: 'accountRecovery',
    component: AccountRecoveryComponent,
  },
  {
    path: 'feed',
    component: UserFeedComponent,
    canActivate: [RoleGuard], 
    data: { 
      expectedRole: 'User'  // ROLE GUARD - samo expectedRole moze da pristupi stranici
    }
  }, 
  {
    path: 'account-setting',
    component: AccountSettingsComponent,
    canActivate: [RoleGuard], 
    data: { 
      expectedRole: 'User' //['User', 'Admin']
    }
  },
  
  {
    path: 'user-profiles',
    component: ProfilesComponent,
    canActivate: [AuthGuard],   // AUTH GUARD - bilo koji ulgovani korisnik moze da pristupi stranici
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
