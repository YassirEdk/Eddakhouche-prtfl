import { useState } from "react";
import emailjs from "@emailjs/browser";
import { Send, CheckCircle, XCircle, Loader2, Mail, User, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";

// ── Fill these in from your EmailJS dashboard ──────────────────────────────
const SERVICE_ID        = "service_j7dwn43";
const TEMPLATE_ID       = "template_kckr4at";   // notification → Yassir
const TEMPLATE_REPLY_ID = "template_7c810do";   // auto-reply  → sender
const PUBLIC_KEY        = "0IElcbHArpiFjJNJJ";
// ──────────────────────────────────────────────────────────────────────────

type Status = "idle" | "sending" | "success" | "fading" | "error";

export const Contact = () => {
  const [status, setStatus] = useState<Status>("idle");
  const [form, setForm]     = useState({ name: "", email: "", message: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    setStatus("sending");

    try {
      const data = { name: form.name, email: form.email, message: form.message };

      // Notification to Yassir
      await emailjs.send(SERVICE_ID, TEMPLATE_ID, data, PUBLIC_KEY);

      // Auto-reply to sender
      await emailjs.send(SERVICE_ID, TEMPLATE_REPLY_ID, {
        ...data,
        from_name: "Eddakhouche Yassir",
      }, PUBLIC_KEY);
      setStatus("success");
      setForm({ name: "", email: "", message: "" });
      setTimeout(() => setStatus("fading"), 2000);
      setTimeout(() => setStatus("idle"), 3000);
    } catch (err) {
      console.error("EmailJS error:", err);
      setStatus("error");
    }
  };

  return (
    <section className="py-12 sm:py-20 px-4 sm:px-6 bg-secondary/30">
      <div className="container max-w-2xl mx-auto">

        {/* Header */}
        <div className="text-center mb-10 sm:mb-14">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-3">
            Me Contacter
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground">
            Une question, une opportunité ? Envoyez-moi un message, je vous réponds rapidement.
          </p>
          <div className="w-12 h-1 rounded-full bg-gradient-to-r from-primary to-primary/30 mx-auto mt-4" />
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">

          {/* Name */}
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Votre nom"
              required
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-border bg-card text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
            />
          </div>

          {/* Email */}
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Votre email"
              required
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-border bg-card text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
            />
          </div>

          {/* Message */}
          <div className="relative">
            <MessageSquare className="absolute left-3 top-4 w-4 h-4 text-muted-foreground" />
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder="Votre message..."
              required
              rows={5}
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-border bg-card text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors resize-none"
            />
          </div>

          {/* Submit button */}
          <Button
            type="submit"
            disabled={status === "sending"}
            className="w-full gap-2 py-3 text-sm font-semibold rounded-xl"
          >
            {status === "sending" ? (
              <><Loader2 className="w-4 h-4 animate-spin" />Envoi en cours...</>
            ) : (
              <><Send className="w-4 h-4" />Envoyer le message</>
            )}
          </Button>

          {/* Success */}
          {(status === "success" || status === "fading") && (
            <div
              className="flex items-center gap-2 text-green-600 dark:text-green-400 bg-green-500/10 border border-green-500/20 rounded-xl px-4 py-3 text-sm"
              style={{ opacity: status === "fading" ? 0 : 1, transition: "opacity 1s ease" }}
            >
              <CheckCircle className="w-4 h-4 flex-shrink-0" />
              Message envoyé avec succès ! Je vous répondrai bientôt.
            </div>
          )}

          {/* Error */}
          {status === "error" && (
            <div className="flex items-center gap-2 text-red-600 dark:text-red-400 bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3 text-sm">
              <XCircle className="w-4 h-4 flex-shrink-0" />
              Une erreur s'est produite. Veuillez réessayer.
            </div>
          )}
        </form>
      </div>
    </section>
  );
};
