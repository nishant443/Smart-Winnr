import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ContentService } from '../../../services/content.service';
import { Content } from '../../../models/content.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-content-list',
  template: `
    <div class="content-list-container">
      <div class="list-header">
        <h2>Content Management</h2>
        <button class="btn btn-primary" (click)="addContent()">Add Content</button>
      </div>

      <div class="list-content">
        <table class="table" *ngIf="(contents$ | async)?.['data'] as contentList; else noContent">
          <thead>
            <tr>
              <th>Title</th>
              <th>Type</th>
              <th>Author</th>
              <th>Status</th>
              <th>Created</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let content of contentList">
              <td>{{ content?.['title'] }}</td>
              <td>{{ content?.['type'] }}</td>
              <td>{{ content?.['author'] }}</td>
              <td><span class="badge" [class.published]="content?.['status'] === 'published'">{{ content?.['status'] }}</span></td>
              <td>{{ content?.['createdAt'] | date: 'short' }}</td>
              <td>
                <button class="btn-small btn-view" (click)="viewContent(content?.['_id'])">View</button>
                <button class="btn-small btn-edit" (click)="editContent(content?.['_id'])">Edit</button>
                <button class="btn-small btn-delete" (click)="deleteContent(content?.['_id'])">Delete</button>
              </td>
            </tr>
          </tbody>
        </table>
        <ng-template #noContent>
          <p class="no-data">No content found</p>
        </ng-template>
      </div>
    </div>
  `,
  styles: [`
    .content-list-container {
      padding: 0;
    }

    .list-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;
    }

    h2 {
      margin: 0;
    }

    .btn {
      padding: 8px 16px;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-size: 14px;
    }

    .btn-primary {
      background-color: #007bff;
      color: white;
    }

    .btn-primary:hover {
      background-color: #0056b3;
    }

    .table {
      width: 100%;
      border-collapse: collapse;
      background-color: white;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }

    .table th, .table td {
      padding: 12px;
      text-align: left;
      border-bottom: 1px solid #ddd;
    }

    .table th {
      background-color: #f5f5f5;
      font-weight: bold;
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

    .btn-small {
      padding: 4px 8px;
      margin-right: 4px;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-size: 12px;
    }

    .btn-view {
      background-color: #17a2b8;
      color: white;
    }

    .btn-edit {
      background-color: #007bff;
      color: white;
    }

    .btn-delete {
      background-color: #dc3545;
      color: white;
    }

    .no-data {
      text-align: center;
      padding: 40px;
      color: #666;
    }
  `]
})
export class ContentListComponent implements OnInit {
  contents$: Observable<any>;

  constructor(
    private contentService: ContentService,
    private router: Router
  ) {
    this.contents$ = new Observable();
  }

  ngOnInit(): void {
    this.loadContent();
  }

  loadContent(): void {
    this.contents$ = this.contentService.getAllContent();
  }

  addContent(): void {
    this.router.navigate(['/content/create']);
  }

  viewContent(contentId: string): void {
    this.router.navigate(['/content', contentId]);
  }

  editContent(contentId: string): void {
    this.router.navigate(['/content/edit', contentId]);
  }

  deleteContent(contentId: string): void {
    if (confirm('Are you sure you want to delete this content?')) {
      this.contentService.deleteContent(contentId).subscribe({
        next: () => this.loadContent(),
        error: (error: any) => console.error('Error dele ting content:', error)
      });
    }
  }
}
