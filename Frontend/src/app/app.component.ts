import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  template: `
    <div class="app-container">
      <app-navbar *ngIf="authService.isLoggedIn"></app-navbar>
      <div class="main-container" *ngIf="authService.isLoggedIn">
        <app-sidebar></app-sidebar>
        <main class="content">
          <router-outlet></router-outlet>
        </main>
      </div>
      <router-outlet *ngIf="!authService.isLoggedIn"></router-outlet>
    </div>
  `,
  styles: [`
    .app-container {
      min-height: 100vh;
    }

    .main-container {
      display: flex;
      padding-top: 60px;
    }

    .content {
      flex: 1;
      margin-left: 250px;
      padding: 30px;
      background-color: #f5f7fa;
      min-height: calc(100vh - 60px);
    }

    @media (max-width: 768px) {
      .content {
        margin-left: 0;
        padding: 20px;
      }
    }
  `]
})
export class AppComponent {
  constructor(public authService: AuthService) {}
}
