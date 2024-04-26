import { Injectable } from '@angular/core';
import { CanLoad, Router } from '@angular/router';
import { AccountService } from '../services/account.service';

@Injectable({
  providedIn: 'root',
})
export class AdminGuard implements CanLoad {
  constructor(private readonly accountService: AccountService, private readonly router: Router) {}

  canLoad(): boolean {
    const isAdmin = this.accountService.getAccount.value?.isAdmin;

    if (!isAdmin) {
      this.router.navigate(['/auth/login']);

      return false;
    }

    return isAdmin;
  }
}
