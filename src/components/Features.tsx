import { Code, Layout, Palette } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const features = [
  {
    title: "Modern Design",
    description: "Clean and minimalist design with attention to detail",
    icon: Palette,
  },
  {
    title: "Responsive Layout",
    description: "Looks great on all devices, from mobile to desktop",
    icon: Layout,
  },
  {
    title: "Developer Friendly",
    description: "Built with TypeScript and modern best practices",
    icon: Code,
  },
];

export default function Features() {
  return (
    <div className="py-20 bg-white">
      <div className="container">
        <h2 className="text-3xl font-bold text-center mb-12">Features</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature) => (
            <Card key={feature.title} className="border border-gray-200">
              <CardHeader>
                <feature.icon className="h-10 w-10 text-primary mb-4" />
                <CardTitle>{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}