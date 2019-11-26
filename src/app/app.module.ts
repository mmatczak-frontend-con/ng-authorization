import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {Router, RouterModule} from '@angular/router';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {LoginPageComponent} from './login-page/login-page.component';
import {HomePageComponent} from './home-page/home-page.component';
import {AdminPageComponent} from './admin-page/admin-page.component';
import {PageHeaderComponent} from './page-header/page-header.component';
import {SecurityHttpInterceptor} from './security/security.http-interceptor';
import {PageFrameComponent} from './page-frame/page-frame.component';
import {ReactiveFormsModule} from '@angular/forms';
import {appRoutes} from './app-routes';
import {AccessDeniedPageComponent} from './access-denied-page/access-denied-page.component';
import {IfAccessAllowedToDirective} from './security/if-access-allowed-to.directive';
import {enableSecurityForRoutes} from './security/enable-security';

@NgModule({
  declarations: [
    IfAccessAllowedToDirective,
    AppComponent,
    LoginPageComponent,
    HomePageComponent,
    AdminPageComponent,
    PageHeaderComponent,
    PageFrameComponent,
    AccessDeniedPageComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS, useClass: SecurityHttpInterceptor, multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(router: Router) {
    enableSecurityForRoutes(router);
  }
}
