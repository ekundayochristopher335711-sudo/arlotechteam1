import { Link } from "../lib/router";
import { site } from "../data/site";
import { Logo } from "./Logo";
import { Icon } from "./Icon";

export function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__grid">
        <div className="footer__brand">
          <Logo />
          <p>
            A web design and development studio based in Lagos, Nigeria. We build websites, web apps, and online
            stores for businesses worldwide.
          </p>
          <p className="footer__avail">
            <span className="dot" /> Available for new projects
          </p>
          <div className="socials">
            <a href={site.whatsappUrl} target="_blank" rel="noreferrer" aria-label="WhatsApp">
              <Icon name="whatsapp" size={18} />
            </a>
            <a href={`mailto:${site.email}`} aria-label="Email">
              <Icon name="mail" size={18} />
            </a>
            <a href={site.discord} target="_blank" rel="noreferrer" aria-label="Discord">
              <Icon name="discord" size={18} />
            </a>
            <a href={site.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn">
              <Icon name="linkedin" size={18} />
            </a>
          </div>
        </div>

        <div className="footer__col">
          <h2>Studio</h2>
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/work">Work</Link>
          <Link to="/blog">Blog</Link>
        </div>
        <div className="footer__col">
          <h2>Services</h2>
          <Link to="/services">What we do</Link>
          <Link to="/process">Our process</Link>
          <Link to="/infrastructure">Tech stack</Link>
          <Link to="/contact">Contact</Link>
        </div>
        <div className="footer__col">
          <h2>Talk to us</h2>
          <a href={`mailto:${site.email}`}>{site.email}</a>
          <a href={site.whatsappUrl} target="_blank" rel="noreferrer">
            {site.whatsappDisplay} (WhatsApp)
          </a>
          <span className="footer__loc">{site.location}</span>
        </div>
      </div>
      <div className="container footer__bottom">
        <p>© {new Date().getFullYear()} Arlotech Studio. All rights reserved.</p>
        <p className="footer__legal">
          <Link to="/privacy">Privacy</Link>
          <Link to="/terms">Terms</Link>
        </p>
      </div>
    </footer>
  );
}
