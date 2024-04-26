import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AccountResponse } from '../../../@core/models/account';
import { AccountService } from '../../../@core/services/account.service';

@Component({
  selector: 'app-account-menu',
  templateUrl: './account-menu.component.html',
  styleUrls: ['./account-menu.component.scss'],
})
export class AccountMenuComponent implements OnInit, OnDestroy {
  public account!: null | AccountResponse;
  private accountSubscription!: Subscription;

  constructor(private readonly accountService: AccountService) {}

  ngOnInit(): void {
    this.accountSubscription = this.accountService.getAccount.subscribe((account: AccountResponse | null) => {
      this.account = account;
    });
  }

  ngOnDestroy(): void {
    this.accountSubscription.unsubscribe();
  }

  public logout(): void {
    this.accountService.logout();
  }
}
