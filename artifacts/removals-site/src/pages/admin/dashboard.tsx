import { useState } from "react";
import { AdminLayout } from "@/components/layout/AdminLayout";
import { useGetQuoteStats, useListQuotes, useUpdateQuote, useCreateCalendarEvent, getListQuotesQueryKey, getGetQuoteStatsQueryKey, getListCalendarEventsQueryKey } from "@workspace/api-client-react";
import { useQueryClient } from "@tanstack/react-query";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { format } from "date-fns";
import { Users, FileText, CheckCircle2, XCircle, Search, Mail, Phone, Calendar as CalendarIcon, ExternalLink, Image as ImageIcon, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function AdminDashboard() {
  const { data: stats, isLoading: statsLoading } = useGetQuoteStats();
  const { data: quotes, isLoading: quotesLoading } = useListQuotes();
  const updateQuote = useUpdateQuote();
  const createEvent = useCreateCalendarEvent();
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedQuote, setSelectedQuote] = useState<any>(null);
  const [adminNotes, setAdminNotes] = useState("");
  
  // Calendar Modal state
  const [isCalendarModalOpen, setIsCalendarModalOpen] = useState(false);
  const [eventDate, setEventDate] = useState("");

  const filteredQuotes = quotes?.filter(q => 
    q.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    q.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    q.phone.includes(searchTerm)
  );

  const handleUpdateStatus = (id: number, status: "pending" | "accepted" | "declined") => {
    updateQuote.mutate({ id, data: { status } }, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: getListQuotesQueryKey() });
        queryClient.invalidateQueries({ queryKey: getGetQuoteStatsQueryKey() });
        toast({ title: "Status updated" });
      }
    });
  };

  const handleSaveNotes = () => {
    if (!selectedQuote) return;
    updateQuote.mutate({ id: selectedQuote.id, data: { adminNotes } }, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: getListQuotesQueryKey() });
        setSelectedQuote(null);
        toast({ title: "Notes saved successfully" });
      }
    });
  };

  const handleAddToCalendar = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedQuote || !eventDate) return;

    createEvent.mutate({
      data: {
        quoteId: selectedQuote.id,
        title: `Move: ${selectedQuote.name}`,
        description: selectedQuote.jobDescription,
        jobDate: new Date(eventDate).toISOString(),
        customerName: selectedQuote.name,
        address: selectedQuote.address
      }
    }, {
      onSuccess: () => {
        setIsCalendarModalOpen(false);
        toast({ title: "Added to calendar" });
        queryClient.invalidateQueries({ queryKey: getListCalendarEventsQueryKey() });
      }
    });
  };

  const StatusBadge = ({ status }: { status: string }) => {
    switch (status) {
      case "accepted":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100 border-0">Accepted</Badge>;
      case "declined":
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100 border-0">Declined</Badge>;
      default:
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100 border-0">Pending</Badge>;
    }
  };

  return (
    <AdminLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-primary">Dashboard</h1>
        <p className="text-muted-foreground mt-1">Overview of your quote requests and business activity.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-border">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-muted-foreground">Total Quotes</h3>
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
              <FileText className="w-5 h-5 text-primary" />
            </div>
          </div>
          <div className="text-3xl font-bold">{statsLoading ? "-" : stats?.total}</div>
          <p className="text-sm text-muted-foreground mt-1">All time requests</p>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-border">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-muted-foreground">Pending</h3>
            <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
              <Users className="w-5 h-5 text-yellow-600" />
            </div>
          </div>
          <div className="text-3xl font-bold text-yellow-600">{statsLoading ? "-" : stats?.pending}</div>
          <p className="text-sm text-muted-foreground mt-1">Require action</p>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-border">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-muted-foreground">Accepted</h3>
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <CheckCircle2 className="w-5 h-5 text-green-600" />
            </div>
          </div>
          <div className="text-3xl font-bold text-green-600">{statsLoading ? "-" : stats?.accepted}</div>
          <p className="text-sm text-muted-foreground mt-1">Jobs won</p>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-border">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-muted-foreground">Declined</h3>
            <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
              <XCircle className="w-5 h-5 text-red-600" />
            </div>
          </div>
          <div className="text-3xl font-bold text-red-600">{statsLoading ? "-" : stats?.declined}</div>
          <p className="text-sm text-muted-foreground mt-1">Lost or unavailable</p>
        </div>
      </div>

      {/* Quote List */}
      <div className="bg-white rounded-2xl shadow-sm border border-border overflow-hidden">
        <div className="p-6 border-b border-border flex flex-col md:flex-row md:items-center justify-between gap-4">
          <h2 className="text-xl font-bold text-primary">Recent Quote Requests</h2>
          <div className="relative max-w-sm w-full">
            <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <Input 
              placeholder="Search by name, email or phone..." 
              className="pl-10 h-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        
        {quotesLoading ? (
          <div className="p-12 flex justify-center">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        ) : filteredQuotes?.length === 0 ? (
          <div className="p-12 text-center text-muted-foreground">
            No quote requests found.
          </div>
        ) : (
          <div className="divide-y divide-border">
            {filteredQuotes?.map((quote) => (
              <div key={quote.id} className="p-6 hover:bg-gray-50/50 transition-colors">
                <div className="flex flex-col xl:flex-row justify-between gap-6">
                  
                  {/* Left Column: Core Info */}
                  <div className="flex-1 space-y-3">
                    <div className="flex items-center gap-3">
                      <h3 className="text-lg font-bold text-foreground">{quote.name}</h3>
                      <StatusBadge status={quote.status} />
                      <span className="text-sm text-muted-foreground">
                        {format(new Date(quote.createdAt), "MMM d, yyyy HH:mm")}
                      </span>
                    </div>
                    
                    <div className="flex flex-wrap gap-4 text-sm">
                      <div className="flex items-center gap-1.5 text-muted-foreground">
                        <Phone className="w-4 h-4" />
                        <a href={`tel:${quote.phone}`} className="hover:text-primary">{quote.phone}</a>
                      </div>
                      <div className="flex items-center gap-1.5 text-muted-foreground">
                        <Mail className="w-4 h-4" />
                        <a href={`mailto:${quote.email}`} className="hover:text-primary">{quote.email || 'N/A'}</a>
                      </div>
                      <Badge variant="outline" className="text-xs font-normal">Prefers {quote.preferredContact}</Badge>
                    </div>

                    <div className="bg-gray-50 p-4 rounded-lg border border-border/50 text-sm">
                      <p className="font-semibold mb-1">From: <span className="font-normal">{quote.address}</span></p>
                      <p className="text-muted-foreground mt-2">{quote.jobDescription}</p>
                    </div>
                  </div>

                  {/* Middle Column: Notes & Photos */}
                  <div className="w-full xl:w-72 flex flex-col gap-3">
                    {quote.photoUrl && (
                      <a href={quote.photoUrl} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 p-3 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors text-sm font-medium border border-blue-200">
                        <ImageIcon className="w-4 h-4" /> View Attached Photo
                      </a>
                    )}
                    
                    <div className="flex-1 bg-yellow-50/50 border border-yellow-100 rounded-lg p-3 relative group">
                      <h4 className="text-xs font-semibold text-yellow-800 uppercase tracking-wider mb-2">Admin Notes</h4>
                      <p className="text-sm text-yellow-900/80 min-h-[40px] whitespace-pre-wrap">
                        {quote.adminNotes || "No notes added."}
                      </p>
                      <Button 
                        variant="secondary" 
                        size="sm" 
                        className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity h-7 text-xs bg-white hover:bg-gray-100"
                        onClick={() => { setSelectedQuote(quote); setAdminNotes(quote.adminNotes || ""); }}
                      >
                        Edit
                      </Button>
                    </div>
                  </div>

                  {/* Right Column: Actions */}
                  <div className="flex flex-col gap-2 shrink-0 xl:w-40 justify-center">
                    {quote.status !== "accepted" && (
                      <Button 
                        size="sm" 
                        className="w-full bg-green-600 hover:bg-green-700 text-white"
                        onClick={() => handleUpdateStatus(quote.id, "accepted")}
                        disabled={updateQuote.isPending}
                      >
                        Mark Accepted
                      </Button>
                    )}
                    {quote.status !== "declined" && (
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="w-full text-red-600 hover:bg-red-50 hover:text-red-700"
                        onClick={() => handleUpdateStatus(quote.id, "declined")}
                        disabled={updateQuote.isPending}
                      >
                        Mark Declined
                      </Button>
                    )}
                    {quote.status === "accepted" && (
                      <Button 
                        size="sm" 
                        className="w-full bg-primary"
                        onClick={() => { setSelectedQuote(quote); setIsCalendarModalOpen(true); }}
                      >
                        <CalendarIcon className="w-4 h-4 mr-2" /> Add Job
                      </Button>
                    )}
                  </div>

                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Edit Notes Dialog */}
      <Dialog open={!!selectedQuote && !isCalendarModalOpen} onOpenChange={(open) => !open && setSelectedQuote(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Admin Notes - {selectedQuote?.name}</DialogTitle>
            <DialogDescription>
              Add private internal notes for this quote (e.g. pricing quoted, access issues).
            </DialogDescription>
          </DialogHeader>
          <Textarea 
            value={adminNotes} 
            onChange={(e) => setAdminNotes(e.target.value)} 
            placeholder="Type your notes here..." 
            className="min-h-[150px]"
          />
          <DialogFooter>
            <Button variant="outline" onClick={() => setSelectedQuote(null)}>Cancel</Button>
            <Button onClick={handleSaveNotes} disabled={updateQuote.isPending}>Save Notes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add to Calendar Dialog */}
      <Dialog open={isCalendarModalOpen} onOpenChange={setIsCalendarModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Schedule Job - {selectedQuote?.name}</DialogTitle>
            <DialogDescription>
              Schedule this accepted quote into the company calendar.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleAddToCalendar} className="space-y-4 py-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Job Date & Time</label>
              <Input 
                type="datetime-local" 
                required 
                value={eventDate}
                onChange={(e) => setEventDate(e.target.value)}
              />
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsCalendarModalOpen(false)}>Cancel</Button>
              <Button type="submit" disabled={createEvent.isPending}>Add to Calendar</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

    </AdminLayout>
  );
}