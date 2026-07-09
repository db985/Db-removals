import { useState } from "react";
import { AdminLayout } from "@/components/layout/AdminLayout";
import { useListCalendarEvents, useDeleteCalendarEvent, getListCalendarEventsQueryKey } from "@workspace/api-client-react";
import { useQueryClient } from "@tanstack/react-query";
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay, addMonths, subMonths, isToday } from "date-fns";
import { ChevronLeft, ChevronRight, MapPin, Trash2, Calendar as CalendarIcon, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

export default function Calendar() {
  const { data: events, isLoading } = useListCalendarEvents();
  const deleteEvent = useDeleteCalendarEvent();
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const [currentDate, setCurrentDate] = useState(new Date());

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(monthStart);
  const startDate = monthStart; 
  // Let's create a calendar grid. 
  // Simple approach: get all days in the month
  const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd });
  
  // Pad the start to line up with the correct weekday (Monday = 1, Sunday = 0 for standard JS, let's use standard JS getDay)
  const startDay = monthStart.getDay(); 
  // Make Monday the first day
  const padDays = startDay === 0 ? 6 : startDay - 1;
  const padding = Array.from({ length: padDays }).fill(null);

  const prevMonth = () => setCurrentDate(subMonths(currentDate, 1));
  const nextMonth = () => setCurrentDate(addMonths(currentDate, 1));

  const handleDelete = (id: number) => {
    if (window.confirm("Are you sure you want to remove this job from the calendar?")) {
      deleteEvent.mutate({ id }, {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: getListCalendarEventsQueryKey() });
          toast({ title: "Job removed from calendar" });
        }
      });
    }
  };

  return (
    <AdminLayout>
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-primary">Job Calendar</h1>
          <p className="text-muted-foreground mt-1">Manage scheduled moves and clearances.</p>
        </div>
        <div className="flex items-center gap-4 bg-white p-2 rounded-xl shadow-sm border border-border">
          <Button variant="ghost" size="icon" onClick={prevMonth}>
            <ChevronLeft className="w-5 h-5" />
          </Button>
          <span className="font-bold text-lg min-w-[140px] text-center text-primary">
            {format(currentDate, "MMMM yyyy")}
          </span>
          <Button variant="ghost" size="icon" onClick={nextMonth}>
            <ChevronRight className="w-5 h-5" />
          </Button>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-border overflow-hidden">
        {/* Calendar Header */}
        <div className="grid grid-cols-7 bg-gray-50 border-b border-border">
          {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => (
            <div key={day} className="py-3 text-center text-sm font-semibold text-muted-foreground">
              {day}
            </div>
          ))}
        </div>

        {isLoading ? (
          <div className="p-20 flex justify-center">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        ) : (
          <div className="grid grid-cols-7 auto-rows-fr">
            {/* Empty padding days */}
            {padding.map((_, i) => (
              <div key={`pad-${i}`} className="min-h-[120px] p-2 border-r border-b border-border bg-gray-50/30" />
            ))}

            {/* Actual days */}
            {daysInMonth.map((day, i) => {
              const dayEvents = events?.filter(e => isSameDay(new Date(e.jobDate), day)) || [];
              const isCurrentDay = isToday(day);

              return (
                <div key={day.toISOString()} className={`min-h-[120px] p-2 md:p-3 border-r border-b border-border transition-colors hover:bg-gray-50/50 ${isCurrentDay ? 'bg-blue-50/30' : ''}`}>
                  <div className="flex justify-between items-start mb-2">
                    <span className={`inline-flex w-7 h-7 items-center justify-center rounded-full text-sm ${isCurrentDay ? 'bg-primary text-white font-bold' : 'text-foreground font-medium'}`}>
                      {format(day, "d")}
                    </span>
                    {dayEvents.length > 0 && (
                      <span className="text-xs bg-blue-100 text-blue-800 px-1.5 py-0.5 rounded-full font-medium">
                        {dayEvents.length}
                      </span>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    {dayEvents.map(event => (
                      <div key={event.id} className="bg-accent/10 border border-accent/20 rounded-lg p-2 text-xs relative group shadow-sm">
                        <div className="font-semibold text-primary truncate mb-1">
                          {format(new Date(event.jobDate), "HH:mm")} - {event.customerName}
                        </div>
                        <div className="text-muted-foreground truncate flex items-center gap-1">
                          <MapPin className="w-3 h-3 shrink-0" />
                          <span className="truncate">{event.address || "No address"}</span>
                        </div>
                        <button 
                          className="absolute -top-2 -right-2 bg-white rounded-full p-1 shadow-sm border border-border opacity-0 group-hover:opacity-100 transition-opacity text-destructive hover:bg-red-50"
                          onClick={() => handleDelete(event.id)}
                          title="Remove from calendar"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
      
      {/* Legend / Upcoming List for smaller screens could go here if needed, but a clean responsive grid works */}
    </AdminLayout>
  );
}