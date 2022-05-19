import { TestComponent } from './components/test/test.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { UserFeedComponent } from './components/user-feed/user-feed.component';

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
    path: 'feed',
    component: UserFeedComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
