import { useEffect, useRef } from "react";
import type { Project } from "../data/projects";
import { SitePreview } from "./SitePreview";
import { Icon } from "./Icon";
import { Link } from "../lib/router";

export function ProjectCard({ project, onOpen }: { project: Project; onOpen: (p: Project) => void }) {
  return (
    <button type="button" className="pcard" onClick={() => onOpen(project)} aria-haspopup="dialog">
      <SitePreview project={project} className="pcard__preview" />
      <span className="pcard__meta">
        <span className="pcard__cat">{project.category}</span>
        <span className="pcard__title">{project.title}</span>
        <span className="pcard__text">{project.highlight}</span>
        <span className="pcard__more">
          View details <Icon name="arrow" size={16} />
        </span>
      </span>
    </button>
  );
}

export function ProjectDialog({ project, onClose }: { project: Project | null; onClose: () => void }) {
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!project) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div className="dialog-backdrop" onClick={onClose}>
      <div
        className="dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="project-dialog-title"
        onClick={(e) => e.stopPropagation()}
      >
        <button ref={closeRef} type="button" className="dialog__close" aria-label="Close project details" onClick={onClose}>
          <Icon name="x" size={18} />
        </button>
        <SitePreview project={project} className="dialog__preview" />
        <div className="dialog__body">
          <p className="dialog__cat">{project.category}</p>
          <h3 id="project-dialog-title">{project.title}</h3>
          <p className="dialog__about">{project.about}</p>
          <h4>What we built</h4>
          <ul className="ticks">
            {project.built.map((item) => (
              <li key={item}>
                <Icon name="check" size={16} />
                {item}
              </li>
            ))}
          </ul>
          <div className="dialog__actions">
            <Link to="/contact#schedule" className="btn btn--primary" onClick={onClose}>
              Start a similar project
            </Link>
            {project.href && (
              <a className="btn btn--ghost" href={project.href} target="_blank" rel="noreferrer">
                Visit live site <Icon name="arrowUpRight" size={16} />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
