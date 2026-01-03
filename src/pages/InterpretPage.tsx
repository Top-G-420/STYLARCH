import { useState } from "react";
import { Upload, FileSearch, Download, Save, Loader2, X, Image as ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { toast } from "sonner";

export default function InterpretPage() {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<string | null>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUploadedImage(e.target?.result as string);
        setAnalysisResult(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        setUploadedImage(ev.target?.result as string);
        setAnalysisResult(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAnalyze = async () => {
    if (!uploadedImage) return;
    
    setIsAnalyzing(true);
    toast.info("Analyzing floor plan...", {
      description: "Our AI is examining your design.",
    });

    // Simulate analysis - in real implementation, call HuggingFace API
    setTimeout(() => {
      setAnalysisResult(`
## Floor Plan Analysis Report

### Overview
This floor plan represents a **modern residential layout** with an estimated area of approximately **1,800 sq ft**.

### Room Identification
- **Living Room**: Large open-concept space (~400 sq ft)
- **Kitchen**: Modern layout with island (~200 sq ft)
- **Master Bedroom**: Primary suite with en-suite bathroom (~300 sq ft)
- **Bedroom 2**: Secondary bedroom (~180 sq ft)
- **Bedroom 3**: Third bedroom/office space (~150 sq ft)
- **Bathrooms**: 2 full bathrooms, 1 half bath
- **Garage**: 2-car attached garage

### Design Characteristics
- **Style**: Contemporary with open-concept living
- **Flow**: Excellent traffic flow between common areas
- **Natural Light**: Large windows facing south for optimal lighting
- **Privacy**: Good separation between public and private spaces

### Recommendations
1. Consider adding a mudroom between garage and kitchen
2. Master closet could be expanded for additional storage
3. Kitchen island placement allows for good workflow

### Measurements (Approximate)
- Total Living Area: 1,800 sq ft
- Garage: 400 sq ft
- Outdoor covered area: 200 sq ft
      `);
      setIsAnalyzing(false);
      toast.success("Analysis complete!", {
        description: "Your floor plan has been analyzed.",
      });
    }, 3000);
  };

  const handleClear = () => {
    setUploadedImage(null);
    setAnalysisResult(null);
  };

  const handleDownloadReport = () => {
    if (!analysisResult) return;
    
    const blob = new Blob([analysisResult], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "floor-plan-analysis.md";
    a.click();
    URL.revokeObjectURL(url);
    toast.success("Report downloaded!");
  };

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Header */}
      <section className="bg-primary text-primary-foreground py-12">
        <div className="container mx-auto px-4">
          <h1 className="font-display text-3xl md:text-4xl font-bold mb-4">
            Interpret Floor Plans
          </h1>
          <p className="text-primary-foreground/80 max-w-3xl">
            Powered by <code className="bg-primary-foreground/10 px-2 py-0.5 rounded">sabaridsnfuji/FloorPlanVisionAIAdaptor</code>, 
            a state-of-the-art Vision-Language Model designed for analyzing floor plan images. 
            Upload your floor plans to get detailed insights, room identification, and design recommendations.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8">
        {/* Model Features */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[
            { title: "Multi-Modal Input", desc: "Accepts images and text for comprehensive analysis" },
            { title: "Architect Expertise", desc: "Simulates professional architectural insights" },
            { title: "Memory Efficient", desc: "Uses gradient checkpointing for optimization" },
            { title: "Flexible Precision", desc: "Supports various precision modes" },
          ].map((feature) => (
            <Card key={feature.title} className="bg-card">
              <CardContent className="p-4">
                <h3 className="font-semibold text-foreground mb-1">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Upload Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Upload className="w-5 h-5 text-accent" />
                Upload Floor Plan
              </CardTitle>
              <CardDescription>
                Drag and drop or click to upload an image
              </CardDescription>
            </CardHeader>
            <CardContent>
              {!uploadedImage ? (
                <label
                  onDrop={handleDrop}
                  onDragOver={(e) => e.preventDefault()}
                  className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed border-border rounded-xl cursor-pointer hover:border-accent transition-colors bg-muted/50"
                >
                  <ImageIcon className="w-12 h-12 text-muted-foreground mb-4" />
                  <p className="text-muted-foreground mb-2">
                    Drop your floor plan image here
                  </p>
                  <p className="text-sm text-muted-foreground">
                    or click to browse
                  </p>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </label>
              ) : (
                <div className="relative">
                  <img
                    src={uploadedImage}
                    alt="Uploaded floor plan"
                    className="w-full rounded-lg border"
                  />
                  <Button
                    variant="destructive"
                    size="icon"
                    className="absolute top-2 right-2"
                    onClick={handleClear}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              )}

              <Button
                variant="hero"
                size="lg"
                className="w-full mt-4"
                onClick={handleAnalyze}
                disabled={!uploadedImage || isAnalyzing}
              >
                {isAnalyzing ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <FileSearch className="w-5 h-5" />
                    Analyze Floor Plan
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

          {/* Results Section */}
          <Card>
            <CardHeader>
              <CardTitle>Analysis Results</CardTitle>
              <CardDescription>
                AI-generated insights about your floor plan
              </CardDescription>
            </CardHeader>
            <CardContent>
              {analysisResult ? (
                <div className="space-y-4">
                  <div className="prose prose-sm max-w-none bg-muted/50 p-4 rounded-lg max-h-96 overflow-y-auto">
                    <pre className="whitespace-pre-wrap text-sm text-foreground font-sans">
                      {analysisResult}
                    </pre>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" className="flex-1" onClick={handleDownloadReport}>
                      <Download className="w-4 h-4 mr-2" />
                      Download Report
                    </Button>
                    <Button variant="default" className="flex-1">
                      <Save className="w-4 h-4 mr-2" />
                      Save to Project
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-64 text-muted-foreground">
                  <FileSearch className="w-12 h-12 mb-4" />
                  <p>Upload and analyze a floor plan to see results</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Applications */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Applications</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { title: "Real Estate", desc: "Automated floor plan analysis for property listings" },
                { title: "Architecture", desc: "Assist architects in creating and verifying designs" },
                { title: "Interior Design", desc: "Generate insights for interior planning" },
                { title: "Education", desc: "Learning tool for architecture students" },
              ].map((app) => (
                <div key={app.title} className="p-4 bg-muted/50 rounded-lg">
                  <h4 className="font-semibold text-foreground mb-1">{app.title}</h4>
                  <p className="text-sm text-muted-foreground">{app.desc}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
