export interface DashboardOverview {
  totalUsers: number;
  activeUsers: number;
  todaySignups: number;
  todayLogins: number;
  totalSales: number;
  timestamp: Date;
}

export interface TrendData {
  _id: string;
  count: number;
}

export interface SalesData {
  _id: string;
  totalSales: number;
}

export interface UserStats {
  totalUsers: number;
  activeUsers: number;
  inactiveUsers: number;
  adminUsers: number;
  regularUsers: number;
  recentSignups: number;
}

export interface ContentStats {
  totalContent: number;
  publishedContent: number;
  draftContent: number;
  archivedContent: number;
  totalViews: number;
}
