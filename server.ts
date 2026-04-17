import "dotenv/config";
import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import nodemailer from "nodemailer";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(express.json());

// Email API endpoint
app.post("/api/send-email", async (req, res) => {
  const { subject, html } = req.body;
  
  // SMTP Configuration
  const smtpHost = process.env.SMTP_HOST || 'smtp.yandex.ru';
  // Try 465 first for Yandex SSL if 587 fails on Vercel
  const smtpPort = parseInt(process.env.SMTP_PORT || '465'); 
  const smtpUser = process.env.SMTP_USER || 'gniks1@yandex.ru'; 
  const smtpPass = process.env.SMTP_PASS || 'rnpanrlkvdryrezi'; 

  const transporter = nodemailer.createTransport({
    host: smtpHost,
    port: smtpPort,
    secure: smtpPort === 465,
    auth: {
      user: smtpUser,
      pass: smtpPass,
    },
    tls: {
      rejectUnauthorized: false,
      minVersion: 'TLSv1.2'
    },
    debug: true,
    logger: true
  });

  try {
    await transporter.verify();
    await transporter.sendMail({
      from: smtpUser,
      to: "gniks1@yandex.ru",
      subject: subject || "Новая заявка с сайта PRIZMA",
      html: html,
    });
    res.json({ success: true });
  } catch (error) {
    console.error("Email error:", error);
    res.status(500).json({ 
      error: "Failed to send email", 
      details: error instanceof Error ? error.message : String(error) 
    });
  }
});

async function startServer() {
  const PORT = 3000;

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  // Only listen if not running as a Vercel serverless function
  if (process.env.NODE_ENV !== "production" || !process.env.VERCEL) {
    app.listen(PORT, "0.0.0.0", () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  }
}

startServer();

export default app;
