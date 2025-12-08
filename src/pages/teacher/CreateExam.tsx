import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ChevronRight,
  ChevronLeft,
  Check,
  Copy,
  ExternalLink,
  BookOpen,
  ListChecks,
  Hash,
  Settings,
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";

const steps = [
  { id: 1, title: "Class & Subject", icon: BookOpen },
  { id: 2, title: "Topics & Weightage", icon: ListChecks },
  { id: 3, title: "Question Types", icon: Hash },
  { id: 4, title: "Exam Settings", icon: Settings },
  { id: 5, title: "Generate", icon: Sparkles },
];

const topics = [
  { id: 1, name: "Limits and Continuity", weightage: 25 },
  { id: 2, name: "Derivatives", weightage: 30 },
  { id: 3, name: "Integration", weightage: 25 },
  { id: 4, name: "Differential Equations", weightage: 20 },
];

const mockStudents = [
  { id: 1, name: "Alice Johnson", email: "alice@school.edu", link: "exam-abc123" },
  { id: 2, name: "Bob Smith", email: "bob@school.edu", link: "exam-def456" },
  { id: 3, name: "Carol Williams", email: "carol@school.edu", link: "exam-ghi789" },
  { id: 4, name: "David Brown", email: "david@school.edu", link: "exam-jkl012" },
  { id: 5, name: "Eva Martinez", email: "eva@school.edu", link: "exam-mno345" },
];

export default function CreateExam() {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedTopics, setSelectedTopics] = useState<number[]>([1, 2]);
  const [topicWeightages, setTopicWeightages] = useState<Record<number, number>>({
    1: 25,
    2: 30,
    3: 25,
    4: 20,
  });
  const [questionCounts, setQuestionCounts] = useState({
    mcq: 10,
    short: 5,
    long: 3,
  });
  const [examSettings, setExamSettings] = useState({
    totalMarks: 100,
    duration: 120,
    date: "",
  });
  const [isGenerated, setIsGenerated] = useState(false);

  const nextStep = () => setCurrentStep((prev) => Math.min(prev + 1, 5));
  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 1));

  const handleGenerate = () => {
    setIsGenerated(true);
  };

  return (
    <div className="p-6 lg:p-8 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Create Exam</h1>
        <p className="text-muted-foreground">Design custom exams with unique papers for each student</p>
      </div>

      {/* Progress Steps */}
      <div className="flex items-center justify-between mb-8">
        {steps.map((step, idx) => (
          <div key={step.id} className="flex items-center">
            <div
              className={cn(
                "flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all",
                currentStep === step.id
                  ? "bg-primary border-primary text-primary-foreground"
                  : currentStep > step.id
                  ? "bg-primary/20 border-primary text-primary"
                  : "border-border text-muted-foreground"
              )}
            >
              {currentStep > step.id ? (
                <Check className="w-5 h-5" />
              ) : (
                <step.icon className="w-5 h-5" />
              )}
            </div>
            <span
              className={cn(
                "ml-2 text-sm font-medium hidden md:inline",
                currentStep >= step.id ? "text-foreground" : "text-muted-foreground"
              )}
            >
              {step.title}
            </span>
            {idx < steps.length - 1 && (
              <div
                className={cn(
                  "w-12 lg:w-24 h-0.5 mx-2 md:mx-4",
                  currentStep > step.id ? "bg-primary" : "bg-border"
                )}
              />
            )}
          </div>
        ))}
      </div>

      {/* Step Content */}
      <Card className="border-border/50">
        <CardContent className="pt-6">
          {currentStep === 1 && (
            <div className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label>Select Class</Label>
                  <Select defaultValue="class-11">
                    <SelectTrigger>
                      <SelectValue placeholder="Choose class" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="class-10">Class 10</SelectItem>
                      <SelectItem value="class-11">Class 11</SelectItem>
                      <SelectItem value="class-12">Class 12</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Select Subject</Label>
                  <Select defaultValue="mathematics">
                    <SelectTrigger>
                      <SelectValue placeholder="Choose subject" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="mathematics">Mathematics</SelectItem>
                      <SelectItem value="physics">Physics</SelectItem>
                      <SelectItem value="chemistry">Chemistry</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label>Exam Title</Label>
                <Input placeholder="e.g., Mid-Term Examination 2024" />
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="space-y-6">
              <p className="text-sm text-muted-foreground">
                Select topics and adjust weightage for each. Total must equal 100%.
              </p>
              <div className="space-y-4">
                {topics.map((topic) => (
                  <div
                    key={topic.id}
                    className={cn(
                      "p-4 rounded-lg border transition-all",
                      selectedTopics.includes(topic.id)
                        ? "border-primary/50 bg-primary/5"
                        : "border-border"
                    )}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <Checkbox
                          checked={selectedTopics.includes(topic.id)}
                          onCheckedChange={(checked) => {
                            setSelectedTopics((prev) =>
                              checked
                                ? [...prev, topic.id]
                                : prev.filter((id) => id !== topic.id)
                            );
                          }}
                        />
                        <span className="font-medium">{topic.name}</span>
                      </div>
                      <span className="text-sm font-medium text-primary">
                        {topicWeightages[topic.id]}%
                      </span>
                    </div>
                    {selectedTopics.includes(topic.id) && (
                      <Slider
                        value={[topicWeightages[topic.id]]}
                        onValueChange={(value) =>
                          setTopicWeightages((prev) => ({ ...prev, [topic.id]: value[0] }))
                        }
                        max={50}
                        min={10}
                        step={5}
                        className="w-full"
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div className="space-y-6">
              <p className="text-sm text-muted-foreground">
                Specify the number of questions for each type.
              </p>
              <div className="grid md:grid-cols-3 gap-6">
                <Card className="border-border/50">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg">MCQ</CardTitle>
                    <CardDescription>Multiple choice questions</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-4">
                      <Input
                        type="number"
                        value={questionCounts.mcq}
                        onChange={(e) =>
                          setQuestionCounts((prev) => ({ ...prev, mcq: parseInt(e.target.value) || 0 }))
                        }
                        className="text-center text-lg font-semibold"
                      />
                      <span className="text-muted-foreground">questions</span>
                    </div>
                  </CardContent>
                </Card>
                <Card className="border-border/50">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg">Short Answer</CardTitle>
                    <CardDescription>Brief written responses</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-4">
                      <Input
                        type="number"
                        value={questionCounts.short}
                        onChange={(e) =>
                          setQuestionCounts((prev) => ({ ...prev, short: parseInt(e.target.value) || 0 }))
                        }
                        className="text-center text-lg font-semibold"
                      />
                      <span className="text-muted-foreground">questions</span>
                    </div>
                  </CardContent>
                </Card>
                <Card className="border-border/50">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg">Long Answer</CardTitle>
                    <CardDescription>Detailed explanations</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-4">
                      <Input
                        type="number"
                        value={questionCounts.long}
                        onChange={(e) =>
                          setQuestionCounts((prev) => ({ ...prev, long: parseInt(e.target.value) || 0 }))
                        }
                        className="text-center text-lg font-semibold"
                      />
                      <span className="text-muted-foreground">questions</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          {currentStep === 4 && (
            <div className="space-y-6">
              <div className="grid md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <Label>Total Marks</Label>
                  <Input
                    type="number"
                    value={examSettings.totalMarks}
                    onChange={(e) =>
                      setExamSettings((prev) => ({ ...prev, totalMarks: parseInt(e.target.value) || 0 }))
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label>Duration (minutes)</Label>
                  <Input
                    type="number"
                    value={examSettings.duration}
                    onChange={(e) =>
                      setExamSettings((prev) => ({ ...prev, duration: parseInt(e.target.value) || 0 }))
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label>Exam Date</Label>
                  <Input
                    type="date"
                    value={examSettings.date}
                    onChange={(e) =>
                      setExamSettings((prev) => ({ ...prev, date: e.target.value }))
                    }
                  />
                </div>
              </div>
              <Card className="bg-muted/30 border-border/50">
                <CardContent className="pt-6">
                  <h4 className="font-medium mb-4">Summary</h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">Total Questions</span>
                      <p className="text-lg font-semibold">
                        {questionCounts.mcq + questionCounts.short + questionCounts.long}
                      </p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Topics</span>
                      <p className="text-lg font-semibold">{selectedTopics.length}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Total Marks</span>
                      <p className="text-lg font-semibold">{examSettings.totalMarks}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Duration</span>
                      <p className="text-lg font-semibold">{examSettings.duration} min</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {currentStep === 5 && !isGenerated && (
            <div className="text-center py-12 space-y-6">
              <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                <Sparkles className="w-10 h-10 text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Ready to Generate</h3>
                <p className="text-muted-foreground max-w-md mx-auto">
                  Click below to generate unique exam papers for each student. Each student will receive a different set of questions.
                </p>
              </div>
              <Button size="lg" onClick={handleGenerate}>
                <Sparkles className="w-5 h-5 mr-2" />
                Generate Exam Papers
              </Button>
            </div>
          )}

          {currentStep === 5 && isGenerated && (
            <div className="space-y-6">
              <div className="text-center py-6">
                <div className="w-16 h-16 rounded-full bg-chart-1/20 flex items-center justify-center mx-auto mb-4">
                  <Check className="w-8 h-8 text-chart-4" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Exam Papers Generated!</h3>
                <p className="text-muted-foreground">
                  Unique papers have been created for {mockStudents.length} students.
                </p>
              </div>
              <div className="rounded-lg border border-border overflow-hidden">
                <table className="w-full">
                  <thead className="bg-muted/50">
                    <tr>
                      <th className="text-left py-3 px-4 font-medium">Student</th>
                      <th className="text-left py-3 px-4 font-medium">Email</th>
                      <th className="text-left py-3 px-4 font-medium">Exam Link</th>
                      <th className="text-right py-3 px-4 font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {mockStudents.map((student) => (
                      <tr key={student.id} className="hover:bg-muted/20">
                        <td className="py-3 px-4 font-medium">{student.name}</td>
                        <td className="py-3 px-4 text-muted-foreground">{student.email}</td>
                        <td className="py-3 px-4">
                          <code className="text-sm bg-muted px-2 py-1 rounded">
                            /exam/{student.link}
                          </code>
                        </td>
                        <td className="py-3 px-4 text-right">
                          <Button variant="ghost" size="sm">
                            <Copy className="w-4 h-4 mr-1" />
                            Copy
                          </Button>
                          <Button variant="ghost" size="sm">
                            <ExternalLink className="w-4 h-4 mr-1" />
                            Open
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Navigation */}
      {!(currentStep === 5 && isGenerated) && (
        <div className="flex items-center justify-between">
          <Button
            variant="outline"
            onClick={prevStep}
            disabled={currentStep === 1}
          >
            <ChevronLeft className="w-4 h-4 mr-2" />
            Previous
          </Button>
          <Button onClick={nextStep} disabled={currentStep === 5}>
            Next
            <ChevronRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      )}
    </div>
  );
}
