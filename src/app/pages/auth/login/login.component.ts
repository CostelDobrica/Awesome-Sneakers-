import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AccountLoginRequest } from 'src/app/@core/models/account';
import { AccountService } from 'src/app/@core/services/account.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  public profileForm = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  });

  constructor(
    private readonly serviceAccount: AccountService,
    private readonly snackBar: MatSnackBar,
    private readonly router: Router,
    private readonly formBuilder: FormBuilder
  ) {}

  public login(): void {
    this.serviceAccount.login(this.profileForm.value as AccountLoginRequest).subscribe({
      next: ({ user }) => {
        if (user.isAdmin === true) {
          this.router.navigate(['/admin']);
        } else {
          this.router.navigate(['/home']);
        }
      },
      error: ({ error }) =>
        this.snackBar.open(error.message, '', {
          duration: 5000,
        }),
    });
  }
}
