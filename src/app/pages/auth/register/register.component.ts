import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AccountRegisterRequest, AccountRegisterResponse } from 'src/app/@core/models/account';
import { AccountService } from 'src/app/@core/services/account.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  public registerForm: FormGroup = this.formBuilder.group({
    firstName: ['', [Validators.required]],
    lastName: ['', [Validators.required]],
    email: ['', [Validators.email, Validators.required]],
    password: [
      '',
      [Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9]).{8,}$/), Validators.required],
    ],
    phone: ['', [Validators.pattern(/^07\d{8}$/), Validators.required]],
    shippingAddress: ['', [Validators.required]],
    city: ['', [Validators.required]],
    zip: ['', [Validators.required]],
    country: ['', [Validators.required]],
  });

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly accountService: AccountService,
    private readonly router: Router,
    private readonly snackBar: MatSnackBar
  ) {}

  public register(): void {
    this.accountService.register(this.registerForm.value as AccountRegisterRequest).subscribe({
      next: ({ message }) => {
        this.router.navigate(['/auth/login']).then(() => this.snackBar.open(message, '', { duration: 5000 }));
      },
      error: ({ error }) => this.snackBar.open(error.message, '', { duration: 5000 }),
    });
  }
}
