import React, { useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { 
  Headset, 
  Users, 
  MessageSquare, 
  ShieldCheck, 
  Briefcase, 
  TrendingUp, 
  Mail, 
  Phone, 
  ArrowRight,
  Download,
  Menu,
  X,
  Linkedin,
  MapPin,
  Activity,
  Wrench,
  Code2,
  Monitor,
  Globe,
  FileBarChart,
  Bot,
  GraduationCap,
  Award,
  CheckCircle2
} from 'lucide-react';
import { SiJira } from 'react-icons/si';
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
    document.title = "Vidyadhar Jabade | Technical Support Specialist";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", "Professional portfolio of Vidyadhar Jabade, Technical Support Specialist and Subject Matter Expert with 3+ years of experience in IT operations and team leadership.");
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

  async function onSubmit(data: ContactFormValues) {
    const accessKey = import.meta.env.VITE_WEB3FORMS_KEY;

    if (!accessKey) {
      toast({
        title: "Configuration Error",
        description: "Email service is not configured yet. Please contact me directly at jabadevidyadhar@gmail.com",
        variant: "destructive",
      });
      return;
    }

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          access_key: accessKey,
          name: data.name,
          email: data.email,
          message: data.message,
          subject: `New Portfolio Message from ${data.name}`,
        }),
      });

      const result = await response.json();

      if (result.success) {
        toast({
          title: "Message Sent Successfully",
          description: "Thank you for reaching out. I will get back to you shortly.",
        });
        form.reset();
      } else {
        throw new Error(result.message || "Submission failed");
      }
    } catch (error: any) {
      console.error("Web3Forms error:", error);
      toast({
        title: "Failed to Send Message",
        description: "Something went wrong. Please email me directly at jabadevidyadhar@gmail.com",
        variant: "destructive",
      });
    }
  }

  const navLinks = [
    { name: "About", href: "#about" },
    { name: "Experience", href: "#experience" },
    { name: "Skills", href: "#skills" },
    { name: "Achievements", href: "#achievements" },
    { name: "Education", href: "#education" },
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
      transition: { staggerChildren: 0.15 }
    }
  };

  const skills = [
    { icon: <Headset className="h-7 w-7" />, title: "Technical Support", color: "text-primary" },
    { icon: <Users className="h-7 w-7" />, title: "Team Leadership", color: "text-secondary" },
    { icon: <Activity className="h-7 w-7" />, title: "Performance Monitoring", color: "text-primary" },
    { icon: <TrendingUp className="h-7 w-7" />, title: "Process Improvement", color: "text-secondary" },
    { icon: <FileBarChart className="h-7 w-7" />, title: "Reporting & Analysis", color: "text-primary" },
    { icon: <Bot className="h-7 w-7" />, title: "Automation Testing", color: "text-secondary" },
    { icon: <ShieldCheck className="h-7 w-7" />, title: "Security Testing", color: "text-primary" },
    { icon: <CheckCircle2 className="h-7 w-7" />, title: "QA Testing", color: "text-secondary" },
    { icon: <Wrench className="h-7 w-7" />, title: "Troubleshooting", color: "text-primary" },
    { icon: <Globe className="h-7 w-7" />, title: "Remote Support", color: "text-secondary" },
    { icon: <Code2 className="h-7 w-7" />, title: "Java Programming", color: "text-primary" },
    { icon: <Monitor className="h-7 w-7" />, title: "Operating Systems", color: "text-secondary" },
    { icon: <SiJira className="h-7 w-7" />, title: "Jira", color: "text-primary" },
    { icon: <MessageSquare className="h-7 w-7" />, title: "Customer Service", color: "text-secondary" },
    { icon: <Briefcase className="h-7 w-7" />, title: "Microsoft 365", color: "text-primary" },
  ];

  return (
    <div className="bg-background text-foreground min-h-screen overflow-x-hidden font-sans selection:bg-primary selection:text-primary-foreground">

      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-background/80 backdrop-blur-lg border-b border-border py-4' : 'bg-transparent py-6'}`}>
        <div className="container mx-auto px-6 md:px-12 flex items-center justify-between">
          <a href="#" onClick={(e) => { e.preventDefault(); scrollTo('#hero'); }} className="text-2xl font-serif font-bold text-foreground">
            V<span className="text-primary">.</span>J
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
        <div className="absolute inset-0 z-0 pointer-events-none"
          style={{ backgroundImage: 'radial-gradient(circle at 70% 30%, hsl(var(--primary) / 0.12), transparent 40%), radial-gradient(circle at 20% 80%, hsl(var(--secondary) / 0.08), transparent 40%)' }}>
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
              <span className="text-primary font-medium tracking-widest uppercase text-sm">Technical Support Specialist & SME</span>
            </motion.div>

            <motion.div variants={fadeInUp}>
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif leading-[1.05] mb-4">
                Vidyadhar<br />
                <span className="text-muted-foreground">Jabade.</span>
              </h1>
            </motion.div>

            <motion.p variants={fadeInUp} className="text-xl md:text-2xl text-muted-foreground mb-3 font-light">
              Delivering exceptional customer experiences with 3+ years of experience
            </motion.p>
            <motion.p variants={fadeInUp} className="text-base text-muted-foreground/70 mb-10 max-w-2xl font-light leading-relaxed flex items-center gap-2">
              <MapPin className="h-4 w-4 text-primary shrink-0" /> New Delhi, India
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
              <h2 className="text-4xl md:text-5xl font-serif mb-8">Results-driven tech support with a <span className="text-primary">leadership edge.</span></h2>
              <div className="space-y-5 text-lg text-muted-foreground font-light">
                <p>
                  Results-oriented IT operations professional with 3+ years of experience, specializing in technical support and team leadership for global enterprise clients.
                </p>
                <p>
                  At Teleperformance, I supported Adobe users across North America and Europe, resolving complex system issues — then advanced to Subject Matter Expert, where I mentored teams and drove performance through targeted coaching and knowledge-sharing programs.
                </p>
                <p>
                  I bring a rare combination of deep technical knowledge and genuine people-first communication. Whether it's diagnosing system failures remotely or developing junior team members, I lead with clarity and care.
                </p>
              </div>

              <div className="mt-12 grid grid-cols-3 gap-8">
                <div>
                  <h4 className="text-4xl font-serif text-foreground mb-2">3+</h4>
                  <p className="text-sm text-primary uppercase tracking-wider font-medium">Years Experience</p>
                </div>
                <div>
                  <h4 className="text-4xl font-serif text-foreground mb-2">15+</h4>
                  <p className="text-sm text-primary uppercase tracking-wider font-medium">Team Members</p>
                </div>
                <div>
                  <h4 className="text-4xl font-serif text-foreground mb-2">2</h4>
                  <p className="text-sm text-primary uppercase tracking-wider font-medium">Companies</p>
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
              <div className="bg-background/60 border border-border/50 rounded-xl p-8 space-y-6">
                <div>
                  <p className="text-xs text-primary uppercase tracking-widest font-medium mb-3">Professional Summary</p>
                  <p className="text-foreground/80 font-light leading-relaxed">
                    Results-oriented IT operations professional with a proven ability to optimize processes, enhance team productivity, and drive customer satisfaction through effective communication and problem-solving skills.
                  </p>
                </div>
                <div className="border-t border-border pt-6">
                  <p className="text-xs text-primary uppercase tracking-widest font-medium mb-3">Languages</p>
                  <div className="flex gap-4">
                    <span className="px-4 py-2 bg-card rounded-full text-sm border border-border">Hindi — Native</span>
                    <span className="px-4 py-2 bg-card rounded-full text-sm border border-border">English — Proficient</span>
                  </div>
                </div>
                <div className="border-t border-border pt-6">
                  <p className="text-xs text-primary uppercase tracking-widest font-medium mb-3">Certification</p>
                  <div className="flex items-center gap-3">
                    <Award className="h-5 w-5 text-primary shrink-0" />
                    <span className="text-foreground/80 text-sm">JUMP Certification For Team Leader — Teleperformance (2025)</span>
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-8 -right-8 w-48 h-48 bg-primary/10 rounded-full blur-3xl -z-10"></div>
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

          <div className="space-y-10">

            {/* Job 1 — SME */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="relative pl-8 md:pl-0"
            >
              <div className="md:grid md:grid-cols-[1fr_auto_1fr] md:gap-8 items-start">
                <div className="hidden md:block text-right pt-2">
                  <p className="font-semibold text-foreground">Subject Matter Expert</p>
                  <p className="text-sm text-primary font-medium">Mar 2025 — Mar 2026</p>
                  <p className="text-sm text-muted-foreground mt-1">New Delhi, India</p>
                </div>

                <div className="absolute left-0 top-2 md:relative md:flex md:justify-center">
                  <div className="h-4 w-4 rounded-full bg-primary ring-4 ring-background z-10"></div>
                  <div className="absolute top-4 bottom-[-2.5rem] left-[7px] md:left-1/2 md:-ml-px w-px bg-border -z-10 md:hidden"></div>
                </div>

                <div className="bg-card border border-border/50 p-8 rounded-xl hover:border-primary/40 transition-colors group">
                  <div className="md:hidden mb-4">
                    <p className="font-semibold text-foreground text-lg">Subject Matter Expert</p>
                    <p className="text-sm text-primary font-medium">Mar 2025 — Mar 2026</p>
                  </div>
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-2xl font-serif">Teleperformance</h3>
                    <span className="px-2 py-0.5 bg-primary/10 text-primary text-xs rounded-full font-medium border border-primary/20">Adobe Process</span>
                  </div>
                  <p className="text-muted-foreground font-light mb-6 text-sm leading-relaxed">
                    Technical Support — Elevated to SME for deep product expertise and leadership capability. Took ownership of team performance and the most critical customer escalations.
                  </p>
                  <ul className="space-y-3 mb-6">
                    {[
                      "Mentored and coached support representatives, enhancing team productivity through targeted training programs.",
                      "Monitored key team performance indicators, generating comprehensive business reports to inform management decisions.",
                      "Facilitated team huddles, meetings, and coaching sessions to foster collaboration and skill development.",
                      "Implemented best practices for knowledge sharing, cultivating a continuous learning environment.",
                      "Guided junior team members, supporting their professional growth and development paths."
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <ArrowRight className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                        <span className="text-sm text-foreground/80">{item}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="flex flex-wrap gap-2">
                    {["Team Leadership", "Performance Monitoring", "Coaching", "Process Improvement", "Reporting"].map(t => (
                      <span key={t} className="px-3 py-1 bg-background rounded-full text-xs text-muted-foreground border border-border">{t}</span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Connector Line */}
            <div className="hidden md:flex justify-center">
              <div className="w-px h-10 bg-border"></div>
            </div>

            {/* Job 2 — Technical Support Engineer */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="relative pl-8 md:pl-0"
            >
              <div className="md:grid md:grid-cols-[1fr_auto_1fr] md:gap-8 items-start">
                <div className="hidden md:block text-right pt-2">
                  <p className="font-semibold text-foreground">Technical Support Engineer</p>
                  <p className="text-sm text-secondary font-medium">Jan 2024 — Feb 2025</p>
                  <p className="text-sm text-muted-foreground mt-1">Jaipur, India</p>
                </div>

                <div className="absolute left-0 top-2 md:relative md:flex md:justify-center">
                  <div className="h-4 w-4 rounded-full bg-secondary ring-4 ring-background z-10"></div>
                  <div className="absolute top-4 bottom-[-2.5rem] left-[7px] md:left-1/2 md:-ml-px w-px bg-border -z-10 md:hidden"></div>
                </div>

                <div className="bg-card border border-border/50 p-8 rounded-xl hover:border-secondary/40 transition-colors">
                  <div className="md:hidden mb-4">
                    <p className="font-semibold text-foreground text-lg">Technical Support Engineer</p>
                    <p className="text-sm text-secondary font-medium">Jan 2024 — Feb 2025</p>
                  </div>
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-2xl font-serif">Teleperformance</h3>
                    <span className="px-2 py-0.5 bg-secondary/10 text-secondary text-xs rounded-full font-medium border border-secondary/20">Adobe Process</span>
                  </div>
                  <p className="text-muted-foreground font-light mb-6 text-sm leading-relaxed">
                    Delivered enterprise-grade technical support to Adobe users across North America and Europe, managing complex system issues with a calm and methodical approach.
                  </p>
                  <ul className="space-y-3 mb-6">
                    {[
                      "Delivered comprehensive technical support to Adobe users across North America and Europe, resolving diverse system issues.",
                      "Provided expert assistance with software installations and operating system configurations.",
                      "Performed remote troubleshooting sessions to diagnose and resolve complex system problems.",
                      "Enhanced customer satisfaction ratings by adeptly resolving technical challenges.",
                      "Tracked and analyzed KPIs, developing strategies for continuous process enhancement."
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <ArrowRight className="w-4 h-4 text-secondary shrink-0 mt-0.5" />
                        <span className="text-sm text-foreground/80">{item}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="flex flex-wrap gap-2">
                    {["Remote Support", "System Installation", "Troubleshooting", "KPI Tracking", "Customer Service"].map(t => (
                      <span key={t} className="px-3 py-1 bg-background rounded-full text-xs text-muted-foreground border border-border">{t}</span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Connector Line */}
            <div className="hidden md:flex justify-center">
              <div className="w-px h-10 bg-border"></div>
            </div>

            {/* Job 3 — QA Engineer */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="relative pl-8 md:pl-0"
            >
              <div className="md:grid md:grid-cols-[1fr_auto_1fr] md:gap-8 items-start">
                <div className="hidden md:block text-right pt-2">
                  <p className="font-semibold text-foreground">QA Engineer</p>
                  <p className="text-sm text-primary font-medium">Feb 2022 — Apr 2023</p>
                  <p className="text-sm text-muted-foreground mt-1">Noida, India</p>
                </div>

                <div className="absolute left-0 top-2 md:relative md:flex md:justify-center">
                  <div className="h-4 w-4 rounded-full bg-primary/60 ring-4 ring-background z-10"></div>
                </div>

                <div className="bg-card border border-border/50 p-8 rounded-xl hover:border-primary/30 transition-colors">
                  <div className="md:hidden mb-4">
                    <p className="font-semibold text-foreground text-lg">QA Engineer</p>
                    <p className="text-sm text-primary font-medium">Feb 2022 — Apr 2023</p>
                  </div>
                  <h3 className="text-2xl font-serif mb-2">ONE BCG</h3>
                  <p className="text-muted-foreground font-light mb-6 text-sm leading-relaxed">
                    Built a strong technical foundation in quality assurance, security testing, and automation — skills that would later become central to delivering robust support solutions.
                  </p>
                  <ul className="space-y-3 mb-6">
                    {[
                      "Developed and executed robust security tests, delivering detailed reports and analysis to development teams.",
                      "Spearheaded automation testing initiatives, significantly reducing manual testing hours and improving operational efficiency."
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <ArrowRight className="w-4 h-4 text-primary/70 shrink-0 mt-0.5" />
                        <span className="text-sm text-foreground/80">{item}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="flex flex-wrap gap-2">
                    {["Automation Testing", "Security Testing", "QA Testing", "Java", "Reporting"].map(t => (
                      <span key={t} className="px-3 py-1 bg-background rounded-full text-xs text-muted-foreground border border-border">{t}</span>
                    ))}
                  </div>
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
            <div className="w-24 h-1 bg-primary mb-4"></div>
            <p className="text-muted-foreground font-light text-lg max-w-2xl">
              A versatile skill set spanning technical operations, quality assurance, and people leadership.
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4"
          >
            {skills.map((skill, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="bg-background border border-border/50 p-6 rounded-xl flex flex-col items-center justify-center text-center group hover:border-primary/50 hover:bg-primary/5 transition-all duration-300"
              >
                <div className={`mb-3 ${skill.color} group-hover:scale-110 transition-transform duration-300`}>
                  {skill.icon}
                </div>
                <h4 className="font-medium text-sm leading-tight">{skill.title}</h4>
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
              Numbers tell the story. Here is how I've driven success for both the business and the customer.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {[
              { stat: "Top", label: "Performer", sub: "Recognized in December 2024 for exceeding service delivery expectations and achieving high client satisfaction." },
              { stat: "CSAT", label: "Excellence", sub: "Consistently enhanced customer satisfaction ratings by resolving complex technical challenges for Adobe users." },
              { stat: "SME", label: "Promotion", sub: "Advanced from Technical Support Engineer to Subject Matter Expert through demonstrated expertise and leadership." },
              { stat: "2025", label: "JUMP Certified", sub: "Awarded the JUMP Certification for Team Leader by Teleperformance, recognizing leadership potential." }
            ].map((item, i) => (
              <motion.div
                key={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
                className="p-8 border border-border bg-card/50 rounded-xl hover:border-primary/30 transition-colors"
              >
                <h3 className={`text-4xl font-serif mb-2 ${i % 2 === 0 ? 'text-primary' : 'text-secondary'}`}>{item.stat}</h3>
                <h4 className="text-lg font-medium mb-3">{item.label}</h4>
                <p className="text-muted-foreground font-light text-sm leading-relaxed">{item.sub}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="space-y-4"
          >
            <p className="text-xs text-primary uppercase tracking-widest font-medium mb-6">Notable Achievements</p>
            {[
              "Spearheaded automation testing initiatives at ONE BCG, significantly reducing manual testing hours and boosting operational efficiency.",
              "Mentored and coached support representatives at Teleperformance, elevating team productivity and fostering a culture of continuous learning.",
              "Enhanced customer satisfaction by resolving complex technical challenges for Adobe users across North America and Europe.",
              "Recognized as a top performer in December 2024 for consistently exceeding service delivery expectations and achieving high client satisfaction."
            ].map((achievement, i) => (
              <motion.div
                key={i}
                variants={fadeInUp}
                className="flex items-start gap-4 p-5 bg-card border border-border/50 rounded-xl hover:border-primary/30 transition-colors"
              >
                <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <p className="text-foreground/80 font-light">{achievement}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Education Section */}
      <section id="education" className="py-24 md:py-32 bg-card">
        <div className="container mx-auto px-6 md:px-12 max-w-4xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-serif mb-4">Education</h2>
            <div className="w-24 h-1 bg-primary"></div>
          </motion.div>

          <div className="space-y-6">
            {[
              {
                degree: "Master of Computer Applications",
                school: "BVICAM — Guru Gobind Singh Indraprastha University",
                period: "Oct 2020 — Jun 2022",
                color: "text-primary"
              },
              {
                degree: "12th — Science",
                school: "Kendriya Vidyalaya",
                period: "Apr 2015 — Apr 2016",
                color: "text-secondary"
              }
            ].map((edu, i) => (
              <motion.div
                key={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
                className="flex items-start gap-6 p-8 bg-background border border-border/50 rounded-xl hover:border-primary/30 transition-colors"
              >
                <div className={`${edu.color} mt-1`}>
                  <GraduationCap className="h-7 w-7" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-serif mb-1">{edu.degree}</h3>
                  <p className="text-muted-foreground font-light mb-2">{edu.school}</p>
                  <span className={`text-sm font-medium ${edu.color}`}>{edu.period}</span>
                </div>
              </motion.div>
            ))}

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="flex items-start gap-6 p-8 bg-background border border-border/50 rounded-xl hover:border-primary/30 transition-colors"
            >
              <div className="text-primary mt-1">
                <Award className="h-7 w-7" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-serif mb-1">JUMP Certification For Team Leader</h3>
                <p className="text-muted-foreground font-light mb-2">Teleperformance</p>
                <span className="text-sm font-medium text-primary">2025</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 md:py-32 relative border-t border-border">
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
                Whether you're looking for an experienced Technical Support Specialist to lead your team, handle complex escalations, or elevate your customer support operations — I'm ready to talk.
              </p>

              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-card rounded-full flex items-center justify-center border border-border shrink-0">
                    <Mail className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider mb-1">Email</p>
                    <a href="mailto:jabadevidyadhar@gmail.com" className="text-base hover:text-primary transition-colors">jabadevidyadhar@gmail.com</a>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-card rounded-full flex items-center justify-center border border-border shrink-0">
                    <Phone className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider mb-1">Phone</p>
                    <a href="tel:+918700561370" className="text-base hover:text-primary transition-colors">+91 87005 61370</a>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-card rounded-full flex items-center justify-center border border-border shrink-0">
                    <MapPin className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider mb-1">Location</p>
                    <p className="text-base">New Delhi, India</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-card rounded-full flex items-center justify-center border border-border shrink-0">
                    <Linkedin className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider mb-1">LinkedIn</p>
                    <a href="https://linkedin.com/in/vidyadharjabade" target="_blank" rel="noopener noreferrer" className="text-base hover:text-primary transition-colors">linkedin.com/in/vidyadharjabade</a>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="bg-card p-8 border border-border rounded-xl shadow-xl"
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
                          <Input placeholder="Your name" {...field} className="bg-background border-border h-12" data-testid="input-name" />
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
                          <Input placeholder="your@email.com" type="email" {...field} className="bg-background border-border h-12" data-testid="input-email" />
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
                            className="min-h-[120px] bg-background border-border resize-none"
                            {...field}
                            data-testid="textarea-message"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" className="w-full h-12 bg-primary text-primary-foreground hover:bg-primary/90 text-base" data-testid="button-submit">
                    Send Message
                  </Button>
                </form>
              </Form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-border bg-card">
        <div className="container mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-2xl font-serif font-bold text-foreground">
            V<span className="text-primary">.</span>J
          </div>

          <div className="text-sm text-muted-foreground text-center">
            &copy; {new Date().getFullYear()} Vidyadhar Jabade. All rights reserved.
          </div>

          <div className="flex space-x-6">
            <a href="https://linkedin.com/in/vidyadharjabade" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors" data-testid="link-linkedin">
              <Linkedin className="h-5 w-5" />
            </a>
            <a href="mailto:jabadevidyadhar@gmail.com" className="text-muted-foreground hover:text-primary transition-colors" data-testid="link-email">
              <Mail className="h-5 w-5" />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
