import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { cn } from "@/lib/utils";
import { Clock, AlertTriangle, ChevronLeft, ChevronRight, Flag, Send } from "lucide-react";

const examQuestions = [
  {
    id: 1,
    type: "MCQ",
    question: "What is the derivative of f(x) = x³ + 2x² - 5x + 1?",
    options: ["3x² + 4x - 5", "3x² + 2x - 5", "x² + 4x - 5", "3x² + 4x - 1"],
    marks: 2,
  },
  {
    id: 2,
    type: "MCQ",
    question: "Evaluate the limit: lim(x→0) sin(x)/x",
    options: ["0", "1", "∞", "Does not exist"],
    marks: 2,
  },
  {
    id: 3,
    type: "MCQ",
    question: "The integral of cos(x) is:",
    options: ["-sin(x) + C", "sin(x) + C", "cos(x) + C", "-cos(x) + C"],
    marks: 2,
  },
  {
    id: 4,
    type: "Short",
    question: "Find the critical points of f(x) = x³ - 3x² + 2. Show your working.",
    marks: 4,
  },
  {
    id: 5,
    type: "MCQ",
    question: "Which rule is used to differentiate y = f(g(x))?",
    options: ["Product Rule", "Chain Rule", "Quotient Rule", "Power Rule"],
    marks: 2,
  },
  {
    id: 6,
    type: "Long",
    question: "Prove that the derivative of sin(x) is cos(x) using the limit definition of derivatives. Include all steps.",
    marks: 8,
  },
];

export default function StudentExam() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [flagged, setFlagged] = useState<number[]>([]);
  const [timeLeft, setTimeLeft] = useState(120 * 60); // 120 minutes in seconds
  const [showWarning, setShowWarning] = useState(false);
  const [warningCount, setWarningCount] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Timer
  useEffect(() => {
    if (isSubmitted) return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setIsSubmitted(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [isSubmitted]);

  // Tab switch detection
  const handleVisibilityChange = useCallback(() => {
    if (document.hidden && !isSubmitted) {
      setWarningCount((prev) => prev + 1);
      setShowWarning(true);
    }
  }, [isSubmitted]);

  useEffect(() => {
    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, [handleVisibilityChange]);

  const formatTime = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs.toString().padStart(2, "0")}:${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const progress = (Object.keys(answers).length / examQuestions.length) * 100;
  const currentQ = examQuestions[currentQuestion];

  const handleSubmit = () => {
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-6">
        <Card className="max-w-md w-full text-center border-border/50">
          <CardContent className="pt-12 pb-8 space-y-6">
            <div className="w-20 h-20 rounded-full bg-chart-1/20 flex items-center justify-center mx-auto">
              <Send className="w-10 h-10 text-chart-4" />
            </div>
            <div>
              <h1 className="text-2xl font-bold mb-2">Submitted Successfully!</h1>
              <p className="text-muted-foreground">
                Your exam has been submitted. You answered {Object.keys(answers).length} out of{" "}
                {examQuestions.length} questions.
              </p>
            </div>
            <div className="p-4 rounded-lg bg-muted/30">
              <p className="text-sm text-muted-foreground">
                Your results will be available once your teacher reviews the exam. You may now close this window.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Warning Dialog */}
      <AlertDialog open={showWarning} onOpenChange={setShowWarning}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2 text-destructive">
              <AlertTriangle className="w-5 h-5" />
              Warning: Tab Switch Detected
            </AlertDialogTitle>
            <AlertDialogDescription>
              You have switched away from the exam tab. This action has been recorded. 
              Multiple violations may result in automatic submission.
              <br />
              <span className="font-medium text-foreground">
                Warnings: {warningCount}/3
              </span>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction>I Understand</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Header */}
      <header className="sticky top-0 z-50 bg-card border-b border-border">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="font-semibold">Mathematics Mid-Term Examination</h1>
              <p className="text-sm text-muted-foreground">Class 11 · 100 Marks</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm text-muted-foreground">Progress</p>
                <p className="font-medium">{Object.keys(answers).length}/{examQuestions.length} answered</p>
              </div>
              <div
                className={cn(
                  "flex items-center gap-2 px-4 py-2 rounded-lg font-mono text-lg font-semibold",
                  timeLeft < 600 ? "bg-destructive/10 text-destructive" : "bg-primary/10 text-primary"
                )}
              >
                <Clock className="w-5 h-5" />
                {formatTime(timeLeft)}
              </div>
            </div>
          </div>
          <Progress value={progress} className="h-1.5 mt-3" />
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        <div className="flex gap-6">
          {/* Question Navigation Panel */}
          <aside className="hidden lg:block w-64 shrink-0">
            <Card className="sticky top-24 border-border/50">
              <CardContent className="p-4">
                <h3 className="font-medium mb-4">Questions</h3>
                <div className="grid grid-cols-5 gap-2">
                  {examQuestions.map((q, idx) => (
                    <button
                      key={q.id}
                      onClick={() => setCurrentQuestion(idx)}
                      className={cn(
                        "w-10 h-10 rounded-lg text-sm font-medium transition-all relative",
                        currentQuestion === idx
                          ? "bg-primary text-primary-foreground"
                          : answers[q.id]
                          ? "bg-chart-1/20 text-chart-4"
                          : "bg-muted hover:bg-muted/80"
                      )}
                    >
                      {idx + 1}
                      {flagged.includes(q.id) && (
                        <Flag className="w-3 h-3 absolute -top-1 -right-1 text-destructive" />
                      )}
                    </button>
                  ))}
                </div>
                <div className="mt-4 pt-4 border-t border-border space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded bg-chart-1/20" />
                    <span className="text-muted-foreground">Answered</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded bg-muted" />
                    <span className="text-muted-foreground">Not answered</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Flag className="w-4 h-4 text-destructive" />
                    <span className="text-muted-foreground">Flagged</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </aside>

          {/* Main Question Area */}
          <main className="flex-1 max-w-3xl">
            <Card className="border-border/50">
              <CardContent className="p-6 space-y-6">
                {/* Question Header */}
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <Badge variant="secondary">{currentQ.type}</Badge>
                    <span className="text-sm text-muted-foreground">
                      {currentQ.marks} marks
                    </span>
                  </div>
                  <Button
                    variant={flagged.includes(currentQ.id) ? "destructive" : "outline"}
                    size="sm"
                    onClick={() =>
                      setFlagged((prev) =>
                        prev.includes(currentQ.id)
                          ? prev.filter((id) => id !== currentQ.id)
                          : [...prev, currentQ.id]
                      )
                    }
                  >
                    <Flag className="w-4 h-4 mr-1" />
                    {flagged.includes(currentQ.id) ? "Flagged" : "Flag"}
                  </Button>
                </div>

                {/* Question */}
                <div>
                  <span className="text-sm text-muted-foreground">
                    Question {currentQuestion + 1} of {examQuestions.length}
                  </span>
                  <p className="text-lg mt-2 leading-relaxed">{currentQ.question}</p>
                </div>

                {/* Answer Area */}
                {currentQ.type === "MCQ" && currentQ.options && (
                  <RadioGroup
                    value={answers[currentQ.id] || ""}
                    onValueChange={(value) =>
                      setAnswers((prev) => ({ ...prev, [currentQ.id]: value }))
                    }
                    className="space-y-3"
                  >
                    {currentQ.options.map((option, idx) => (
                      <Label
                        key={idx}
                        htmlFor={`option-${idx}`}
                        className={cn(
                          "flex items-center gap-3 p-4 rounded-lg border cursor-pointer transition-all",
                          answers[currentQ.id] === option
                            ? "border-primary bg-primary/5"
                            : "border-border hover:border-primary/50"
                        )}
                      >
                        <RadioGroupItem value={option} id={`option-${idx}`} />
                        <span>{option}</span>
                      </Label>
                    ))}
                  </RadioGroup>
                )}

                {(currentQ.type === "Short" || currentQ.type === "Long") && (
                  <Textarea
                    placeholder="Type your answer here..."
                    className={cn("min-h-32", currentQ.type === "Long" && "min-h-48")}
                    value={answers[currentQ.id] || ""}
                    onChange={(e) =>
                      setAnswers((prev) => ({ ...prev, [currentQ.id]: e.target.value }))
                    }
                  />
                )}

                {/* Navigation */}
                <div className="flex items-center justify-between pt-4 border-t border-border">
                  <Button
                    variant="outline"
                    onClick={() => setCurrentQuestion((prev) => Math.max(0, prev - 1))}
                    disabled={currentQuestion === 0}
                  >
                    <ChevronLeft className="w-4 h-4 mr-2" />
                    Previous
                  </Button>
                  <div className="flex items-center gap-2">
                    {currentQuestion === examQuestions.length - 1 ? (
                      <Button onClick={handleSubmit}>
                        <Send className="w-4 h-4 mr-2" />
                        Submit Exam
                      </Button>
                    ) : (
                      <Button
                        onClick={() =>
                          setCurrentQuestion((prev) =>
                            Math.min(examQuestions.length - 1, prev + 1)
                          )
                        }
                      >
                        Next
                        <ChevronRight className="w-4 h-4 ml-2" />
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </main>
        </div>
      </div>
    </div>
  );
}
