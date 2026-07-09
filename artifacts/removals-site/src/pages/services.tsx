import { PublicLayout } from "@/components/layout/PublicLayout";
import { CheckCircle2, Truck, Package, Home as HomeIcon, Recycle, Leaf, Clock, ShoppingBag, Sofa, GraduationCap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

const services = [
  {
    id: "house-removals",
    title: "House Removals",
    icon: HomeIcon,
    description: "Moving home? We handle everything from a studio flat to a full family house. Long and short distance moves, same day service available. We do all the heavy lifting so you don't have to.",
    includes: [
      "Long and short distance moves",
      "Same day service available",
      "Full loading and unloading",
      "House, flat, and bungalow moves",
      "Student and flat moves",
      "Office and commercial relocations",
    ]
  },
  {
    id: "man-van",
    title: "Man & Van Service",
    icon: Truck,
    description: "Need a hand moving a few items or collecting something? Our man and van service is flexible, fast, and affordable. Collection and delivery, storage pickups, single item moves — you name it.",
    includes: [
      "Single item delivery",
      "Collection and delivery",
      "Storage pickups",
      "Flat moves",
      "Long and short distance",
      "Handyman services available",
    ]
  },
  {
    id: "house-clearances",
    title: "House &amp; Property Clearances",
    icon: Package,
    description: "Full or part clearances done quickly and respectfully. Whether you're clearing a family home, preparing a property for sale, or dealing with end of tenancy — we clear it all.",
    includes: [
      "Full or part house clearances",
      "End of tenancy clearances",
      "Probate and bereavement clearances",
      "Loft clearances",
      "Garage clearances",
      "Responsible disposal and recycling",
    ]
  },
  {
    id: "rubbish-removal",
    title: "Rubbish &amp; Waste Removal",
    icon: ShoppingBag,
    description: "Cheaper than hiring a skip — and we do all the heavy lifting for you. Affordable rubbish removal for homes, gardens, shops, and businesses. One fixed price once quoted.",
    includes: [
      "Garden waste removal",
      "Shop and commercial clearances",
      "General household rubbish",
      "Furniture and white goods",
      "Building and renovation waste",
      "One fixed price, no hidden fees",
    ]
  },
  {
    id: "scrap-metal",
    title: "Free Scrap Metal Collection",
    icon: Recycle,
    description: "We collect scrap metal for FREE. Got an old boiler, washing machine, car parts, or bicycles taking up space? We'll come and collect — completely free of charge.",
    includes: [
      "Old scrap batteries",
      "Old scrap car parts and cars",
      "Lawn mowers and bicycles",
      "Old boilers and radiators",
      "Washing machines and cookers",
      "Dishwashers and aluminium — and more",
    ]
  },
  {
    id: "garden-lawn",
    title: "Garden &amp; Lawn Care",
    icon: Leaf,
    description: "DB &amp; Family handle all your gardening needs under the Strim &amp; Trim Lawn Care banner. From a one-off garden clearance to regular lawn maintenance — we've got you covered.",
    includes: [
      "Fencing and fencing repairs",
      "Turfing",
      "Garden clearance and maintenance",
      "Tree pruning and clearance",
      "Patio cleaning",
      "Regular lawn care available",
    ]
  }
];

export default function Services() {
  return (
    <PublicLayout>
      <div className="bg-primary py-20 text-white">
        <div className="container mx-auto px-4 md:px-8 text-center max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">Our Services</h1>
          <p className="text-lg text-white/80 leading-relaxed">
            DB &amp; Family Man and a Van — covering removals, clearances, rubbish removal, free scrap metal collection, and garden services. Fully licensed, free quotes, and won't be beaten on price.
          </p>
        </div>
      </div>

      {/* Key selling points */}
      <div className="bg-accent py-6">
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex flex-wrap justify-center gap-x-10 gap-y-3 text-white text-sm font-semibold">
            <span className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4" /> Free Quotes</span>
            <span className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4" /> Fully Licensed</span>
            <span className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4" /> Cheaper Than a Skip</span>
            <span className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4" /> One Fixed Price Once Quoted</span>
            <span className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4" /> Won't Be Beaten on Price</span>
            <span className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4" /> Same Day Available</span>
          </div>
        </div>
      </div>

      <div className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {services.map((service) => (
              <div key={service.id} className="bg-white rounded-3xl p-8 md:p-10 shadow-sm border border-border">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 bg-primary/5 rounded-2xl flex items-center justify-center">
                    <service.icon className="w-8 h-8 text-primary" />
                  </div>
                  <h2 className="text-2xl font-bold text-primary" dangerouslySetInnerHTML={{ __html: service.title }} />
                </div>
                <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
                  {service.description}
                </p>
                <div className="bg-gray-50 rounded-2xl p-6 border border-border/50">
                  <h3 className="font-semibold text-foreground mb-4">What's included:</h3>
                  <ul className="space-y-3">
                    {service.includes.map((item, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                        <span className="text-foreground/80" dangerouslySetInnerHTML={{ __html: item }} />
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-20 text-center bg-white rounded-3xl p-12 border border-border shadow-sm">
            <h2 className="text-3xl font-bold text-primary mb-4">Not sure what you need?</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
              Just give us a call or fill in our quote form — we'll give you a free, no-obligation price. One fixed price once quoted, and we won't be beaten on cost.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="xl" className="rounded-full px-10">
                <Link href="/quote">Get a Free Quote</Link>
              </Button>
              <Button asChild variant="outline" size="xl" className="rounded-full px-10">
                <a href="tel:07711961375">Call 07711 961 375</a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </PublicLayout>
  );
}
