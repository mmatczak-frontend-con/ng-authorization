import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {RouterModule} from '@angular/router';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {LoginPageComponent} from './login-page/login-page.component';
import {HomePageComponent} from './home-page/home-page.component';
import {AdminPageComponent} from './admin-page/admin-page.component';
import {PageHeaderComponent} from './page-header/page-header.component';
import {SecurityHttpInterceptor} from './security/security.http-interceptor';
import {PageFrameComponent} from './page-frame/page-frame.component';
import {ReactiveFormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    HomePageComponent,
    AdminPageComponent,
    PageHeaderComponent,
    PageFrameComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
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
    ])
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS, useClass: SecurityHttpInterceptor, multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
