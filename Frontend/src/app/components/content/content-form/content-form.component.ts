import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ContentService } from '../../../services/content.service';

@Component({
  selector: 'app-content-form',
  template: `
    <div class="content-form-container">
      <h2>{{ isEdit ? 'Edit Content' : 'Create New Content' }}</h2>
      
      <form [formGroup]="contentForm" (ngSubmit)="onSubmit()">
        <div class="form-group">
          <label for="title">Title</label>
          <input 
            id="title"
            type="text" 
            formControlName="title"
            class="form-control"
            required>
        </div>

        <div class="form-group">
          <label for="description">Description</label>
          <textarea 
            id="description"
            formControlName="description"
            class="form-control"
            rows="3"
            required></textarea>
        </div>

        <div class="form-group">
          <label for="type">Type</label>
          <select 
            id="type"
            formControlName="type"
            class="form-control"
            required>
            <option value="">Select Type</option>
            <option value="article">Article</option>
            <option value="video">Video</option>
            <option value="image">Image</option>
            <option value="document">Document</option>
          </select>
        </div>

        <div class="form-group">
          <label for="body">Content</label>
          <textarea 
            id="body"
            formControlName="body"
            class="form-control"
            rows="6"
            required></textarea>
        </div>

        <div class="form-group">
          <label for="status">Status</label>
          <select 
            id="status"
            formControlName="status"
            class="form-control">
            <option value="draft">Draft</option>
            <option value="published">Published</option>
            <option value="archived">Archived</option>
          </select>
        </div>

        <div class="form-actions">
          <button type="submit" class="btn btn-primary" [disabled]="!contentForm.valid || loading">
            {{ loading ? 'Saving...' : 'Save' }}
          </button>
          <button type="button" class="btn btn-secondary" (click)="onCancel()">Cancel</button>
        </div>
      </form>
    </div>
  `,
  styles: [`
    .content-form-container {
      padding: 20px;
      max-width: 600px;
    }

    h2 {
      margin-bottom: 20px;
      color: #333;
    }

    .form-group {
      margin-bottom: 20px;
    }

    label {
      display: block;
      margin-bottom: 5px;
      font-weight: bold;
      color: #333;
    }

    .form-control {
      width: 100%;
      padding: 8px 12px;
      border: 1px solid #ddd;
      border-radius: 4px;
      font-size: 14px;
      font-family: Arial, sans-serif;
    }

    .form-control:focus {
      outline: none;
      border-color: #007bff;
    }

    textarea.form-control {
      resize: vertical;
    }

    .form-actions {
      display: flex;
      gap: 10px;
      margin-top: 30px;
    }

    .btn {
      padding: 10px 20px;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-size: 14px;
    }

    .btn-primary {
      background-color: #007bff;
      color: white;
    }

    .btn-primary:hover:not(:disabled) {
      background-color: #0056b3;
    }

    .btn-primary:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }

    .btn-secondary {
      background-color: #6c757d;
      color: white;
    }

    .btn-secondary:hover {
      background-color: #5a6268;
    }
  `]
})
export class ContentFormComponent implements OnInit {
  contentForm: FormGroup;
  loading = false;
  isEdit = false;
  contentId: string | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private contentService: ContentService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.contentForm = this.formBuilder.group({
      title: ['', [Validators.required]],
      description: ['', [Validators.required]],
      type: ['', [Validators.required]],
      body: ['', [Validators.required]],
      status: ['draft', Validators.required]
    });
  }

  ngOnInit(): void {
    this.contentId = this.route.snapshot.paramMap.get('id');
    if (this.contentId) {
      this.isEdit = true;
      this.loadContentData();
    }
  }

  loadContentData(): void {
    if (this.contentId) {
      this.contentService.getContentById(this.contentId).subscribe({
        next: (content) => {
          this.contentForm.patchValue(content);
        },
        error: (error) => console.error('Error loading content:', error)
      });
    }
  }

  onSubmit(): void {
    if (this.contentForm.invalid) return;

    this.loading = true;
    const data = this.contentForm.value;

    const request = this.isEdit && this.contentId
      ? this.contentService.updateContent(this.contentId, data)
      : this.contentService.createContent(data);

    request.subscribe({
      next: () => {
        alert(this.isEdit ? 'Content updated successfully' : 'Content created successfully');
        this.router.navigate(['/content']);
      },
      error: (error: any) => {
        console.error('Error:', error);
        alert('An error occurred');
        this.loading = false;
      }
    });
  }

  onCancel(): void {
    this.router.navigate(['/content']);
  }
}
