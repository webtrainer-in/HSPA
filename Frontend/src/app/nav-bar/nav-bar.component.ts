import { Component, OnInit } from '@angular/core';
import { AlertifyService } from '../services/alertify.service';

@Component({
    selector: 'app-nav-bar',
    templateUrl: './nav-bar.component.html',
    styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

    loggedinUser: string;
    constructor(private alertify: AlertifyService) { }

    ngOnInit() {
    }

    loggedin() {
        this.loggedinUser = localStorage.getItem('userName');
        return this.loggedinUser;
    }

    onLogout() {
        localStorage.removeItem('token');
        localStorage.removeItem('userName');
        this.alertify.success('You are logged out !');
    }

}
