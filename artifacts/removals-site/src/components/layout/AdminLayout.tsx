import { ReactNode } from "react";
import { Link, useLocation } from "wouter";
import { useAdminLogout, useGetAuthStatus, getGetAuthStatusQueryKey } from "@workspace/api-client-react";
import { useQueryClient } from "@tanstack/react-query";
import { LayoutDashboard, Calendar as CalendarIcon, LogOut, Loader2, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export function AdminLayout({ children }: { children: ReactNode }) {
  const [location, setLocation] = useLocation();
  const queryClient = useQueryClient();
  const { data: authStatus, isLoading } = useGetAuthStatus();
  const logout = useAdminLogout();

  const handleLogout = () => {
    logout.mutate(undefined, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: getGetAuthStatusQueryKey() });
        setLocation("/admin/login");
      }
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!authStatus?.authenticated) {
    setLocation("/admin/login");
    return null;
  }

  const NavLinks = () => (
    <>
      <div className="space-y-1 py-4">
        <Link 
          href="/admin" 
          className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${location === '/admin' ? 'bg-primary/10 text-primary font-medium' : 'text-muted-foreground hover:bg-gray-100 hover:text-foreground'}`}
        >
          <LayoutDashboard className="w-5 h-5" />
          Dashboard
        </Link>
        <Link 
          href="/admin/calendar" 
          className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${location === '/admin/calendar' ? 'bg-primary/10 text-primary font-medium' : 'text-muted-foreground hover:bg-gray-100 hover:text-foreground'}`}
        >
          <CalendarIcon className="w-5 h-5" />
          Calendar
        </Link>
      </div>
    </>
  );

  return (
    <div className="min-h-screen flex bg-gray-50/50">
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col w-64 bg-white border-r border-border shrink-0 fixed inset-y-0 z-10">
        <div className="p-6 border-b border-border flex items-center gap-3">
          <div className="w-8 h-8 bg-primary rounded flex items-center justify-center text-white font-bold text-sm">
            YC
          </div>
          <span className="font-bold text-lg tracking-tight">Admin Portal</span>
        </div>
        <div className="flex-1 px-4 py-4 overflow-y-auto">
          <NavLinks />
        </div>
        <div className="p-4 border-t border-border">
          <Button 
            variant="ghost" 
            className="w-full justify-start text-muted-foreground hover:text-destructive hover:bg-destructive/10" 
            onClick={handleLogout}
            disabled={logout.isPending}
          >
            <LogOut className="w-5 h-5 mr-3" />
            Sign Out
          </Button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col md:pl-64 min-w-0">
        <header className="md:hidden flex items-center justify-between p-4 bg-white border-b border-border sticky top-0 z-20">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded flex items-center justify-center text-white font-bold text-sm">
              YC
            </div>
            <span className="font-bold text-lg tracking-tight">Admin Portal</span>
          </div>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="w-6 h-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-64 p-0 flex flex-col">
              <div className="p-6 border-b border-border flex items-center gap-3">
                <div className="w-8 h-8 bg-primary rounded flex items-center justify-center text-white font-bold text-sm">
                  YC
                </div>
                <span className="font-bold text-lg tracking-tight">Admin Portal</span>
              </div>
              <div className="flex-1 px-4 py-4">
                <NavLinks />
              </div>
              <div className="p-4 border-t border-border">
                <Button 
                  variant="ghost" 
                  className="w-full justify-start text-muted-foreground hover:text-destructive hover:bg-destructive/10" 
                  onClick={handleLogout}
                  disabled={logout.isPending}
                >
                  <LogOut className="w-5 h-5 mr-3" />
                  Sign Out
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </header>
        <main className="flex-1 p-4 md:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}