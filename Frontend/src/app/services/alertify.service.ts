import { Injectable } from '@angular/core';
import * as alertyfy from 'alertifyjs';

@Injectable({
    providedIn: 'root'
})
export class AlertifyService {

    constructor() { }

    success(message: string) {
        alertyfy.success(message);
    }

    warning(message: string) {
        alertyfy.warning(message);
    }

    error(message: string) {
        alertyfy.error(message);
    }


}
