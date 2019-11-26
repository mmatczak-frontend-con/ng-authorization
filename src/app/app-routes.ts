import {LoginPageComponent} from './login-page/login-page.component';
import {PageFrameComponent} from './page-frame/page-frame.component';
import {HomePageComponent} from './home-page/home-page.component';
import {AdminPageComponent} from './admin-page/admin-page.component';
import {AccessDeniedPageComponent} from './access-denied-page/access-denied-page.component';
import {AuthorizedRoutes, Role} from './security/security.model';

export const appRoutes: AuthorizedRoutes = [
  {
    path: 'login',
    component: LoginPageComponent,
    permitAll: true
  },
  {
    path: 'access-denied',
    component: AccessDeniedPageComponent,
    permitAll: true
  },
  {
    path: '',
    component: PageFrameComponent,
    children: [
      {
        path: 'home',
        component: HomePageComponent,
        accessAllowedTo: Role.User
      },
      {
        path: 'admin',
        component: AdminPageComponent,
        accessAllowedTo: Role.Admin
      },
    ]
  },
  {path: '', redirectTo: '/home', pathMatch: 'full'},
];
