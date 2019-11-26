import {Component, EventEmitter, Input, Output} from '@angular/core';
import {User} from '../security/security.model';

@Component({
  selector: 'app-page-header',
  templateUrl: './page-header.component.html',
  styleUrls: ['./page-header.component.scss']
})
export class PageHeaderComponent {
  @Input()
  user: User;

  @Output()
  logoutRequest = new EventEmitter();

  logout() {
    this.logoutRequest.emit();
  }
}
