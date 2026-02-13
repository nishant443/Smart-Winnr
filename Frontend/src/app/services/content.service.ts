import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Content, CreateContentRequest } from '../models/content.model';
import { ApiResponse, PaginatedResponse } from '../models/api-response.model';
import { ContentStats } from '../models/analytics.model';

@Injectable({
  providedIn: 'root'
})
export class ContentService {
  private apiUrl = `${environment.apiUrl}/content`;

  constructor(private http: HttpClient) {}

  getAllContent(page: number = 1, limit: number = 10, status?: string, contentType?: string): Observable<PaginatedResponse<Content>> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('limit', limit.toString());
    
    if (status) params = params.set('status', status);
    if (contentType) params = params.set('contentType', contentType);
    
    return this.http.get<PaginatedResponse<Content>>(this.apiUrl, { params });
  }

  getContentById(id: string): Observable<ApiResponse<Content>> {
    return this.http.get<ApiResponse<Content>>(`${this.apiUrl}/${id}`);
  }

  createContent(data: CreateContentRequest): Observable<ApiResponse<Content>> {
    return this.http.post<ApiResponse<Content>>(this.apiUrl, data);
  }

  updateContent(id: string, data: Partial<Content>): Observable<ApiResponse<Content>> {
    return this.http.put<ApiResponse<Content>>(`${this.apiUrl}/${id}`, data);
  }

  deleteContent(id: string): Observable<ApiResponse<any>> {
    return this.http.delete<ApiResponse<any>>(`${this.apiUrl}/${id}`);
  }

  getContentStats(): Observable<ApiResponse<ContentStats>> {
    return this.http.get<ApiResponse<ContentStats>>(`${this.apiUrl}/stats/overview`);
  }
}
