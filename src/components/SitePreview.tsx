import type { CSSProperties } from "react";
import type { Project } from "../data/projects";

const B = ({ w = 100, h, s = "" }: { w?: number; h?: number; s?: string }) => (
  <i className={`sp-b ${s}`} style={{ width: `${w}%`, ...(h ? { height: `${h}cqw` } : {}) }} />
);

function Content({ kind }: { kind: Project["kind"] }) {
  switch (kind) {
    case "food":
      return (
        <div className="sp-split">
          <div className="sp-col">
            <B w={90} h={4.6} s="sp-h" />
            <B w={62} h={4.6} s="sp-h" />
            <B w={80} s="sp-p" />
            <B w={66} s="sp-p" />
            <span className="sp-btn" />
          </div>
          <div className="sp-plate">
            <span />
          </div>
        </div>
      );
    case "realty":
      return (
        <>
          <div className="sp-hero-block" />
          <div className="sp-search">
            <B w={30} /> <B w={30} /> <span className="sp-btn" />
          </div>
          <div className="sp-grid3">
            <i className="sp-tile" /> <i className="sp-tile" /> <i className="sp-tile" />
          </div>
        </>
      );
    case "store":
    case "apparel":
      return (
        <>
          <div className="sp-col sp-center">
            <B w={kind === "apparel" ? 78 : 56} h={kind === "apparel" ? 8 : 4.4} s="sp-h" />
            <B w={40} s="sp-p" />
          </div>
          <div className="sp-grid3 sp-tall">
            <i className="sp-tile sp-t1" /> <i className="sp-tile sp-t2" /> <i className="sp-tile sp-t3" />
          </div>
        </>
      );
    case "legal":
      return (
        <>
          <div className="sp-col sp-center sp-pad">
            <B w={70} h={4.4} s="sp-h" />
            <B w={50} s="sp-p" />
            <span className="sp-btn" />
          </div>
          <div className="sp-people">
            <i /> <i /> <i />
          </div>
        </>
      );
    case "church":
      return (
        <>
          <div className="sp-hero-block sp-soft" />
          <div className="sp-grid3">
            <i className="sp-chip" /> <i className="sp-chip" /> <i className="sp-chip" />
          </div>
          <B w={70} s="sp-p" />
        </>
      );
    case "photo":
      return (
        <div className="sp-masonry">
          <i style={{ height: "30cqw" }} /> <i style={{ height: "18cqw" }} /> <i style={{ height: "24cqw" }} />
          <i style={{ height: "16cqw" }} /> <i style={{ height: "28cqw" }} /> <i style={{ height: "20cqw" }} />
        </div>
      );
    case "media":
      return (
        <>
          <div className="sp-player">
            <span />
          </div>
          <div className="sp-rows">
            <B w={80} /> <B w={64} /> <B w={72} />
          </div>
        </>
      );
    case "app":
      return (
        <div className="sp-login">
          <B w={44} h={3.4} s="sp-h" />
          <B w={100} h={3.6} s="sp-field" />
          <B w={100} h={3.6} s="sp-field" />
          <span className="sp-btn sp-block" />
        </div>
      );
    case "dash":
    default:
      return (
        <>
          <div className="sp-grid3">
            <i className="sp-stat" /> <i className="sp-stat" /> <i className="sp-stat" />
          </div>
          <div className="sp-chart">
            {[38, 62, 46, 78, 54, 90, 68].map((h, i) => (
              <i key={i} style={{ height: `${h}%` }} />
            ))}
          </div>
        </>
      );
  }
}

/** A lightweight, CSS-only "screenshot" of a project, tinted with the project's brand colours. */
export function SitePreview({ project, className = "" }: { project: Project; className?: string }) {
  const style = {
    "--sp-bg": project.theme.bg,
    "--sp-ink": project.theme.ink,
    "--sp-ac": project.theme.accent,
  } as CSSProperties;
  return (
    <div className={`sp ${className}`} style={style} role="img" aria-label={`${project.title} website preview`}>
      {project.previewImage ? (
        <img className="sp__image" src={project.previewImage} alt="" loading="lazy" decoding="async" />
      ) : (
        <>
          <div className="sp-bar">
            <i /> <i /> <i />
          </div>
          <div className="sp-body">
            <div className="sp-nav">
              <b />
              <span />
              <span />
              <span />
            </div>
            <Content kind={project.kind} />
          </div>
        </>
      )}
    </div>
  );
}
