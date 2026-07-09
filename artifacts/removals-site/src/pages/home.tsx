import { PublicLayout } from "@/components/layout/PublicLayout";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { CheckCircle2, Package, Truck, ShieldCheck, Clock, Quote, ArrowRight, Star } from "lucide-react";

export default function Home() {
  return (
    <PublicLayout>
      {/* Hero Section */}
      <section className="relative w-full min-h-[85vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 bg-black/60 z-10" />
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url('/hero-van.jpg')` }}
        />
        
        <div className="container relative z-20 mx-auto px-4 md:px-8 mt-16 md:mt-0">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-sm font-medium mb-6 animate-in slide-in-from-bottom-4 duration-500 fill-mode-both">
              <Star className="w-4 h-4 fill-accent text-accent" />
              <span>Top Rated Local Removals</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tight leading-[1.1] mb-6 animate-in slide-in-from-bottom-6 duration-700 delay-100 fill-mode-both">
              Stress-Free Moving, <br/><span className="text-accent">Delivered With Care.</span>
            </h1>
            <p className="text-lg md:text-xl text-white/80 mb-10 max-w-2xl leading-relaxed animate-in slide-in-from-bottom-8 duration-700 delay-200 fill-mode-both">
              Premium house removals and clearance services for working families. We handle your belongings with the same care and respect as if they were our own. Fully insured, professional, and reliable.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 animate-in slide-in-from-bottom-8 duration-700 delay-300 fill-mode-both">
              <Button asChild size="xl" className="h-14 px-8 text-lg rounded-full shadow-lg">
                <Link href="/quote">Get a Free Quote <ArrowRight className="ml-2 w-5 h-5" /></Link>
              </Button>
              <Button asChild variant="outline" size="xl" className="h-14 px-8 text-lg rounded-full bg-white/10 text-white border-white/30 hover:bg-white/20 hover:text-white backdrop-blur-sm">
                <Link href="/services">Our Services</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Bar */}
      <section className="bg-primary py-8 text-white">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 divide-x divide-white/10">
            <div className="flex flex-col items-center justify-center text-center px-4">
              <ShieldCheck className="w-8 h-8 text-accent mb-3" />
              <h3 className="font-semibold mb-1">Fully Insured</h3>
              <p className="text-sm text-white/70">Comprehensive coverage</p>
            </div>
            <div className="flex flex-col items-center justify-center text-center px-4">
              <Clock className="w-8 h-8 text-accent mb-3" />
              <h3 className="font-semibold mb-1">Always on Time</h3>
              <p className="text-sm text-white/70">Reliable scheduling</p>
            </div>
            <div className="flex flex-col items-center justify-center text-center px-4">
              <Truck className="w-8 h-8 text-accent mb-3" />
              <h3 className="font-semibold mb-1">Modern Fleet</h3>
              <p className="text-sm text-white/70">Clean, secure vehicles</p>
            </div>
            <div className="flex flex-col items-center justify-center text-center px-4">
              <CheckCircle2 className="w-8 h-8 text-accent mb-3" />
              <h3 className="font-semibold mb-1">Expert Team</h3>
              <p className="text-sm text-white/70">Trained professionals</p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-4 md:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-primary mb-4">Our Services</h2>
            <p className="text-lg text-muted-foreground">Comprehensive moving and clearance solutions tailored to your specific needs.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: "House Removals", desc: "Full home moves, expertly planned and executed.", icon: Truck },
              { title: "Furniture Moving", desc: "Specialist care for heavy, bulky, or fragile items.", icon: Package },
              { title: "House Clearances", desc: "Respectful and efficient complete property clearances.", icon: CheckCircle2 },
              { title: "Packing Services", desc: "Professional packing to keep your items perfectly safe.", icon: Package },
              { title: "Commercial Moves", desc: "Office relocations with minimal business downtime.", icon: Truck },
              { title: "Man & Van", desc: "Flexible, cost-effective service for smaller moves.", icon: Clock },
            ].map((service, i) => (
              <div key={i} className="bg-white p-8 rounded-2xl shadow-sm border border-border/50 hover:shadow-md transition-shadow group">
                <div className="w-14 h-14 bg-primary/5 rounded-xl flex items-center justify-center mb-6 group-hover:bg-primary transition-colors">
                  <service.icon className="w-7 h-7 text-primary group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-primary">{service.title}</h3>
                <p className="text-muted-foreground mb-6 leading-relaxed">{service.desc}</p>
                <Link href="/services" className="inline-flex items-center text-accent font-semibold hover:text-primary transition-colors">
                  Learn more <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex items-center gap-4 mb-16 justify-center">
            <Quote className="w-12 h-12 text-accent/20 rotate-180" />
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-primary">What Our Customers Say</h2>
            <Quote className="w-12 h-12 text-accent/20" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: "Sarah Jenkins", loc: "Moved to Surrey", text: "Absolutely incredible service. They arrived exactly on time, were so polite, and handled our antique furniture with immense care. Took all the stress out of our moving day." },
              { name: "Mark Thompson", loc: "Local Move", text: "I can't recommend them highly enough. Fast, efficient, and they clearly know exactly what they're doing. The packing service was worth every penny." },
              { name: "The Davies Family", loc: "House Clearance", text: "Very sensitive and professional during a difficult house clearance for my late mother's property. They worked quickly and left the house spotless." }
            ].map((review, i) => (
              <div key={i} className="p-8 bg-gray-50 rounded-2xl">
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, j) => <Star key={j} className="w-5 h-5 fill-accent text-accent" />)}
                </div>
                <p className="text-lg text-foreground/80 italic mb-6 leading-relaxed">"{review.text}"</p>
                <div>
                  <p className="font-bold text-primary">{review.name}</p>
                  <p className="text-sm text-muted-foreground">{review.loc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-primary relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-accent/20 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3" />
        <div className="container mx-auto px-4 md:px-8 relative z-10 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">Ready for a smooth move?</h2>
          <p className="text-xl text-white/80 mb-10 max-w-2xl mx-auto">
            Get a free, no-obligation quote today. We'll assess your needs and provide a clear, competitive price.
          </p>
          <Button asChild size="xl" className="h-16 px-10 text-lg rounded-full bg-white text-primary hover:bg-gray-100 shadow-xl">
            <Link href="/quote">Request Your Free Quote</Link>
          </Button>
        </div>
      </section>
    </PublicLayout>
  );
}