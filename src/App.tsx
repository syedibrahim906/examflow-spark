import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import NotFound from "./pages/NotFound";
import { TeacherLayout } from "./components/layout/TeacherLayout";
import TeacherHome from "./pages/teacher/TeacherHome";
import Subjects from "./pages/teacher/Subjects";
import Syllabus from "./pages/teacher/Syllabus";
import QuestionBank from "./pages/teacher/QuestionBank";
import CreateExam from "./pages/teacher/CreateExam";
import Results from "./pages/teacher/Results";
import TeacherSettings from "./pages/teacher/TeacherSettings";
import StudentExam from "./pages/student/StudentExam";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/auth" element={<Auth />} />
            
            {/* Teacher Routes */}
            <Route path="/teacher" element={<TeacherLayout />}>
              <Route index element={<TeacherHome />} />
              <Route path="subjects" element={<Subjects />} />
              <Route path="syllabus" element={<Syllabus />} />
              <Route path="questions" element={<QuestionBank />} />
              <Route path="create-exam" element={<CreateExam />} />
              <Route path="results" element={<Results />} />
              <Route path="settings" element={<TeacherSettings />} />
            </Route>

            {/* Student Exam Route */}
            <Route path="/exam/:examId" element={<StudentExam />} />

            {/* Catch-all */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
