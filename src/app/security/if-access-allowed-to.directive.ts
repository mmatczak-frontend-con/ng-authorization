import {Directive, Input, OnDestroy, TemplateRef, ViewContainerRef} from '@angular/core';
import {Subscription} from 'rxjs';
import {NgIf} from '@angular/common';
import {SecurityService} from './security.service';
import {Role} from './security.model';

@Directive({
  selector: '[appIfAccessAllowedTo]'
})
export class IfAccessAllowedToDirective extends NgIf implements OnDestroy {
  private subscription: Subscription;

  constructor(
    viewContainer: ViewContainerRef,
    templateRef: TemplateRef<any>,
    private security: SecurityService) {
    super(viewContainer, templateRef);
  }

  @Input() set appIfAccessAllowedTo(role: Role) {
    this.unsubscribeFromAuthorizationService();
    this.subscription = this.security.userHasRole(role)
      .subscribe(isAuthorized => {
        this.ngIf = isAuthorized;
      });
  }

  @Input() set appIfAccessAllowedToElse(templateElse: TemplateRef<any>) {
    this.ngIfElse = templateElse;
  }

  @Input() set appIfAccessAllowedToThen(templateThen: TemplateRef<any>) {
    this.ngIfThen = templateThen;
  }

  ngOnDestroy(): void {
    this.unsubscribeFromAuthorizationService();
  }

  private unsubscribeFromAuthorizationService() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
