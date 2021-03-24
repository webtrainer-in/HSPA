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

        // let UserArray = [];
        // if (localStorage.getItem('Users')) {
        //     UserArray = JSON.parse(localStorage.getItem('Users'));
        // }
        // return UserArray.find(p => p.userName === user.userName && p.password === user.password);
    }

    registerUser(user: UserForRegister) {
        return this.http.post(this.baseUrl + '/account/register', user);
    }

}
