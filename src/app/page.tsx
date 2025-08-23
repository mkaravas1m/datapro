import { Button } from "@/components/ui/button";
import { ArrowRight, Zap, BookOpen, Settings2, Share2, Star, CheckCircle } from "lucide-react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const FeatureCard = ({ icon, title, description }: { icon: React.ElementType, title: string, description: string }) => {
  const Icon = icon;
  return (
    <Card className="bg-secondary/50 border-white/10">
      <CardHeader className="flex flex-row items-center gap-4">
        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary">
          <Icon className="w-6 h-6" />
        </div>
        <CardTitle className="text-xl">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );
};

const HowItWorksStep = ({ step, title, description }: { step: string, title: string, description: string }) => (
  <div className="flex items-start space-x-4">
    <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary text-primary-foreground font-bold text-xl flex-shrink-0">
      {step}
    </div>
    <div>
      <h3 className="text-xl font-semibold">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  </div>
);

const TestimonialCard = ({ name, role, avatar, text }: { name: string, role: string, avatar: string, text: string }) => (
  <Card className="bg-secondary/50 border-white/10 h-full flex flex-col">
    <CardContent className="p-6 flex-grow flex flex-col">
        <div className="flex-grow">
          <div className="flex items-center mb-2">
            {[...Array(5)].map((_, i) => <Star key={i} className="h-5 w-5 text-accent fill-accent" />)}
          </div>
          <p className="text-muted-foreground italic">"{text}"</p>
        </div>
        <div className="flex items-center mt-6">
          <Avatar>
            <AvatarImage src={avatar} alt={name} data-ai-hint="person" />
            <AvatarFallback>{name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="ml-4">
            <p className="font-semibold">{name}</p>
            <p className="text-sm text-muted-foreground">{role}</p>
          </div>
        </div>
    </CardContent>
  </Card>
);

const PricingCard = ({ title, price, features, popular, description }: { title: string, price: string, features: string[], popular?: boolean, description: string }) => (
  <Card className={`relative flex flex-col ${popular ? 'border-primary ring-2 ring-primary' : 'bg-secondary/50 border-white/10'}`}>
     {popular && <div className="absolute top-0 -translate-y-1/2 left-1/2 -translate-x-1/2 px-3 py-1 text-sm font-semibold text-primary-foreground bg-primary rounded-full">Most Popular</div>}
    <CardHeader>
      <CardTitle>{title}</CardTitle>
      <div className="text-4xl font-bold">{price}<span className="text-lg font-normal text-muted-foreground">/month</span></div>
      <CardDescription>{description}</CardDescription>
    </CardHeader>
    <CardContent className="flex-grow space-y-4">
      <ul className="space-y-2">
        {features.map((feature, i) => (
          <li key={i} className="flex items-center gap-2">
            <CheckCircle className="h-4 w-4 text-green-500" />
            <span className="text-muted-foreground">{feature}</span>
          </li>
        ))}
      </ul>
    </CardContent>
    <CardFooter className="mt-auto">
      <Button className="w-full" variant={popular ? 'default' : 'outline'}>Get Started</Button>
    </CardFooter>
  </Card>
);

export default function Home() {
  return (
    <div className="w-full">
      <div className="absolute inset-0 -z-10 h-full w-full bg-background bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"></div>
      <div className="absolute top-0 left-0 -z-10 h-96 w-96 glow-effect"></div>
      <div className="absolute bottom-0 right-0 -z-10 h-96 w-96 glow-effect"></div>
      
      <section className="py-20 md:py-32 text-center animate-fade-in">
        <div className="container">
          <h1 className="text-4xl font-black tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
            Create captivating stories in seconds with AI
          </h1>
          <p className="max-w-3xl mx-auto mt-6 text-lg text-muted-foreground md:text-xl">
            Our advanced AI-powered story generator helps you craft unique and engaging narratives for any genre. Whether you're a writer, marketer, or educator, unlock your creativity and bring your ideas to life.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
            <Button size="lg" asChild>
              <Link href="#">Get Started for Free <ArrowRight className="ml-2" /></Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="#">Watch Demo</Link>
            </Button>
          </div>
        </div>
      </section>

      <section id="features" className="py-12 md:py-24 bg-secondary/30 animate-fade-in [animation-delay:200ms]">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Features</h2>
            <p className="max-w-2xl mx-auto mt-3 text-muted-foreground">
              Everything you need to supercharge your storytelling.
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <FeatureCard icon={Zap} title="AI-Powered Creativity" description="Generate unique story ideas, characters, and plot twists with our advanced AI." />
            <FeatureCard icon={BookOpen} title="Multiple Genres" description="From fantasy and sci-fi to mystery and romance, we've got you covered." />
            <FeatureCard icon={Settings2} title="Customizable Output" description="Control the tone, style, and length of your stories to match your vision." />
            <FeatureCard icon={Share2} title="Export & Share" description="Easily export your stories in various formats or share them with your audience." />
          </div>
        </div>
      </section>

      <section className="py-12 md:py-24 animate-fade-in [animation-delay:400ms]">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">How It Works</h2>
              <p className="mt-3 text-muted-foreground text-lg">A simple, intuitive process to bring your stories to life.</p>
              <div className="mt-8 space-y-8">
                <HowItWorksStep step="1" title="Enter Your Prompt" description="Provide a simple idea, a few keywords, or a detailed outline to get started." />
                <HowItWorksStep step="2" title="Customize Settings" description="Choose the genre, tone, length, and other parameters to guide the AI." />
                <HowItWorksStep step="3" title="Generate Story" description="Let our AI work its magic and create a unique story based on your input." />
                <HowItWorksStep step="4" title="Edit & Export" description="Refine the generated story with our built-in editor and export it in your desired format." />
              </div>
            </div>
            <div>
              <img src="https://placehold.co/600x600.png" alt="How it works illustration" data-ai-hint="workflow diagram" className="rounded-lg shadow-2xl" />
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-24 bg-secondary/30 animate-fade-in [animation-delay:600ms]">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">What Our Users Say</h2>
          </div>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <TestimonialCard name="Alex Johnson" role="Novelist" avatar="https://placehold.co/100x100.png" text="This tool is a game-changer for writer's block. I've generated some of my most creative ideas using this platform." />
            <TestimonialCard name="Samantha Lee" role="Marketing Manager" avatar="https://placehold.co/100x100.png" text="We use the AI Story Generator for our social media campaigns. The engagement has been incredible. Highly recommended!" />
            <TestimonialCard name="David Chen" role="Teacher" avatar="https://placehold.co/100x100.png" text="My students love creating stories with this tool. It's a fantastic way to get them excited about creative writing." />
          </div>
        </div>
      </section>
      
      <section id="pricing" className="py-12 md:py-24 animate-fade-in [animation-delay:800ms]">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Pricing</h2>
            <p className="max-w-2xl mx-auto mt-3 text-muted-foreground">Choose a plan that's right for you.</p>
          </div>
          <div className="grid gap-8 md:grid-cols-3 items-stretch">
            <PricingCard title="Starter" price="$9" description="For individuals and hobbyists." features={["10,000 words/month", "Basic genre selection", "Standard support"]} />
            <PricingCard title="Pro" price="$29" description="For professional writers and creators." features={["50,000 words/month", "All genres", "Advanced customization", "Priority support"]} popular />
            <PricingCard title="Team" price="$79" description="For businesses and collaborators." features={["200,000 words/month", "Collaborative features", "API access", "Dedicated support"]} />
          </div>
        </div>
      </section>

      <section id="faq" className="py-12 md:py-24 bg-secondary/30 animate-fade-in [animation-delay:1000ms]">
        <div className="container max-w-3xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Frequently Asked Questions</h2>
          </div>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>Is there a free trial?</AccordionTrigger>
              <AccordionContent>
                Yes, we offer a free plan with limited features so you can try out our AI Story Generator before committing.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>What genres can I write in?</AccordionTrigger>
              <AccordionContent>
                Our AI supports a wide range of genres, including fantasy, science fiction, mystery, romance, horror, and more.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>Can I use the generated stories commercially?</AccordionTrigger>
              <AccordionContent>
                Yes, with any of our paid plans, you have full commercial rights to the stories you create.
              </AccordionContent>
            </AccordionItem>
             <AccordionItem value="item-4">
              <AccordionTrigger>How do I cancel my subscription?</AccordionTrigger>
              <AccordionContent>
                You can cancel your subscription at any time from your account dashboard. No questions asked.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

       <section className="py-12 md:py-24 animate-fade-in [animation-delay:1200ms]">
        <div className="container text-center">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Get started today.</h2>
          <p className="max-w-xl mx-auto mt-3 text-lg text-muted-foreground">
            Unlock your creative potential and start writing amazing stories with the power of AI.
          </p>
          <div className="mt-8">
            <Button size="lg" asChild>
              <Link href="#">Sign Up Now <ArrowRight className="ml-2" /></Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
