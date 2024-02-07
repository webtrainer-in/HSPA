import { HttpErrorResponse, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable, of, throwError, timer } from 'rxjs';
import { RetryConfig, catchError, concatMap, retry, retryWhen } from 'rxjs/operators';
import { ErrorCode } from '../enums/enums';
import { AlertifyService } from './alertify.service';

@Injectable({
    providedIn: 'root'
})
export class HttpErrorInterceptorService implements HttpInterceptor {

    retryConfig: RetryConfig = {
        count: 2,
        delay: (error: any) => this.shouldRetry(error, 300),
      };

    constructor(private alertify: AlertifyService) {}

    intercept(request: HttpRequest<any>, next: HttpHandler) {
        console.log('HTTP Request started');
        return next.handle(request)
            .pipe(
                retry(this.retryConfig),
                catchError((error: HttpErrorResponse): Observable<never> => {
                    const errorMessage = this.setError(error);
                    console.log(error);
                    this.alertify.error(errorMessage);
                    return throwError(() => errorMessage);
                })
            );
    }

    // Retry the request in case of errror
    shouldRetry(
        error: HttpErrorResponse,
        miliSeconds: number
      ): Observable<unknown> {
        if (error.status === ErrorCode.serverDown) {
          return timer(miliSeconds);
        }
   
        throw error;
      }

    setError(error: HttpErrorResponse): string {
        let errorMessage = 'Unknown error occured';
        if(error.error instanceof ErrorEvent) {
            // Client side error
            errorMessage = error.error.message;
        } else {
            // server side error
            if(error.status===401)
            {
                return error.statusText;
            }

            if (error.error.errorMessage && error.status!==0) {
                {errorMessage = error.error.errorMessage;}
            }

            if (!error.error.errorMessage && error.error && error.status!==0) {
                {errorMessage = error.error;}
            }
        }
        return errorMessage;
    }
}
