import { Router } from "express";
import { db, calendarEventsTable } from "@workspace/db";
import { eq, asc } from "drizzle-orm";

const router = Router();

function requireAdmin(req: any, res: any, next: any) {
  if (!(req.session as any).isAdmin) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }
  next();
}

function formatEvent(e: any) {
  return {
    ...e,
    createdAt: e.createdAt instanceof Date ? e.createdAt.toISOString() : e.createdAt,
    quoteId: e.quoteId ?? null,
    description: e.description ?? null,
    customerName: e.customerName ?? null,
    address: e.address ?? null,
  };
}

// GET /api/calendar — admin only
router.get("/calendar", requireAdmin, async (req, res) => {
  try {
    const events = await db
      .select()
      .from(calendarEventsTable)
      .orderBy(asc(calendarEventsTable.jobDate));
    res.json(events.map(formatEvent));
  } catch (err) {
    req.log.error({ err }, "Failed to list calendar events");
    res.status(500).json({ error: "Internal server error" });
  }
});

// POST /api/calendar — admin only
router.post("/calendar", requireAdmin, async (req, res) => {
  try {
    const { quoteId, title, description, jobDate, customerName, address } = req.body as {
      quoteId?: number;
      title?: string;
      description?: string;
      jobDate?: string;
      customerName?: string;
      address?: string;
    };

    if (!title || !jobDate) {
      res.status(400).json({ error: "title and jobDate are required" });
      return;
    }

    const [event] = await db
      .insert(calendarEventsTable)
      .values({
        quoteId: quoteId || null,
        title,
        description: description || null,
        jobDate,
        customerName: customerName || null,
        address: address || null,
      })
      .returning();

    res.status(201).json(formatEvent(event));
  } catch (err) {
    req.log.error({ err }, "Failed to create calendar event");
    res.status(500).json({ error: "Internal server error" });
  }
});

// DELETE /api/calendar/:id — admin only
router.delete("/calendar/:id", requireAdmin, async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
      res.status(400).json({ error: "Invalid id" });
      return;
    }
    const deleted = await db
      .delete(calendarEventsTable)
      .where(eq(calendarEventsTable.id, id))
      .returning();
    if (!deleted.length) {
      res.status(404).json({ error: "Event not found" });
      return;
    }
    res.json({ success: true });
  } catch (err) {
    req.log.error({ err }, "Failed to delete calendar event");
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
