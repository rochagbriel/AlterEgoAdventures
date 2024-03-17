import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, map, tap } from 'rxjs';
import { environment } from '../../environments/environment';
import { Data } from '@angular/router';
import { Record } from '../models/expedition.models';

@Injectable({
  providedIn: 'root',
})
export class UpcomingService {
  private apiUrl = environment.apiUrl + environment.apiUpcoming;
  private token = environment.apiKey;

  private upcomingDataSubject = new BehaviorSubject<any[]>([]);
  public upcomingData$: Observable<any[]> =
    this.upcomingDataSubject.asObservable();

  constructor(private http: HttpClient) {
    this.loadUpcomingData();
  }

  private loadUpcomingData() {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`,
    });

    this.http
      .get<Data>(this.apiUrl, { headers })
      .pipe(
        tap((data) => {
          this.upcomingDataSubject.next(data['records']);
        })
      )
      .subscribe();
  }

  public loadUpcomingPictures(id: string) {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`,
    });

    return this.http
      .get<Data>(environment.apiUrl + id, { headers })
      .pipe(map((data) => data['records']));
  }

  getUpcomingData(): Observable<any[]> {
    return this.upcomingData$;
  }

  getRecordById(id: string): Observable<Record | undefined> {
    return this.upcomingData$.pipe(
      map((dataArray) => dataArray.find((item) => item.id === id))
    );
  }
}
