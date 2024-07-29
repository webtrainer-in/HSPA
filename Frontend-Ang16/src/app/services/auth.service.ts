import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserForRegister, UserForLogin } from '../model/user';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    baseUrl = environment.baseUrl;
    constructor(private http: HttpClient) { }

    authUser(user: UserForLogin) {
        return this.http.post(this.baseUrl + '/account/login', user);
    }

    registerUser(user: UserForRegister) {
        return this.http.post(this.baseUrl + '/account/register', user);
    }

}
