
import { Component, inject } from '@angular/core';
import { DarkModeToggleComponent } from './dark-mode-toggle/dark-mode-toggle.component';
import { AuthService } from '../_services/auth/auth.service';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive, DarkModeToggleComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent 
{
    isOpen = false;
    authService = inject(AuthService);


    toggle()
    {
        this.isOpen = !this.isOpen;
    }


    handleNavigationClick()
    {
        this.isOpen = false;
    }
}
