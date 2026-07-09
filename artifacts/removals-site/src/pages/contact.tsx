import { PublicLayout } from "@/components/layout/PublicLayout";
import { MapPin, Phone, Mail, Clock, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function Contact() {
  return (
    <PublicLayout>
      <div className="bg-primary py-20 text-white">
        <div className="container mx-auto px-4 md:px-8 text-center max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">Contact Us</h1>
          <p className="text-lg text-white/80 leading-relaxed">
            Have a general question or want to discuss a potential move? We're here to help.
          </p>
        </div>
      </div>

      <div className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 md:px-8 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
            
            {/* Contact Info */}
            <div className="lg:col-span-2 space-y-8">
              <div>
                <h2 className="text-2xl font-bold text-primary mb-6">Get in Touch</h2>
                <p className="text-muted-foreground mb-8">
                  We're always happy to answer your questions. For a detailed price, please use our <a href="/quote" className="text-accent hover:underline font-medium">Quote Form</a>.
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm shrink-0 border border-border">
                    <Phone className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground">Phone</h3>
                    <p className="text-lg text-primary font-medium mt-1">0800 123 4567</p>
                    <p className="text-sm text-muted-foreground mt-1">Mon-Sat, 8am-6pm</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm shrink-0 border border-border">
                    <Mail className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground">Email</h3>
                    <p className="text-lg mt-1">hello@yourcompany.co.uk</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm shrink-0 border border-border">
                    <MapPin className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground">Service Area</h3>
                    <p className="text-muted-foreground mt-1 leading-relaxed">
                      Based in London.<br/>
                      Serving the surrounding home counties.<br/>
                      National moves available on request.
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-8">
                <Button variant="outline" className="w-full rounded-full" asChild>
                  <a href="#">Message us on Facebook</a>
                </Button>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-3 bg-white p-8 md:p-10 rounded-3xl shadow-sm border border-border">
              <h2 className="text-2xl font-bold text-primary mb-6">Send a Message</h2>
              <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); alert("Thanks for your message! (Demo only, use Quote form for real API)"); }}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-foreground">Your Name</label>
                    <Input required placeholder="John Doe" className="h-12 bg-gray-50/50" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-foreground">Email Address</label>
                    <Input required type="email" placeholder="john@example.com" className="h-12 bg-gray-50/50" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-foreground">Message</label>
                  <Textarea required placeholder="How can we help?" className="min-h-[160px] bg-gray-50/50 resize-y" />
                </div>
                <Button type="submit" size="lg" className="w-full h-14 text-lg rounded-xl">
                  Send Message <Send className="w-5 h-5 ml-2" />
                </Button>
              </form>
            </div>

          </div>
        </div>
      </div>
      
      {/* Map Placeholder */}
      <div className="w-full h-[400px] bg-gray-200 relative overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(#1a2744 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
        <div className="relative z-10 flex flex-col items-center">
          <MapPin className="w-12 h-12 text-primary mb-4" />
          <h3 className="text-xl font-bold text-primary mb-2">Interactive Map</h3>
          <p className="text-muted-foreground">Location map will be embedded here.</p>
        </div>
      </div>
    </PublicLayout>
  );
}