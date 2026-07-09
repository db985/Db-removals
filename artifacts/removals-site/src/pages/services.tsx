import { PublicLayout } from "@/components/layout/PublicLayout";
import { CheckCircle2, Truck, Package, Home as HomeIcon, Building, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

const services = [
  {
    id: "house-removals",
    title: "House Removals",
    icon: HomeIcon,
    description: "Our comprehensive house removal service takes the stress out of moving day. From 1-bedroom flats to 5-bedroom houses, our experienced team ensures your belongings arrive safely.",
    includes: [
      "Full loading and unloading",
      "Transit blankets and protective covers",
      "Dismantling and reassembly of basic furniture",
      "Goods in transit insurance"
    ]
  },
  {
    id: "furniture",
    title: "Furniture Moving",
    icon: Package,
    description: "Got a heavy sofa, a delicate antique, or a grand piano? We specialise in moving single large items or partial loads securely and efficiently.",
    includes: [
      "Specialist moving equipment",
      "Extra padding and strapping",
      "Narrow staircase navigation",
      "Door removal if necessary"
    ]
  },
  {
    id: "clearance",
    title: "House Clearances",
    icon: CheckCircle2,
    description: "Respectful, efficient clearance of properties for probate, end of tenancy, or decluttering. We aim to recycle or donate as much as possible.",
    includes: [
      "Full property sweeping",
      "Responsible waste disposal",
      "Charity shop drop-offs",
      "Confidential document shredding (arranged)"
    ]
  },
  {
    id: "packing",
    title: "Packing Services",
    icon: Package,
    description: "Let our trained professionals pack your life into boxes. We bring all the materials and use proven techniques to ensure nothing breaks in transit.",
    includes: [
      "Premium double-walled boxes",
      "Bubble wrap and packing paper",
      "Wardrobe cartons for hanging clothes",
      "Clearly labelled room-by-room"
    ]
  },
  {
    id: "commercial",
    title: "Commercial Moves",
    icon: Building,
    description: "Minimise business downtime with our weekend or out-of-hours office relocation services. We manage IT equipment carefully and keep files organised.",
    includes: [
      "IT equipment crates",
      "Sequential file packing",
      "Weekend availability",
      "Secure moving protocols"
    ]
  },
  {
    id: "man-van",
    title: "Man & Van Service",
    icon: Clock,
    description: "Perfect for student moves, single items, or small flats. A flexible, cost-effective service with a professional driver to help you load and unload.",
    includes: [
      "Hourly or day rates",
      "Working driver assists with lifting",
      "Clean, modern Luton van",
      "Same protective equipment used"
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
            Professional moving, packing, and clearance services designed to make your life easier. Fully insured, highly rated, and always reliable.
          </p>
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
                  <h2 className="text-2xl font-bold text-primary">{service.title}</h2>
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
                        <span className="text-foreground/80">{item}</span>
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
              Every move is unique. Get in touch with us to discuss your specific requirements, and we'll tailor a package just for you.
            </p>
            <Button asChild size="xl" className="rounded-full px-10">
              <Link href="/quote">Get a Custom Quote</Link>
            </Button>
          </div>
        </div>
      </div>
    </PublicLayout>
  );
}