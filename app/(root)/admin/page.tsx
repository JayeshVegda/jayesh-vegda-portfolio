"use client";

import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Trash2, Edit2, Plus, Settings, LogOut, CheckCircle2, XCircle } from "lucide-react";
import ImageUpload from "@/components/forms/image-upload";

type DataType = "projects" | "experience" | "skills" | "contributions" | "site" | "socials";

const navItems = [
  { id: "projects", label: "Projects", icon: "📁" },
  { id: "experience", label: "Experience", icon: "💼" },
  { id: "skills", label: "Skills", icon: "⚡" },
  { id: "contributions", label: "Contributions", icon: "🌟" },
  { id: "site", label: "Site Config", icon: "⚙️" },
  { id: "socials", label: "Social Links", icon: "🔗" },
];

export default function AdminPage() {
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [adminPassword, setAdminPassword] = useState("");
  const [activeTab, setActiveTab] = useState<DataType>("projects");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Data states
  const [projects, setProjects] = useState<any[]>([]);
  const [experiences, setExperiences] = useState<any[]>([]);
  const [skills, setSkills] = useState<any[]>([]);
  const [contributions, setContributions] = useState<any[]>([]);
  const [site, setSite] = useState<any>(null);
  const [socials, setSocials] = useState<any[]>([]);

  // Form states
  const [editingItem, setEditingItem] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ text: string; type: "success" | "error" } | null>(null);

  const loadAllData = useCallback(async () => {
    setLoading(true);
    try {
      const headers = { "x-admin-password": adminPassword };

      const [projRes, expRes, skillsRes, contrRes, siteRes, socialsRes] = await Promise.all([
        fetch("/api/admin/projects", { headers }),
        fetch("/api/admin/experience", { headers }),
        fetch("/api/admin/skills", { headers }),
        fetch("/api/admin/contributions", { headers }),
        fetch("/api/admin/site", { headers }),
        fetch("/api/admin/socials", { headers }),
      ]);

      setProjects(await projRes.json());
      setExperiences(await expRes.json());
      setSkills(await skillsRes.json());
      setContributions(await contrRes.json());
      setSite(await siteRes.json());
      setSocials(await socialsRes.json());

      setMessage({ text: "Data loaded successfully", type: "success" });
    } catch (error) {
      setMessage({ text: "Failed to load data", type: "error" });
    }
    setLoading(false);
  }, [adminPassword]);

  useEffect(() => {
    if (authenticated && adminPassword) {
      loadAllData();
    }
  }, [authenticated, adminPassword, loadAllData]);

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => setMessage(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  const authenticate = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const data = await res.json();
      if (data.success) {
        setAuthenticated(true);
        setAdminPassword(password);
        setMessage({ text: "Authenticated successfully", type: "success" });
      } else {
        setMessage({ text: "Invalid password", type: "error" });
      }
    } catch (error) {
      setMessage({ text: "Authentication failed", type: "error" });
    }
    setLoading(false);
  };

  const handleSubmit = async (type: DataType, data: any) => {
    setLoading(true);
    setMessage(null);
    try {
      const headers = {
        "Content-Type": "application/json",
        "x-admin-password": adminPassword,
      };

      const method = editingItem ? "PUT" : "POST";
      const res = await fetch(`/api/admin/${type}`, {
        method,
        headers,
        body: JSON.stringify(data),
      });

      const result = await res.json();
      if (result.success) {
        setMessage({ text: `${type} ${editingItem ? "updated" : "added"} successfully`, type: "success" });
        setEditingItem(null);
        setIsDialogOpen(false);
        await loadAllData();
      } else {
        // Check if error is about file writes not being supported
        const errorMsg = result.error || "Operation failed";
        if (errorMsg.includes("File writes are not supported")) {
          setMessage({ 
            text: "⚠️ File writes are disabled in production. Updates via Git or database required.", 
            type: "error" 
          });
        } else {
          setMessage({ text: errorMsg, type: "error" });
        }
      }
    } catch (error: any) {
      setMessage({ text: error.message || "Operation failed", type: "error" });
    }
    setLoading(false);
  };

  const handleDelete = async (type: DataType, identifier: string) => {
    if (!confirm("Are you sure you want to delete this item?")) return;

    setLoading(true);
    setMessage(null);
    try {
      let url = `/api/admin/${type}?`;
      if (type === "skills" || type === "socials") {
        url += `name=${identifier}`;
      } else if (type === "contributions") {
        url += `repo=${identifier}`;
      } else {
        url += `id=${identifier}`;
      }

      const res = await fetch(url, {
        method: "DELETE",
        headers: { "x-admin-password": adminPassword },
      });

      const result = await res.json();
      if (result.success) {
        setMessage({ text: `${type} deleted successfully`, type: "success" });
        await loadAllData();
      } else {
        setMessage({ text: result.error || "Delete failed", type: "error" });
      }
    } catch (error: any) {
      setMessage({ text: error.message || "Delete failed", type: "error" });
    }
    setLoading(false);
  };

  const openEditDialog = (item: any) => {
    setEditingItem(item);
    setIsDialogOpen(true);
  };

  const openAddDialog = () => {
    setEditingItem(null);
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
    setEditingItem(null);
  };

  if (!authenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
        <Card className="w-full max-w-md shadow-xl">
          <CardHeader className="space-y-1 text-center">
            <div className="mx-auto mb-4 w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
              <Settings className="w-8 h-8 text-primary" />
            </div>
            <CardTitle className="text-2xl font-bold">Admin Login</CardTitle>
            <CardDescription>Enter your password to access the admin panel</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && authenticate()}
              className="h-11"
            />
            <Button onClick={authenticate} disabled={loading} className="w-full h-11">
              {loading ? "Authenticating..." : "Login"}
            </Button>
            {message && (
              <div className={`flex items-center gap-2 p-3 rounded-md ${message.type === "success" ? "bg-green-50 text-green-800 dark:bg-green-900/20" : "bg-red-50 text-red-800 dark:bg-red-900/20"}`}>
                {message.type === "success" ? <CheckCircle2 className="w-4 h-4" /> : <XCircle className="w-4 h-4" />}
                <span className="text-sm">{message.text}</span>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    );
  }

  const currentData = {
    projects,
    experience: experiences,
    skills,
    contributions,
    site,
    socials,
  }[activeTab] || [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      {/* Header */}
      <header className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm border-b sticky top-0 z-10">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              Admin Panel
            </h1>
            <p className="text-sm text-muted-foreground mt-1">Manage your portfolio content</p>
          </div>
          <Button variant="outline" onClick={() => setAuthenticated(false)} className="gap-2">
            <LogOut className="w-4 h-4" />
            Logout
          </Button>
        </div>
      </header>


      {/* Message Toast */}
      {message && (
        <div className="fixed top-20 right-6 z-50 animate-in slide-in-from-top-5">
          <Card className={`shadow-lg ${message.type === "success" ? "border-green-200 bg-green-50 dark:bg-green-900/20" : "border-red-200 bg-red-50 dark:bg-red-900/20"}`}>
            <CardContent className="p-4 flex items-center gap-3">
              {message.type === "success" ? (
                <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400" />
              ) : (
                <XCircle className="w-5 h-5 text-red-600 dark:text-red-400" />
              )}
              <span className={`font-medium ${message.type === "success" ? "text-green-800 dark:text-green-200" : "text-red-800 dark:text-red-200"}`}>
                {message.text}
              </span>
            </CardContent>
          </Card>
        </div>
      )}

      <div className="container mx-auto px-6 py-8">
        <div className="flex gap-6">
          {/* Sidebar */}
          <aside className="w-64 flex-shrink-0">
            <Card className="sticky top-24">
              <CardContent className="p-4">
                <nav className="space-y-1">
                  {navItems.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => setActiveTab(item.id as DataType)}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                        activeTab === item.id
                          ? "bg-primary text-primary-foreground shadow-md"
                          : "hover:bg-muted text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      <span className="text-xl">{item.icon}</span>
                      <span className="font-medium">{item.label}</span>
                    </button>
                  ))}
                </nav>
              </CardContent>
            </Card>
          </aside>

          {/* Main Content */}
          <main className="flex-1">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                <div>
                  <CardTitle className="text-2xl">{navItems.find((i) => i.id === activeTab)?.label}</CardTitle>
                  <CardDescription>
                    {activeTab === "site" ? "Manage site-wide settings" : `Manage your ${activeTab} entries`}
                  </CardDescription>
                </div>
                {activeTab !== "site" && (
                  <Button onClick={openAddDialog} className="gap-2">
                    <Plus className="w-4 h-4" />
                    Add New
                  </Button>
                )}
              </CardHeader>
              <CardContent>
                {loading && !currentData.length ? (
                  <div className="flex items-center justify-center py-12">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                  </div>
                ) : (
                  <DataView
                    type={activeTab}
                    data={activeTab === "site" ? site : currentData}
                    onEdit={openEditDialog}
                    onDelete={(id: string) => handleDelete(activeTab, id)}
                    onSubmit={(data: any) => handleSubmit(activeTab, data)}
                  />
                )}
              </CardContent>
            </Card>
          </main>
        </div>
      </div>

      {/* Edit/Add Dialog */}
      {activeTab !== "site" && (
        <Dialog open={isDialogOpen} onOpenChange={closeDialog}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingItem ? "Edit" : "Add"} {navItems.find((i) => i.id === activeTab)?.label}</DialogTitle>
              <DialogDescription>
                {editingItem ? "Update the information below" : "Fill in the information to create a new entry"}
              </DialogDescription>
            </DialogHeader>
            <FormContent
              type={activeTab}
              data={editingItem}
              onSubmit={(data: any) => handleSubmit(activeTab, data)}
              loading={loading}
            />
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}

// Data View Component
function DataView({ type, data, onEdit, onDelete, onSubmit }: any) {
  if (type === "site") {
    return <SiteForm data={data} onSubmit={onSubmit} />;
  }

  if (!data || data.length === 0) {
    return (
      <div className="text-center py-12 text-muted-foreground">
        <p className="text-lg">No {type} found</p>
        <p className="text-sm mt-2">Click &quot;Add New&quot; to create your first entry</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {data.map((item: any) => {
        const identifier = type === "skills" || type === "socials" ? item.name : type === "contributions" ? item.repo : item.id;
        const title = item.companyName || item.position || item.name || item.repo || item.title || "Untitled";
        const subtitle =
          type === "experience"
            ? `${item.company} • ${item.location || ""}`
            : type === "projects"
            ? item.type
            : type === "skills"
            ? `${item.category} • ${"⭐".repeat(item.rating)}`
            : type === "contributions"
            ? item.repoOwner
            : type === "socials"
            ? item.username
            : "";

        return (
          <Card key={identifier} className="hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="font-semibold text-lg">{title}</h3>
                  {subtitle && <p className="text-sm text-muted-foreground mt-1">{subtitle}</p>}
                  {item.shortDescription && (
                    <p className="text-sm text-muted-foreground mt-2 line-clamp-2">{item.shortDescription}</p>
                  )}
                </div>
                <div className="flex gap-2 ml-4">
                  <Button size="sm" variant="outline" onClick={() => onEdit(item)} className="gap-2">
                    <Edit2 className="w-3 h-3" />
                    Edit
                  </Button>
                  <Button size="sm" variant="destructive" onClick={() => onDelete(identifier)} className="gap-2">
                    <Trash2 className="w-3 h-3" />
                    Delete
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}

// Form Content Component (for Dialog)
function FormContent({ type, data, onSubmit, loading }: any) {
  const [formData, setFormData] = useState<any>(data || {});

  useEffect(() => {
    if (data) {
      setFormData(data);
    } else {
      // Reset to defaults
      const defaults: any = {
        projects: {
          id: "",
          type: "Personal",
          companyName: "",
          category: [],
          shortDescription: "",
          websiteLink: "",
          githubLink: "",
          techStack: [],
          startDate: "",
          endDate: "",
          companyLogoImg: "",
          descriptionDetails: { paragraphs: [], bullets: [] },
          pagesInfoArr: [],
        },
        experience: {
          id: "",
          position: "",
          company: "",
          location: "",
          startDate: "",
          endDate: "",
          description: [],
          achievements: [],
          skills: [],
          companyUrl: "",
          logo: "",
          experienceLetterUrl: "",
        },
        skills: {
          name: "",
          description: "",
          rating: 5,
          iconKey: "",
          category: "Core Stack",
        },
        contributions: {
          repo: "",
          contibutionDescription: "",
          repoOwner: "",
          link: "",
          techStack: [],
        },
        socials: {
          name: "",
          username: "",
          icon: "Icons.gitHub",
          link: "",
        },
      };
      setFormData(defaults[type] || {});
    }
  }, [data, type]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const renderFormFields = () => {
    switch (type) {
      case "projects":
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium mb-2 block">ID</label>
                <Input value={formData.id || ""} onChange={(e) => setFormData({ ...formData, id: e.target.value })} required />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Type</label>
                <select
                  value={formData.type || "Personal"}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                  className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm"
                >
                  <option value="Personal">Personal</option>
                  <option value="Professional">Professional</option>
                </select>
              </div>
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Company Name</label>
              <Input
                value={formData.companyName || ""}
                onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                required
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Categories (comma separated)</label>
              <Input
                value={(formData.category || []).join(", ")}
                onChange={(e) => setFormData({ ...formData, category: e.target.value.split(",").map((s: string) => s.trim()) })}
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Short Description</label>
              <Textarea
                value={formData.shortDescription || ""}
                onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
                rows={3}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Website Link</label>
                <Input value={formData.websiteLink || ""} onChange={(e) => setFormData({ ...formData, websiteLink: e.target.value })} />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">GitHub Link</label>
                <Input value={formData.githubLink || ""} onChange={(e) => setFormData({ ...formData, githubLink: e.target.value })} />
              </div>
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Tech Stack (comma separated)</label>
              <Input
                value={(formData.techStack || []).join(", ")}
                onChange={(e) => setFormData({ ...formData, techStack: e.target.value.split(",").map((s: string) => s.trim()) })}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Start Date</label>
                <Input
                  type="date"
                  value={formData.startDate || ""}
                  onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">End Date</label>
                <Input
                  type="date"
                  value={formData.endDate || ""}
                  onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                />
              </div>
            </div>
            <ImageUpload
              value={formData.companyLogoImg || ""}
              onChange={(url) => setFormData({ ...formData, companyLogoImg: url })}
              folder="Root/projects"
              label="Logo Image"
            />
            <div>
              <label className="text-sm font-medium mb-2 block">Description Paragraphs (one per line)</label>
              <Textarea
                value={(formData.descriptionDetails?.paragraphs || []).join("\n")}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    descriptionDetails: {
                      ...formData.descriptionDetails,
                      paragraphs: e.target.value.split("\n").filter((l: string) => l.trim()),
                    },
                  })
                }
                rows={4}
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Bullet Points (one per line)</label>
              <Textarea
                value={(formData.descriptionDetails?.bullets || []).join("\n")}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    descriptionDetails: {
                      ...formData.descriptionDetails,
                      bullets: e.target.value.split("\n").filter((l: string) => l.trim()),
                    },
                  })
                }
                rows={4}
              />
            </div>
          </div>
        );
      case "experience":
        return (
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">ID</label>
              <Input value={formData.id || ""} onChange={(e) => setFormData({ ...formData, id: e.target.value })} required />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Position</label>
                <Input value={formData.position || ""} onChange={(e) => setFormData({ ...formData, position: e.target.value })} required />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Company</label>
                <Input value={formData.company || ""} onChange={(e) => setFormData({ ...formData, company: e.target.value })} required />
              </div>
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Location</label>
              <Input value={formData.location || ""} onChange={(e) => setFormData({ ...formData, location: e.target.value })} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Start Date</label>
                <Input
                  type="date"
                  value={formData.startDate || ""}
                  onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">End Date (or &apos;Present&apos;)</label>
                <Input value={formData.endDate || ""} onChange={(e) => setFormData({ ...formData, endDate: e.target.value })} />
              </div>
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Description (one per line)</label>
              <Textarea
                value={(formData.description || []).join("\n")}
                onChange={(e) => setFormData({ ...formData, description: e.target.value.split("\n").filter((l: string) => l.trim()) })}
                rows={4}
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Achievements (one per line)</label>
              <Textarea
                value={(formData.achievements || []).join("\n")}
                onChange={(e) => setFormData({ ...formData, achievements: e.target.value.split("\n").filter((l: string) => l.trim()) })}
                rows={4}
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Skills (comma separated)</label>
              <Input
                value={(formData.skills || []).join(", ")}
                onChange={(e) => setFormData({ ...formData, skills: e.target.value.split(",").map((s: string) => s.trim()) })}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Company URL</label>
                <Input value={formData.companyUrl || ""} onChange={(e) => setFormData({ ...formData, companyUrl: e.target.value })} />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Experience Letter URL</label>
                <Input
                  value={formData.experienceLetterUrl || ""}
                  onChange={(e) => setFormData({ ...formData, experienceLetterUrl: e.target.value })}
                />
              </div>
            </div>
            <ImageUpload
              value={formData.logo || ""}
              onChange={(url) => setFormData({ ...formData, logo: url })}
              folder="Root/experience"
              label="Company Logo"
            />
          </div>
        );
      case "skills":
        return (
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Name</label>
              <Input value={formData.name || ""} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required />
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Description</label>
              <Textarea value={formData.description || ""} onChange={(e) => setFormData({ ...formData, description: e.target.value })} required rows={3} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Rating (1-5)</label>
                <Input
                  type="number"
                  min="1"
                  max="5"
                  value={formData.rating || 5}
                  onChange={(e) => setFormData({ ...formData, rating: parseInt(e.target.value) })}
                  required
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Category</label>
                <select
                  value={formData.category || "Core Stack"}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm"
                >
                  <option value="Core Stack">Core Stack</option>
                  <option value="DevOps & Productivity Tools">DevOps & Productivity Tools</option>
                  <option value="Professional Skills">Professional Skills</option>
                </select>
              </div>
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Icon Key</label>
              <Input value={formData.iconKey || ""} onChange={(e) => setFormData({ ...formData, iconKey: e.target.value })} />
            </div>
          </div>
        );
      case "contributions":
        return (
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Repository</label>
              <Input value={formData.repo || ""} onChange={(e) => setFormData({ ...formData, repo: e.target.value })} required />
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Description</label>
              <Textarea
                value={formData.contibutionDescription || ""}
                onChange={(e) => setFormData({ ...formData, contibutionDescription: e.target.value })}
                required
                rows={4}
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Repository Owner</label>
              <Input value={formData.repoOwner || ""} onChange={(e) => setFormData({ ...formData, repoOwner: e.target.value })} required />
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Link</label>
              <Input value={formData.link || ""} onChange={(e) => setFormData({ ...formData, link: e.target.value })} required />
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Tech Stack (comma separated)</label>
              <Input
                value={(formData.techStack || []).join(", ")}
                onChange={(e) => setFormData({ ...formData, techStack: e.target.value.split(",").map((s: string) => s.trim()) })}
              />
            </div>
          </div>
        );
      case "socials":
        return (
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Name</label>
              <Input value={formData.name || ""} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required />
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Username</label>
              <Input value={formData.username || ""} onChange={(e) => setFormData({ ...formData, username: e.target.value })} required />
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Icon (e.g., Icons.gitHub)</label>
              <Input value={formData.icon || "Icons.gitHub"} onChange={(e) => setFormData({ ...formData, icon: e.target.value })} />
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Link</label>
              <Input value={formData.link || ""} onChange={(e) => setFormData({ ...formData, link: e.target.value })} required />
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {renderFormFields()}
      <div className="flex justify-end gap-3 pt-4 border-t">
        <Button type="submit" disabled={loading}>
          {loading ? "Saving..." : data ? "Update" : "Add"}
        </Button>
      </div>
    </form>
  );
}

// Site Form Component
function SiteForm({ data, onSubmit }: any) {
  const [formData, setFormData] = useState<any>(data || {});

  useEffect(() => {
    if (data) {
      setFormData(data);
    }
  }, [data]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  if (!data) return <div className="text-center py-12 text-muted-foreground">Loading...</div>;

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium mb-2 block">Site Name</label>
          <Input value={formData.name || ""} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
        </div>
        <div>
          <label className="text-sm font-medium mb-2 block">Author Name</label>
          <Input value={formData.authorName || ""} onChange={(e) => setFormData({ ...formData, authorName: e.target.value })} />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium mb-2 block">Username</label>
          <Input value={formData.username || ""} onChange={(e) => setFormData({ ...formData, username: e.target.value })} />
        </div>
        <div>
          <label className="text-sm font-medium mb-2 block">Site URL</label>
          <Input value={formData.url || ""} onChange={(e) => setFormData({ ...formData, url: e.target.value })} />
        </div>
      </div>
      <div>
        <label className="text-sm font-medium mb-2 block">Description</label>
        <Textarea value={formData.description || ""} onChange={(e) => setFormData({ ...formData, description: e.target.value })} rows={4} />
      </div>
      <div className="grid grid-cols-3 gap-4">
        <div>
          <label className="text-sm font-medium mb-2 block">Twitter Link</label>
          <Input
            value={formData.links?.twitter || ""}
            onChange={(e) => setFormData({ ...formData, links: { ...formData.links, twitter: e.target.value } })}
          />
        </div>
        <div>
          <label className="text-sm font-medium mb-2 block">GitHub Link</label>
          <Input
            value={formData.links?.github || ""}
            onChange={(e) => setFormData({ ...formData, links: { ...formData.links, github: e.target.value } })}
          />
        </div>
        <div>
          <label className="text-sm font-medium mb-2 block">LinkedIn Link</label>
          <Input
            value={formData.links?.linkedin || ""}
            onChange={(e) => setFormData({ ...formData, links: { ...formData.links, linkedin: e.target.value } })}
          />
        </div>
      </div>
      <div className="grid grid-cols-3 gap-4">
        <div>
          <label className="text-sm font-medium mb-2 block">OG Image</label>
          <Input value={formData.ogImage || ""} onChange={(e) => setFormData({ ...formData, ogImage: e.target.value })} />
        </div>
        <div>
          <label className="text-sm font-medium mb-2 block">Icon ICO</label>
          <Input value={formData.iconIco || ""} onChange={(e) => setFormData({ ...formData, iconIco: e.target.value })} />
        </div>
        <div>
          <label className="text-sm font-medium mb-2 block">Logo Icon</label>
          <Input value={formData.logoIcon || ""} onChange={(e) => setFormData({ ...formData, logoIcon: e.target.value })} />
        </div>
      </div>
      <div>
        <label className="text-sm font-medium mb-2 block">Keywords (comma separated)</label>
        <Input
          value={(formData.keywords || []).join(", ")}
          onChange={(e) => setFormData({ ...formData, keywords: e.target.value.split(",").map((s: string) => s.trim()) })}
        />
      </div>
      <div className="flex justify-end pt-4 border-t">
        <Button type="submit">Update Site Config</Button>
      </div>
    </form>
  );
}
