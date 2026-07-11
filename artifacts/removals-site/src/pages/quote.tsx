import { useState } from "react";
import { PublicLayout } from "@/components/layout/PublicLayout";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Loader2, CheckCircle, ArrowRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const quoteSchema = z.object({
  name: z.string().min(2, "Name is required"),
  phone: z.string().min(5, "Phone number is required"),
  email: z.string().email("Valid email is required").or(z.literal("")),
  address: z.string().min(5, "Moving from address is required"),
  jobDescription: z.string().min(10, "Please provide some details about the job"),
  preferredContact: z.enum(["phone", "email", "either"]),
});

type QuoteFormValues = z.infer<typeof quoteSchema>;

export default function Quote() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const form = useForm<QuoteFormValues>({
    resolver: zodResolver(quoteSchema),
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      address: "",
      jobDescription: "",
      preferredContact: "either",
    },
  });

  const onSubmit = async (data: QuoteFormValues) => {
    setIsSubmitting(true);
    try {
      // 1. Combine form fields into a custom message string for your backend
      const consolidatedDetails = `
Moving From Address: 
${data.address}

Preferred Contact Method: 
${data.preferredContact}

Job Description & Inventory: 
${data.jobDescription}
      `.trim();

      const payload = {
        name: data.name,
        email: data.email || 'No email provided',
        phone: data.phone,
        details: consolidatedDetails
      };

      // 2. Post the payload directly to your live Vercel API backend
      const response = await fetch('https://vercel.app', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setIsSuccess(true);
        form.reset(); // Wipe inputs clean
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        throw new Error(result.error || "The server could not process your submission.");
      }
    } catch (error: any) {
      console.error(error);
      toast({
        title: "Submission Failed",
        description: error.message || "There was a problem submitting your quote. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <PublicLayout>
        <div className="flex-1 flex items-center justify-center py-20 bg-gray-50">
          <div className="bg-white p-12 rounded-3xl shadow-sm border border-border text-center max-w-lg mx-4 animate-in zoom-in-95 duration-500">
            <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10" />
            </div>
            <h2 className="text-3xl font-bold text-primary mb-4">Request Received!</h2>
            <p className="text-lg text-muted-foreground mb-8">
              Thank you for reaching out. We have received your quote request and will get back to you shortly with an estimate.
            </p>
            <Button onClick={() => setIsSuccess(false)} variant="outline" className="rounded-full h-12 px-8">
              Submit Another Request
            </Button>
          </div>
        </div>
      </PublicLayout>
    );
  }

  return (
    <PublicLayout>
      <div className="bg-primary py-16 text-white">
        <div className="container mx-auto px-4 md:px-8 max-w-4xl text-center">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">Get a Free Quote</h1>
          <p className="text-lg text-white/80 leading-relaxed">
            Fill out the form below with details about your move, and we'll provide a transparent, no-obligation quote.
          </p>
        </div>
      </div>

      <div className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 md:px-8 max-w-3xl">
          <div className="bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-border">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                
                {/* Personal Details */}
                <div className="space-y-6">
                  <h3 className="text-xl font-bold text-primary border-b border-border pb-4">Personal Details</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Full Name *</FormLabel>
                          <FormControl>
                            <Input placeholder="John Smith" className="h-12 bg-gray-50/50" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone Number *</FormLabel>
                          <FormControl>
                            <Input placeholder="07700 900000" className="h-12 bg-gray-50/50" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email Address</FormLabel>
                          <FormControl>
                            <Input placeholder="john@example.com" className="h-12 bg-gray-50/50" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="preferredContact"
                      render={({ field }) => (
                        <FormItem className="space-y-3">
                          <FormLabel>Preferred Contact Method</FormLabel>
                          <FormControl>
                            <RadioGroup
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                              className="flex gap-4"
                            >
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="phone" id="contact-phone" />
                                <label htmlFor="contact-phone" className="font-normal cursor-pointer text-sm">Phone</label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="email" id="contact-email" />
                                <label htmlFor="contact-email" className="font-normal cursor-pointer text-sm">Email</label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="either" id="contact-either" />
                                <label htmlFor="contact-either" className="font-normal cursor-pointer text-sm">Either</label>
                              </div>
                            </RadioGroup>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                {/* Move Details */}
                <div className="space-y-6 pt-4">
                  <h3 className="text-xl font-bold text-primary border-b border-border pb-4">Move Details</h3>
                  <div className="space-y-6">
                    <FormField
                      control={form.control}
                      name="address"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Moving From Address *</FormLabel>
                          <FormControl>
                            <Input placeholder="Current full address or postcode" className="h-12 bg-gray-50/50" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="jobDescription"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Job Description & Inventory Details *</FormLabel>
                          <FormControl>
                            <Textarea 
