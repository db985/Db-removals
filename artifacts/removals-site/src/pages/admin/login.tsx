import { useState } from "react";
import { useLocation } from "wouter";
import { useAdminLogin, useGetAuthStatus } from "@workspace/api-client-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Lock, Loader2, ShieldAlert } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function AdminLogin() {
  const [location, setLocation] = useLocation();
  const { toast } = useToast();
  const [password, setPassword] = useState("");
  const login = useAdminLogin();
  const { data: authStatus, isLoading: authLoading } = useGetAuthStatus();

  if (authStatus?.authenticated) {
    setLocation("/admin");
    return null;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!password) return;

    login.mutate({ data: { password } }, {
      onSuccess: () => {
        setLocation("/admin");
      },
      onError: () => {
        toast({
          title: "Access Denied",
          description: "Incorrect password.",
          variant: "destructive",
        });
        setPassword("");
      }
    });
  };

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4 relative overflow-hidden">
      <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(#1a2744 1px, transparent 1px)', backgroundSize: '40px 40px', opacity: 0.05 }}></div>
      
      <div className="bg-white p-8 md:p-10 rounded-3xl shadow-xl border border-border w-full max-w-md relative z-10">
        <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
          <ShieldAlert className="w-8 h-8 text-primary" />
        </div>
        
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-primary mb-2">Admin Portal</h1>
          <p className="text-muted-foreground text-sm">Enter the master password to access the business dashboard.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-foreground">Password</label>
            <div className="relative">
              <Lock className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <Input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••" 
                className="pl-10 h-12 bg-gray-50/50" 
                required
              />
            </div>
          </div>
          
          <Button 
            type="submit" 
            className="w-full h-12 text-md font-bold rounded-xl"
            disabled={login.isPending || !password}
          >
            {login.isPending ? <Loader2 className="w-5 h-5 animate-spin" /> : "Secure Login"}
          </Button>
        </form>

        <div className="mt-8 text-center text-sm text-muted-foreground">
          <a href="/" className="hover:text-primary transition-colors hover:underline">Return to Public Website</a>
        </div>
      </div>
    </div>
  );
}