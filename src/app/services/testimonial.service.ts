import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TestimonialService {
  private apiUrl = environment.apiUrl + environment.apiTestimonials;
  private token = environment.apiKey;

  constructor(private http: HttpClient) {}

  getTestimonialData(): Observable<any[]> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`,
    });

    return this.http.get<any[]>(this.apiUrl, { headers });
  }
}
