import {Component} from '@angular/core';
import {Observable} from 'rxjs';
import {SecurityService} from '../security/security.service';
import {Router} from '@angular/router';
import {User} from '../security/security.model';

@Component({
  selector: 'app-page-frame',
  templateUrl: './page-frame.component.html',
  styleUrls: ['./page-frame.component.scss']
})
export class PageFrameComponent {
  user$: Observable<User>;

  constructor(private security: SecurityService, private router: Router) {
    this.user$ = security.getUser();
  }

  logout() {
    this.security.logout()
      .subscribe(() => this.router.navigateByUrl('/login'));
  }
}
