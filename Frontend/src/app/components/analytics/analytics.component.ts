import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { AnalyticsService } from '../../services/analytics.service';
import { ContentService } from '../../services/content.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

// Chart.js imports
import {
  ChartConfiguration,
  ChartOptions,
  ChartType,
  registerables
} from 'chart.js';
import { Chart } from 'chart.js';

Chart.register(...registerables);

@Component({
  selector: 'app-analytics',
  template: `
    <div class="analytics-container">
      <h2>Analytics Dashboard</h2>
      
      <div class="stats-grid" *ngIf="analyticsData$ | async as data">
        <div class="stat-card">
          <div class="stat-label">Total Users</div>
          <div class="stat-value">{{ data?.totalUsers || 0 }}</div>
        </div>
        <div class="stat-card">
          <div class="stat-label">Active Users</div>
          <div class="stat-value">{{ data?.activeUsers || 0 }}</div>
        </div>
        <div class="stat-card">
          <div class="stat-label">Total Content</div>
          <div class="stat-value">{{ data?.totalContent || 0 }}</div>
        </div>
        <div class="stat-card">
          <div class="stat-label">Total Engagement</div>
          <div class="stat-value">{{ data?.totalEngagement || 0 }}</div>
        </div>
      </div>

      <div class="charts-section">
        <div class="chart-card">
          <h3>User Growth Trend</h3>
          <div style="height:320px">
            <canvas baseChart
              [data]="signupChartData"
              [options]="signupChartOptions"
              [type]="signupChartType">
            </canvas>
          </div>
        </div>
        <div class="chart-card">
          <h3>Content Analytics</h3>
          <div style="height:320px; display:flex; align-items:center; justify-content:center;">
            <canvas baseChart
              [data]="contentChartData"
              [options]="contentChartOptions"
              [type]="contentChartType">
            </canvas>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .analytics-container {
      padding: 20px;
    }

    h2 {
      margin-bottom: 20px;
      color: #333;
    }

    .stats-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 20px;
      margin-bottom: 30px;
    }

    .stat-card {
      background: white;
      padding: 20px;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }

    .stat-label {
      color: #666;
      font-size: 14px;
      margin-bottom: 10px;
    }

    .stat-value {
      font-size: 28px;
      font-weight: bold;
      color: #007bff;
    }

    .charts-section {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
      gap: 20px;
    }

    .chart-card {
      background: white;
      padding: 20px;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }

    .placeholder {
      height: 300px;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: #f5f5f5;
      color: #999;
    }
  `]
})
export class AnalyticsComponent implements OnInit {
  analyticsData$: Observable<any>;

  // Signup (line) chart
  signupChartData: ChartConfiguration<'line'>['data'] = {
    labels: [],
    datasets: [
      {
        label: 'User Signups',
        data: [],
        borderColor: '#667eea',
        backgroundColor: 'rgba(102,126,234,0.1)',
        tension: 0.4,
        fill: true
      }
    ]
  };
  signupChartOptions: ChartOptions = {
    responsive: true,
    plugins: {
      legend: { display: true }
    }
  };
  signupChartType: ChartType = 'line';

  // Content (pie) chart
  contentChartData: ChartConfiguration<'pie'>['data'] = {
    labels: ['Published', 'Draft', 'Archived'],
    datasets: [
      {
        data: [0, 0, 0],
        backgroundColor: ['#34d399', '#f59e0b', '#f87171']
      }
    ]
  };
  contentChartOptions: ChartOptions = {
    responsive: true,
    plugins: {
      legend: { position: 'bottom' }
    }
  };
  contentChartType: ChartType = 'pie';

  constructor(private analyticsService: AnalyticsService, private contentService: ContentService, private cdr: ChangeDetectorRef) {
    this.analyticsData$ = new Observable();
  }

  ngOnInit(): void {
    this.loadAnalytics();
    this.loadCharts();
  }

  loadAnalytics(): void {
    this.analyticsData$ = this.analyticsService.getAnalyticsSummary().pipe(
      map(response => response.data)
    );
  }

  loadCharts(): void {
    // Load signups trend
    this.analyticsService.getSignupsTrend(14).pipe(
      map(resp => resp.data)
    ).subscribe({
      next: (trend: Array<{ _id: string; count: number }>) => {
        const labels = trend.map(t => t._id);
        const data = trend.map(t => t.count);
        
        // Create new chart data object to trigger change detection
        this.signupChartData = {
          labels: labels,
          datasets: [
            {
              label: 'User Signups',
              data: data as any,
              borderColor: '#667eea',
              backgroundColor: 'rgba(102,126,234,0.1)',
              tension: 0.4,
              fill: true
            }
          ]
        };
        
        // Force change detection
        this.cdr.detectChanges();
      },
      error: (err) => console.error('Failed loading signups trend', err)
    });

    // Load content stats
    this.contentService.getContentStats().subscribe({
      next: (resp) => {
        const stats = resp.data;
        const published = stats?.publishedContent || 0;
        const draft = stats?.draftContent || 0;
        const archived = stats?.archivedContent || 0;
        
        // Create new chart data object to trigger change detection
        this.contentChartData = {
          labels: ['Published', 'Draft', 'Archived'],
          datasets: [
            {
              data: [published, draft, archived] as any,
              backgroundColor: ['#34d399', '#f59e0b', '#f87171']
            }
          ]
        };
        
        // Force change detection
        this.cdr.detectChanges();
      },
      error: (err) => console.error('Failed loading content stats', err)
    });
  }
}
