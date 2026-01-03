import { 
  HelpCircle, 
  BookOpen, 
  Home, 
  Building2, 
  ChevronDown 
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const quickGuides = [
  {
    icon: BookOpen,
    title: "Getting Started with STYLARCH",
    content: `
1. **Create an Account**: Sign up to save your projects and access all features.
2. **Choose Your Path**: Select Residential Design, Commercial Design, or Interpretation.
3. **Fill in Requirements**: Use our intuitive forms to specify your project needs.
4. **Generate**: Let our AI create professional floor plans in seconds.
5. **Refine & Save**: Download your designs or save them to your project library.
    `,
  },
  {
    icon: Home,
    title: "Residential Design Best Practices",
    content: `
- **Start with flow**: Think about how people will move through the space.
- **Consider natural light**: Position living areas to maximize sunlight.
- **Private vs Public**: Separate bedrooms from common areas effectively.
- **Future-proof**: Consider accessibility and potential family growth.
- **Storage matters**: Include adequate closet and storage space in your plans.
    `,
  },
  {
    icon: Building2,
    title: "Commercial Space Planning",
    content: `
- **Zoning**: Understand local regulations and requirements.
- **Traffic flow**: Design for customer and employee movement.
- **Accessibility**: Ensure ADA compliance for all public spaces.
- **Flexibility**: Create adaptable spaces for future changes.
- **Safety**: Include proper emergency exits and fire safety considerations.
    `,
  },
];

const faqs = [
  {
    question: "How do I save my designs?",
    answer: "Click the 'Save' button on any generated design to add it to your project library. You'll need to be signed in to save designs. Once saved, you can access them anytime from the Projects page.",
  },
  {
    question: "Can I modify auto-generated layouts?",
    answer: "Yes! After generating a floor plan, you can refine it by adjusting your specifications and regenerating. Future updates will include direct editing tools for fine-tuning layouts.",
  },
  {
    question: "What's the difference between residential and commercial modes?",
    answer: "Residential mode is optimized for homes and apartments with features like bedrooms, kitchens, and living spaces. Commercial mode focuses on business needs like office layouts, retail spaces, and industrial configurations with different specification options.",
  },
  {
    question: "How accurate are the measurements?",
    answer: "The AI generates proportional floor plans based on your specifications. While they provide excellent conceptual layouts, we recommend working with a licensed architect for precise construction measurements.",
  },
  {
    question: "Can I use the generated floor plans for construction?",
    answer: "Our floor plans are designed for conceptual planning and visualization. For actual construction, please consult with a licensed architect who can create detailed technical drawings that meet local building codes.",
  },
  {
    question: "What image formats can I upload for interpretation?",
    answer: "The Interpret feature accepts common image formats including JPEG, PNG, and WebP. For best results, upload clear, high-resolution images of your floor plans.",
  },
  {
    question: "How many projects can I save?",
    answer: "Free accounts can save up to 5 projects. Premium accounts have unlimited project storage. Check our pricing page for more details on plan features.",
  },
  {
    question: "Can I share my projects with others?",
    answer: "Yes! Each project has a share option that generates a unique link. You can share this link with clients, collaborators, or anyone who needs to view your designs.",
  },
  {
    question: "What AI models power STYLARCH?",
    answer: "We use two specialized models: 'maria26/Floor_Plan_LoRA' for generating floor plans from text descriptions, and 'sabaridsnfuji/FloorPlanVisionAIAdaptor' for analyzing and interpreting existing floor plan images.",
  },
  {
    question: "Is my data secure?",
    answer: "Absolutely. We use industry-standard encryption and secure cloud storage through Supabase. Your designs and personal information are protected and never shared without your permission.",
  },
];

export default function FAQsPage() {
  return (
    <div className="min-h-screen bg-muted/30">
      {/* Header */}
      <section className="bg-primary text-primary-foreground py-12">
        <div className="container mx-auto px-4">
          <h1 className="font-display text-3xl md:text-4xl font-bold mb-4">
            Help & FAQs
          </h1>
          <p className="text-primary-foreground/80 max-w-2xl">
            Find answers to common questions and learn how to get the most out of STYLARCH.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8">
        {/* Quick Guides */}
        <section className="mb-12">
          <h2 className="font-display text-2xl font-bold text-foreground mb-6">
            Quick Guides
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {quickGuides.map((guide) => (
              <Card key={guide.title} className="h-full">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                      <guide.icon className="w-5 h-5 text-accent" />
                    </div>
                    <span className="text-lg">{guide.title}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="prose prose-sm max-w-none text-muted-foreground">
                    <pre className="whitespace-pre-wrap font-sans text-sm bg-transparent p-0 m-0">
                      {guide.content}
                    </pre>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* FAQs */}
        <section>
          <h2 className="font-display text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
            <HelpCircle className="w-6 h-6 text-accent" />
            Frequently Asked Questions
          </h2>
          <Card>
            <CardContent className="p-0">
              <Accordion type="single" collapsible className="w-full">
                {faqs.map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger className="px-6 hover:no-underline hover:bg-muted/50">
                      <span className="text-left font-medium">{faq.question}</span>
                    </AccordionTrigger>
                    <AccordionContent className="px-6 pb-4 text-muted-foreground">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>
        </section>

        {/* Contact Support */}
        <section className="mt-12">
          <Card className="bg-primary text-primary-foreground">
            <CardContent className="p-8 text-center">
              <h3 className="font-display text-xl font-bold mb-2">
                Still have questions?
              </h3>
              <p className="text-primary-foreground/80 mb-4">
                Reach out to our developer for additional support.
              </p>
              <a
                href="https://x.com/biz_kot"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-accent hover:underline"
              >
                Contact @biz_kot on X
              </a>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
}
