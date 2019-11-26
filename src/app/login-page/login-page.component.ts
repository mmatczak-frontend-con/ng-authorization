import {Component, OnDestroy} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {SecurityService} from '../security/security.service';
import {Router} from '@angular/router';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnDestroy {
  loginForm: FormGroup;

  private loginSubscription: Subscription;

  constructor(private security: SecurityService, private router: Router) {
    this.loginForm = new FormGroup({
      user: new FormControl(''),
      password: new FormControl('')
    });
  }

  login() {
    if (this.loginForm.valid) {
      this.unsubscribeIfPossible();
      this.loginSubscription = this.security.login(this.loginForm.value)
        .subscribe(() => {
          this.router.navigateByUrl('/home');
        }, error => {
          this.loginForm.setErrors({badCredentials: true});
        });
    }
  }

  ngOnDestroy(): void {
    this.unsubscribeIfPossible();
  }

  private unsubscribeIfPossible() {
    if (this.loginSubscription) {
      this.loginSubscription.unsubscribe();
    }
  }
}
