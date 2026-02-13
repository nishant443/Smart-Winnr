import { Component } from '@angular/core';

@Component({
  selector: 'app-content',
  template: `
    <div class="content-wrapper">
      <router-outlet></router-outlet>
    </div>
  `,
  styles: [`
    .content-wrapper {
      padding: 20px;
    }
  `]
})
export class ContentComponent {}
