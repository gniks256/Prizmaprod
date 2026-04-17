import "dotenv/config";
import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";
import nodemailer from "nodemailer";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Email API endpoint
  app.post("/api/send-email", async (req, res) => {
    const { subject, html } = req.body;
    
    console.log("SMTP_USER:", process.env.SMTP_USER ? "Defined" : "Undefined");
    console.log("SMTP_PASS:", process.env.SMTP_PASS ? "Defined" : "Undefined");

    // SMTP Configuration
    // For Yandex: 
    // Option 1: host: 'smtp.yandex.ru', port: 465, secure: true (SSL)
    // Option 2: host: 'smtp.yandex.ru', port: 587, secure: false (STARTTLS) - often better for cloud
    const smtpHost = process.env.SMTP_HOST || 'smtp.yandex.ru';
    const smtpPort = parseInt(process.env.SMTP_PORT || '587');
    const smtpUser = process.env.SMTP_USER || 'gniks1@yandex.ru'; 
    const smtpPass = process.env.SMTP_PASS || 'rnpanrlkvdryrezi'; 

    if (!smtpUser || !smtpPass) {
      console.error("Missing SMTP configuration");
      return res.status(500).json({ error: "Email service not configured" });
    }

    console.log(`Setting up transporter for ${smtpUser} via ${smtpHost}:${smtpPort}`);

    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpPort === 465, // true for 465, false for 587
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
      tls: {
        // Do not fail on invalid certs
        rejectUnauthorized: false,
        minVersion: 'TLSv1.2'
      },
      debug: true, // show debug output
      logger: true // log to console
    });

    try {
      console.log("Verifying transporter...");
      await transporter.verify();
      console.log("Transporter verified!");

      console.log(`Attempting to send email via ${smtpHost}:${smtpPort} for user ${smtpUser}`);
      await transporter.sendMail({
        from: smtpUser,
        to: "gniks1@yandex.ru",
        subject: subject || "Новая заявка с сайта PRIZMA",
        html: html,
      });
      console.log("Email sent successfully");
      res.json({ success: true });
    } catch (error) {
      console.error("Detailed Email sending error:", error);
      res.status(500).json({ error: "Failed to send email", details: error instanceof Error ? error.message : String(error) });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
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

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
