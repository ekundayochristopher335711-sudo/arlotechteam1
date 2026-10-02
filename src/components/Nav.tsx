import { useEffect, useState } from "react";
import { Link, useIsActive, useLocation } from "../lib/router";
import { navLinks } from "../data/site";
import { Logo } from "./Logo";
import { Icon } from "./Icon";

function NavItem({ to, label, onClick }: { to: string; label: string; onClick?: () => void }) {
  const active = useIsActive(to);
  return (
    <Link to={to} className={`nav__link${active ? " is-active" : ""}`} aria-current={active ? "page" : undefined} onClick={onClick}>
      {label}
    </Link>
  );
}

export function Nav() {
  const [open, setOpen] = useState(false);
  const { path } = useLocation();

  useEffect(() => setOpen(false), [path]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="nav-wrap">
      <nav className="nav" aria-label="Main">
        <Link to="/" className="nav__brand" aria-label="Arlotech home">
          <Logo />
        </Link>
        <div className="nav__links">
          {navLinks.map((l) => (
            <NavItem key={l.to} {...l} />
          ))}
        </div>
        <Link to="/contact#schedule" className="btn btn--primary btn--sm nav__cta">
          Start a project
        </Link>
        <button
          type="button"
          className="nav__toggle"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((v) => !v)}
        >
          <Icon name={open ? "x" : "menu"} size={22} />
        </button>
      </nav>

      <div id="mobile-menu" className={`sheet${open ? " is-open" : ""}`} aria-hidden={!open}>
        <div className="sheet__inner">
          {navLinks.map((l) => (
            <Link key={l.to} to={l.to} className="sheet__link" tabIndex={open ? 0 : -1} onClick={() => setOpen(false)}>
              {l.label}
            </Link>
          ))}
          <Link to="/contact#schedule" className="btn btn--primary btn--lg" tabIndex={open ? 0 : -1} onClick={() => setOpen(false)}>
            Start a project
          </Link>
        </div>
      </div>
    </header>
  );
}
