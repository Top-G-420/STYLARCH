import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import {
  Wand2,
  Download,
  Save,
  Info,
  Loader2,
  Plus,
  Minus
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { toast } from "sonner";

const projectTypes = [
  { value: "apartment", label: "Apartment" },
  { value: "single-family", label: "Single-Family House" },
  { value: "townhouse", label: "Townhouse" },
  { value: "villa", label: "Villa" },
  { value: "bungalow", label: "Bungalow" },
  { value: "other", label: "Other" },
];

const overallSizes = [
  { value: "small", label: "Small (<1000 sq ft)" },
  { value: "medium", label: "Medium (1000–2000 sq ft)" },
  { value: "large", label: "Large (>2000 sq ft)" },
];

const additionalFeatures = [
  "Garage",
  "Balcony/Terrace",
  "Home Office",
  "Laundry Room",
  "Open Concept Living",
  "Basement",
  "Pool/Outdoor Area",
  "Walk-in Closet",
  "Pantry",
  "Mudroom",
];

export default function DesignPage() {
  const [searchParams] = useSearchParams();
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImages, setGeneratedImages] = useState<string[]>([]);
 
  // Form state
  const [projectName, setProjectName] = useState("");
  const [projectType, setProjectType] = useState("apartment");
  const [overallSize, setOverallSize] = useState("medium");
  const [buildingSize, setBuildingSize] = useState("");
  const [numberOfFloors, setNumberOfFloors] = useState("1");
  const [bedrooms, setBedrooms] = useState([3]);
  const [bathrooms, setBathrooms] = useState("2");
  const [kitchenSize, setKitchenSize] = useState("large");
  const [windows, setWindows] = useState("many");
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);
  const [specialRequirements, setSpecialRequirements] = useState("");
 
  // Get prompt from URL if coming from style selection
  useEffect(() => {
    const promptParam = searchParams.get("prompt");
    if (promptParam) {
      setSpecialRequirements(promptParam);
    }
  }, [searchParams]);
 
  const buildPrompt = () => {
    const parts: string[] = [];
   
    // Base prompt
    parts.push(`A ${overallSize === "small" ? "small" : overallSize === "large" ? "big" : "medium-sized"} ${projectType} floor plan`);
   
    // Rooms
    if (bedrooms[0] <= 3) {
      parts.push("with few rooms");
    } else {
      parts.push("with many rooms");
    }
   
    // Bathrooms
    if (bathrooms === "1") {
      parts.push("one bathroom");
    } else {
      parts.push("multiple bathrooms");
    }
   
    // Kitchen
    parts.push(`${kitchenSize} kitchen`);
   
    // Windows
    parts.push(windows === "many" ? "many windows" : "few windows");
   
    // Features
    if (selectedFeatures.length > 0) {
      parts.push(`with ${selectedFeatures.join(", ").toLowerCase()}`);
    }
   
    // Special requirements
    if (specialRequirements) {
      parts.push(specialRequirements);
    }
   
    return parts.join(", ");
  };
 
  const handleGenerate = async () => {
    const prompt = buildPrompt();

    if (!prompt) {
      toast.error("Please fill in some project details first.");
      return;
    }

    setIsGenerating(true);
    toast.info("Generating floor plan...", {
      description: "This may take a moment.",
    });

    try {
      const res = await fetch("https://yogeshdandawate-maria26-floor-plan-lora.hf.space/api/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ data: [prompt] }),
      });

      if (!res.ok) {
        throw new Error(`API error: ${res.status}`);
      }

      const data = await res.json();

      // Gradio typically returns the image as a data URI in data.data[0]
      if (data.data && data.data[0]) {
        const imgSrc = data.data[0];
        setGeneratedImages([imgSrc]);
        toast.success("Floor plan generated!", {
          description: "Your design is ready to view.",
        });
      } else {
        throw new Error("No image returned from the model");
      }
    } catch (err: any) {
      console.error(err);
      toast.error("Failed to generate floor plan", {
        description: err?.message || "Something went wrong. Try again later.",
      });
    } finally {
      setIsGenerating(false);
    }
  };
 
  const handleFeatureToggle = (feature: string) => {
    setSelectedFeatures((prev) =>
      prev.includes(feature)
        ? prev.filter((f) => f !== feature)
        : [...prev, feature]
    );
  };
 
  return (
    <div className="min-h-screen bg-muted/30">
      {/* Header */}
      <section className="bg-primary text-primary-foreground py-12">
        <div className="container mx-auto px-4">
          <h1 className="font-display text-3xl md:text-4xl font-bold mb-4">
            Design Your Floor Plan
          </h1>
          <p className="text-primary-foreground/80 max-w-3xl">
            Powered by the <code className="bg-primary-foreground/10 px-2 py-0.5 rounded">maria26/Floor_Plan_LoRA</code> model,
            which generates architectural floor plans from text prompts. This model is part of a Bachelor Thesis from MIT
            exploring diffusion models for generating architectural floor plans from textual descriptions.
          </p>
        </div>
      </section>
      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Form Section */}
          <div className="lg:col-span-2 space-y-6">
            {/* Project Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Info className="w-5 h-5 text-accent" />
                  Project Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="projectName">Project Name</Label>
                    <Input
                      id="projectName"
                      placeholder="My Dream Home"
                      value={projectName}
                      onChange={(e) => setProjectName(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="projectType">Project Type</Label>
                    <Select value={projectType} onValueChange={setProjectType}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {projectTypes.map((type) => (
                          <SelectItem key={type.value} value={type.value}>
                            {type.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>
            {/* Floor Plan Specifications */}
            <Card>
              <CardHeader>
                <CardTitle>Floor Plan Specifications</CardTitle>
                <CardDescription>
                  Configure the size and layout of your floor plan
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Overall Size</Label>
                    <Select value={overallSize} onValueChange={setOverallSize}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {overallSizes.map((size) => (
                          <SelectItem key={size.value} value={size.value}>
                            {size.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="buildingSize">Building Size (sq ft) - Optional</Label>
                    <Input
                      id="buildingSize"
                      type="number"
                      placeholder="1500"
                      value={buildingSize}
                      onChange={(e) => setBuildingSize(e.target.value)}
                    />
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Number of Floors</Label>
                    <Select value={numberOfFloors} onValueChange={setNumberOfFloors}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">1 Floor</SelectItem>
                        <SelectItem value="2">2 Floors</SelectItem>
                        <SelectItem value="3">3+ Floors</SelectItem>
                      </SelectContent>
                    </Select>
                    {parseInt(numberOfFloors) > 1 && (
                      <p className="text-xs text-muted-foreground">
                        Generate separate floor plans for each level
                      </p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label>Number of Bathrooms</Label>
                    <Select value={bathrooms} onValueChange={setBathrooms}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">1 Bathroom</SelectItem>
                        <SelectItem value="2">2 Bathrooms</SelectItem>
                        <SelectItem value="3">3 Bathrooms</SelectItem>
                        <SelectItem value="4">4+ Bathrooms</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-3">
                  <Label>Number of Bedrooms: {bedrooms[0]}</Label>
                  <div className="flex items-center gap-4">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setBedrooms([Math.max(1, bedrooms[0] - 1)])}
                    >
                      <Minus className="w-4 h-4" />
                    </Button>
                    <Slider
                      value={bedrooms}
                      onValueChange={setBedrooms}
                      min={1}
                      max={8}
                      step={1}
                      className="flex-1"
                    />
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setBedrooms([Math.min(8, bedrooms[0] + 1)])}
                    >
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Kitchen Size</Label>
                    <Select value={kitchenSize} onValueChange={setKitchenSize}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="small">Small Kitchen</SelectItem>
                        <SelectItem value="large">Large Kitchen</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Windows / Natural Light</Label>
                    <Select value={windows} onValueChange={setWindows}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="few">Few/Minimal Windows</SelectItem>
                        <SelectItem value="many">Many/Lots of Windows</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>
            {/* Additional Features */}
            <Card>
              <CardHeader>
                <CardTitle>Additional Features & Special Requirements</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label className="mb-3 block">Select Features</Label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {additionalFeatures.map((feature) => (
                      <div key={feature} className="flex items-center gap-2">
                        <Checkbox
                          id={feature}
                          checked={selectedFeatures.includes(feature)}
                          onCheckedChange={() => handleFeatureToggle(feature)}
                        />
                        <Label htmlFor={feature} className="text-sm cursor-pointer">
                          {feature}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="specialRequirements">Special Requirements</Label>
                  <Textarea
                    id="specialRequirements"
                    placeholder="e.g., L-shaped layout, modern style, large living room, eco-friendly features, wheelchair accessible"
                    value={specialRequirements}
                    onChange={(e) => setSpecialRequirements(e.target.value)}
                    rows={4}
                  />
                </div>
              </CardContent>
            </Card>
          </div>
          {/* Preview & Generate Section */}
          <div className="space-y-6">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle>Generate Floor Plan</CardTitle>
                <CardDescription>
                  Review your prompt and generate
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 bg-muted rounded-lg">
                  <Label className="text-xs text-muted-foreground mb-2 block">
                    Generated Prompt
                  </Label>
                  <p className="text-sm">{buildPrompt()}</p>
                </div>
                <Button
                  variant="hero"
                  size="lg"
                  className="w-full"
                  onClick={handleGenerate}
                  disabled={isGenerating}
                >
                  {isGenerating ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Wand2 className="w-5 h-5" />
                      Generate Floor Plan
                    </>
                  )}
                </Button>
                {generatedImages.length > 0 && (
                  <div className="space-y-4">
                    <Label>Generated Designs</Label>
                    {generatedImages.map((img, index) => (
                      <div key={index} className="relative group">
                        <img
                          src={img}
                          alt={`Generated floor plan ${index + 1}`}
                          className="w-full rounded-lg border"
                        />
                        <div className="absolute inset-0 bg-foreground/60 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center gap-2">
                          <Button size="sm" variant="secondary">
                            <Save className="w-4 h-4 mr-1" />
                            Save
                          </Button>
                          <Button size="sm" variant="secondary">
                            <Download className="w-4 h-4 mr-1" />
                            Download
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}