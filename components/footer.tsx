export function Footer() {
  return (
    <footer className="border-t border-border bg-cream py-12">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col items-center gap-8 md:flex-row md:items-start md:justify-between">
          {/* Logo & Tagline */}
          <div className="text-center md:text-left">
            <div className="flex items-center justify-center gap-2 md:justify-start">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-forest">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#F9F6F0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M7 20h10" />
                  <path d="M10 20c5.5-2.5.8-6.4 3-10" />
                  <path d="M9.5 9.4c1.1.8 1.8 2.2 2.3 3.7-2 .4-3.5.4-4.8-.3-1.2-.6-2.3-1.9-3-4.2 2.8-.5 4.4 0 5.5.8z" />
                  <path d="M14.1 6a7 7 0 0 0-1.1 4c1.9-.1 3.3-.6 4.3-1.4 1-1 1.6-2.3 1.7-4.6-2.7.1-4 1-4.9 2z" />
                </svg>
              </div>
              <span className="text-lg font-bold text-forest">AgriBot</span>
            </div>
            <p className="mt-2 text-sm text-muted-foreground">
              Your farm, your voice, your data.
            </p>
          </div>

          {/* Links */}
          <div className="flex gap-10 text-sm">
            <div className="flex flex-col gap-3">
              <p className="font-semibold text-foreground">Product</p>
              <a href="#how-it-works" className="text-muted-foreground transition-colors hover:text-forest">How It Works</a>
              <a href="#features" className="text-muted-foreground transition-colors hover:text-forest">Features</a>
              <a href="#book-demo" className="text-muted-foreground transition-colors hover:text-forest">Book a Demo</a>
            </div>
            <div className="flex flex-col gap-3">
              <p className="font-semibold text-foreground">Company</p>
              <a href="#partners" className="text-muted-foreground transition-colors hover:text-forest">Partners</a>
              <a href="#early-access" className="text-muted-foreground transition-colors hover:text-forest">Early Access</a>
              <a href="mailto:hello@agribot.ma" className="text-muted-foreground transition-colors hover:text-forest">Contact</a>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center gap-3 border-t border-border pt-8 md:flex-row md:justify-between">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} AgriBot. All rights reserved.
          </p>
          <p className="text-sm text-muted-foreground">
            Made in Morocco 🇲🇦
          </p>
        </div>
      </div>
    </footer>
  )
}
