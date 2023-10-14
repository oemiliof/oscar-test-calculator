import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class EconomicIndicatorService {
  private apiURL = 'http://localhost:5275/Indicator/get-indicator'; // Replace with the appropriate API endpoint

  constructor(private http: HttpClient, private snackBar: MatSnackBar) {}

  GetIndicator(): Observable<any> {
    return this.http.get(this.apiURL).pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMessage = 'An error occurred. Please try again later.';

        if (error.status === 500 && error.error && error.error.message) {
          errorMessage = error.error.message;
        }

        this.showSnackbar(errorMessage, 'Error');

        return throwError(errorMessage);
      })
    );
  }

  private showSnackbar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 5000, // Display duration in milliseconds
    });
  }
}
