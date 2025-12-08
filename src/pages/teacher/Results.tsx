import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import {
  Search,
  Download,
  ChevronDown,
  ChevronUp,
  TrendingUp,
  TrendingDown,
  User,
  BarChart3,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const studentResults = [
  {
    id: 1,
    name: "Alice Johnson",
    score: 92,
    percentage: 92,
    rank: 1,
    topics: { "Limits": 95, "Derivatives": 90, "Integration": 88 },
    strengths: ["Problem Solving", "Conceptual Understanding"],
    weaknesses: ["Time Management"],
    suggestion: "Focus on practicing integration under time constraints.",
  },
  {
    id: 2,
    name: "Bob Smith",
    score: 85,
    percentage: 85,
    rank: 2,
    topics: { "Limits": 88, "Derivatives": 82, "Integration": 85 },
    strengths: ["Accuracy", "Neat Work"],
    weaknesses: ["Complex Problems"],
    suggestion: "Work on multi-step problems involving multiple concepts.",
  },
  {
    id: 3,
    name: "Carol Williams",
    score: 78,
    percentage: 78,
    rank: 3,
    topics: { "Limits": 75, "Derivatives": 80, "Integration": 78 },
    strengths: ["Basic Concepts"],
    weaknesses: ["Application", "Derivatives"],
    suggestion: "Practice more application-based problems in derivatives.",
  },
  {
    id: 4,
    name: "David Brown",
    score: 72,
    percentage: 72,
    rank: 4,
    topics: { "Limits": 70, "Derivatives": 75, "Integration": 70 },
    strengths: ["Consistent Effort"],
    weaknesses: ["Theory", "Proofs"],
    suggestion: "Review theoretical foundations and proof techniques.",
  },
  {
    id: 5,
    name: "Eva Martinez",
    score: 68,
    percentage: 68,
    rank: 5,
    topics: { "Limits": 65, "Derivatives": 70, "Integration": 68 },
    strengths: ["MCQ Section"],
    weaknesses: ["Long Answers"],
    suggestion: "Practice writing detailed solutions for long answer questions.",
  },
];

const topicPerformance = [
  { topic: "Limits", avgScore: 79 },
  { topic: "Derivatives", avgScore: 79 },
  { topic: "Integration", avgScore: 78 },
  { topic: "Diff. Equations", avgScore: 72 },
];

const gradeDistribution = [
  { grade: "A+", count: 5, color: "hsl(var(--chart-1))" },
  { grade: "A", count: 12, color: "hsl(var(--chart-2))" },
  { grade: "B", count: 18, color: "hsl(var(--chart-3))" },
  { grade: "C", count: 8, color: "hsl(var(--chart-4))" },
  { grade: "D", count: 2, color: "hsl(var(--chart-5))" },
];

export default function Results() {
  const [sortField, setSortField] = useState<"name" | "score" | "rank">("rank");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStudent, setSelectedStudent] = useState<typeof studentResults[0] | null>(null);

  const sortedResults = [...studentResults].sort((a, b) => {
    const multiplier = sortOrder === "asc" ? 1 : -1;
    if (sortField === "name") return multiplier * a.name.localeCompare(b.name);
    return multiplier * (a[sortField] - b[sortField]);
  });

  const toggleSort = (field: typeof sortField) => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };

  return (
    <div className="p-6 lg:p-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Student Results</h1>
          <p className="text-muted-foreground">View and analyze exam performance</p>
        </div>
        <div className="flex items-center gap-3">
          <Select defaultValue="mid-term">
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Select exam" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="mid-term">Mathematics Mid-Term</SelectItem>
              <SelectItem value="quiz">Physics Quiz</SelectItem>
              <SelectItem value="final">Chemistry Final</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid md:grid-cols-4 gap-4">
        <Card className="border-border/50">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Class Average</p>
                <p className="text-2xl font-bold">79%</p>
              </div>
              <div className="flex items-center text-chart-4 text-sm">
                <TrendingUp className="w-4 h-4 mr-1" />
                +5%
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-border/50">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Highest Score</p>
                <p className="text-2xl font-bold">92%</p>
              </div>
              <Badge variant="secondary">Alice J.</Badge>
            </div>
          </CardContent>
        </Card>
        <Card className="border-border/50">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Pass Rate</p>
                <p className="text-2xl font-bold">96%</p>
              </div>
              <span className="text-sm text-muted-foreground">43/45</span>
            </div>
          </CardContent>
        </Card>
        <Card className="border-border/50">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Submitted</p>
                <p className="text-2xl font-bold">45</p>
              </div>
              <span className="text-sm text-muted-foreground">100%</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid lg:grid-cols-2 gap-6">
        <Card className="border-border/50">
          <CardHeader>
            <CardTitle>Topic-wise Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={topicPerformance}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="topic" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <Tooltip
                  contentStyle={{
                    background: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                  }}
                />
                <Bar dataKey="avgScore" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card className="border-border/50">
          <CardHeader>
            <CardTitle>Grade Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center">
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={gradeDistribution}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={2}
                    dataKey="count"
                  >
                    {gradeDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      background: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex justify-center gap-4 mt-4">
              {gradeDistribution.map((item) => (
                <div key={item.grade} className="flex items-center gap-2 text-sm">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ background: item.color }}
                  />
                  <span>{item.grade}</span>
                  <span className="text-muted-foreground">({item.count})</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Results Table */}
      <Card className="border-border/50">
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <CardTitle>Individual Results</CardTitle>
            <div className="relative w-full md:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search students..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-lg border border-border overflow-hidden">
            <table className="w-full">
              <thead className="bg-muted/50">
                <tr>
                  <th
                    className="text-left py-3 px-4 font-medium cursor-pointer hover:bg-muted"
                    onClick={() => toggleSort("rank")}
                  >
                    <div className="flex items-center gap-1">
                      Rank
                      {sortField === "rank" && (
                        sortOrder === "asc" ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />
                      )}
                    </div>
                  </th>
                  <th
                    className="text-left py-3 px-4 font-medium cursor-pointer hover:bg-muted"
                    onClick={() => toggleSort("name")}
                  >
                    <div className="flex items-center gap-1">
                      Student
                      {sortField === "name" && (
                        sortOrder === "asc" ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />
                      )}
                    </div>
                  </th>
                  <th
                    className="text-left py-3 px-4 font-medium cursor-pointer hover:bg-muted"
                    onClick={() => toggleSort("score")}
                  >
                    <div className="flex items-center gap-1">
                      Score
                      {sortField === "score" && (
                        sortOrder === "asc" ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />
                      )}
                    </div>
                  </th>
                  <th className="text-left py-3 px-4 font-medium hidden md:table-cell">Performance</th>
                  <th className="text-right py-3 px-4 font-medium">Details</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {sortedResults.map((student) => (
                  <tr key={student.id} className="hover:bg-muted/20">
                    <td className="py-3 px-4">
                      <span className="font-medium">#{student.rank}</span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                          <User className="w-4 h-4 text-primary" />
                        </div>
                        <span className="font-medium">{student.name}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <span className="text-lg font-semibold">{student.score}%</span>
                    </td>
                    <td className="py-3 px-4 hidden md:table-cell">
                      <div className="flex items-center gap-3">
                        <Progress value={student.percentage} className="w-24 h-2" />
                        <span className="text-sm text-muted-foreground">
                          {student.percentage >= 80 ? "Excellent" : student.percentage >= 60 ? "Good" : "Needs Improvement"}
                        </span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setSelectedStudent(student)}
                          >
                            <BarChart3 className="w-4 h-4 mr-1" />
                            View
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-lg">
                          <DialogHeader>
                            <DialogTitle>{student.name}'s Performance</DialogTitle>
                          </DialogHeader>
                          <div className="space-y-6 pt-4">
                            <div className="flex items-center justify-between">
                              <span className="text-2xl font-bold">{student.score}%</span>
                              <Badge>Rank #{student.rank}</Badge>
                            </div>
                            <div className="space-y-3">
                              <h4 className="font-medium">Topic-wise Scores</h4>
                              {Object.entries(student.topics).map(([topic, score]) => (
                                <div key={topic} className="space-y-1">
                                  <div className="flex justify-between text-sm">
                                    <span>{topic}</span>
                                    <span>{score}%</span>
                                  </div>
                                  <Progress value={score} className="h-2" />
                                </div>
                              ))}
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <h4 className="font-medium mb-2 text-chart-4">Strengths</h4>
                                <div className="flex flex-wrap gap-1">
                                  {student.strengths.map((s) => (
                                    <Badge key={s} variant="secondary" className="bg-chart-1/20 text-chart-4">
                                      {s}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                              <div>
                                <h4 className="font-medium mb-2 text-destructive">Weaknesses</h4>
                                <div className="flex flex-wrap gap-1">
                                  {student.weaknesses.map((w) => (
                                    <Badge key={w} variant="secondary" className="bg-destructive/10 text-destructive">
                                      {w}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                            </div>
                            <div className="p-4 rounded-lg bg-muted/30">
                              <h4 className="font-medium mb-2">Improvement Suggestion</h4>
                              <p className="text-sm text-muted-foreground">{student.suggestion}</p>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
