import { useState } from "react";
import emailjs from "@emailjs/browser";
import { Send, CheckCircle, XCircle, Loader2, Mail, User, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";

const SERVICE_ID        = "service_j7dwn43";
const TEMPLATE_ID       = "template_kckr4at";
const TEMPLATE_REPLY_ID = "template_7c810do";
const PUBLIC_KEY        = "0IElcbHArpiFjJNJJ";

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
      await emailjs.send(SERVICE_ID, TEMPLATE_ID, data, PUBLIC_KEY);
      await emailjs.send(SERVICE_ID, TEMPLATE_REPLY_ID, { ...data, from_name: "Eddakhouche Yassir" }, PUBLIC_KEY);
      setStatus("success");
      setForm({ name: "", email: "", message: "" });
      setTimeout(() => setStatus("fading"), 2000);
      setTimeout(() => setStatus("idle"), 3000);
    } catch (err) {
      console.error("EmailJS error:", err);
      setStatus("error");
    }
  };

  const inputClass =
    "w-full pl-10 pr-4 py-3 rounded-xl border border-border/50 bg-card/50 backdrop-blur-sm text-foreground text-sm placeholder:text-muted-foreground/60 focus:outline-none focus:border-primary/60 focus:ring-1 focus:ring-primary/40 focus:shadow-[0_0_20px_hsl(var(--primary)/0.12)] transition-all";

  return (
    <section className="relative py-16 sm:py-24 lg:py-32 px-4 sm:px-6">
      <div className="container max-w-2xl mx-auto">
        <div className="text-center mb-12">
          <span className="section-eyebrow block mb-3">06 — Contact</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-cinema-gradient mb-4">Me Contacter</h2>
          <p className="text-sm text-muted-foreground">
            Une question, une opportunité ? Envoyez-moi un message, je vous réponds rapidement.
          </p>
          <div className="w-12 h-px bg-gradient-to-r from-transparent via-primary to-transparent mx-auto mt-5" />
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/60" />
            <input data-cursor="text" name="name" value={form.name} onChange={handleChange} placeholder="Votre nom" required className={inputClass} />
          </div>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/60" />
            <input data-cursor="text" name="email" type="email" value={form.email} onChange={handleChange} placeholder="Votre email" required className={inputClass} />
          </div>
          <div className="relative">
            <MessageSquare className="absolute left-3 top-4 w-4 h-4 text-muted-foreground/60" />
            <textarea data-cursor="text" name="message" value={form.message} onChange={handleChange} placeholder="Votre message..." required rows={4} className={`${inputClass} resize-none`} />
          </div>

          <Button type="submit" disabled={status === "sending"}
            className="w-full gap-2 py-3 text-sm font-bold rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 shadow-[0_0_25px_hsl(var(--primary)/0.35)] hover:shadow-[0_0_35px_hsl(var(--primary)/0.5)] transition-all">
            {status === "sending"
              ? <><Loader2 className="w-4 h-4 animate-spin" />Envoi en cours...</>
              : <><Send className="w-4 h-4" />Envoyer le message</>}
          </Button>

          {(status === "success" || status === "fading") && (
            <div className="flex items-center gap-2 text-green-400 bg-green-500/8 border border-green-500/20 rounded-xl px-4 py-3 text-sm"
              style={{ opacity: status === "fading" ? 0 : 1, transition: "opacity 1s ease" }}>
              <CheckCircle className="w-4 h-4 flex-shrink-0" />
              Message envoyé avec succès ! Je vous répondrai bientôt.
            </div>
          )}
          {status === "error" && (
            <div className="flex items-center gap-2 text-red-400 bg-red-500/8 border border-red-500/20 rounded-xl px-4 py-3 text-sm">
              <XCircle className="w-4 h-4 flex-shrink-0" />
              Une erreur s'est produite. Veuillez réessayer.
            </div>
          )}
        </form>
      </div>
    </section>
  );
};
