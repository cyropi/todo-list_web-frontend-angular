
import { HttpEvent, HttpHandlerFn, HttpHeaders, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { inject } from '@angular/core';
import { AuthService } from '../../_services/auth/auth.service';


export function authInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>>
{
    const authService = inject(AuthService);
    const token = authService.getToken();

    if (token)
    {
        req = req.clone({
                            setHeaders: {
                                            Authorization: 'Bearer ' + token
                                        }
                        });
    }

    return next(req);
}
