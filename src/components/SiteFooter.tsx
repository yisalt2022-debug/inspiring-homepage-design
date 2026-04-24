export function SiteFooter() {
  return (
    <footer className="relative z-10 border-t border-border/50 py-6 backdrop-blur-sm bg-background/40 mt-12">
      <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-2 text-xs text-muted-foreground font-mono">
        <div>© 2025 NULLSEC STORE</div>
        <div className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-primary animate-blink" />
          all systems operational
        </div>
      </div>
    </footer>
  );
}
