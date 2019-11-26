import {Routes} from '@angular/router';
import {LoginPageComponent} from './login-page/login-page.component';
import {PageFrameComponent} from './page-frame/page-frame.component';
import {HomePageComponent} from './home-page/home-page.component';
import {AdminPageComponent} from './admin-page/admin-page.component';

export const appRoutes: Routes = [
  {
    path: 'login',
    component: LoginPageComponent
  },
  {
    path: '',
    component: PageFrameComponent,
    children: [
      {
        path: 'home',
        component: HomePageComponent
      },
      {
        path: 'admin',
        component: AdminPageComponent
      },
    ]
  },
  {path: '', redirectTo: '/home', pathMatch: 'full'},
];
