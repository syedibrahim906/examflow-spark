import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Upload, FileText, ChevronDown, ChevronRight, Edit2, Trash2, Plus, GripVertical } from "lucide-react";
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
import { Label } from "@/components/ui/label";

const initialChapters = [
  {
    id: 1,
    name: "Introduction to Calculus",
    topics: [
      { id: 1, name: "Limits and Continuity", questions: 15 },
      { id: 2, name: "Derivatives", questions: 22 },
      { id: 3, name: "Applications of Derivatives", questions: 18 },
    ],
  },
  {
    id: 2,
    name: "Integration",
    topics: [
      { id: 4, name: "Indefinite Integrals", questions: 20 },
      { id: 5, name: "Definite Integrals", questions: 16 },
      { id: 6, name: "Applications of Integrals", questions: 12 },
    ],
  },
  {
    id: 3,
    name: "Differential Equations",
    topics: [
      { id: 7, name: "First Order Equations", questions: 14 },
      { id: 8, name: "Second Order Equations", questions: 10 },
    ],
  },
];

export default function Syllabus() {
  const [chapters, setChapters] = useState(initialChapters);
  const [expandedChapters, setExpandedChapters] = useState<number[]>([1]);
  const [dragOver, setDragOver] = useState(false);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newChapter, setNewChapter] = useState("");

  const toggleChapter = (id: number) => {
    setExpandedChapters((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const handleAddChapter = () => {
    if (newChapter.trim()) {
      setChapters([
        ...chapters,
        {
          id: chapters.length + 1,
          name: newChapter,
          topics: [],
        },
      ]);
      setNewChapter("");
      setIsAddDialogOpen(false);
    }
  };

  return (
    <div className="p-6 lg:p-8 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Syllabus</h1>
          <p className="text-muted-foreground">Upload and manage course content</p>
        </div>
        <Select defaultValue="mathematics">
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Select subject" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="mathematics">Mathematics</SelectItem>
            <SelectItem value="physics">Physics</SelectItem>
            <SelectItem value="chemistry">Chemistry</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Upload Section */}
      <Card
        className={cn(
          "border-2 border-dashed transition-all cursor-pointer",
          dragOver ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"
        )}
        onDragOver={(e) => {
          e.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragOver(false);
        }}
      >
        <CardContent className="py-12 text-center">
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
            <Upload className="w-8 h-8 text-primary" />
          </div>
          <h3 className="text-lg font-semibold mb-2">Upload Syllabus</h3>
          <p className="text-muted-foreground mb-4">
            Drag and drop PDF or text files, or click to browse
          </p>
          <Button>
            <Upload className="w-4 h-4 mr-2" />
            Choose File
          </Button>
        </CardContent>
      </Card>

      {/* Chapter List */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Chapters & Topics</h2>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="outline">
                <Plus className="w-4 h-4 mr-2" />
                Add Chapter
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Chapter</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 pt-4">
                <div className="space-y-2">
                  <Label htmlFor="chapter-name">Chapter Name</Label>
                  <Input
                    id="chapter-name"
                    placeholder="e.g., Linear Algebra"
                    value={newChapter}
                    onChange={(e) => setNewChapter(e.target.value)}
                  />
                </div>
                <Button onClick={handleAddChapter} className="w-full">
                  Add Chapter
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <div className="space-y-3">
          {chapters.map((chapter) => (
            <Card key={chapter.id} className="border-border/50 overflow-hidden">
              <CardHeader
                className="py-3 px-4 cursor-pointer hover:bg-muted/30 transition-colors"
                onClick={() => toggleChapter(chapter.id)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <GripVertical className="w-4 h-4 text-muted-foreground cursor-grab" />
                    {expandedChapters.includes(chapter.id) ? (
                      <ChevronDown className="w-4 h-4 text-muted-foreground" />
                    ) : (
                      <ChevronRight className="w-4 h-4 text-muted-foreground" />
                    )}
                    <FileText className="w-5 h-5 text-primary" />
                    <CardTitle className="text-base font-medium">{chapter.name}</CardTitle>
                    <span className="text-sm text-muted-foreground">
                      ({chapter.topics.length} topics)
                    </span>
                  </div>
                  <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Edit2 className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              {expandedChapters.includes(chapter.id) && (
                <CardContent className="py-0 pb-3">
                  <div className="ml-11 space-y-2">
                    {chapter.topics.map((topic) => (
                      <div
                        key={topic.id}
                        className="flex items-center justify-between py-2 px-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <span className="w-2 h-2 rounded-full bg-primary" />
                          <span className="text-sm">{topic.name}</span>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className="text-xs text-muted-foreground">
                            {topic.questions} questions
                          </span>
                          <div className="flex items-center gap-1">
                            <Button variant="ghost" size="icon" className="h-7 w-7">
                              <Edit2 className="w-3.5 h-3.5" />
                            </Button>
                            <Button variant="ghost" size="icon" className="h-7 w-7 text-destructive">
                              <Trash2 className="w-3.5 h-3.5" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                    <Button variant="ghost" size="sm" className="ml-3 text-muted-foreground">
                      <Plus className="w-4 h-4 mr-1" />
                      Add Topic
                    </Button>
                  </div>
                </CardContent>
              )}
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
