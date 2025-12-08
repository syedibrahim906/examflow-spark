import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  GraduationCap,
  Users,
  BookOpen,
  Shield,
  Sparkles,
  Clock,
  BarChart3,
  ChevronRight,
  Check,
  Menu,
  X,
  LogOut,
  Settings,
  LayoutDashboard,
  Zap,
  Globe,
  Lock,
  FileText,
  Star,
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const features = [
  {
    icon: Sparkles,
    title: "AI-Powered Question Generation",
    description: "Generate unique exam papers for every student with intelligent question selection and randomization.",
  },
  {
    icon: Shield,
    title: "Secure Exam Environment",
    description: "Tab-switch detection and browser lockdown to maintain exam integrity and prevent cheating.",
  },
  {
    icon: BarChart3,
    title: "Detailed Analytics",
    description: "Topic-wise performance insights with strengths, weaknesses, and improvement suggestions.",
  },
  {
    icon: Clock,
    title: "Real-time Monitoring",
    description: "Track student progress and get instant notifications on submissions and activities.",
  },
  {
    icon: FileText,
    title: "Smart Syllabus Management",
    description: "Upload and organize syllabi, chapters, and topics with easy-to-use management tools.",
  },
  {
    icon: Globe,
    title: "Access Anywhere",
    description: "Cloud-based platform accessible from any device - desktop, tablet, or mobile.",
  },
];

const benefits = [
  "Unique exam papers for every student",
  "Anti-cheating browser lockdown",
  "Automated grading & analytics",
  "Topic-wise performance tracking",
  "Bulk student management",
  "Export results as PDF/Excel",
];

const testimonials = [
  {
    name: "Dr. Sarah Johnson",
    role: "Professor, MIT",
    avatar: "",
    content: "ExamFlow has revolutionized how I conduct exams. The unique paper generation saves hours of work.",
  },
  {
    name: "Michael Chen",
    role: "High School Teacher",
    avatar: "",
    content: "The analytics dashboard helps me identify exactly where my students need more support.",
  },
  {
    name: "Emily Rodriguez",
    role: "Department Head",
    avatar: "",
    content: "Finally, an exam platform that takes cheating prevention seriously. Highly recommended!",
  },
];

const stats = [
  { value: "10,000+", label: "Exams Created" },
  { value: "50,000+", label: "Students Tested" },
  { value: "500+", label: "Schools & Colleges" },
  { value: "99.9%", label: "Uptime" },
];

export default function Index() {
  const { user, signOut, loading } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleSignOut = async () => {
    await signOut();
  };

  const getInitials = (email: string) => {
    return email.substring(0, 2).toUpperCase();
  };

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

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <a href="#features" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Features
            </a>
            <a href="#how-it-works" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              How It Works
            </a>
            <a href="#testimonials" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Testimonials
            </a>
            <a href="#pricing" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Pricing
            </a>
          </nav>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center gap-3">
            {loading ? (
              <div className="w-8 h-8 rounded-full bg-muted animate-pulse" />
            ) : user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center gap-2 px-2">
                    <Avatar className="w-8 h-8">
                      <AvatarImage src={user.user_metadata?.avatar_url} />
                      <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                        {getInitials(user.email || "U")}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-sm font-medium max-w-[150px] truncate">
                      {user.email}
                    </span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuItem asChild>
                    <Link to="/teacher" className="flex items-center gap-2 cursor-pointer">
                      <LayoutDashboard className="w-4 h-4" />
                      Dashboard
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/teacher/settings" className="flex items-center gap-2 cursor-pointer">
                      <Settings className="w-4 h-4" />
                      Settings
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleSignOut} className="flex items-center gap-2 cursor-pointer text-destructive">
                    <LogOut className="w-4 h-4" />
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Link to="/auth">
                  <Button variant="ghost">Sign In</Button>
                </Link>
                <Link to="/auth">
                  <Button>Get Started</Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="w-5 h-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[350px]">
              <div className="flex flex-col h-full">
                <div className="flex items-center gap-2 mb-8">
                  <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
                    <GraduationCap className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <span className="text-xl font-bold">ExamFlow</span>
                </div>

                <nav className="flex flex-col gap-4 flex-1">
                  <a
                    href="#features"
                    className="text-lg text-muted-foreground hover:text-foreground transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Features
                  </a>
                  <a
                    href="#how-it-works"
                    className="text-lg text-muted-foreground hover:text-foreground transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    How It Works
                  </a>
                  <a
                    href="#testimonials"
                    className="text-lg text-muted-foreground hover:text-foreground transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Testimonials
                  </a>
                  <a
                    href="#pricing"
                    className="text-lg text-muted-foreground hover:text-foreground transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Pricing
                  </a>
                </nav>

                <div className="border-t border-border pt-4 mt-4">
                  {user ? (
                    <div className="space-y-3">
                      <div className="flex items-center gap-3 p-2 rounded-lg bg-muted/50">
                        <Avatar className="w-10 h-10">
                          <AvatarImage src={user.user_metadata?.avatar_url} />
                          <AvatarFallback className="bg-primary text-primary-foreground">
                            {getInitials(user.email || "U")}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium truncate">{user.email}</p>
                          <p className="text-xs text-muted-foreground">Logged in</p>
                        </div>
                      </div>
                      <Link to="/teacher" onClick={() => setMobileMenuOpen(false)}>
                        <Button className="w-full" variant="default">
                          <LayoutDashboard className="w-4 h-4 mr-2" />
                          Go to Dashboard
                        </Button>
                      </Link>
                      <Button
                        variant="outline"
                        className="w-full"
                        onClick={() => {
                          handleSignOut();
                          setMobileMenuOpen(false);
                        }}
                      >
                        <LogOut className="w-4 h-4 mr-2" />
                        Sign Out
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <Link to="/auth" onClick={() => setMobileMenuOpen(false)}>
                        <Button className="w-full">Get Started</Button>
                      </Link>
                      <Link to="/auth" onClick={() => setMobileMenuOpen(false)}>
                        <Button variant="outline" className="w-full">
                          Sign In
                        </Button>
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-12 lg:py-24 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
              <Sparkles className="w-4 h-4" />
              Modern Exam Platform for Educators
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 leading-tight">
              Create, Conduct & Analyze
              <br />
              <span className="text-primary">Exams Effortlessly</span>
            </h1>
            <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto mb-8 px-4">
              A comprehensive platform for teachers to design unique exam papers and for students to take secure, distraction-free tests. Get detailed analytics and performance insights.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              {user ? (
                <Link to="/teacher">
                  <Button size="lg" className="h-12 px-8 w-full sm:w-auto">
                    <LayoutDashboard className="w-5 h-5 mr-2" />
                    Go to Dashboard
                    <ChevronRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              ) : (
                <Link to="/auth">
                  <Button size="lg" className="h-12 px-8 w-full sm:w-auto">
                    <Users className="w-5 h-5 mr-2" />
                    Get Started Free
                    <ChevronRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              )}
              <Link to="/exam/demo">
                <Button size="lg" variant="outline" className="h-12 px-8 w-full sm:w-auto">
                  <BookOpen className="w-5 h-5 mr-2" />
                  Try Student Demo
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 border-y border-border bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {stats.map((stat, idx) => (
              <div key={idx} className="text-center">
                <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary mb-1">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4">Everything You Need</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Powerful features designed for modern education
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
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

      {/* How It Works */}
      <section id="how-it-works" className="py-16 lg:py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4">How It Works</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Get started in minutes with our simple 4-step process
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { step: "01", title: "Create Account", desc: "Sign up free and set up your school or institution profile." },
              { step: "02", title: "Add Syllabus", desc: "Upload your syllabus and organize topics by chapters." },
              { step: "03", title: "Generate Exams", desc: "Create unique question papers for each student automatically." },
              { step: "04", title: "Analyze Results", desc: "Get detailed analytics on student performance." },
            ].map((item, idx) => (
              <div key={idx} className="relative">
                <div className="text-5xl sm:text-6xl font-bold text-primary/10 mb-4">{item.step}</div>
                <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold mb-6">Why Choose ExamFlow?</h2>
              <p className="text-muted-foreground mb-8">
                ExamFlow is designed specifically for educators who want to save time, ensure exam integrity, and gain deeper insights into student performance.
              </p>
              <div className="grid sm:grid-cols-2 gap-4">
                {benefits.map((benefit, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Check className="w-4 h-4 text-primary" />
                    </div>
                    <span className="text-sm">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <Card className="p-6 bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center">
                      <Zap className="w-6 h-6 text-primary-foreground" />
                    </div>
                    <div>
                      <h4 className="font-semibold">Quick Setup</h4>
                      <p className="text-sm text-muted-foreground">Get started in under 5 minutes</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center">
                      <Lock className="w-6 h-6 text-primary-foreground" />
                    </div>
                    <div>
                      <h4 className="font-semibold">Secure & Private</h4>
                      <p className="text-sm text-muted-foreground">Enterprise-grade security</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center">
                      <BarChart3 className="w-6 h-6 text-primary-foreground" />
                    </div>
                    <div>
                      <h4 className="font-semibold">Smart Analytics</h4>
                      <p className="text-sm text-muted-foreground">AI-powered insights</p>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-16 lg:py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4">What Educators Say</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Join thousands of teachers who trust ExamFlow
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map((testimonial, idx) => (
              <Card key={idx} className="border-border/50">
                <CardContent className="pt-6">
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">"{testimonial.content}"</p>
                  <div className="flex items-center gap-3">
                    <Avatar className="w-10 h-10">
                      <AvatarImage src={testimonial.avatar} />
                      <AvatarFallback className="bg-primary/10 text-primary text-sm">
                        {testimonial.name.split(" ").map(n => n[0]).join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium text-sm">{testimonial.name}</p>
                      <p className="text-xs text-muted-foreground">{testimonial.role}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4">Simple, Transparent Pricing</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Start free and upgrade as you grow
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              {
                name: "Free",
                price: "$0",
                desc: "Perfect for getting started",
                features: ["Up to 50 students", "5 exams per month", "Basic analytics", "Email support"],
                cta: "Get Started",
                popular: false,
              },
              {
                name: "Pro",
                price: "$29",
                desc: "Best for growing schools",
                features: ["Unlimited students", "Unlimited exams", "Advanced analytics", "Priority support", "Custom branding"],
                cta: "Start Free Trial",
                popular: true,
              },
              {
                name: "Enterprise",
                price: "Custom",
                desc: "For large institutions",
                features: ["Everything in Pro", "Dedicated support", "SLA guarantee", "API access", "Custom integrations"],
                cta: "Contact Sales",
                popular: false,
              },
            ].map((plan, idx) => (
              <Card
                key={idx}
                className={`relative border-border/50 ${plan.popular ? "border-primary shadow-lg scale-105" : ""}`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-primary text-primary-foreground text-xs font-medium rounded-full">
                    Most Popular
                  </div>
                )}
                <CardContent className="pt-6">
                  <h3 className="font-semibold text-lg">{plan.name}</h3>
                  <div className="my-4">
                    <span className="text-3xl font-bold">{plan.price}</span>
                    {plan.price !== "Custom" && <span className="text-muted-foreground">/month</span>}
                  </div>
                  <p className="text-sm text-muted-foreground mb-6">{plan.desc}</p>
                  <ul className="space-y-3 mb-6">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm">
                        <Check className="w-4 h-4 text-primary" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Button className="w-full" variant={plan.popular ? "default" : "outline"}>
                    {plan.cta}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 lg:py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <Card className="bg-primary/5 border-primary/20">
            <CardContent className="py-12 text-center">
              <h2 className="text-2xl sm:text-3xl font-bold mb-4">Ready to Transform Your Exams?</h2>
              <p className="text-muted-foreground mb-8 max-w-lg mx-auto">
                Join thousands of educators who are already using ExamFlow to create better exams and gain deeper insights.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                {user ? (
                  <Link to="/teacher">
                    <Button size="lg">
                      <LayoutDashboard className="w-4 h-4 mr-2" />
                      Go to Dashboard
                      <ChevronRight className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                ) : (
                  <Link to="/auth">
                    <Button size="lg">
                      Get Started Free
                      <ChevronRight className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-border">
        <div className="container mx-auto px-4">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                  <GraduationCap className="w-5 h-5 text-primary-foreground" />
                </div>
                <span className="font-bold">ExamFlow</span>
              </div>
              <p className="text-sm text-muted-foreground">
                The modern exam platform for educators. Create, conduct, and analyze exams effortlessly.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#features" className="hover:text-foreground transition-colors">Features</a></li>
                <li><a href="#pricing" className="hover:text-foreground transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Integrations</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">API</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition-colors">About</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Cookie Policy</a></li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-border text-center text-sm text-muted-foreground">
            <p>© 2024 ExamFlow. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
