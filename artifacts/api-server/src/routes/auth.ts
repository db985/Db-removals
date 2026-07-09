import { Router } from "express";

const router = Router();

router.get("/auth/me", (req, res) => {
  res.json({ authenticated: !!(req.session as any).isAdmin });
});

router.post("/auth/login", (req, res) => {
  const { password } = req.body as { password?: string };
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (!adminPassword) {
    res.status(500).json({ error: "Admin password not configured. Set the ADMIN_PASSWORD environment variable." });
    return;
  }

  if (!password || password !== adminPassword) {
    res.status(401).json({ error: "Invalid password" });
    return;
  }

  (req.session as any).isAdmin = true;
  res.json({ authenticated: true });
});

router.post("/auth/logout", (req, res) => {
  req.session.destroy(() => {
    res.json({ authenticated: false });
  });
});

export default router;
