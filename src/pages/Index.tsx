import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { GraduationCap, Users, BookOpen, Shield, Sparkles, Clock, BarChart3, ChevronRight } from "lucide-react";

const features = [
  {
    icon: Sparkles,
    title: "AI-Powered Question Generation",
    description: "Generate unique exam papers for every student with intelligent question selection.",
  },
  {
    icon: Shield,
    title: "Secure Exam Environment",
    description: "Tab-switch detection and browser lockdown to maintain exam integrity.",
  },
  {
    icon: BarChart3,
    title: "Detailed Analytics",
    description: "Topic-wise performance insights with strengths and improvement suggestions.",
  },
  {
    icon: Clock,
    title: "Real-time Monitoring",
    description: "Track student progress and get instant notifications on submissions.",
  },
];

export default function Index() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
              <GraduationCap className="w-6 h-6 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold">ExamFlow</span>
          </div>
          <div className="flex items-center gap-3">
            <Link to="/exam/demo">
              <Button variant="ghost">Student Demo</Button>
            </Link>
            <Link to="/teacher">
              <Button>Teacher Dashboard</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 lg:py-32">
        <div className="container mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
            <Sparkles className="w-4 h-4" />
            Modern Exam Platform
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 max-w-4xl mx-auto leading-tight">
            Create, Conduct & Analyze
            <br />
            <span className="text-primary">Exams Effortlessly</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-10">
            A comprehensive platform for teachers to design unique exam papers and for students to take secure, distraction-free tests. Get detailed analytics and performance insights.
          </p>
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <Link to="/teacher">
              <Button size="lg" className="h-12 px-8">
                <Users className="w-5 h-5 mr-2" />
                Teacher Dashboard
                <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
            <Link to="/exam/demo">
              <Button size="lg" variant="outline" className="h-12 px-8">
                <BookOpen className="w-5 h-5 mr-2" />
                Try Student Exam
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Everything You Need</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Powerful features designed for modern education
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, idx) => (
              <Card key={idx} className="border-border/50 hover:shadow-lg transition-all duration-300">
                <CardContent className="pt-6">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                    <feature.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <Card className="bg-primary/5 border-primary/20">
            <CardContent className="py-12 text-center">
              <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
              <p className="text-muted-foreground mb-8 max-w-lg mx-auto">
                Explore the teacher dashboard to create exams or try the student exam interface.
              </p>
              <div className="flex items-center justify-center gap-4 flex-wrap">
                <Link to="/teacher">
                  <Button size="lg">
                    Go to Dashboard
                    <ChevronRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-border">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>© 2024 ExamFlow. Built for modern education.</p>
        </div>
      </footer>
    </div>
  );
}
