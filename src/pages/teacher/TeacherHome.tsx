import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PenTool, FileText, BarChart3, Users, BookOpen, Clock, TrendingUp, CheckCircle2 } from "lucide-react";

const quickActions = [
  {
    title: "Create New Exam",
    description: "Design and generate unique exams for your students",
    icon: PenTool,
    href: "/teacher/create-exam",
    color: "bg-primary/10 text-primary",
  },
  {
    title: "Add Syllabus",
    description: "Upload course materials and organize topics",
    icon: FileText,
    href: "/teacher/syllabus",
    color: "bg-chart-2/20 text-chart-4",
  },
  {
    title: "Recent Results",
    description: "View latest student performance and analytics",
    icon: BarChart3,
    href: "/teacher/results",
    color: "bg-chart-3/20 text-chart-5",
  },
];

const stats = [
  { label: "Total Students", value: "156", icon: Users, trend: "+12%" },
  { label: "Active Exams", value: "8", icon: BookOpen, trend: "+3" },
  { label: "Avg. Score", value: "78%", icon: TrendingUp, trend: "+5%" },
  { label: "Completed", value: "42", icon: CheckCircle2, trend: "This week" },
];

const recentExams = [
  { name: "Mathematics Mid-Term", date: "Dec 5, 2024", students: 45, avgScore: 82 },
  { name: "Physics Quiz - Mechanics", date: "Dec 3, 2024", students: 38, avgScore: 75 },
  { name: "Chemistry Final", date: "Nov 28, 2024", students: 52, avgScore: 71 },
];

export default function TeacherHome() {
  return (
    <div className="p-6 lg:p-8 space-y-8">
      {/* Header */}
      <div className="space-y-1">
        <h1 className="text-3xl font-bold tracking-tight">Welcome back, Teacher</h1>
        <p className="text-muted-foreground">Here's what's happening with your exams today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <Card key={stat.label} className="border-border/50">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <stat.icon className="w-5 h-5 text-primary" />
                </div>
                <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded-full">
                  {stat.trend}
                </span>
              </div>
              <div className="mt-3">
                <p className="text-2xl font-bold">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Quick Actions</h2>
        <div className="grid md:grid-cols-3 gap-4">
          {quickActions.map((action) => (
            <Card
              key={action.title}
              className="group hover:shadow-lg transition-all duration-300 cursor-pointer border-border/50 hover:border-primary/30"
            >
              <Link to={action.href}>
                <CardHeader className="pb-3">
                  <div className={`w-12 h-12 rounded-xl ${action.color} flex items-center justify-center mb-2`}>
                    <action.icon className="w-6 h-6" />
                  </div>
                  <CardTitle className="text-lg group-hover:text-primary transition-colors">
                    {action.title}
                  </CardTitle>
                  <CardDescription>{action.description}</CardDescription>
                </CardHeader>
              </Link>
            </Card>
          ))}
        </div>
      </div>

      {/* Recent Exams */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Recent Exams</h2>
          <Link to="/teacher/results">
            <Button variant="ghost" size="sm">
              View all
            </Button>
          </Link>
        </div>
        <Card className="border-border/50">
          <CardContent className="p-0">
            <div className="divide-y divide-border">
              {recentExams.map((exam, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 hover:bg-muted/30 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
                      <Clock className="w-5 h-5 text-muted-foreground" />
                    </div>
                    <div>
                      <p className="font-medium">{exam.name}</p>
                      <p className="text-sm text-muted-foreground">{exam.date}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-6 text-sm">
                    <div className="text-right">
                      <p className="font-medium">{exam.students}</p>
                      <p className="text-muted-foreground">Students</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-primary">{exam.avgScore}%</p>
                      <p className="text-muted-foreground">Avg Score</p>
                    </div>
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
