import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ContentService } from '../../../services/content.service';
import { Content } from '../../../models/content.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-content-detail',
  template: `
    <div class="content-detail-container">
      <div class="detail-header">
        <button class="btn btn-back" (click)="goBack()">← Back</button>
      </div>

      <div *ngIf="content$ | async as contentData; else loading">
        <article class="content-detail">
          <h1>{{ contentData?.['title'] }}</h1>
          
          <div class="meta-info">
            <span class="meta-item">
              <strong>Author:</strong> {{ contentData?.['author'] }}
            </span>
            <span class="meta-item">
              <strong>Type:</strong> {{ contentData?.['type'] }}
            </span>
            <span class="meta-item">
              <strong>Status:</strong> 
              <span class="badge" [class.published]="contentData?.['status'] === 'published'">
                {{ contentData?.['status'] }}
              </span>
            </span>
            <span class="meta-item">
              <strong>Created:</strong> {{ contentData?.['createdAt'] | date: 'medium' }}
            </span>
          </div>

          <div class="content-body">
            <p>{{ contentData?.['description'] }}</p>
            <div [innerHTML]="contentData?.['body']"></div>
          </div>

          <div class="actions">
            <button class="btn btn-edit" (click)="editContent()">Edit</button>
            <button class="btn btn-delete" (click)="deleteContent()">Delete</button>
          </div>
        </article>
      </div>

      <ng-template #loading>
        <p class="loading">Loading content...</p>
      </ng-template>
    </div>
  `,
  styles: [`
    .content-detail-container {
      max-width: 900px;
      margin: 0 auto;
      padding: 20px;
    }

    .detail-header {
      margin-bottom: 20px;
    }

    .btn {
      padding: 8px 16px;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-size: 14px;
    }

    .btn-back {
      background-color: #6c757d;
      color: white;
    }

    .btn-back:hover {
      background-color: #5a6268;
    }

    .content-detail {
      background: white;
      padding: 30px;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }

    h1 {
      margin-bottom: 20px;
      color: #333;
    }

    .meta-info {
      display: flex;
      flex-wrap: wrap;
      gap: 20px;
      margin-bottom: 30px;
      padding-bottom: 20px;
      border-bottom: 1px solid #eee;
    }

    .meta-item {
      font-size: 14px;
      color: #666;
    }

    .badge {
      padding: 4px 8px;
      border-radius: 4px;
      background-color: #e0e0e0;
      font-size: 12px;
    }

    .badge.published {
      background-color: #d4edda;
      color: #155724;
    }

    .content-body {
      line-height: 1.6;
      color: #333;
      margin-bottom: 30px;
    }

    .actions {
      display: flex;
      gap: 10px;
    }

    .btn-edit {
      background-color: #007bff;
      color: white;
    }

    .btn-edit:hover {
      background-color: #0056b3;
    }

    .btn-delete {
      background-color: #dc3545;
      color: white;
    }

    .btn-delete:hover {
      background-color: #c82333;
    }

    .loading {
      text-align: center;
      padding: 40px;
      color: #666;
    }
  `]
})
export class ContentDetailComponent implements OnInit {
  content$: Observable<any>;
  contentId: string | null = null;

  constructor(
    private contentService: ContentService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.content$ = new Observable();
  }

  ngOnInit(): void {
    this.contentId = this.route.snapshot.paramMap.get('id');
    if (this.contentId) {
      this.loadContent();
    }
  }

  loadContent(): void {
    if (this.contentId) {
      this.content$ = this.contentService.getContentById(this.contentId);
    }
  }

  editContent(): void {
    if (this.contentId) {
      this.router.navigate(['/content/edit', this.contentId]);
    }
  }

  deleteContent(): void {
    if (this.contentId && confirm('Are you sure you want to delete this content?')) {
      this.contentService.deleteContent(this.contentId).subscribe({
        next: () => {
          this.router.navigate(['/content']);
        },
        error: (error: any) => console.error('Error deleting content:', error)
      });
    }
  }

  goBack(): void {
    this.router.navigate(['/content']);
  }
}
