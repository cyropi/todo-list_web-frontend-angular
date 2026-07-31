import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { RestBackendService } from '../_services/rest-backend/rest-backend.service';
import { AuthService } from '../_services/auth/auth.service';

@Component({
  selector: 'app-login',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent 
{
    toastrService = inject(ToastrService);
    router = inject(Router);
    restService = inject(RestBackendService);
    authService = inject(AuthService);

    submitted = false;

    loginForm = new FormGroup({
                                  user: new FormControl('', [Validators.required]),
                                  pass: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(16)])
                              });
    
    
    handleLogin() 
    {
        this.submitted = true;

        if(this.loginForm.invalid)
            this.toastrService.error("The data you provided is invalid!", "Oops! Invalid data!");
        else
        {
            this.restService.login({
                                       username: this.loginForm.value.user as string,
                                       password: this.loginForm.value.pass as string,
                                   })
                            .subscribe({
                                           next: (res: any) => {
                                                                this.authService.updateToken(res.token);
                                                                this.toastrService.success(`You can now manage your to-dos`, 
                                                                                           `Welcome ${this.loginForm.value.user}!`);

                                                                setTimeout(() => { this.router.navigateByUrl("/todos") }, 10);
                                                            },
                                           error: (err) => {
                                                               this.toastrService.error("Please, insert a valid username and password", 
                                                                                        "Oops! Invalid credentials");
                                                           },
                                           complete: () => {}
                                       });
        }
    }
}
