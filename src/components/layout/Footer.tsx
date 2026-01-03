import { Building2, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-lg bg-accent flex items-center justify-center">
                <Building2 className="w-5 h-5 text-accent-foreground" />
              </div>
              <span className="font-display text-xl font-bold">STYLARCH</span>
            </Link>
            <p className="text-primary-foreground/70 max-w-md">
              AI-driven architectural assistant that makes professional building
              design simple. Create, modify, and interpret floorplans in minutes.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/design"
                  className="text-primary-foreground/70 hover:text-accent transition-colors"
                >
                  Design
                </Link>
              </li>
              <li>
                <Link
                  to="/interpret"
                  className="text-primary-foreground/70 hover:text-accent transition-colors"
                >
                  Interpret
                </Link>
              </li>
              <li>
                <Link
                  to="/projects"
                  className="text-primary-foreground/70 hover:text-accent transition-colors"
                >
                  Projects
                </Link>
              </li>
              <li>
                <Link
                  to="/faqs"
                  className="text-primary-foreground/70 hover:text-accent transition-colors"
                >
                  FAQs
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display font-semibold mb-4">Developer</h4>
            <a
              href="https://x.com/biz_kot"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-primary-foreground/70 hover:text-accent transition-colors"
            >
              <span>@biz_kot</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>

        <div className="border-t border-primary-foreground/10 mt-8 pt-8 text-center">
          <p className="text-primary-foreground/60 text-sm">
            © {new Date().getFullYear()} STYLARCH. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
