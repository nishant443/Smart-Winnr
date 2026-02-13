import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  template: `
    <nav class="navbar">
      <div class="navbar-brand">
        <h1>Admin Dashboard</h1>
      </div>
      <div class="navbar-user">
        <span class="user-name">{{ authService.currentUserValue?.name }}</span>
        <span class="user-role" [class.admin]="authService.isAdmin">
          {{ authService.currentUserValue?.role }}
        </span>
        <button class="btn-logout" (click)="logout()">Logout</button>
      </div>
    </nav>
  `,
  styles: [`
    .navbar {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      height: 60px;
      background: white;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 30px;
      z-index: 1000;
    }

    .navbar-brand h1 {
      margin: 0;
      font-size: 24px;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }

    .navbar-user {
      display: flex;
      align-items: center;
      gap: 15px;
    }

    .user-name {
      font-weight: 600;
      color: #333;
    }

    .user-role {
      padding: 4px 12px;
      background: #e3f2fd;
      color: #1976d2;
      border-radius: 12px;
      font-size: 12px;
      font-weight: 600;
      text-transform: uppercase;
    }

    .user-role.admin {
      background: #fce4ec;
      color: #c2185b;
    }

    .btn-logout {
      padding: 8px 20px;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      border: none;
      border-radius: 6px;
      cursor: pointer;
      font-weight: 600;
      transition: transform 0.2s;
    }

    .btn-logout:hover {
      transform: translateY(-2px);
    }
  `]
})
export class NavbarComponent {
  constructor(
    public authService: AuthService,
    private router: Router
  ) {}

  logout(): void {
    this.authService.logout();
  }
}
