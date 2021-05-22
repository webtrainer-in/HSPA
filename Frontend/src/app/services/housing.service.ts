import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Property } from '../model/property';
import { environment } from '../../environments/environment';


@Injectable({
    providedIn: 'root'
})
export class HousingService {

    baseUrl = environment.baseUrl;

    constructor(private http: HttpClient) { }

    getAllCities(): Observable<string[]> {
        return this.http.get<string[]>(this.baseUrl + '/city/cities');
    }

    getProperty(id: number) {
        return this.getAllProperties(1).pipe(
            map(propertiesArray =>
            // throw new Error('Some error');
                propertiesArray.find(p => p.id === id)
            )
        );
    }

    getAllProperties(SellRent?: number): Observable<Property[]> {
        return this.http.get<Property[]>(this.baseUrl + '/property/list/'+SellRent.toString());
    }
    addProperty(property: Property) {
        let newProp = [property];

        // Add new property in array if newProp alreay exists in local storage
        if (localStorage.getItem('newProp')) {
            newProp = [property,
                ...JSON.parse(localStorage.getItem('newProp'))];
        }

        localStorage.setItem('newProp', JSON.stringify(newProp));
    }

    newPropID() {
        if (localStorage.getItem('PID')) {
            localStorage.setItem('PID', String(+localStorage.getItem('PID') + 1));
            return +localStorage.getItem('PID');
        } else {
            localStorage.setItem('PID', '101');
            return 101;
        }
    }
}
