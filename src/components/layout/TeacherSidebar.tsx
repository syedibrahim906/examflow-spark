import { useState } from "react";
import { NavLink } from "@/components/NavLink";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Home,
  BookOpen,
  FileText,
  Database,
  PenTool,
  BarChart3,
  Settings,
  ChevronLeft,
  ChevronRight,
  GraduationCap,
  LogOut,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";

const navItems = [
  { title: "Home", url: "/teacher", icon: Home },
  { title: "Subjects", url: "/teacher/subjects", icon: BookOpen },
  { title: "Syllabus", url: "/teacher/syllabus", icon: FileText },
  { title: "Question Bank", url: "/teacher/questions", icon: Database },
  { title: "Create Exam", url: "/teacher/create-exam", icon: PenTool },
  { title: "Student Results", url: "/teacher/results", icon: BarChart3 },
  { title: "Settings", url: "/teacher/settings", icon: Settings },
];

interface TeacherSidebarProps {
  onNavigate?: () => void;
}

export function TeacherSidebar({ onNavigate }: TeacherSidebarProps) {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, signOut } = useAuth();

  const getInitials = (email: string) => {
    return email.substring(0, 2).toUpperCase();
  };

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  const handleNavClick = () => {
    if (onNavigate) {
      onNavigate();
    }
  };

  return (
    <aside
      className={cn(
        "sticky top-0 h-screen bg-card border-r border-border transition-all duration-300 flex flex-col",
        collapsed ? "w-16" : "w-64"
      )}
    >
      {/* Logo */}
      <div className="h-16 flex items-center justify-between px-4 border-b border-border">
        <div className={cn("flex items-center gap-2", collapsed && "justify-center w-full")}>
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
            <GraduationCap className="w-5 h-5 text-primary-foreground" />
          </div>
          {!collapsed && <span className="font-semibold text-lg">ExamFlow</span>}
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-4 px-2 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const isActive = location.pathname === item.url;
          return (
            <NavLink
              key={item.title}
              to={item.url}
              onClick={handleNavClick}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200",
                "hover:bg-muted/50",
                isActive && "bg-primary/10 text-primary font-medium",
                collapsed && "justify-center px-2"
              )}
            >
              <item.icon className={cn("w-5 h-5 flex-shrink-0", isActive && "text-primary")} />
              {!collapsed && <span>{item.title}</span>}
            </NavLink>
          );
        })}
      </nav>

      {/* User Section */}
      {user && (
        <>
          <Separator />
          <div className={cn("p-3", collapsed && "flex justify-center")}>
            {collapsed ? (
              <Avatar className="w-8 h-8 cursor-pointer" onClick={() => setCollapsed(false)}>
                <AvatarImage src={user.user_metadata?.avatar_url} />
                <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                  {getInitials(user.email || "U")}
                </AvatarFallback>
              </Avatar>
            ) : (
              <div className="flex items-center gap-3 p-2 rounded-lg bg-muted/50">
                <Avatar className="w-9 h-9">
                  <AvatarImage src={user.user_metadata?.avatar_url} />
                  <AvatarFallback className="bg-primary text-primary-foreground text-sm">
                    {getInitials(user.email || "U")}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{user.email}</p>
                  <p className="text-xs text-muted-foreground">Teacher</p>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="flex-shrink-0 h-8 w-8"
                  onClick={handleSignOut}
                >
                  <LogOut className="w-4 h-4" />
                </Button>
              </div>
            )}
          </div>
        </>
      )}

      {/* Collapse Toggle - Hidden on mobile */}
      <div className="p-2 border-t border-border hidden lg:block">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setCollapsed(!collapsed)}
          className="w-full justify-center"
        >
          {collapsed ? (
            <ChevronRight className="w-4 h-4" />
          ) : (
            <>
              <ChevronLeft className="w-4 h-4 mr-2" />
              <span>Collapse</span>
            </>
          )}
        </Button>
      </div>
    </aside>
  );
}
