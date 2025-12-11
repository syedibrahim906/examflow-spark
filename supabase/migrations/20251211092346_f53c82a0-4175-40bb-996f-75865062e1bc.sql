
-- Create app role enum
CREATE TYPE public.app_role AS ENUM ('teacher', 'student');

-- Create profiles table
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  full_name TEXT,
  avatar_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create user_roles table
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL,
  UNIQUE (user_id, role)
);

-- Create subjects table
CREATE TABLE public.subjects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  teacher_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create chapters table (syllabus structure)
CREATE TABLE public.chapters (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  subject_id UUID REFERENCES public.subjects(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  order_index INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create topics table
CREATE TABLE public.topics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  chapter_id UUID REFERENCES public.chapters(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  order_index INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create question type enum
CREATE TYPE public.question_type AS ENUM ('mcq', 'short_answer', 'long_answer');

-- Create difficulty enum
CREATE TYPE public.difficulty_level AS ENUM ('easy', 'medium', 'hard');

-- Create questions table
CREATE TABLE public.questions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  topic_id UUID REFERENCES public.topics(id) ON DELETE CASCADE NOT NULL,
  teacher_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  question_text TEXT NOT NULL,
  question_type question_type NOT NULL,
  difficulty difficulty_level NOT NULL DEFAULT 'medium',
  options JSONB, -- For MCQ options
  correct_answer TEXT,
  marks INTEGER NOT NULL DEFAULT 1,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create exams table
CREATE TABLE public.exams (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  teacher_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  subject_id UUID REFERENCES public.subjects(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  total_marks INTEGER NOT NULL,
  duration_minutes INTEGER NOT NULL,
  exam_date DATE,
  is_published BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create exam_topics table (topics included in exam with weightage)
CREATE TABLE public.exam_topics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  exam_id UUID REFERENCES public.exams(id) ON DELETE CASCADE NOT NULL,
  topic_id UUID REFERENCES public.topics(id) ON DELETE CASCADE NOT NULL,
  weightage INTEGER NOT NULL DEFAULT 10,
  UNIQUE (exam_id, topic_id)
);

-- Create student_exams table (unique exam instance per student)
CREATE TABLE public.student_exams (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  exam_id UUID REFERENCES public.exams(id) ON DELETE CASCADE NOT NULL,
  student_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  unique_link TEXT NOT NULL UNIQUE,
  started_at TIMESTAMPTZ,
  submitted_at TIMESTAMPTZ,
  is_submitted BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (exam_id, student_id)
);

-- Create student_exam_questions table (questions assigned to each student)
CREATE TABLE public.student_exam_questions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_exam_id UUID REFERENCES public.student_exams(id) ON DELETE CASCADE NOT NULL,
  question_id UUID REFERENCES public.questions(id) ON DELETE CASCADE NOT NULL,
  order_index INTEGER NOT NULL,
  student_answer TEXT,
  marks_obtained INTEGER,
  UNIQUE (student_exam_id, question_id)
);

-- Create results table
CREATE TABLE public.results (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_exam_id UUID REFERENCES public.student_exams(id) ON DELETE CASCADE NOT NULL UNIQUE,
  total_marks_obtained INTEGER NOT NULL DEFAULT 0,
  percentage DECIMAL(5,2),
  rank INTEGER,
  strengths TEXT[],
  weaknesses TEXT[],
  suggestions TEXT[],
  evaluated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subjects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.chapters ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.topics ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.exams ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.exam_topics ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.student_exams ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.student_exam_questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.results ENABLE ROW LEVEL SECURITY;

-- Create security definer function for role checking
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

-- Create function to handle new user creation
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, avatar_url)
  VALUES (
    NEW.id,
    NEW.email,
    NEW.raw_user_meta_data ->> 'full_name',
    NEW.raw_user_meta_data ->> 'avatar_url'
  );
  RETURN NEW;
END;
$$;

-- Create trigger for new user signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

-- Create triggers for updated_at
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON public.profiles FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_subjects_updated_at BEFORE UPDATE ON public.subjects FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_questions_updated_at BEFORE UPDATE ON public.questions FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_exams_updated_at BEFORE UPDATE ON public.exams FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- RLS Policies for profiles
CREATE POLICY "Users can view their own profile" ON public.profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update their own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);

-- RLS Policies for user_roles
CREATE POLICY "Users can view their own roles" ON public.user_roles FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own role" ON public.user_roles FOR INSERT WITH CHECK (auth.uid() = user_id);

-- RLS Policies for subjects
CREATE POLICY "Teachers can view their own subjects" ON public.subjects FOR SELECT USING (auth.uid() = teacher_id);
CREATE POLICY "Teachers can create subjects" ON public.subjects FOR INSERT WITH CHECK (auth.uid() = teacher_id);
CREATE POLICY "Teachers can update their own subjects" ON public.subjects FOR UPDATE USING (auth.uid() = teacher_id);
CREATE POLICY "Teachers can delete their own subjects" ON public.subjects FOR DELETE USING (auth.uid() = teacher_id);

-- RLS Policies for chapters
CREATE POLICY "Teachers can view chapters of their subjects" ON public.chapters FOR SELECT USING (
  EXISTS (SELECT 1 FROM public.subjects WHERE subjects.id = chapters.subject_id AND subjects.teacher_id = auth.uid())
);
CREATE POLICY "Teachers can create chapters" ON public.chapters FOR INSERT WITH CHECK (
  EXISTS (SELECT 1 FROM public.subjects WHERE subjects.id = subject_id AND subjects.teacher_id = auth.uid())
);
CREATE POLICY "Teachers can update their chapters" ON public.chapters FOR UPDATE USING (
  EXISTS (SELECT 1 FROM public.subjects WHERE subjects.id = chapters.subject_id AND subjects.teacher_id = auth.uid())
);
CREATE POLICY "Teachers can delete their chapters" ON public.chapters FOR DELETE USING (
  EXISTS (SELECT 1 FROM public.subjects WHERE subjects.id = chapters.subject_id AND subjects.teacher_id = auth.uid())
);

-- RLS Policies for topics
CREATE POLICY "Teachers can view topics" ON public.topics FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM public.chapters 
    JOIN public.subjects ON subjects.id = chapters.subject_id 
    WHERE chapters.id = topics.chapter_id AND subjects.teacher_id = auth.uid()
  )
);
CREATE POLICY "Teachers can create topics" ON public.topics FOR INSERT WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.chapters 
    JOIN public.subjects ON subjects.id = chapters.subject_id 
    WHERE chapters.id = chapter_id AND subjects.teacher_id = auth.uid()
  )
);
CREATE POLICY "Teachers can update topics" ON public.topics FOR UPDATE USING (
  EXISTS (
    SELECT 1 FROM public.chapters 
    JOIN public.subjects ON subjects.id = chapters.subject_id 
    WHERE chapters.id = topics.chapter_id AND subjects.teacher_id = auth.uid()
  )
);
CREATE POLICY "Teachers can delete topics" ON public.topics FOR DELETE USING (
  EXISTS (
    SELECT 1 FROM public.chapters 
    JOIN public.subjects ON subjects.id = chapters.subject_id 
    WHERE chapters.id = topics.chapter_id AND subjects.teacher_id = auth.uid()
  )
);

-- RLS Policies for questions
CREATE POLICY "Teachers can view their questions" ON public.questions FOR SELECT USING (auth.uid() = teacher_id);
CREATE POLICY "Teachers can create questions" ON public.questions FOR INSERT WITH CHECK (auth.uid() = teacher_id);
CREATE POLICY "Teachers can update their questions" ON public.questions FOR UPDATE USING (auth.uid() = teacher_id);
CREATE POLICY "Teachers can delete their questions" ON public.questions FOR DELETE USING (auth.uid() = teacher_id);

-- RLS Policies for exams
CREATE POLICY "Teachers can view their exams" ON public.exams FOR SELECT USING (auth.uid() = teacher_id);
CREATE POLICY "Teachers can create exams" ON public.exams FOR INSERT WITH CHECK (auth.uid() = teacher_id);
CREATE POLICY "Teachers can update their exams" ON public.exams FOR UPDATE USING (auth.uid() = teacher_id);
CREATE POLICY "Teachers can delete their exams" ON public.exams FOR DELETE USING (auth.uid() = teacher_id);

-- RLS Policies for exam_topics
CREATE POLICY "Teachers can view exam_topics" ON public.exam_topics FOR SELECT USING (
  EXISTS (SELECT 1 FROM public.exams WHERE exams.id = exam_topics.exam_id AND exams.teacher_id = auth.uid())
);
CREATE POLICY "Teachers can create exam_topics" ON public.exam_topics FOR INSERT WITH CHECK (
  EXISTS (SELECT 1 FROM public.exams WHERE exams.id = exam_id AND exams.teacher_id = auth.uid())
);
CREATE POLICY "Teachers can delete exam_topics" ON public.exam_topics FOR DELETE USING (
  EXISTS (SELECT 1 FROM public.exams WHERE exams.id = exam_topics.exam_id AND exams.teacher_id = auth.uid())
);

-- RLS Policies for student_exams
CREATE POLICY "Teachers can view student_exams for their exams" ON public.student_exams FOR SELECT USING (
  EXISTS (SELECT 1 FROM public.exams WHERE exams.id = student_exams.exam_id AND exams.teacher_id = auth.uid())
);
CREATE POLICY "Students can view their own exams" ON public.student_exams FOR SELECT USING (auth.uid() = student_id);
CREATE POLICY "Teachers can create student_exams" ON public.student_exams FOR INSERT WITH CHECK (
  EXISTS (SELECT 1 FROM public.exams WHERE exams.id = exam_id AND exams.teacher_id = auth.uid())
);
CREATE POLICY "Students can update their own exam" ON public.student_exams FOR UPDATE USING (auth.uid() = student_id);

-- RLS Policies for student_exam_questions
CREATE POLICY "Teachers can view student answers" ON public.student_exam_questions FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM public.student_exams 
    JOIN public.exams ON exams.id = student_exams.exam_id 
    WHERE student_exams.id = student_exam_questions.student_exam_id AND exams.teacher_id = auth.uid()
  )
);
CREATE POLICY "Students can view their questions" ON public.student_exam_questions FOR SELECT USING (
  EXISTS (SELECT 1 FROM public.student_exams WHERE student_exams.id = student_exam_questions.student_exam_id AND student_exams.student_id = auth.uid())
);
CREATE POLICY "Teachers can create student questions" ON public.student_exam_questions FOR INSERT WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.student_exams 
    JOIN public.exams ON exams.id = student_exams.exam_id 
    WHERE student_exams.id = student_exam_id AND exams.teacher_id = auth.uid()
  )
);
CREATE POLICY "Students can update their answers" ON public.student_exam_questions FOR UPDATE USING (
  EXISTS (SELECT 1 FROM public.student_exams WHERE student_exams.id = student_exam_questions.student_exam_id AND student_exams.student_id = auth.uid())
);

-- RLS Policies for results
CREATE POLICY "Teachers can view results" ON public.results FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM public.student_exams 
    JOIN public.exams ON exams.id = student_exams.exam_id 
    WHERE student_exams.id = results.student_exam_id AND exams.teacher_id = auth.uid()
  )
);
CREATE POLICY "Students can view their results" ON public.results FOR SELECT USING (
  EXISTS (SELECT 1 FROM public.student_exams WHERE student_exams.id = results.student_exam_id AND student_exams.student_id = auth.uid())
);
CREATE POLICY "Teachers can create results" ON public.results FOR INSERT WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.student_exams 
    JOIN public.exams ON exams.id = student_exams.exam_id 
    WHERE student_exams.id = student_exam_id AND exams.teacher_id = auth.uid()
  )
);
CREATE POLICY "Teachers can update results" ON public.results FOR UPDATE USING (
  EXISTS (
    SELECT 1 FROM public.student_exams 
    JOIN public.exams ON exams.id = student_exams.exam_id 
    WHERE student_exams.id = results.student_exam_id AND exams.teacher_id = auth.uid()
  )
);
