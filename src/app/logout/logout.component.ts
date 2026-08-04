
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../_services/auth/auth.service';

@Component({
  selector: 'app-logout',
  imports: [],
  templateUrl: './logout.component.html',
  styleUrl: './logout.component.scss',
})
export class LogoutComponent 
{
    toastrService = inject(ToastrService);
    router = inject(Router);
    authService = inject(AuthService);


    ngOnInit()
    {
        if (!this.authService.isAuthenticated())
        {
            this.toastrService.warning("You are not currently logged in!");
            this.router.navigateByUrl("/"); 
        }
        else
        {
            this.toastrService.warning(`Come back soon, ${this.authService.user()}!`, 
                                       "You have been logged out");
            this.authService.logout();
            this.router.navigateByUrl("/");
        }
    }
}
