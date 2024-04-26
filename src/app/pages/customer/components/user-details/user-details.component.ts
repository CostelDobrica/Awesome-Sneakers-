import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Account, AccountResponse, AccountUpdateRequest } from 'src/app/@core/models/account';
import { AccountService } from 'src/app/@core/services/account.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss'],
})
export class UserDetailsComponent implements OnInit {
  public user!: AccountResponse | null;
  public userDetails!: FormGroup;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly accountService: AccountService,
    private readonly snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.user = this.accountService.getAccount.value;
    this.userDetails = this.formBuilder.group({
      firstName: [this.user?.firstName, [Validators.required]],
      lastName: [this.user?.lastName, [Validators.required]],
      phone: [this.user?.phone, [Validators.pattern(/^07\d{8}$/), Validators.required]],
      shippingAddress: [this.user?.shippingAddress, [Validators.required]],
      city: [this.user?.city, [Validators.required]],
      zip: [this.user?.zip, [Validators.required]],
      country: [this.user?.country, [Validators.required]],
    });
  }

  public onUpdateAccount(): void {
    this.accountService
      .update({ ...this.userDetails.value, email: this.user!.email } as AccountUpdateRequest, this.user!._id)
      .subscribe({
        next: ({ message }) => {
          this.accountService.get(this.user!._id).subscribe();
          this.snackBar.open(message, '', {
            duration: 5000,
          });
        },
        error: ({ error }) => {
          this.snackBar.open(error.message, '', {
            duration: 5000,
          });
        },
      });
  }
}
