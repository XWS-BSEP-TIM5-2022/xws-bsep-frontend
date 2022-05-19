import { TestComponent } from './components/test/test.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { AccountRecoveryComponent } from './components/account-recovery/account-recovery.component';

const routes: Routes = [
  {
    path: 'test',
    component: TestComponent,
  },
  {
    path: '',
    component: LoginComponent,
  },
  {
    path: 'accountRecovery',
    component: AccountRecoveryComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
