'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Activity,
  ArrowDownRight,
  ArrowUpRight,
  DollarSign,
  ShoppingCart,
  Users,
} from 'lucide-react';
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

const statsData = [
  {
    title: 'Total Revenue',
    value: '$45,231',
    change: '+20.1%',
    trend: 'up',
    icon: DollarSign,
    color: 'text-chart-1',
  },
  {
    title: 'Active Users',
    value: '2,350',
    change: '+12.5%',
    trend: 'up',
    icon: Users,
    color: 'text-chart-2',
  },
  {
    title: 'Orders',
    value: '1,234',
    change: '-4.2%',
    trend: 'down',
    icon: ShoppingCart,
    color: 'text-chart-3',
  },
  {
    title: 'Conversion Rate',
    value: '3.24%',
    change: '+1.8%',
    trend: 'up',
    icon: Activity,
    color: 'text-chart-4',
  },
];

const revenueData = [
  { month: 'Jan', revenue: 4200, users: 240 },
  { month: 'Feb', revenue: 3800, users: 220 },
  { month: 'Mar', revenue: 5100, users: 290 },
  { month: 'Apr', revenue: 4600, users: 270 },
  { month: 'May', revenue: 5900, users: 340 },
  { month: 'Jun', revenue: 5200, users: 310 },
  { month: 'Jul', revenue: 6800, users: 390 },
  { month: 'Aug', revenue: 6200, users: 360 },
  { month: 'Sep', revenue: 7100, users: 410 },
  { month: 'Oct', revenue: 6900, users: 400 },
  { month: 'Nov', revenue: 8200, users: 470 },
  { month: 'Dec', revenue: 7800, users: 450 },
];

const performanceData = [
  { name: 'API Response', value: 245, target: 300 },
  { name: 'Page Load', value: 420, target: 500 },
  { name: 'Database', value: 180, target: 200 },
  { name: 'Cache Hit', value: 850, target: 900 },
];

const activityData = [
  { time: '00:00', requests: 320 },
  { time: '04:00', requests: 180 },
  { time: '08:00', requests: 890 },
  { time: '12:00', requests: 1240 },
  { time: '16:00', requests: 1680 },
  { time: '20:00', requests: 950 },
  { time: '24:00', requests: 420 },
];

export function DashboardContent() {
  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {statsData.map((stat) => {
          const Icon = stat.icon;
          const TrendIcon = stat.trend === 'up' ? ArrowUpRight : ArrowDownRight;
          return (
            <Card key={stat.title} className="border-border/50">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </CardTitle>
                <Icon className={`h-4 w-4 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-semibold text-foreground tracking-tight">
                  {stat.value}
                </div>
                <div className="flex items-center gap-1 text-xs">
                  <TrendIcon
                    className={`h-3 w-3 ${stat.trend === 'up' ? 'text-chart-1' : 'text-destructive'}`}
                  />
                  <span
                    className={
                      stat.trend === 'up' ? 'text-chart-1' : 'text-destructive'
                    }
                  >
                    {stat.change}
                  </span>
                  <span className="text-muted-foreground">from last month</span>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Charts Row 1 */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Revenue Chart */}
        <Card className="border-border/50">
          <CardHeader>
            <CardTitle className="text-foreground tracking-tight">
              Revenue Overview
            </CardTitle>
            <CardDescription>Monthly revenue and user growth</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={revenueData}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop
                      offset="5%"
                      stopColor="hsl(var(--chart-1))"
                      stopOpacity={0.3}
                    />
                    <stop
                      offset="95%"
                      stopColor="hsl(var(--chart-1))"
                      stopOpacity={0}
                    />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="hsl(var(--border))"
                />
                <XAxis
                  dataKey="month"
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px',
                    color: 'hsl(var(--foreground))',
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke="hsl(var(--chart-1))"
                  fill="url(#colorRevenue)"
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Performance Chart */}
        <Card className="border-border/50">
          <CardHeader>
            <CardTitle className="text-foreground tracking-tight">
              Performance Metrics
            </CardTitle>
            <CardDescription>
              Current vs target performance (ms)
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={performanceData} layout="vertical">
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="hsl(var(--border))"
                />
                <XAxis
                  type="number"
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                />
                <YAxis
                  type="category"
                  dataKey="name"
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                  width={100}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px',
                    color: 'hsl(var(--foreground))',
                  }}
                />
                <Bar
                  dataKey="value"
                  fill="hsl(var(--chart-2))"
                  radius={[0, 4, 4, 0]}
                />
                <Bar
                  dataKey="target"
                  fill="hsl(var(--muted))"
                  radius={[0, 4, 4, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row 2 */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Activity Chart */}
        <Card className="border-border/50 lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-foreground tracking-tight">
              Request Activity
            </CardTitle>
            <CardDescription>
              API requests over the last 24 hours
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={activityData}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="hsl(var(--border))"
                />
                <XAxis
                  dataKey="time"
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px',
                    color: 'hsl(var(--foreground))',
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="requests"
                  stroke="hsl(var(--chart-3))"
                  strokeWidth={2}
                  dot={{ fill: 'hsl(var(--chart-3))', r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card className="border-border/50">
          <CardHeader>
            <CardTitle className="text-foreground tracking-tight">
              Recent Activity
            </CardTitle>
            <CardDescription>Latest system events</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                {
                  action: 'New user registered',
                  time: '2 min ago',
                  color: 'bg-chart-1',
                },
                {
                  action: 'Database backup completed',
                  time: '15 min ago',
                  color: 'bg-chart-2',
                },
                {
                  action: 'API key rotated',
                  time: '1 hour ago',
                  color: 'bg-chart-3',
                },
                {
                  action: 'Security scan passed',
                  time: '2 hours ago',
                  color: 'bg-chart-4',
                },
                {
                  action: 'Payment processed',
                  time: '3 hours ago',
                  color: 'bg-chart-1',
                },
              ].map((activity, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div
                    className={`mt-1 h-2 w-2 rounded-full ${activity.color}`}
                  />
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium leading-none text-foreground">
                      {activity.action}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {activity.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
