

import { Routes } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { TodoPageComponent } from './todo-page/todo-page.component';
import { ResetPageComponent } from './reset-page/reset-page.component';
import { TodoDetailComponent } from './todo-detail/todo-detail.component';
import { authGuard } from './_guards/auth/auth.guard'
import { LogoutComponent } from './logout/logout.component';


export const routes: Routes = [{
                                   path: "home",
                                   title: "To-do List Angular App",
                                   component: HomepageComponent
                               },
                               {
                                   path: "login",
                                   title: "Login | To-do List Angular App",
                                   component: LoginComponent
                               },
                               {
                                   path: "signup",
                                   title: "Sign up | To-do List Angular App",
                                   component: SignupComponent,
                               },
                               {
                                   path: "logout",
                                   title: "Log out | To-do List Angular App",
                                   component: LogoutComponent,
                               },
                               {
                                   path: "reset",
                                   title: "Reset app | To-do List Angular App",
                                   component: ResetPageComponent
                               },
                               {
                                   path: "todos",
                                   title: "To-do List | To-do List Angular App",
                                   component: TodoPageComponent,
                                   canActivate: [authGuard]
                               },
                               {
                                   path: "todos/:id",
                                   title: "To-do Detail | To-do List Angular App",
                                   component: TodoDetailComponent,
                                   canActivate: [authGuard]
                               },
                               {
                                   path: "**",
                                   redirectTo: "angular-info",
                                   pathMatch: "full"
                               }];
