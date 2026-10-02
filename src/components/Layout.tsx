import type { ReactNode } from "react";
import { Nav } from "./Nav";
import { Footer } from "./Footer";
import { Link } from "../lib/router";
import { Photo } from "./Photo";
import type { PhotoKey } from "../data/images";
import { Icon } from "./Icon";

export function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <a href="#main" className="skip">
        Skip to content
      </a>
      <Nav />
      <main id="main">{children}</main>
      <Footer />
    </>
  );
}

/** Top-of-page intro used on every inner page. */
export function PageHead({
  title,
  intro,
  photo,
  position,
}: {
  title: string;
  intro?: string;
  photo?: PhotoKey;
  position?: string;
}) {
  return (
    <header className={`pagehead${photo ? " pagehead--photo" : ""}`}>
      <div className="container pagehead__grid">
        <div className="pagehead__copy">
          <h1>{title}</h1>
          {intro && <p className="lead">{intro}</p>}
        </div>
        {photo && <Photo name={photo} className="pagehead__photo" priority sizes="(min-width: 960px) 46vw, 92vw" position={position} />}
      </div>
    </header>
  );
}

export function SectionHead({ title, text, center = false }: { title: string; text?: string; center?: boolean }) {
  return (
    <div className={`sechead${center ? " sechead--center" : ""}`}>
      <h2>{title}</h2>
      {text && <p className="lead">{text}</p>}
    </div>
  );
}

export function CtaBand({
  title = "Ready to build something?",
  text = "Tell us about your project and we'll get back to you within 24 hours. No commitment, no pressure, just a conversation.",
}: {
  title?: string;
  text?: string;
}) {
  return (
    <section className="cta">
      <div className="danfo-band" aria-hidden="true" />
      <div className="container cta__inner">
        <h2>{title}</h2>
        <p>{text}</p>
        <div className="actions actions--center">
          <Link to="/contact#schedule" className="btn btn--primary btn--lg">
            Start a project <Icon name="arrow" size={18} />
          </Link>
          <Link to="/contact#schedule" className="btn btn--outline-light btn--lg">
            Book a free call
          </Link>
        </div>
      </div>
    </section>
  );
}
