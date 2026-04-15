export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-background text-foreground px-6">
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          backgroundSize: '120px 120px',
          backgroundImage:
            'linear-gradient(to right, rgba(102,50,50,0.12) 1px, transparent 1px), linear-gradient(to bottom, rgba(102,50,50,0.12) 1px, transparent 1px)',
          zIndex: 0,
        }}
      />
      <div className="relative z-10 text-center">
        <div className="font-display text-[8rem] leading-none text-foreground/8 select-none mb-2">
          404
        </div>
        <h1 className="font-display text-xl uppercase tracking-widest text-foreground/60 mb-6">
          Page Not Found
        </h1>
        <div className="w-12 h-px bg-primary/40 mx-auto mb-8" />
        <a
          href="/work/"
          className="font-sans text-xs uppercase tracking-wider text-foreground/38 hover:text-foreground/70 transition-colors duration-300"
        >
          ← Back to Portfolio
        </a>
      </div>
    </div>
  );
}
