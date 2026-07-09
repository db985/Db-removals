import { PublicLayout } from "@/components/layout/PublicLayout";
import { Camera, Image as ImageIcon } from "lucide-react";

export default function Gallery() {
  return (
    <PublicLayout>
      <div className="bg-primary py-20 text-white">
        <div className="container mx-auto px-4 md:px-8 text-center max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">Our Recent Work</h1>
          <p className="text-lg text-white/80 leading-relaxed">
            Take a look at how we handle your belongings with care. A glimpse into our daily operations.
          </p>
        </div>
      </div>

      <div className="py-24 bg-gray-50 min-h-[50vh] flex flex-col items-center justify-center">
        <div className="container mx-auto px-4 md:px-8 text-center">
          <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mx-auto mb-8 shadow-sm border border-border">
            <Camera className="w-10 h-10 text-muted-foreground" />
          </div>
          <h2 className="text-3xl font-bold text-primary mb-4">Photos coming soon</h2>
          <p className="text-lg text-muted-foreground max-w-md mx-auto leading-relaxed">
            We are currently updating our gallery with photos from our latest jobs. Check back soon to see our modern fleet, careful packing, and expert moving teams in action!
          </p>

          {/* Empty Grid Placeholder showing layout intention */}
          <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto opacity-40 grayscale pointer-events-none">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="aspect-square bg-white border-2 border-dashed border-border rounded-2xl flex items-center justify-center">
                <ImageIcon className="w-8 h-8 text-border" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </PublicLayout>
  );
}