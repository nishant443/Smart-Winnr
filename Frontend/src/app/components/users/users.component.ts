import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { AnalyticsService } from '../../services/analytics.service';
import { User } from '../../models/user.model';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-users',
  template: `
    <div class="users-container">
      <div class="users-header">
        <h2>Users Management</h2>
        <button class="btn btn-primary" (click)="addNewUser()">Add User</button>
      </div>
      
      <div class="users-content">
        <app-user-list 
          [users]="users | async"
          (edit)="editUser($event)"
          (delete)="deleteUser($event)"
          (ban)="banUser($event)"
          (unban)="unbanUser($event)">
        </app-user-list>
      </div>
    </div>
  `,
  styles: [`
    .users-container {
      padding: 20px;
    }
    
    .users-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;
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
  `]
})
export class UsersComponent implements OnInit {
  users: any;
  loading = false;

  constructor(private userService: UserService, private analyticsService: AnalyticsService) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.users = this.userService.getAllUsers().pipe(
      map(response => response.data)
    );
  }

  addNewUser(): void {
    // Navigate to user form for adding
  }

  editUser(user: User): void {
    // Navigate to user form for editing
  }

  deleteUser(userId: string): void {
    if (confirm('Are you sure you want to delete this user?')) {
      this.userService.deleteUser(userId).subscribe({
        next: () => this.loadUsers(),
        error: (error: any) => console.error('Error deleting user:', error)
      });
    }
  }

  banUser(userId: string): void {
    // The ban action is already handled in user-list component
    // Just refresh the list
    this.loadUsers();
    // Refresh admin overview counts
    this.analyticsService.refreshOverview();
  }

  unbanUser(userId: string): void {
    // The unban action is already handled in user-list component
    // Just refresh the list
    this.loadUsers();
    // Refresh admin overview counts
    this.analyticsService.refreshOverview();
  }
}
