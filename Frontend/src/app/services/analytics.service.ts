import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { ApiResponse } from '../models/api-response.model';
import { DashboardOverview, TrendData, SalesData } from '../models/analytics.model';

@Injectable({
  providedIn: 'root'
})
export class AnalyticsService {
  private apiUrl = `${environment.apiUrl}/analytics`;
  private overviewSubject = new BehaviorSubject<DashboardOverview | null>(null);
  public overview$ = this.overviewSubject.asObservable();

  constructor(private http: HttpClient) {}

  getDashboardOverview(): Observable<ApiResponse<DashboardOverview>> {
    return this.http.get<ApiResponse<DashboardOverview>>(`${this.apiUrl}/overview`);
  }

  refreshOverview(): void {
    this.getDashboardOverview().pipe(
      tap(response => {
        if (response && response.data) {
          this.overviewSubject.next(response.data);
        }
      })
    ).subscribe({ error: (err) => console.error('Failed to refresh overview', err) });
  }

  getSignupsTrend(days: number = 7): Observable<ApiResponse<TrendData[]>> {
    const params = new HttpParams().set('days', days.toString());
    return this.http.get<ApiResponse<TrendData[]>>(`${this.apiUrl}/signups-trend`, { params });
  }

  getActivityTrend(days: number = 7): Observable<ApiResponse<TrendData[]>> {
    const params = new HttpParams().set('days', days.toString());
    return this.http.get<ApiResponse<TrendData[]>>(`${this.apiUrl}/activity-trend`, { params });
  }

  getSalesData(days: number = 30): Observable<ApiResponse<SalesData[]>> {
    const params = new HttpParams().set('days', days.toString());
    return this.http.get<ApiResponse<SalesData[]>>(`${this.apiUrl}/sales`, { params });
  }

  getAnalyticsSummary(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/summary`);
  }

  createAnalytics(data: any): Observable<ApiResponse<any>> {
    return this.http.post<ApiResponse<any>>(this.apiUrl, data);
  }
}
