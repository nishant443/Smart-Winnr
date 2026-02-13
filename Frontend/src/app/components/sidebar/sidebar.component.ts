import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-sidebar',
  template: `
    <aside class="sidebar">
      <ul class="nav-menu">
        <li>
          <a routerLink="/dashboard" routerLinkActive="active">
            <span class="icon">📊</span>
            <span>{{ authService.isAdmin ? 'Admin Dashboard' : 'User Dashboard' }}</span>
          </a>
        </li>
        <li *ngIf="authService.isAdmin">
          <a routerLink="/users" routerLinkActive="active">
            <span class="icon">👥</span>
            <span>Users</span>
          </a>
        </li>
        <li *ngIf="authService.isAdmin">
          <a routerLink="/analytics" routerLinkActive="active">
            <span class="icon">📈</span>
            <span>Analytics</span>
          </a>
        </li>
        <li>
          <a routerLink="/content" routerLinkActive="active">
            <span class="icon">📝</span>
            <span>Content</span>
          </a>
        </li>
      </ul>
    </aside>
  `,
  styles: [`
    .sidebar {
      position: fixed;
      left: 0;
      top: 60px;
      width: 250px;
      height: calc(100vh - 60px);
      background: white;
      box-shadow: 2px 0 4px rgba(0,0,0,0.1);
      padding: 20px 0;
    }

    .nav-menu {
      list-style: none;
      padding: 0;
      margin: 0;
    }

    .nav-menu li {
      margin-bottom: 5px;
    }

    .nav-menu a {
      display: flex;
      align-items: center;
      padding: 12px 20px;
      color: #666;
      text-decoration: none;
      transition: all 0.3s;
      gap: 12px;
    }

    .nav-menu a:hover {
      background: #f5f7fa;
      color: #667eea;
    }

    .nav-menu a.active {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      border-right: 4px solid #764ba2;
    }

    .icon {
      font-size: 20px;
      width: 24px;
      text-align: center;
    }

    @media (max-width: 768px) {
      .sidebar {
        transform: translateX(-100%);
      }
    }
  `]
})
export class SidebarComponent {
  constructor(public authService: AuthService) {}
}
