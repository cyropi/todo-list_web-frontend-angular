
import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { RestBackendService } from '../_services/rest-backend/rest-backend.service';

@Component({
  selector: 'app-signup',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss',
})
export class SignupComponent 
{
    toastrService = inject(ToastrService);
    router = inject(Router);
    restService = inject(RestBackendService);

    submitted = false;

    signupForm = new FormGroup({
                                   user: new FormControl('', [Validators.required]),
                                   pass: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(16)])
                               });

    
    handleSignup() 
    {
        this.submitted = true;

        if(this.signupForm.invalid)
            this.toastrService.error("The data you provided is invalid!", "Oops! Invalid data!");
        else
        {
            this.restService.signup({
                                        username: this.signupForm.value.user as string,
                                        password: this.signupForm.value.pass as string,
                                    })
                            .subscribe({
                                           error: (err) => {
                                                               this.toastrService.error("The username you selected was already taken", 
                                                                                        "Oops! Could not create a new user");
                                                           },
                                           complete: () => {
                                                               this.toastrService.success(`You can now login with your new account`,
                                                                                          `Congrats ${this.signupForm.value.user}!`);
                                                                
                                                               this.router.navigateByUrl("/login");
                                                           }
                                       });
        }
    }
}
