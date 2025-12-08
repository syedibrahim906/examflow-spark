import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, BookOpen, MoreVertical, Users, FileText, Edit2, Trash2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";

const initialSubjects = [
  { id: 1, name: "Mathematics", classes: ["Class 10", "Class 11"], topics: 24, students: 45 },
  { id: 2, name: "Physics", classes: ["Class 11", "Class 12"], topics: 18, students: 38 },
  { id: 3, name: "Chemistry", classes: ["Class 11", "Class 12"], topics: 21, students: 42 },
  { id: 4, name: "Biology", classes: ["Class 10"], topics: 15, students: 35 },
  { id: 5, name: "English", classes: ["Class 10", "Class 11", "Class 12"], topics: 12, students: 120 },
];

export default function Subjects() {
  const [subjects, setSubjects] = useState(initialSubjects);
  const [isOpen, setIsOpen] = useState(false);
  const [newSubject, setNewSubject] = useState("");

  const handleAddSubject = () => {
    if (newSubject.trim()) {
      setSubjects([
        ...subjects,
        {
          id: subjects.length + 1,
          name: newSubject,
          classes: [],
          topics: 0,
          students: 0,
        },
      ]);
      setNewSubject("");
      setIsOpen(false);
    }
  };

  return (
    <div className="p-6 lg:p-8 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Subjects</h1>
          <p className="text-muted-foreground">Manage your subjects and classes</p>
        </div>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Add Subject
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Subject</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 pt-4">
              <div className="space-y-2">
                <Label htmlFor="subject-name">Subject Name</Label>
                <Input
                  id="subject-name"
                  placeholder="e.g., Computer Science"
                  value={newSubject}
                  onChange={(e) => setNewSubject(e.target.value)}
                />
              </div>
              <Button onClick={handleAddSubject} className="w-full">
                Add Subject
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Subjects Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {subjects.map((subject) => (
          <Card key={subject.id} className="group hover:shadow-md transition-all border-border/50">
            <CardHeader className="flex flex-row items-start justify-between pb-2">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <BookOpen className="w-5 h-5 text-primary" />
                </div>
                <CardTitle className="text-lg">{subject.name}</CardTitle>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity">
                    <MoreVertical className="w-4 h-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>
                    <Edit2 className="w-4 h-4 mr-2" />
                    Edit
                  </DropdownMenuItem>
                  <DropdownMenuItem className="text-destructive">
                    <Trash2 className="w-4 h-4 mr-2" />
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-wrap gap-2">
                {subject.classes.map((cls) => (
                  <span
                    key={cls}
                    className="px-2.5 py-1 text-xs rounded-full bg-muted text-muted-foreground"
                  >
                    {cls}
                  </span>
                ))}
                {subject.classes.length === 0 && (
                  <span className="text-xs text-muted-foreground">No classes assigned</span>
                )}
              </div>
              <div className="flex items-center justify-between text-sm pt-2 border-t border-border">
                <div className="flex items-center gap-1.5 text-muted-foreground">
                  <FileText className="w-4 h-4" />
                  <span>{subject.topics} topics</span>
                </div>
                <div className="flex items-center gap-1.5 text-muted-foreground">
                  <Users className="w-4 h-4" />
                  <span>{subject.students} students</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
