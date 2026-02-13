import { Component, OnInit } from '@angular/core';
import { AnalyticsService } from '../../services/analytics.service';
import { UserService } from '../../services/user.service';
import { ContentService } from '../../services/content.service';
import { AuthService } from '../../services/auth.service';
import { DashboardOverview, UserStats, ContentStats, TrendData } from '../../models/analytics.model';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  overview: DashboardOverview | null = null;
  userStats: UserStats | null = null;
  contentStats: ContentStats | null = null;
  signupsTrend: TrendData[] = [];
  activityTrend: TrendData[] = [];
  loading = true;
  isAdmin = false;
  currentUser: User | null = null;

  // Chart data
  signupsChartData: any;
  activityChartData: any;
  chartOptions: any;

  constructor(
    private analyticsService: AnalyticsService,
    private userService: UserService,
    private contentService: ContentService,
    public authService: AuthService
  ) {
    this.isAdmin = this.authService.isAdmin;
  }

  ngOnInit(): void {
    this.getCurrentUser();
    this.loadDashboardData();
  }

  getCurrentUser(): void {
    const user = this.authService.currentUserValue;
    if (user) {
      this.currentUser = user;
    }
  }

  loadDashboardData(): void {
    this.loading = true;

    if (this.isAdmin) {
      // Load admin dashboard data
      // Subscribe to shared overview observable so counts update in real-time
      this.analyticsService.overview$.subscribe(data => {
        this.overview = data;
      });
      // Trigger initial load
      this.analyticsService.refreshOverview();

      this.userService.getUserStats().subscribe({
        next: (response) => {
          this.userStats = response.data;
        },
        error: (error) => console.error('Error loading user stats:', error)
      });

      this.contentService.getContentStats().subscribe({
        next: (response) => {
          this.contentStats = response.data;
        },
        error: (error) => console.error('Error loading content stats:', error)
      });

      this.analyticsService.getSignupsTrend(7).subscribe({
        next: (response) => {
          this.signupsTrend = response.data;
          this.prepareChartData();
        },
        error: (error) => console.error('Error loading signups trend:', error)
      });

      this.analyticsService.getActivityTrend(7).subscribe({
        next: (response) => {
          this.activityTrend = response.data;
          this.prepareChartData();
          this.loading = false;
        },
        error: (error) => {
          console.error('Error loading activity trend:', error);
          this.loading = false;
        }
      });
    } else {
      // User dashboard - just show simple welcome message
      this.loading = false;
    }
  }

  prepareChartData(): void {
    // Prepare signup chart data
    this.signupsChartData = {
      labels: this.signupsTrend.map(item => item._id),
      datasets: [{
        label: 'User Signups',
        data: this.signupsTrend.map(item => item.count),
        borderColor: '#667eea',
        backgroundColor: 'rgba(102, 126, 234, 0.1)',
        tension: 0.4,
        fill: true
      }]
    };

    // Prepare activity chart data
    this.activityChartData = {
      labels: this.activityTrend.map(item => item._id),
      datasets: [{
        label: 'User Logins',
        data: this.activityTrend.map(item => item.count),
        borderColor: '#764ba2',
        backgroundColor: 'rgba(118, 75, 162, 0.1)',
        tension: 0.4,
        fill: true
      }]
    };

    this.chartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: true,
          position: 'top'
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            precision: 0
          }
        }
      }
    };
  }
}
