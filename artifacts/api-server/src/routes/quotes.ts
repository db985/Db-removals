import { Router } from "express";
import { db, quotesTable } from "@workspace/db";
import { eq, desc, gte, and, count } from "drizzle-orm";
import { Resend } from "resend";

const router = Router();

function requireAdmin(req: any, res: any, next: any) {
  if (!(req.session as any).isAdmin) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }
  next();
}

function formatQuote(q: any) {
  return {
    ...q,
    createdAt: q.createdAt instanceof Date ? q.createdAt.toISOString() : q.createdAt,
    photoUrl: q.photoUrl ?? null,
    adminNotes: q.adminNotes ?? null,
  };
}

// GET /api/quotes — admin only
router.get("/quotes", requireAdmin, async (req, res) => {
  try {
    const { status } = req.query as { status?: string };
    const conditions = [];
    if (status && ["pending", "accepted", "declined"].includes(status)) {
      conditions.push(eq(quotesTable.status, status as any));
    }
    const quotes = await db
      .select()
      .from(quotesTable)
      .where(conditions.length ? and(...conditions) : undefined)
      .orderBy(desc(quotesTable.createdAt));
    res.json(quotes.map(formatQuote));
  } catch (err) {
    req.log.error({ err }, "Failed to list quotes");
    res.status(500).json({ error: "Internal server error" });
  }
});

// GET /api/quotes/stats — admin only
router.get("/quotes/stats", requireAdmin, async (req, res) => {
  try {
    const allQuotes = await db.select().from(quotesTable);
    const total = allQuotes.length;
    const pending = allQuotes.filter((q) => q.status === "pending").length;
    const accepted = allQuotes.filter((q) => q.status === "accepted").length;
    const declined = allQuotes.filter((q) => q.status === "declined").length;

    const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
    const recentCount = allQuotes.filter((q) => new Date(q.createdAt) >= sevenDaysAgo).length;

    res.json({ total, pending, accepted, declined, recentCount });
  } catch (err) {
    req.log.error({ err }, "Failed to get stats");
    res.status(500).json({ error: "Internal server error" });
  }
});

// POST /api/quotes — public
router.post("/quotes", async (req, res) => {
  try {
    const { name, phone, email, address, jobDescription, preferredContact, photoUrl } = req.body as {
      name?: string;
      phone?: string;
      email?: string;
      address?: string;
      jobDescription?: string;
      preferredContact?: string;
      photoUrl?: string;
    };

    if (!name || !phone || !address || !jobDescription || !preferredContact) {
      res.status(400).json({ error: "All required fields must be provided" });
      return;
    }

    if (!["phone", "email", "either"].includes(preferredContact)) {
      res.status(400).json({ error: "Invalid preferredContact value" });
      return;
    }

    const [newQuote] = await db
      .insert(quotesTable)
      .values({
        name,
        phone,
        email,
        address,
        jobDescription,
        preferredContact: preferredContact as any,
        photoUrl: photoUrl || null,
        status: "pending",
      })
      .returning();

    // Send email notification if Resend is configured
    const resendKey = process.env.RESEND_API_KEY;
    const notifyEmail = process.env.NOTIFY_EMAIL;
    if (resendKey && notifyEmail) {
      try {
        const resend = new Resend(resendKey);
        const toAddresses = notifyEmail.split(",").map((e) => e.trim()).filter(Boolean);
        await resend.emails.send({
          from: "DB Removals <onboarding@resend.dev>",
          to: toAddresses,
          subject: `New Quote Request from ${name}`,
          html: `
            <h2>New Quote Request</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Phone:</strong> ${phone}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Address:</strong> ${address}</p>
            <p><strong>Job Description:</strong> ${jobDescription}</p>
            <p><strong>Preferred Contact:</strong> ${preferredContact}</p>
            ${photoUrl ? `<p><strong>Photo:</strong> <a href="${photoUrl}">View Photo</a></p>` : ""}
          `,
        });
      } catch (emailErr) {
        req.log.warn({ emailErr }, "Failed to send email notification");
      }
    }

    res.status(201).json(formatQuote(newQuote));
  } catch (err) {
    req.log.error({ err }, "Failed to create quote");
    res.status(500).json({ error: "Internal server error" });
  }
});

// GET /api/quotes/:id — admin only
router.get("/quotes/:id", requireAdmin, async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
      res.status(400).json({ error: "Invalid id" });
      return;
    }
    const [quote] = await db.select().from(quotesTable).where(eq(quotesTable.id, id));
    if (!quote) {
      res.status(404).json({ error: "Quote not found" });
      return;
    }
    res.json(formatQuote(quote));
  } catch (err) {
    req.log.error({ err }, "Failed to get quote");
    res.status(500).json({ error: "Internal server error" });
  }
});

// PATCH /api/quotes/:id — admin only
router.patch("/quotes/:id", requireAdmin, async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
      res.status(400).json({ error: "Invalid id" });
      return;
    }
    const { status, adminNotes } = req.body as { status?: string; adminNotes?: string };

    const updates: Record<string, any> = {};
    if (status && ["pending", "accepted", "declined"].includes(status)) {
      updates.status = status;
    }
    if (adminNotes !== undefined) {
      updates.adminNotes = adminNotes;
    }

    if (Object.keys(updates).length === 0) {
      res.status(400).json({ error: "No valid fields to update" });
      return;
    }

    const [updated] = await db
      .update(quotesTable)
      .set(updates)
      .where(eq(quotesTable.id, id))
      .returning();

    if (!updated) {
      res.status(404).json({ error: "Quote not found" });
      return;
    }
    res.json(formatQuote(updated));
  } catch (err) {
    req.log.error({ err }, "Failed to update quote");
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
