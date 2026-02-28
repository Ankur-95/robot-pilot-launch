import { useState } from 'react';
import { Send, Loader2 } from 'lucide-react';
import emailjs from '@emailjs/browser';
import ScrollReveal from '@/components/ScrollReveal';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';

const Contact = () => {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      await emailjs.sendForm(
        'service_5zvm1pi',
        'template_cnu08xj',
        e.currentTarget,
        'euVOrR_3cpj8GUt4m'
      );
      setSubmitted(true);
      toast({ title: "Message sent!", description: "I'll get back to you soon." });
    } catch (error) {
      toast({ title: "Failed to send", description: "Please try again.", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-24 md:py-32 bg-muted/30">
      <div className="container mx-auto px-4 md:px-8">
        <ScrollReveal>
          <div className="text-center mb-16">
            <h2 className="font-display text-3xl md:text-4xl font-bold">Get in Touch</h2>
            <p className="text-muted-foreground mt-2">Let's build something together</p>
          </div>
        </ScrollReveal>

        <div className="max-w-xl mx-auto">
          <ScrollReveal delay={0.1}>
            {submitted ? (
              <div className="glass-card p-8 text-center">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <Send size={20} className="text-primary" />
                </div>
                <h3 className="font-display font-semibold text-lg mb-2">Message Sent!</h3>
                <p className="text-sm text-muted-foreground">I'll get back to you soon.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="glass-card p-6 space-y-4">
                <div>
                  <label htmlFor="name" className="text-sm font-medium mb-1.5 block">Name</label>
                  <Input id="name" name="name" required placeholder="Your name" />
                </div>
                <div>
                  <label htmlFor="email" className="text-sm font-medium mb-1.5 block">Email</label>
                  <Input id="email" name="email" type="email" required placeholder="your@email.com" />
                </div>
                <div>
                  <label htmlFor="message" className="text-sm font-medium mb-1.5 block">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={4}
                    placeholder="Tell me about your project or opportunity..."
                    className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 resize-none"
                  />
                </div>
                <Button type="submit" className="w-full glow-cyan" disabled={loading}>
                  {loading ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
                  {loading ? 'Sending...' : 'Send Message'}
                </Button>
              </form>
            )}
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};

export default Contact;
