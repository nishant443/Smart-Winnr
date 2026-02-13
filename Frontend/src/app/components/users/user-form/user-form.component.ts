import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-user-form',
  template: `
    <div class="user-form-container">
      <h2>{{ isEdit ? 'Edit User' : 'Add New User' }}</h2>
      
      <form [formGroup]="userForm" (ngSubmit)="onSubmit()">
        <div class="form-group">
          <label for="name">Name</label>
          <input 
            id="name"
            type="text" 
            formControlName="name"
            class="form-control"
            required>
        </div>
        
        <div class="form-group">
          <label for="email">Email</label>
          <input 
            id="email"
            type="email" 
            formControlName="email"
            class="form-control"
            required>
        </div>
        
        <div class="form-group">
          <label for="role">Role</label>
          <select 
            id="role"
            formControlName="role"
            class="form-control">
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
        </div>
        
        <div class="form-group">
          <label for="isActive">
            <input 
              id="isActive"
              type="checkbox" 
              formControlName="isActive">
            Active
          </label>
        </div>
        
        <div class="form-actions">
          <button type="submit" class="btn btn-primary" [disabled]="!userForm.valid || loading">
            {{ loading ? 'Saving...' : 'Save' }}
          </button>
          <button type="button" class="btn btn-secondary" (click)="onCancel()">Cancel</button>
        </div>
      </form>
    </div>
  `,
  styles: [`
    .user-form-container {
      padding: 20px;
      max-width: 500px;
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
    }
    
    .form-control:focus {
      outline: none;
      border-color: #007bff;
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
export class UserFormComponent implements OnInit {
  userForm: FormGroup;
  loading = false;
  isEdit = false;
  userId: string | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.userForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      role: ['user', Validators.required],
      isActive: [true]
    });
  }

  ngOnInit(): void {
    this.userId = this.route.snapshot.paramMap.get('id');
    if (this.userId) {
      this.isEdit = true;
      this.loadUserData();
    }
  }

  loadUserData(): void {
    if (this.userId) {
      this.userService.getUserById(this.userId).subscribe({
        next: (user) => {
          this.userForm.patchValue(user);
        },
        error: (error) => console.error('Error loading user:', error)
      });
    }
  }

  onSubmit(): void {
    if (this.userForm.invalid) return;

    this.loading = true;
    const data = this.userForm.value;

    const request = this.isEdit && this.userId
      ? this.userService.updateUser(this.userId, data)
      : this.userService.createUser(data);

    request.subscribe({
      next: () => {
        alert(this.isEdit ? 'User updated successfully' : 'User created successfully');
        this.router.navigate(['/users']);
      },
      error: (error: any) => {
        console.error('Error:', error);
        alert('An error occurred');
        this.loading = false;
      }
    });
  }

  onCancel(): void {
    this.router.navigate(['/users']);
  }
}
