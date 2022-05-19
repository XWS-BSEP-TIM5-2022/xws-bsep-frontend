import { TestComponent } from './components/test/test.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { UserFeedComponent } from './components/user-feed/user-feed.component';
import { 
  AuthGuardService as AuthGuard 
} from './services/auth-guard.service';
import { RoleGuardService 
as RoleGuard } from './services/role-guard.service';

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
    path: 'feed',
    component: UserFeedComponent,
    canActivate: [RoleGuard], 
    data: { 
      expectedRole: 'User'  // ROLE GUARD - samo expectedRole moze da pristupi stranici
    } 
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
