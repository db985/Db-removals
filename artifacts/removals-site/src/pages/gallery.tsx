import { PublicLayout } from "@/components/layout/PublicLayout";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

import job1 from "@assets/IMG_4498_1783626376325.jpeg";
import job2 from "@assets/IMG_4499_1783626376325.jpeg";
import job3 from "@assets/IMG_4500_1783626376325.jpeg";
import job4 from "@assets/IMG_4501_1783626376325.jpeg";
import job5 from "@assets/IMG_4502_1783626376325.jpeg";
import job6 from "@assets/IMG_4503_1783626376325.jpeg";

const photos = [
  { src: job1, caption: "Full House Clearance", category: "Clearance" },
  { src: job2, caption: "Rubbish Removal", category: "Rubbish Removal" },
  { src: job3, caption: "Property Clearance", category: "Clearance" },
  { src: job4, caption: "Loading & Removals", category: "Removals" },
  { src: job5, caption: "Collection Job", category: "Collection" },
  { src: job6, caption: "Clearance Complete", category: "Clearance" },
];

export default function Gallery() {
  return (
    <PublicLayout>
      <div className="bg-primary py-20 text-white">
        <div className="container mx-auto px-4 md:px-8 text-center max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">Our Recent Work</h1>
          <p className="text-lg text-white/80 leading-relaxed">
            Real photos from real jobs done by DB &amp; Family. No job too big, no job too small — these are the results we deliver every day.
          </p>
        </div>
      </div>

      <div className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 md:px-8">

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {photos.map((photo, i) => (
              <div
                key={i}
                className="group relative overflow-hidden rounded-2xl bg-gray-200 shadow-sm hover:shadow-xl transition-all duration-300 aspect-square"
              >
                <img
                  src={photo.src}
                  alt={photo.caption}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-start justify-end p-5">
                  <span className="text-xs font-bold uppercase tracking-widest text-accent mb-1">{photo.category}</span>
                  <span className="text-white font-semibold text-lg leading-tight">{photo.caption}</span>
                </div>
                {/* Always-visible category badge */}
                <div className="absolute top-3 left-3">
                  <span className="bg-primary/80 backdrop-blur-sm text-white text-xs font-semibold px-3 py-1 rounded-full">
                    {photo.category}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* More photos note */}
          <div className="mt-16 text-center bg-white rounded-3xl p-12 border border-border shadow-sm max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold text-primary mb-3">More photos coming soon</h2>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              We complete new jobs every week. Check back regularly to see more of our latest clearances, removals, and collections across Woolavington and the surrounding areas.
            </p>
            <Button asChild size="lg" className="rounded-full px-10">
              <Link href="/quote">Get a Free Quote <ArrowRight className="ml-2 w-4 h-4" /></Link>
            </Button>
          </div>
        </div>
      </div>
    </PublicLayout>
  );
}
