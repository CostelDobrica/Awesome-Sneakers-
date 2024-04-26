import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { HttpService } from '../api/http.service';
import {
  AccountLoginRequest,
  AccountLoginResponse,
  AccountRegisterRequest,
  AccountRegisterResponse,
  AccountUpdateResponse,
  AccountUpdateRequest,
  AccountResponse,
  AccountDeleteResponse,
} from '../models/account';
import { SessionStorageService } from './session-storage.service';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  private account$ = new BehaviorSubject<AccountResponse | null>(null);
  private _jwtToken!: string;

  constructor(
    private readonly http: HttpService,
    private readonly router: Router,
    private readonly sessionService: SessionStorageService
  ) {}

  public login(account: AccountLoginRequest): Observable<AccountLoginResponse> {
    return this.http.post('/accounts/login', account).pipe(
      tap((account) => {
        this.account$.next(account.user);
        this.jwtToken = account.jwtToken;
        this.sessionService.set({ key: 'account', value: JSON.stringify(account.user) });
        this.sessionService.set({ key: 'jwtToken', value: account.jwtToken });
      })
    );
  }

  public register(account: AccountRegisterRequest): Observable<AccountRegisterResponse> {
    return this.http.post('/accounts/register', account);
  }

  public logout(): void {
    this.sessionService.delete('account');
    this.sessionService.delete('jwtToken');
    this.account$.next(null);
    this.router.navigate(['home']);
  }

  public update(account: AccountUpdateRequest, id: string): Observable<AccountUpdateResponse> {
    return this.http.patch(`/accounts/${id}`, account);
  }

  public get(id: string): Observable<AccountResponse> {
    return this.http.get(`/accounts/${id}`).pipe(
      tap((user: AccountResponse) => {
        this.account$.next(user);
        this.sessionService.set({ key: 'account', value: JSON.stringify(user) });
      })
    );
  }

  public isLoggedIn(): void {
    const loggedUser: string | null = this.sessionService.get('account');
    const jwtToken: string | null = this.sessionService.get('jwtToken');

    if (loggedUser && jwtToken) {
      this.account$.next(JSON.parse(loggedUser));
      this.jwtToken = jwtToken;
    }
  }

  public delete(id: string): Observable<AccountDeleteResponse> {
    return this.http.delete(`/accounts/${id}`);
  }

  public get getAccount(): BehaviorSubject<AccountResponse | null> {
    return this.account$;
  }

  public get jwtToken(): string {
    return this._jwtToken;
  }

  public set jwtToken(jwt: string) {
    this._jwtToken = jwt;
  }
}
