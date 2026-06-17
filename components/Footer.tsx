import { Github, Linkedin, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-border">
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-4 px-6 py-8 sm:flex-row">
        <p className="text-xs tracking-wide text-muted">
          © {new Date().getFullYear()} Mohammed Zayed
        </p>

        <div className="flex items-center gap-5">
          <a
            href="mailto:mzayedp@gmail.com"
            className="text-muted transition-colors hover:text-foreground"
            aria-label="Email"
          >
            <Mail size={16} />
          </a>
          <a
            href="https://github.com/mohammedz06"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted transition-colors hover:text-foreground"
            aria-label="GitHub"
          >
            <Github size={16} />
          </a>
          <a
            href="https://www.linkedin.com/in/0mohammed-zayed6/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted transition-colors hover:text-foreground"
            aria-label="LinkedIn"
          >
            <Linkedin size={16} />
          </a>
        </div>
      </div>
    </footer>
  );
}
