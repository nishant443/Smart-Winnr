import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { UsersComponent } from './components/users/users.component';
import { AnalyticsComponent } from './components/analytics/analytics.component';
import { ContentListComponent } from './components/content/content-list/content-list.component';
import { ContentDetailComponent } from './components/content/content-detail/content-detail.component';
import { ContentFormComponent } from './components/content/content-form/content-form.component';
import { AuthGuard } from './guards/auth.guard';
import { AdminGuard } from './guards/admin.guard';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'users',
    component: UsersComponent,
    canActivate: [AuthGuard, AdminGuard]
  },
  {
    path: 'analytics',
    component: AnalyticsComponent,
    canActivate: [AuthGuard, AdminGuard]
  },
  {
    path: 'content',
    canActivate: [AuthGuard],
    children: [
      { path: '', component: ContentListComponent },
      { path: 'create', component: ContentFormComponent, canActivate: [AdminGuard] },
      { path: 'edit/:id', component: ContentFormComponent, canActivate: [AdminGuard] },
      { path: ':id', component: ContentDetailComponent }
    ]
  },
  { path: '**', redirectTo: '/dashboard' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
