
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../_services/auth/auth.service';
import { ToastrService } from 'ngx-toastr';

export const authGuard: CanActivateFn = (route, state) => 
{
    const authService = inject(AuthService);
    const toastrService = inject(ToastrService);
    const router = inject(Router);
    
    if (authService.isUserAuthenticated())
        return true;

    toastrService.warning("Please, login to access this feature", "Unauthorized!");
    return router.parseUrl("login");
};
