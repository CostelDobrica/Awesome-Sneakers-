import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AccountService } from '../services/account.service';

@Injectable({
  providedIn: 'root',
})
export class LoggedInGuard implements CanActivate {
  constructor(private readonly accountService: AccountService, private readonly router: Router) {}

  canActivate(): boolean {
    const isLoggedIn = this.accountService.getAccount.value;

    if (!isLoggedIn) {
      this.router.navigate(['/auth/login']);

      return false;
    }

    return true;
  }
}
