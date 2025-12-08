import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  ChevronDown,
  ChevronRight,
  Search,
  Eye,
  RefreshCw,
  Plus,
  Filter,
} from "lucide-react";
import { cn } from "@/lib/utils";
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

const questionBank = [
  {
    topic: "Limits and Continuity",
    questions: [
      { id: 1, text: "Evaluate the limit as x approaches 2 of (x²-4)/(x-2)", difficulty: "easy", type: "MCQ" },
      { id: 2, text: "Prove that f(x) = x³ is continuous at x = 1", difficulty: "medium", type: "Long Answer" },
      { id: 3, text: "Find the points of discontinuity of f(x) = 1/(x-1)", difficulty: "easy", type: "Short Answer" },
      { id: 4, text: "Evaluate lim(x→0) sin(x)/x using L'Hospital's Rule", difficulty: "hard", type: "Long Answer" },
    ],
  },
  {
    topic: "Derivatives",
    questions: [
      { id: 5, text: "Find dy/dx if y = x³ + 2x² - 5x + 1", difficulty: "easy", type: "MCQ" },
      { id: 6, text: "Use chain rule to differentiate y = sin(x²)", difficulty: "medium", type: "Short Answer" },
      { id: 7, text: "Find the derivative of y = e^x · ln(x)", difficulty: "medium", type: "Short Answer" },
      { id: 8, text: "Prove the product rule for differentiation", difficulty: "hard", type: "Long Answer" },
    ],
  },
  {
    topic: "Integration",
    questions: [
      { id: 9, text: "Evaluate ∫(x² + 3x - 2)dx", difficulty: "easy", type: "MCQ" },
      { id: 10, text: "Find the area under y = x² from x = 0 to x = 3", difficulty: "medium", type: "Long Answer" },
      { id: 11, text: "Evaluate ∫sin²(x)dx using substitution", difficulty: "hard", type: "Long Answer" },
    ],
  },
];

const difficultyColors: Record<string, string> = {
  easy: "bg-chart-1/20 text-chart-4 border-chart-1/30",
  medium: "bg-primary/10 text-primary border-primary/20",
  hard: "bg-destructive/10 text-destructive border-destructive/20",
};

const typeColors: Record<string, string> = {
  MCQ: "bg-muted text-muted-foreground",
  "Short Answer": "bg-secondary/20 text-secondary-foreground",
  "Long Answer": "bg-accent text-accent-foreground",
};

export default function QuestionBank() {
  const [expandedTopics, setExpandedTopics] = useState<string[]>(["Limits and Continuity"]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedQuestion, setSelectedQuestion] = useState<null | { id: number; text: string }>(null);

  const toggleTopic = (topic: string) => {
    setExpandedTopics((prev) =>
      prev.includes(topic) ? prev.filter((t) => t !== topic) : [...prev, topic]
    );
  };

  return (
    <div className="p-6 lg:p-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Question Bank</h1>
          <p className="text-muted-foreground">Browse and manage topic-wise questions</p>
        </div>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Generate Questions
        </Button>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search questions..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Select defaultValue="all-subjects">
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Subject" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all-subjects">All Subjects</SelectItem>
            <SelectItem value="mathematics">Mathematics</SelectItem>
            <SelectItem value="physics">Physics</SelectItem>
          </SelectContent>
        </Select>
        <Select defaultValue="all-difficulty">
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Difficulty" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all-difficulty">All Levels</SelectItem>
            <SelectItem value="easy">Easy</SelectItem>
            <SelectItem value="medium">Medium</SelectItem>
            <SelectItem value="hard">Hard</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Question Groups */}
      <div className="space-y-4">
        {questionBank.map((group) => (
          <Card key={group.topic} className="border-border/50 overflow-hidden">
            <CardHeader
              className="py-4 px-5 cursor-pointer hover:bg-muted/30 transition-colors"
              onClick={() => toggleTopic(group.topic)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {expandedTopics.includes(group.topic) ? (
                    <ChevronDown className="w-5 h-5 text-muted-foreground" />
                  ) : (
                    <ChevronRight className="w-5 h-5 text-muted-foreground" />
                  )}
                  <CardTitle className="text-lg font-medium">{group.topic}</CardTitle>
                  <Badge variant="secondary" className="ml-2">
                    {group.questions.length} questions
                  </Badge>
                </div>
              </div>
            </CardHeader>
            {expandedTopics.includes(group.topic) && (
              <CardContent className="py-0 pb-4 px-5">
                <div className="space-y-3 ml-8">
                  {group.questions.map((q, idx) => (
                    <div
                      key={q.id}
                      className="flex items-start justify-between p-4 rounded-lg bg-muted/20 hover:bg-muted/40 transition-colors border border-border/30"
                    >
                      <div className="flex-1 pr-4">
                        <div className="flex items-start gap-3">
                          <span className="text-sm font-medium text-muted-foreground mt-0.5">
                            {idx + 1}.
                          </span>
                          <p className="text-sm leading-relaxed">{q.text}</p>
                        </div>
                        <div className="flex items-center gap-2 mt-3 ml-6">
                          <Badge variant="outline" className={cn("text-xs", difficultyColors[q.difficulty])}>
                            {q.difficulty}
                          </Badge>
                          <Badge variant="secondary" className={cn("text-xs", typeColors[q.type])}>
                            {q.type}
                          </Badge>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="ghost" size="sm" onClick={() => setSelectedQuestion(q)}>
                              <Eye className="w-4 h-4 mr-1" />
                              Preview
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-lg">
                            <DialogHeader>
                              <DialogTitle>Question Preview</DialogTitle>
                            </DialogHeader>
                            <div className="space-y-4 pt-4">
                              <p className="text-base">{q.text}</p>
                              <div className="flex gap-2">
                                <Badge variant="outline" className={cn(difficultyColors[q.difficulty])}>
                                  {q.difficulty}
                                </Badge>
                                <Badge variant="secondary">{q.type}</Badge>
                              </div>
                            </div>
                          </DialogContent>
                        </Dialog>
                        <Button variant="ghost" size="sm">
                          <RefreshCw className="w-4 h-4 mr-1" />
                          Replace
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
}
