import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Quote } from '../models/quote';

@Injectable({
  providedIn: 'root',
})
export class QuoteService {
  private url = 'https://quotes-backend-rvsa.onrender.com/stocks';
  private headers = new HttpHeaders().set('x-api-key', environment.api_key);

  api_key = environment.api_key;

  constructor(private http: HttpClient) {}

  getDow30(): Observable<Quote[]> {
    const headers = new HttpHeaders().set('x-api-key', environment.api_key);
    return this.http
      .get<Quote[]>(`${this.url}/dow30`, { headers: this.headers })
      .pipe(catchError(() => of([])));
  }
}
