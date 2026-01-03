import { useState } from "react";
import { 
  FolderKanban, 
  Plus, 
  Search, 
  MoreVertical, 
  Pencil, 
  Trash2, 
  Share2,
  Calendar,
  Image as ImageIcon
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";
import { Link } from "react-router-dom";

// Mock project data
const mockProjects = [
  {
    id: "1",
    name: "Modern Beach House",
    type: "Residential",
    createdAt: "2024-01-15",
    updatedAt: "2024-01-20",
    thumbnail: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400&auto=format",
    status: "In Progress",
  },
  {
    id: "2",
    name: "Downtown Office Complex",
    type: "Commercial",
    createdAt: "2024-01-10",
    updatedAt: "2024-01-18",
    thumbnail: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=400&auto=format",
    status: "Completed",
  },
  {
    id: "3",
    name: "Suburban Family Home",
    type: "Residential",
    createdAt: "2024-01-08",
    updatedAt: "2024-01-12",
    thumbnail: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400&auto=format",
    status: "In Progress",
  },
  {
    id: "4",
    name: "Retail Store Layout",
    type: "Commercial",
    createdAt: "2024-01-05",
    updatedAt: "2024-01-10",
    thumbnail: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=400&auto=format",
    status: "Draft",
  },
];

export default function ProjectsPage() {
  const [projects, setProjects] = useState(mockProjects);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredProjects = projects.filter((project) =>
    project.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDelete = (id: string) => {
    setProjects(projects.filter((p) => p.id !== id));
    toast.success("Project deleted");
  };

  const handleShare = (name: string) => {
    navigator.clipboard.writeText(`https://stylarch.app/project/${name.toLowerCase().replace(/\s/g, "-")}`);
    toast.success("Share link copied to clipboard!");
  };

  const handleRename = (id: string) => {
    toast.info("Rename functionality coming soon");
  };

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Header */}
      <section className="bg-primary text-primary-foreground py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="font-display text-3xl md:text-4xl font-bold mb-2">
                Your Projects
              </h1>
              <p className="text-primary-foreground/80">
                Manage and track all your architectural projects in one place.
              </p>
            </div>
            <Button variant="hero" asChild>
              <Link to="/design">
                <Plus className="w-5 h-5" />
                New Project
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8">
        {/* Search & Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              placeholder="Search projects..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Projects Grid */}
        {filteredProjects.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProjects.map((project) => (
              <Card key={project.id} className="overflow-hidden hover-lift group">
                <div className="aspect-video relative overflow-hidden">
                  <img
                    src={project.thumbnail}
                    alt={project.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-2 right-2">
                    <span
                      className={`px-2 py-1 text-xs font-medium rounded-full ${
                        project.status === "Completed"
                          ? "bg-emerald-500/90 text-white"
                          : project.status === "In Progress"
                          ? "bg-blue-500/90 text-white"
                          : "bg-muted/90 text-foreground"
                      }`}
                    >
                      {project.status}
                    </span>
                  </div>
                </div>
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1 min-w-0">
                      <h3 className="font-display font-semibold text-foreground truncate">
                        {project.name}
                      </h3>
                      <p className="text-sm text-muted-foreground">{project.type}</p>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="shrink-0">
                          <MoreVertical className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleRename(project.id)}>
                          <Pencil className="w-4 h-4 mr-2" />
                          Rename
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleShare(project.name)}>
                          <Share2 className="w-4 h-4 mr-2" />
                          Share
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          onClick={() => handleDelete(project.id)}
                          className="text-destructive"
                        >
                          <Trash2 className="w-4 h-4 mr-2" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  <div className="flex items-center gap-2 mt-3 text-xs text-muted-foreground">
                    <Calendar className="w-3 h-3" />
                    <span>Updated {project.updatedAt}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="py-12">
            <CardContent className="text-center">
              <FolderKanban className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="font-display text-lg font-semibold mb-2">No projects found</h3>
              <p className="text-muted-foreground mb-4">
                {searchQuery
                  ? "Try a different search term"
                  : "Start by creating your first project"}
              </p>
              {!searchQuery && (
                <Button variant="hero" asChild>
                  <Link to="/design">
                    <Plus className="w-5 h-5" />
                    Create Project
                  </Link>
                </Button>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
