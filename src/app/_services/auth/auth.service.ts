
import { computed, effect, Injectable, signal, WritableSignal } from '@angular/core';
import { AuthState } from './auth-state.type';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class AuthService 
{
    authState: WritableSignal<AuthState> = signal<AuthState>({
                                                                 user: this.getUser(),
                                                                 token: this.getToken(),
                                                                 isAuthenticated: this.isUserAuthenticated()
                                                             });

    user = computed(() => this.authState().user);
    token = computed(() => this.authState().token);
    isAuthenticated = computed(() => this.authState().isAuthenticated);
    

    constructor()
    {
        effect(() => {
                         const user = this.authState().user;
                         const token = this.authState().token;

                         if (token !== null)
                            localStorage.setItem("token", token);
                         else
                            localStorage.removeItem("token");

                         if (user !== null)
                            localStorage.setItem("user", user);
                         else
                            localStorage.removeItem("user");
                     });
    }


    getToken()
    {
        return localStorage.getItem("token");
    }


    getUser()
    {
        return localStorage.getItem("user");
    }


    verifyToken(token: string | null): boolean
    {
        if (token !== null)
        {
            try 
            {
                const decodedToken = jwtDecode(token);
                const expiration = decodedToken.exp;

                if (expiration === undefined || expiration * 1000 <= Date.now())
                    return false;
                else
                    return true;                
            } 
            catch (error) 
            {
                return false;
            }
        }

        return false;
    }


    isUserAuthenticated(): boolean
    {
        return this.verifyToken(this.getToken());
    }


    updateToken(token: string)
    {
        const decodedToken: any = jwtDecode(token);
        const user = decodedToken.username;

        this.authState.set({
                               user: user,
                               token: token,
                               isAuthenticated: this.verifyToken(token)
                           });
    }


    logout()
    {
        this.authState.set({
                               user: null,
                               token: null,
                               isAuthenticated: false
                           });
    }
}
