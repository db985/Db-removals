import { PublicLayout } from "@/components/layout/PublicLayout";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { CheckCircle2, Package, Truck, ShieldCheck, Clock, Quote, ArrowRight, Star, Recycle, Leaf, Phone } from "lucide-react";

import job1 from "@assets/IMG_4498_1783626376325.jpeg";
import job2 from "@assets/IMG_4499_1783626376325.jpeg";
import job3 from "@assets/IMG_4500_1783626376325.jpeg";
import job4 from "@assets/IMG_4501_1783626376325.jpeg";
import job5 from "@assets/IMG_4502_1783626376325.jpeg";
import job6 from "@assets/IMG_4503_1783626376325.jpeg";

const jobPhotos = [
  { src: job1, caption: "Full House Clearance" },
  { src: job2, caption: "Rubbish Removal" },
  { src: job3, caption: "House Clearance" },
  { src: job4, caption: "Van Loading" },
  { src: job5, caption: "Collection & Delivery" },
  { src: job6, caption: "Clearance Job" },
];

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
              <span>Fully Licensed — Free Quotes — Won't Be Beaten on Price</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tight leading-[1.1] mb-4 animate-in slide-in-from-bottom-6 duration-700 delay-100 fill-mode-both">
              DB &amp; Family<br /><span className="text-accent">Man and a Van</span>
            </h1>
            <p className="text-xl md:text-2xl font-semibold text-white/90 mb-4 animate-in slide-in-from-bottom-6 duration-700 delay-150 fill-mode-both">
              DB Removals — All Things Moving Made Easy
            </p>
            <p className="text-lg md:text-xl text-white/80 mb-10 max-w-2xl leading-relaxed animate-in slide-in-from-bottom-8 duration-700 delay-200 fill-mode-both">
              Affordable rubbish removal, house clearances, house moves, scrap metal collection, and garden services. We do all the heavy lifting — cheaper than a skip, one fixed price once quoted.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 animate-in slide-in-from-bottom-8 duration-700 delay-300 fill-mode-both">
              <Button asChild size="xl" className="h-14 px-8 text-lg rounded-full shadow-lg">
                <Link href="/quote">Get a Free Quote <ArrowRight className="ml-2 w-5 h-5" /></Link>
              </Button>
              <Button asChild size="xl" className="h-14 px-8 text-lg rounded-full bg-white/10 text-white border border-white/30 hover:bg-white/20 hover:text-white backdrop-blur-sm">
                <a href="tel:07711961375"><Phone className="mr-2 w-5 h-5" />Call 07711 961 375</a>
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
              <h3 className="font-semibold mb-1">Fully Licensed</h3>
              <p className="text-sm text-white/70">Waste carrier registered</p>
            </div>
            <div className="flex flex-col items-center justify-center text-center px-4">
              <Clock className="w-8 h-8 text-accent mb-3" />
              <h3 className="font-semibold mb-1">Same Day Available</h3>
              <p className="text-sm text-white/70">Fast &amp; reliable service</p>
            </div>
            <div className="flex flex-col items-center justify-center text-center px-4">
              <Truck className="w-8 h-8 text-accent mb-3" />
              <h3 className="font-semibold mb-1">Cheaper Than a Skip</h3>
              <p className="text-sm text-white/70">We do the heavy lifting</p>
            </div>
            <div className="flex flex-col items-center justify-center text-center px-4">
              <CheckCircle2 className="w-8 h-8 text-accent mb-3" />
              <h3 className="font-semibold mb-1">Fixed Price</h3>
              <p className="text-sm text-white/70">One price, no surprises</p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-4 md:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-primary mb-4">What We Do</h2>
            <p className="text-lg text-muted-foreground">From a single item to a full house — we cover it all at a fair price.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: "House Removals", desc: "Long & short distance house and flat moves, office relocations, student moves.", icon: Truck },
              { title: "House Clearances", desc: "Full or part clearances including loft, garage, shop, and garden clearances.", icon: CheckCircle2 },
              { title: "Rubbish Removal", desc: "Affordable rubbish and waste collection. Cheaper than hiring a skip — we do the lifting.", icon: Package },
              { title: "Scrap Metal Collection", desc: "Free collection of scrap batteries, boilers, washing machines, cars, and much more.", icon: Recycle },
              { title: "Garden &amp; Lawn Care", desc: "Fencing, turfing, garden clearance, tree pruning, patio cleaning, and maintenance.", icon: Leaf },
              { title: "Man &amp; Van", desc: "Flexible man and van service for single items, collections, deliveries, and storage pickups.", icon: Clock },
            ].map((service, i) => (
              <div key={i} className="bg-white p-8 rounded-2xl shadow-sm border border-border/50 hover:shadow-md transition-shadow group">
                <div className="w-14 h-14 bg-primary/5 rounded-xl flex items-center justify-center mb-6 group-hover:bg-primary transition-colors">
                  <service.icon className="w-7 h-7 text-primary group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-primary" dangerouslySetInnerHTML={{ __html: service.title }} />
                <p className="text-muted-foreground mb-6 leading-relaxed">{service.desc}</p>
                <Link href="/services" className="inline-flex items-center text-accent font-semibold hover:text-primary transition-colors">
                  Learn more <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Work / Job Photos */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 md:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-primary mb-4">Our Recent Jobs</h2>
            <p className="text-lg text-muted-foreground">Real results from real jobs. No job too big, no job too small.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {jobPhotos.map((photo, i) => (
              <div
                key={i}
                className="relative aspect-square overflow-hidden rounded-2xl bg-gray-100 group cursor-pointer shadow-sm hover:shadow-lg transition-shadow"
              >
                <img
                  src={photo.src}
                  alt={photo.caption}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                  <span className="text-white font-semibold text-sm">{photo.caption}</span>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Button asChild variant="outline" size="lg" className="rounded-full px-10">
              <Link href="/gallery">View All Photos</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex items-center gap-4 mb-16 justify-center">
            <Quote className="w-12 h-12 text-accent/20 rotate-180" />
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-primary">What Customers Say</h2>
            <Quote className="w-12 h-12 text-accent/20" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: "Linda M.", loc: "Woolavington", text: "Absolutely brilliant service. DB and his family worked so hard, nothing was too much trouble. The price was very fair and they cleared the whole house in no time. Would recommend to anyone." },
              { name: "Steve R.", loc: "Local Move", text: "Used DB Removals to move my furniture to my new flat. Fast, careful, and no hidden costs. Exactly as quoted. Will definitely be using them again. Great lads!" },
              { name: "Karen T.", loc: "House Clearance", text: "Had a full clearance done after my mother passed. They were so respectful and professional. Took everything away cleanly and even collected the old scrap metal for free. 5 stars from me." }
            ].map((review, i) => (
              <div key={i} className="p-8 bg-white rounded-2xl shadow-sm border border-border">
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
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">Ready to get started?</h2>
          <p className="text-xl text-white/80 mb-10 max-w-2xl mx-auto">
            Free quotes, fixed prices, and won't be beaten on cost. Call or message us today and we'll sort the rest.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="xl" className="h-16 px-10 text-lg rounded-full bg-white text-primary hover:bg-gray-100 shadow-xl">
              <Link href="/quote">Request Your Free Quote</Link>
            </Button>
            <Button asChild size="xl" className="h-16 px-10 text-lg rounded-full border border-white/30 text-white bg-white/10 hover:bg-white/20 backdrop-blur-sm">
              <a href="tel:07711961375"><Phone className="mr-2 w-5 h-5" />Call 07711 961 375</a>
            </Button>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}
