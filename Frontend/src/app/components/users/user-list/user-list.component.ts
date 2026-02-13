import { Component, Input, Output, EventEmitter } from '@angular/core';
import { User } from '../../../models/user.model';
import { UserService } from '../../../services/user.service';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-user-list',
  template: `
    <div class="user-list-container">
      <table class="table" *ngIf="users && users.length > 0; else noUsers">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Status</th>
            <th>Ban Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let user of users" [class.banned-row]="user.isBanned">
            <td>{{ user.name }}</td>
            <td>{{ user.email }}</td>
            <td><span class="badge" [class.admin]="user.role === 'admin'">{{ user.role }}</span></td>
            <td><span class="status" [class.active]="user.isActive">{{ user.isActive ? 'Active' : 'Inactive' }}</span></td>
            <td>
              <span class="ban-status" [class.banned]="user.isBanned">
                {{ user.isBanned ? 'Banned' : 'Active' }}
              </span>
            </td>
            <td>
              <button class="btn-small btn-edit" (click)="onEdit(user)">Edit</button>
              <button 
                *ngIf="isAdmin && !user.isBanned" 
                class="btn-small btn-ban" 
                (click)="openBanModal(user)"
                title="Ban this user">
                Ban
              </button>
              <button 
                *ngIf="isAdmin && user.isBanned" 
                class="btn-small btn-unban" 
                (click)="openUnbanModal(user)"
                title="Unban this user">
                Unban
              </button>
              <button 
                *ngIf="isAdmin" 
                class="btn-small btn-delete" 
                (click)="onDelete(user._id)">
                Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      <ng-template #noUsers>
        <p class="no-data">No users found</p>
      </ng-template>

      <!-- Stylish Ban Modal -->
      <div class="modal-overlay" *ngIf="showBanModal" (click)="closeBanModal()">
        <div class="modal-dialog" (click)="$event.stopPropagation()">
          <div class="modal-header">
            <h3>Ban User</h3>
            <button class="close-btn" (click)="closeBanModal()">&times;</button>
          </div>
          <div class="modal-body">
            <div class="warning-icon">⚠️</div>
            <p class="modal-message">Are you sure you want to ban <strong>{{ selectedUser?.name }}</strong>?</p>
            <p class="modal-subtitle">This user will not be able to login to the system.</p>
          </div>
          <div class="modal-footer">
            <button class="btn-cancel" (click)="closeBanModal()">Cancel</button>
            <button class="btn-ban-confirm" (click)="confirmBan()">Ban User</button>
          </div>
        </div>
      </div>

      <!-- Stylish Unban Modal -->
      <div class="modal-overlay" *ngIf="showUnbanModal" (click)="closeUnbanModal()">
        <div class="modal-dialog" (click)="$event.stopPropagation()">
          <div class="modal-header">
            <h3>Unban User</h3>
            <button class="close-btn" (click)="closeUnbanModal()">&times;</button>
          </div>
          <div class="modal-body">
            <div class="success-icon">✓</div>
            <p class="modal-message">Unban <strong>{{ selectedUser?.name }}</strong>?</p>
            <p class="modal-subtitle">This user will be able to login again.</p>
          </div>
          <div class="modal-footer">
            <button class="btn-cancel" (click)="closeUnbanModal()">Cancel</button>
            <button class="btn-unban-confirm" (click)="confirmUnban()">Unban User</button>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .user-list-container {
      overflow-x: auto;
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
    
    .table tbody tr:hover {
      background-color: #f9f9f9;
    }

    .banned-row {
      background-color: #fff5f5;
      opacity: 0.7;
    }
    
    .badge {
      padding: 4px 8px;
      border-radius: 4px;
      background-color: #e0e0e0;
      font-size: 12px;
    }
    
    .badge.admin {
      background-color: #ff6b6b;
      color: white;
    }
    
    .status {
      padding: 4px 8px;
      border-radius: 4px;
    }
    
    .status.active {
      background-color: #d4edda;
      color: #155724;
    }

    .ban-status {
      padding: 4px 8px;
      border-radius: 4px;
      background-color: #d4edda;
      color: #155724;
      font-size: 12px;
    }

    .ban-status.banned {
      background-color: #f8d7da;
      color: #721c24;
    }
    
    .btn-small {
      padding: 6px 10px;
      margin-right: 4px;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-size: 12px;
      transition: all 0.2s;
    }

    .btn-small:hover {
      transform: translateY(-1px);
      box-shadow: 0 2px 4px rgba(0,0,0,0.2);
    }
    
    .btn-edit {
      background-color: #007bff;
      color: white;
    }

    .btn-edit:hover {
      background-color: #0056b3;
    }

    .btn-ban {
      background-color: #ffc107;
      color: #333;
    }

    .btn-ban:hover {
      background-color: #e0a800;
    }

    .btn-unban {
      background-color: #28a745;
      color: white;
    }

    .btn-unban:hover {
      background-color: #218838;
    }
    
    .btn-delete {
      background-color: #dc3545;
      color: white;
    }

    .btn-delete:hover {
      background-color: #c82333;
    }

    .no-data {
      text-align: center;
      padding: 40px;
      color: #666;
      background-color: white;
      border-radius: 4px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }

    /* Stylish Modal Styles */
    .modal-overlay {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: rgba(0, 0, 0, 0.5);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 1000;
      animation: fadeIn 0.3s ease-in-out;
    }

    @keyframes fadeIn {
      from {
        opacity: 0;
      }
      to {
        opacity: 1;
      }
    }

    .modal-dialog {
      background: white;
      border-radius: 12px;
      box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
      max-width: 400px;
      width: 90%;
      animation: slideUp 0.3s ease-in-out;
      overflow: hidden;
    }

    @keyframes slideUp {
      from {
        transform: translateY(30px);
        opacity: 0;
      }
      to {
        transform: translateY(0);
        opacity: 1;
      }
    }

    .modal-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 24px;
      border-bottom: 1px solid #f0f0f0;
      background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
    }

    .modal-header h3 {
      margin: 0;
      font-size: 20px;
      color: #333;
      font-weight: 600;
    }

    .close-btn {
      background: none;
      border: none;
      font-size: 28px;
      color: #999;
      cursor: pointer;
      padding: 0;
      width: 30px;
      height: 30px;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.2s;
    }

    .close-btn:hover {
      color: #333;
      transform: scale(1.1);
    }

    .modal-body {
      padding: 32px 24px;
      text-align: center;
    }

    .warning-icon {
      font-size: 48px;
      margin-bottom: 16px;
      animation: pulse 1s ease-in-out infinite;
    }

    .success-icon {
      font-size: 48px;
      margin-bottom: 16px;
    }

    @keyframes pulse {
      0%, 100% {
        transform: scale(1);
      }
      50% {
        transform: scale(1.1);
      }
    }

    .modal-message {
      font-size: 16px;
      color: #333;
      margin: 10px 0;
      font-weight: 500;
    }

    .modal-message strong {
      color: #dc3545;
    }

    .modal-subtitle {
      font-size: 14px;
      color: #666;
      margin: 8px 0 0 0;
    }

    .modal-footer {
      display: flex;
      gap: 12px;
      padding: 16px 24px;
      background-color: #f9f9f9;
      border-top: 1px solid #f0f0f0;
      justify-content: flex-end;
    }

    .btn-cancel {
      padding: 10px 20px;
      border: 1px solid #ddd;
      background-color: white;
      color: #666;
      border-radius: 6px;
      cursor: pointer;
      font-size: 14px;
      font-weight: 500;
      transition: all 0.2s;
    }

    .btn-cancel:hover {
      background-color: #f5f5f5;
      border-color: #999;
    }

    .btn-ban-confirm {
      padding: 10px 20px;
      background-color: #dc3545;
      color: white;
      border: none;
      border-radius: 6px;
      cursor: pointer;
      font-size: 14px;
      font-weight: 500;
      transition: all 0.2s;
    }

    .btn-ban-confirm:hover {
      background-color: #c82333;
      box-shadow: 0 4px 8px rgba(220, 53, 69, 0.3);
    }

    .btn-unban-confirm {
      padding: 10px 20px;
      background-color: #28a745;
      color: white;
      border: none;
      border-radius: 6px;
      cursor: pointer;
      font-size: 14px;
      font-weight: 500;
      transition: all 0.2s;
    }

    .btn-unban-confirm:hover {
      background-color: #218838;
      box-shadow: 0 4px 8px rgba(40, 167, 69, 0.3);
    }
  `]
})
export class UserListComponent {
  @Input() users: User[] | null = null;
  @Output() edit = new EventEmitter<User>();
  @Output() delete = new EventEmitter<string>();
  @Output() ban = new EventEmitter<string>();
  @Output() unban = new EventEmitter<string>();

  isAdmin = false;
  showBanModal = false;
  showUnbanModal = false;
  selectedUser: User | null = null;

  constructor(
    private userService: UserService,
    private authService: AuthService
  ) {
    this.isAdmin = this.authService.isAdmin;
  }

  onEdit(user: User): void {
    this.edit.emit(user);
  }

  onDelete(userId: string): void {
    this.delete.emit(userId);
  }

  openBanModal(user: User): void {
    this.selectedUser = user;
    this.showBanModal = true;
  }

  closeBanModal(): void {
    this.showBanModal = false;
    this.selectedUser = null;
  }

  confirmBan(): void {
    if (this.selectedUser) {
      this.userService.banUser(this.selectedUser._id).subscribe({
        next: () => {
          this.ban.emit(this.selectedUser!._id);
          this.closeBanModal();
        },
        error: (error: any) => {
          console.error('Error banning user:', error);
          alert('Failed to ban user');
        }
      });
    }
  }

  openUnbanModal(user: User): void {
    this.selectedUser = user;
    this.showUnbanModal = true;
  }

  closeUnbanModal(): void {
    this.showUnbanModal = false;
    this.selectedUser = null;
  }

  confirmUnban(): void {
    if (this.selectedUser) {
      this.userService.unbanUser(this.selectedUser._id).subscribe({
        next: () => {
          this.unban.emit(this.selectedUser!._id);
          this.closeUnbanModal();
        },
        error: (error: any) => {
          console.error('Error unbanning user:', error);
          alert('Failed to unban user');
        }
      });
    }
  }

  onBan(userId: string): void {
    if (confirm('Are you sure you want to ban this user?')) {
      this.userService.banUser(userId).subscribe({
        next: () => {
          this.ban.emit(userId);
        },
        error: (error: any) => {
          console.error('Error banning user:', error);
          alert('Failed to ban user');
        }
      });
    }
  }

  onUnban(userId: string): void {
    if (confirm('Are you sure you want to unban this user?')) {
      this.userService.unbanUser(userId).subscribe({
        next: () => {
          this.unban.emit(userId);
        },
        error: (error: any) => {
          console.error('Error unbanning user:', error);
          alert('Failed to unban user');
        }
      });
    }
  }
}
