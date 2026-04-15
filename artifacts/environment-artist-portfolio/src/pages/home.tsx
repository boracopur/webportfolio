import React, { useEffect, useState, useRef } from 'react';
import { portfolioData } from '@/portfolio-data';
import {
  ArrowRight,
  ArrowUpRight,
  ExternalLink,
  Mail,
  Menu,
  X,
} from 'lucide-react';
import { motion, AnimatePresence, useInView, useReducedMotion } from 'framer-motion';

const EASE = [0.22, 1, 0.36, 1] as const;

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, delay, ease: EASE },
  }),
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: (delay = 0) => ({
    opacity: 1,
    transition: { duration: 0.6, delay, ease: EASE },
  }),
};

function RevealLine({ className = '' }: { className?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const prefersReduced = useReducedMotion();
  return (
    <motion.div
      ref={ref}
      className={`origin-left ${className}`}
      initial={{ scaleX: prefersReduced ? 1 : 0 }}
      animate={inView ? { scaleX: 1 } : { scaleX: prefersReduced ? 1 : 0 }}
      transition={{ duration: 0.8, ease: EASE }}
    />
  );
}

function SectionReveal({
  children,
  className = '',
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const prefersReduced = useReducedMotion();

  if (prefersReduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 18 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
      transition={{ duration: 0.65, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

const SCRAMBLE_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const ROTATING_WORDS = ['ATMOSPHERES', 'ENVIRONMENTS', 'SPACES'];

function ScrambleText({ word }: { word: string }) {
  const [displayed, setDisplayed] = useState(word);
  const targetRef = useRef('');
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (word === targetRef.current) return;
    targetRef.current = word;

    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }

    // Always runs — no reduced-motion bypass.
    // This word transition is intentional identity, not decorative animation.
    const TICK = 16;   // ms per frame — fast internal cycling (≈60fps feel)
    const TOTAL = 100; // frames — 100 × 16ms = 1600ms total

    let frame = 0;

    timerRef.current = setInterval(() => {
      frame++;
      const progress = frame / TOTAL;

      // Left-to-right resolve wave: char i locks in at resolveAt fraction
      // Window: char 0 resolves at 30% (480ms), last char at 75% (1200ms)
      const result = Array.from({ length: word.length }, (_, i) => {
        const resolveAt = (i / word.length) * 0.45 + 0.30;
        if (progress >= resolveAt) return word[i];
        return SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
      }).join('');

      setDisplayed(result);

      if (frame >= TOTAL) {
        clearInterval(timerRef.current!);
        timerRef.current = null;
        setDisplayed(word);
      }
    }, TICK);

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [word]);

  return (
    <span
      role="text"
      aria-label={word}
      className="font-display text-sm sm:text-xl md:text-2xl lg:text-3xl uppercase tracking-wide text-foreground/52 inline-block min-w-[5em] sm:min-w-[9em]"
      style={{ whiteSpace: 'nowrap', lineHeight: 'inherit' }}
    >
      {displayed}
    </span>
  );
}

export default function Home() {
  const [activeProject, setActiveProject] = useState<string | null>(null);
  const [wordIndex, setWordIndex] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex(i => (i + 1) % ROTATING_WORDS.length);
    }, 3800);
    return () => clearInterval(interval);
  }, []);


  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setMenuOpen(false); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  useEffect(() => {
    document.title = `${portfolioData.profile.name} - ${portfolioData.profile.role}`;
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', portfolioData.profile.summary);
    } else {
      const meta = document.createElement('meta');
      meta.name = 'description';
      meta.content = portfolioData.profile.summary;
      document.head.appendChild(meta);
    }
  }, []);

  return (
    <div className="min-h-screen w-full overflow-x-hidden">

      {/* Static accent grid background */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          backgroundSize: '120px 120px',
          backgroundImage: 'linear-gradient(to right, rgba(102,50,50,0.12) 1px, transparent 1px), linear-gradient(to bottom, rgba(102,50,50,0.12) 1px, transparent 1px)',
          zIndex: 0,
        }}
      />

      {/* Content — sits above fixed parallax layers */}
      <div className="relative" style={{ zIndex: 1 }}>

      {/* Navigation */}
      <header className="fixed top-0 left-0 right-0 z-40 px-5 md:px-12 py-5 flex justify-between items-center">
        <div />
        <nav className="hidden md:flex items-center gap-8 lg:gap-10 font-sans text-xs uppercase tracking-[0.18em] text-foreground/38">
          <a href="#work" className="hover:text-foreground/70 transition-colors duration-300">Works</a>
          <a href="#about" className="hover:text-foreground/70 transition-colors duration-300">About</a>
          <a href="#contact" className="hover:text-foreground/70 transition-colors duration-300">Contact</a>
        </nav>
        <button
          className="md:hidden text-foreground/50 hover:text-foreground/80 transition-colors duration-200"
          onClick={() => setMenuOpen(v => !v)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
        </button>
      </header>

      {/* Mobile menu panel */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed top-[57px] left-0 right-0 z-30 bg-background px-5 py-6 flex flex-col gap-5 md:hidden"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.22, ease: EASE }}
          >
            {[
              { label: 'Works', href: '#work' },
              { label: 'About', href: '#about' },
              { label: 'Contact', href: '#contact' },
            ].map(({ label, href }) => (
              <a
                key={href}
                href={href}
                onClick={() => setMenuOpen(false)}
                className="font-sans text-sm uppercase tracking-[0.18em] text-foreground/55 hover:text-foreground/85 transition-colors duration-200"
              >
                {label}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero */}
      <section
        className="relative min-h-[100dvh] flex items-center px-6 md:px-12 lg:px-24 pt-20 overflow-hidden"
      >

        <div className="relative z-10 w-full max-w-5xl">
          <div>
            {/* Line 1: Name — primary identity */}
            <motion.h1
              custom={0.05}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="font-display uppercase leading-[0.88] tracking-wide mb-4"
              style={{ fontSize: 'clamp(1.75rem, 7vw, 4.5rem)' }}
            >
              {portfolioData.profile.name.toUpperCase()}
            </motion.h1>

            {/* Line 2: Role — stable descriptor */}
            <motion.div
              custom={0.18}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="font-sans text-xs md:text-sm uppercase tracking-[0.12em] md:tracking-[0.22em] text-foreground/42 mb-8"
            >
              3D Environment Artist
            </motion.div>

            {/* Line 3: BUILDING [rotating word] — BUILDING is fully static */}
            <motion.div
              custom={0.28}
              variants={fadeIn}
              initial="hidden"
              animate="visible"
              className="flex items-baseline gap-2 md:gap-3 mb-8 md:mb-12"
            >
              {/* BUILDING: zero animation, never touched */}
              <span className="font-display text-sm sm:text-xl md:text-2xl lg:text-3xl uppercase tracking-wide text-foreground/28 flex-shrink-0">
                BUILDING
              </span>
              {/* Rotating word: fixed-width container prevents any layout shift */}
              <ScrambleText word={ROTATING_WORDS[wordIndex]} />
            </motion.div>

            <motion.div
              custom={0.4}
              variants={fadeIn}
              initial="hidden"
              animate="visible"
              className="flex flex-col sm:flex-row gap-3"
            >
              <button
                onClick={() => document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' })}
                className="inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary/85 text-white font-sans text-xs uppercase tracking-wider px-7 py-3.5 transition-colors duration-300 w-full sm:w-auto"
              >
                View Work <ArrowRight className="h-3.5 w-3.5" />
              </button>
              <button
                onClick={() => window.open(`mailto:${portfolioData.profile.contact.email}`, '_blank')}
                className="inline-flex items-center justify-center gap-2 border border-foreground/25 hover:border-foreground/50 text-foreground/60 hover:text-foreground/90 font-sans text-xs uppercase tracking-wider px-7 py-3.5 transition-all duration-300 w-full sm:w-auto"
              >
                Contact <Mail className="h-3.5 w-3.5" />
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="py-16 md:py-28 px-5 md:px-12 lg:px-24">
        <div className="max-w-5xl grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16 items-start">
          <SectionReveal>
            <div className="w-fit mb-6">
              <h2 className="text-3xl md:text-4xl font-display uppercase mb-2 text-foreground tracking-wide">
                About Me
              </h2>
              <RevealLine className="h-0.5 bg-primary/30 w-full" />
            </div>
            <p className="text-base text-foreground/65 leading-relaxed font-sans">
              {portfolioData.profile.about}
            </p>
          </SectionReveal>

          <div className="grid grid-cols-2 gap-5 lg:mt-16">
            {[
              { value: '3+', label: 'Years of Experience', personal: false },
              { value: '3', label: 'Shipped Titles', personal: false },
              { value: '4', label: 'Studios', personal: false },
              { value: '999+', label: 'Cups of Coffee', personal: true },
            ].map((stat, i) => (
              <SectionReveal key={stat.label} delay={i * 0.07}>
                <div className={`border-l-2 pl-4 py-1 ${stat.personal ? 'border-foreground/15 opacity-50' : 'border-primary/45'}`}>
                  <div className={`text-3xl font-display tracking-wide ${stat.personal ? 'text-foreground/50' : 'text-foreground'}`}>
                    {stat.value}
                  </div>
                  <div className={`font-sans text-xs uppercase tracking-wider mt-1 ${stat.personal ? 'text-foreground/30' : 'text-foreground/42'}`}>
                    {stat.label}
                  </div>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Works */}
      <section id="work" className="py-16 md:py-28 px-5 md:px-12 lg:px-24">
        <div className="mb-5 flex flex-col md:flex-row md:items-end justify-between gap-4 md:gap-6">
          <SectionReveal>
            <div className="w-fit">
              <h2 className="text-3xl md:text-4xl font-display uppercase mb-2 text-foreground tracking-wide">
                Works
              </h2>
              <RevealLine className="h-0.5 bg-primary/30 w-full" />
            </div>
          </SectionReveal>
          <SectionReveal delay={0.1}>
            <a
              href={portfolioData.profile.contact.artstation}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 font-sans text-xs uppercase tracking-wider text-foreground/40 hover:text-foreground/70 transition-colors duration-300"
            >
              Full ArtStation <ExternalLink className="h-3.5 w-3.5" />
            </a>
          </SectionReveal>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {portfolioData.projects.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ y: 20 }}
              whileInView={{ y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.65, delay: i * 0.08, ease: EASE }}
              className={`group relative overflow-hidden cursor-pointer ${project.featured ? 'md:col-span-2' : 'col-span-1'}`}
              onMouseEnter={() => setActiveProject(project.id)}
              onMouseLeave={() => setActiveProject(null)}
              onClick={() => window.open(project.artstationUrl, '_blank', 'noopener,noreferrer')}
              role="link"
              tabIndex={0}
            >
              {/* Image */}
              <div className="absolute inset-0 overflow-hidden">
                <motion.img
                  src={project.imageUrl}
                  alt={project.title}
                  className="h-full w-full object-cover"
                  loading="lazy"
                  whileHover={{ scale: 1.03 }}
                  transition={{ duration: 0.7, ease: EASE }}
                />
                {/* Softened overlay — artwork remains appreciable */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/82 via-black/38 md:via-black/20 to-transparent transition-opacity duration-500 group-hover:from-black/72" />
              </div>

              <div className={`relative p-5 md:p-10 ${project.featured ? 'min-h-[260px] sm:min-h-[400px] md:min-h-[560px]' : 'min-h-[200px] sm:min-h-[300px] md:min-h-[420px]'} flex flex-col justify-end z-10`}>
                <div className="translate-y-0 md:translate-y-5 md:group-hover:translate-y-0 transition-transform duration-700 ease-out">
                  <div className="mb-3">
                    <span className="font-sans text-[10px] uppercase tracking-wider text-white/35">
                      {project.category}
                    </span>
                  </div>
                  <h3 className="font-sans font-semibold text-lg md:text-2xl text-white mb-3 leading-tight">
                    {project.title}
                  </h3>
                  <p className="font-sans text-sm text-white/75 max-w-2xl leading-relaxed opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-400">
                    {project.description}
                  </p>
                </div>
              </div>

              {/* Arrow */}
              <div className="absolute top-5 right-5 w-9 h-9 border border-white/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 z-20">
                <ArrowUpRight className="h-3.5 w-3.5 text-white/80" />
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Experience & Skills */}
      <section className="py-16 md:py-28 px-5 md:px-12 lg:px-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-10">

          {/* Experience */}
          <div className="lg:col-span-7">
            <SectionReveal>
              <div className="w-fit mb-6">
                <h2 className="text-2xl font-display uppercase mb-2 text-foreground tracking-wide">
                  Experience
                </h2>
                <RevealLine className="h-0.5 bg-primary/30 w-full" />
              </div>
            </SectionReveal>

            <div className="space-y-8 md:space-y-12">
              {portfolioData.experience.map((exp, i) => (
                <SectionReveal key={exp.id} delay={i * 0.08}>
                  <div>
                    <h3 className="font-sans font-semibold text-lg text-foreground mb-1">{exp.role}</h3>
                    <div className="font-sans text-xs text-foreground/40 uppercase tracking-wider mb-1">{exp.company}</div>
                    <div className="font-mono text-xs text-primary mb-4 uppercase tracking-wider">{exp.period}</div>
                    <p className="font-sans text-sm text-foreground/60 max-w-2xl leading-relaxed">
                      {exp.description}
                    </p>
                  </div>
                </SectionReveal>
              ))}
            </div>
          </div>

          {/* Skills & Tools */}
          <div className="lg:col-span-5 space-y-12">
            <SectionReveal>
              <div>
                <div className="w-fit mb-6">
                  <h2 className="text-2xl font-display uppercase mb-2 text-foreground tracking-wide">
                    Abilities
                  </h2>
                  <RevealLine className="h-0.5 bg-primary/30 w-full" />
                </div>
                {/* Refined skills: plain text with left-accent, no pill background */}
                <div className="flex flex-wrap gap-x-5 gap-y-3">
                  {portfolioData.skills.map((skill) => (
                    <span
                      key={skill}
                      className="font-sans text-xs text-foreground/48 border-l border-primary/40 pl-2.5 uppercase tracking-wider leading-none"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </SectionReveal>

            <SectionReveal delay={0.1}>
              <div>
                <div className="w-fit mb-6">
                  <h2 className="text-2xl font-display uppercase mb-2 text-foreground tracking-wide">
                    Toolset
                  </h2>
                  <RevealLine className="h-0.5 bg-primary/30 w-full" />
                </div>
                <div className="grid grid-cols-2 gap-3 md:gap-4">
                  {portfolioData.software.map((sw) => (
                    <div key={sw} className="font-mono text-xs text-foreground/50 flex items-center gap-2 uppercase tracking-wider">
                      <span className="w-1 h-1 bg-primary/55 rounded-full flex-shrink-0" />
                      {sw}
                    </div>
                  ))}
                </div>
              </div>
            </SectionReveal>
          </div>

        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="pt-16 md:pt-32 pb-10 px-5 md:px-12 border-t border-foreground/10 relative bg-background/60">
        <div className="relative z-10 max-w-5xl mx-auto">

          <SectionReveal>
            {/* Label — more intentional */}
            <div className="font-sans text-xs uppercase tracking-[0.2em] text-foreground/48 mb-5">
              Get in Touch
            </div>

            {/* Email — focal point, calm scale */}
            <a
              href={`mailto:${portfolioData.profile.contact.email}?subject=Portfolio%20Inquiry`}
              className="group inline-block font-sans text-xl md:text-2xl text-foreground/78 hover:text-foreground transition-colors duration-400 mb-8 md:mb-14 break-all md:break-normal"
            >
              {portfolioData.profile.contact.email}
              <span className="block h-px bg-primary/40 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out mt-1.5" />
            </a>

            {/* Divider */}
            <RevealLine className="h-0.5 bg-primary/30 w-12 mb-8" />

            {/* Bottom row */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
              <p className="font-sans text-sm text-foreground/32 max-w-xs leading-relaxed">
                Available for environment art roles, collaborations, and project work.
              </p>

              <div className="flex flex-wrap items-center gap-5 md:gap-7 font-sans text-xs uppercase tracking-wider text-foreground/32">
                <a
                  href={portfolioData.profile.contact.artstation}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-foreground/60 transition-colors duration-300 flex items-center gap-1.5"
                >
                  ArtStation <ExternalLink className="h-3.5 w-3.5" />
                </a>
                <a
                  href={portfolioData.profile.contact.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-foreground/60 transition-colors duration-300 flex items-center gap-1.5"
                >
                  LinkedIn <ExternalLink className="h-3.5 w-3.5" />
                </a>
              </div>
            </div>
          </SectionReveal>

          {/* Copyright */}
          <div className="mt-12 pt-6 border-t border-foreground/6 font-sans text-[10px] text-foreground/22 uppercase tracking-wider">
            © {new Date().getFullYear()} {portfolioData.profile.name}
          </div>
        </div>
      </footer>

      </div>{/* end content wrapper */}

    </div>
  );
}
