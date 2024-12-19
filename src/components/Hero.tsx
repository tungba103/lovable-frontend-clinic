import { Button } from "@/components/ui/button";

export default function Hero() {
  return (
    <div className="py-20 text-center">
      <h1 className="text-5xl font-bold mb-6 text-foreground">
        Welcome to Your Modern App
      </h1>
      <p className="text-xl mb-8 text-muted-foreground max-w-2xl mx-auto">
        Build something amazing with React and Shadcn UI. This modern template
        gives you everything you need to create beautiful applications.
      </p>
      <Button size="lg" className="bg-primary text-white hover:bg-primary/90">
        Get Started
      </Button>
    </div>
  );
}