import React, { useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { 
  Headset, 
  Users, 
  MessageSquare, 
  ShieldAlert, 
  Briefcase, 
  TrendingUp, 
  Mail, 
  Phone, 
  ArrowRight,
  Download,
  Menu,
  X,
  Linkedin
} from 'lucide-react';
import { SiJira, SiSalesforce, SiZendesk } from 'react-icons/si';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

const contactFormSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email address"),
  message: z.string().min(10, "Message must be at least 10 characters")
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

export default function Home() {
  const { toast } = useToast();
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const heroY = useTransform(scrollY, [0, 500], [0, 150]);
  const heroOpacity = useTransform(scrollY, [0, 300], [1, 0]);

  useEffect(() => {
    document.title = "Alex Rivera | Customer Support Specialist & SME";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", "Professional portfolio of Alex Rivera, Customer Support Specialist and Subject Matter Expert with 3+ years experience.");
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      message: ""
    }
  });

  function onSubmit(data: ContactFormValues) {
    console.log("Form submitted:", data);
    toast({
      title: "Message Sent successfully",
      description: "Thank you for reaching out. I will get back to you shortly.",
    });
    form.reset();
  }

  const navLinks = [
    { name: "About", href: "#about" },
    { name: "Experience", href: "#experience" },
    { name: "Skills", href: "#skills" },
    { name: "Achievements", href: "#achievements" },
    { name: "Contact", href: "#contact" }
  ];

  const scrollTo = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.querySelector(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  return (
    <div className="bg-background text-foreground min-h-screen overflow-x-hidden font-sans selection:bg-primary selection:text-primary-foreground">
      
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-background/80 backdrop-blur-lg border-b border-border py-4' : 'bg-transparent py-6'}`}>
        <div className="container mx-auto px-6 md:px-12 flex items-center justify-between">
          <a href="#" onClick={(e) => { e.preventDefault(); scrollTo('#hero'); }} className="text-2xl font-serif font-bold text-foreground">
            A<span className="text-primary">.</span>R
          </a>
          
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a 
                key={link.name}
                href={link.href}
                onClick={(e) => { e.preventDefault(); scrollTo(link.href); }}
                className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors uppercase tracking-wider"
              >
                {link.name}
              </a>
            ))}
            <Button onClick={() => scrollTo('#contact')} variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
              Let's Talk
            </Button>
          </div>

          <button className="md:hidden text-foreground" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-background/95 backdrop-blur-sm pt-24 px-6 md:hidden">
          <div className="flex flex-col space-y-6 text-center">
            {navLinks.map((link) => (
              <a 
                key={link.name}
                href={link.href}
                onClick={(e) => { e.preventDefault(); scrollTo(link.href); }}
                className="text-2xl font-serif text-foreground hover:text-primary transition-colors"
              >
                {link.name}
              </a>
            ))}
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section id="hero" className="relative min-h-[100dvh] flex items-center pt-20 pb-20 overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-20 pointer-events-none" 
             style={{ backgroundImage: 'radial-gradient(circle at 70% 30%, hsl(var(--primary) / 0.15), transparent 40%), radial-gradient(circle at 30% 70%, hsl(var(--secondary) / 0.15), transparent 40%)' }}>
        </div>
        
        <div className="container mx-auto px-6 md:px-12 relative z-10">
          <motion.div 
            style={{ y: heroY, opacity: heroOpacity }}
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="max-w-4xl"
          >
            <motion.div variants={fadeInUp} className="flex items-center gap-4 mb-6">
              <div className="w-12 h-px bg-primary"></div>
              <span className="text-primary font-medium tracking-widest uppercase text-sm">Customer Support Specialist & SME</span>
            </motion.div>
            
            <motion.div variants={fadeInUp}>
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif leading-[1.1] mb-6">
                Calm authority.<br />
                <span className="text-muted-foreground">Exceptional care.</span>
              </h1>
            </motion.div>
            
            <motion.p variants={fadeInUp} className="text-xl md:text-2xl text-muted-foreground mb-10 max-w-2xl font-light leading-relaxed">
              Delivering exceptional customer experiences with 3+ years of expertise in high-stakes escalations and team leadership.
            </motion.p>
            
            <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="h-14 px-8 text-base bg-primary text-primary-foreground hover:bg-primary/90" onClick={() => scrollTo('#contact')}>
                Contact Me <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button size="lg" variant="outline" className="h-14 px-8 text-base border-border hover:bg-card" onClick={() => scrollTo('#contact')}>
                Download Resume <Download className="ml-2 h-5 w-5" />
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 md:py-32 bg-card relative">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeInUp}
            >
              <h2 className="text-4xl md:text-5xl font-serif mb-8">The human element in <span className="text-primary">digital support.</span></h2>
              <div className="space-y-6 text-lg text-muted-foreground font-light">
                <p>
                  With over three years dedicated to customer success, I've built a reputation for turning frustrated users into brand advocates. I don't just close tickets; I solve the underlying problems.
                </p>
                <p>
                  My expertise lies in navigating complex escalations, leading support teams by example, and leveraging CRM tools to streamline workflows without losing the personal touch.
                </p>
                <p>
                  I believe that the best customer support feels less like a transaction and more like a partnership. Calm, authoritative, and genuinely caring.
                </p>
              </div>
              
              <div className="mt-12 grid grid-cols-2 gap-8">
                <div>
                  <h4 className="text-4xl font-serif text-foreground mb-2">3+</h4>
                  <p className="text-sm text-primary uppercase tracking-wider font-medium">Years Experience</p>
                </div>
                <div>
                  <h4 className="text-4xl font-serif text-foreground mb-2">15</h4>
                  <p className="text-sm text-primary uppercase tracking-wider font-medium">Team Members Managed</p>
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="aspect-[4/5] bg-muted rounded-lg overflow-hidden relative border border-border/50">
                 {/* Placeholder for professional headshot */}
                 <div className="absolute inset-0 flex items-center justify-center text-muted-foreground/30 font-serif text-2xl bg-background/50">
                    [ Professional Portrait ]
                 </div>
              </div>
              <div className="absolute -bottom-8 -left-8 w-48 h-48 bg-primary/10 rounded-full blur-3xl -z-10"></div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-24 md:py-32">
        <div className="container mx-auto px-6 md:px-12 max-w-5xl">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center mb-20"
          >
            <h2 className="text-4xl md:text-5xl font-serif mb-6">Professional Journey</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto font-light">
              A track record of stepping into high-pressure environments and establishing order, efficiency, and excellence.
            </p>
          </motion.div>

          <div className="space-y-12">
            {/* Job 1 */}
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="relative pl-8 md:pl-0"
            >
              <div className="md:grid md:grid-cols-[1fr_auto_1fr] md:gap-8 items-start">
                <div className="hidden md:block text-right pt-2 text-muted-foreground">
                  <p className="font-medium text-foreground">Subject Matter Expert</p>
                  <p className="text-sm">Most Recent — Mar 2024</p>
                </div>
                
                <div className="absolute left-0 top-2 md:relative md:flex md:justify-center">
                  <div className="h-4 w-4 rounded-full bg-primary ring-4 ring-background z-10"></div>
                  <div className="absolute top-4 bottom-[-3rem] left-[7px] md:left-1/2 md:-ml-px w-px bg-border -z-10"></div>
                </div>
                
                <div className="bg-card border border-border/50 p-8 rounded-xl hover:border-primary/30 transition-colors">
                  <div className="md:hidden mb-4">
                    <p className="font-medium text-foreground text-lg">Subject Matter Expert</p>
                    <p className="text-sm text-primary">Most Recent — Mar 2024</p>
                  </div>
                  <h3 className="text-2xl font-serif mb-2">Teleperformance</h3>
                  <p className="text-muted-foreground font-light mb-6">
                    Elevated from support agent to SME, taking ownership of team performance and the most critical customer escalations.
                  </p>
                  <ul className="space-y-3 mb-6">
                    <li className="flex items-start gap-3">
                      <ArrowRight className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                      <span className="text-sm text-foreground/80">Managed and mentored a high-performing team of 15 support specialists.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <ArrowRight className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                      <span className="text-sm text-foreground/80">Delivered specialized training programs to improve first-call resolution rates.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <ArrowRight className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                      <span className="text-sm text-foreground/80">Served as the final point of contact for complex, high-stakes escalation cases.</span>
                    </li>
                  </ul>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-background rounded-full text-xs text-muted-foreground border border-border">Jira</span>
                    <span className="px-3 py-1 bg-background rounded-full text-xs text-muted-foreground border border-border">Enterprise CRM</span>
                    <span className="px-3 py-1 bg-background rounded-full text-xs text-muted-foreground border border-border">Team Leadership</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Job 2 */}
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="relative pl-8 md:pl-0"
            >
              <div className="md:grid md:grid-cols-[1fr_auto_1fr] md:gap-8 items-start">
                <div className="hidden md:block text-right pt-2 text-muted-foreground">
                  <p className="font-medium text-foreground">Customer Support Associate</p>
                  <p className="text-sm">Previous</p>
                </div>
                
                <div className="absolute left-0 top-2 md:relative md:flex md:justify-center">
                  <div className="h-4 w-4 rounded-full bg-secondary ring-4 ring-background z-10"></div>
                </div>
                
                <div className="bg-card border border-border/50 p-8 rounded-xl hover:border-secondary/30 transition-colors">
                  <div className="md:hidden mb-4">
                    <p className="font-medium text-foreground text-lg">Customer Support Associate</p>
                    <p className="text-sm text-secondary">Previous</p>
                  </div>
                  <h3 className="text-2xl font-serif mb-2">ONE BCG</h3>
                  <p className="text-muted-foreground font-light mb-6">
                    Built a foundation in empathetic, solutions-oriented customer communication.
                  </p>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <ArrowRight className="w-5 h-5 text-secondary shrink-0 mt-0.5" />
                      <span className="text-sm text-foreground/80">Handled high volumes of customer queries across multiple channels with consistently high satisfaction scores.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <ArrowRight className="w-5 h-5 text-secondary shrink-0 mt-0.5" />
                      <span className="text-sm text-foreground/80">Provided timely, accurate, and comprehensive solutions to technical and billing issues.</span>
                    </li>
                  </ul>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-24 md:py-32 bg-card">
        <div className="container mx-auto px-6 md:px-12">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-serif mb-4">Core Competencies</h2>
            <div className="w-24 h-1 bg-primary mb-8"></div>
          </motion.div>

          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid grid-cols-2 md:grid-cols-4 gap-6"
          >
            {[
              { icon: <Headset className="h-8 w-8" />, title: "Customer Support", color: "text-primary" },
              { icon: <ShieldAlert className="h-8 w-8" />, title: "Escalation Handling", color: "text-secondary" },
              { icon: <Users className="h-8 w-8" />, title: "Team Management", color: "text-primary" },
              { icon: <Briefcase className="h-8 w-8" />, title: "CRM Tools", color: "text-secondary" },
              { icon: <SiJira className="h-8 w-8" />, title: "Jira", color: "text-primary" },
              { icon: <MessageSquare className="h-8 w-8" />, title: "Communication", color: "text-secondary" },
              { icon: <TrendingUp className="h-8 w-8" />, title: "Problem Solving", color: "text-primary" },
              { icon: <Users className="h-8 w-8" />, title: "Training & Mentorship", color: "text-secondary" },
            ].map((skill, index) => (
              <motion.div 
                key={index}
                variants={fadeInUp}
                className="bg-background border border-border/50 p-8 rounded-xl flex flex-col items-center justify-center text-center group hover:border-primary/50 transition-colors"
              >
                <div className={`mb-4 ${skill.color} group-hover:scale-110 transition-transform duration-300`}>
                  {skill.icon}
                </div>
                <h4 className="font-medium">{skill.title}</h4>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Achievements Section */}
      <section id="achievements" className="py-24 md:py-32 relative">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-primary/5 to-transparent pointer-events-none"></div>
        <div className="container mx-auto px-6 md:px-12 relative z-10">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="max-w-3xl mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-serif mb-6">Impact & Results</h2>
            <p className="text-lg text-muted-foreground font-light">
              Numbers matter, but the stories behind them matter more. Here is how I've driven success for both the business and the customer.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="p-8 border border-border bg-card/50 rounded-xl"
            >
              <h3 className="text-5xl font-serif text-primary mb-4">15+</h3>
              <h4 className="text-xl font-medium mb-3">Team Leadership</h4>
              <p className="text-muted-foreground font-light text-sm">
                Successfully managed and scaled a team of 15 support specialists, maintaining high morale and low turnover in a high-pressure environment.
              </p>
            </motion.div>

            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={fadeInUp}
              className="p-8 border border-border bg-card/50 rounded-xl"
            >
              <h3 className="text-5xl font-serif text-secondary mb-4">SME</h3>
              <h4 className="text-xl font-medium mb-3">Subject Matter Authority</h4>
              <p className="text-muted-foreground font-light text-sm">
                Promoted to SME due to deep product knowledge and ability to resolve the most complex technical and account escalations efficiently.
              </p>
            </motion.div>

            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeInUp}
              className="p-8 border border-border bg-card/50 rounded-xl"
            >
              <h3 className="text-5xl font-serif text-primary mb-4">CSAT</h3>
              <h4 className="text-xl font-medium mb-3">Performance Excellence</h4>
              <p className="text-muted-foreground font-light text-sm">
                Consistently exceeded KPIs for response times and customer satisfaction, turning critical escalations into retention stories.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 md:py-32 bg-card relative border-t border-border">
        <div className="container mx-auto px-6 md:px-12 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
            >
              <h2 className="text-4xl md:text-5xl font-serif mb-6">Let's build better <span className="text-primary">experiences.</span></h2>
              <p className="text-lg text-muted-foreground font-light mb-12">
                Whether you're looking for an experienced SME to lead your team, handle complex escalations, or elevate your customer support strategy, I'm ready to talk.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-background rounded-full flex items-center justify-center border border-border">
                    <Mail className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground font-medium uppercase tracking-wider">Email</p>
                    <p className="text-lg">alex.rivera@example.com</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-background rounded-full flex items-center justify-center border border-border">
                    <Phone className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground font-medium uppercase tracking-wider">Phone</p>
                    <p className="text-lg">+1 (555) 123-4567</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-background rounded-full flex items-center justify-center border border-border">
                    <Linkedin className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground font-medium uppercase tracking-wider">LinkedIn</p>
                    <a href="#" className="text-lg hover:text-primary transition-colors">linkedin.com/in/alexrivera</a>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="bg-background p-8 border border-border rounded-xl shadow-xl"
            >
              <h3 className="text-2xl font-serif mb-6">Send a Message</h3>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-muted-foreground">Name</FormLabel>
                        <FormControl>
                          <Input placeholder="John Doe" {...field} className="bg-card border-border h-12" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-muted-foreground">Email</FormLabel>
                        <FormControl>
                          <Input placeholder="john@example.com" type="email" {...field} className="bg-card border-border h-12" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-muted-foreground">Message</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="How can we work together?" 
                            className="min-h-[120px] bg-card border-border resize-none" 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" className="w-full h-12 bg-primary text-primary-foreground hover:bg-primary/90 text-base">
                    Send Message
                  </Button>
                </form>
              </Form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-border bg-background">
        <div className="container mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center justify-between">
          <div className="text-2xl font-serif font-bold text-foreground mb-4 md:mb-0">
            A<span className="text-primary">.</span>R
          </div>
          
          <div className="text-sm text-muted-foreground mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} Alex Rivera. All rights reserved.
          </div>
          
          <div className="flex space-x-6">
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
              <Linkedin className="h-5 w-5" />
            </a>
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
              <Mail className="h-5 w-5" />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
