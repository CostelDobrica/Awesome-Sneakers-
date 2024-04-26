import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { AccountService } from '../services/account.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private readonly accountService: AccountService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const jwtToken = this.accountService.jwtToken;

    if (jwtToken) {
      req = req.clone({
        setHeaders: { Authorization: `Bearer ${jwtToken}` },
      });
    }

    return next.handle(req);
  }
}
