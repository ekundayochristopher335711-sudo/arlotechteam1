import { useState } from "react";
import { photos, photoUrl, type PhotoKey } from "../data/images";

const WIDTHS = [480, 800, 1200, 1800];

type PhotoProps = {
  name: PhotoKey;
  sizes?: string;
  priority?: boolean;
  className?: string;
  position?: string;
  alt?: string;
};

/** Responsive Unsplash photo. If it can't load, the tinted background underneath stays visible. */
export function Photo({ name, sizes = "100vw", priority = false, className = "", position, alt }: PhotoProps) {
  const [failed, setFailed] = useState(false);
  return (
    <div className={`photo ${className}`}>
      {!failed && (
        <img
          src={photoUrl(name, 1200)}
          srcSet={WIDTHS.map((w) => `${photoUrl(name, w)} ${w}w`).join(", ")}
          sizes={sizes}
          alt={alt ?? photos[name].alt}
          loading={priority ? "eager" : "lazy"}
          decoding="async"
          fetchPriority={priority ? "high" : "auto"}
          style={position ? { objectPosition: position } : undefined}
          onError={() => setFailed(true)}
        />
      )}
    </div>
  );
}

/** Same idea for a photo that already has a full URL (blog images uploaded in /admin). */
export function RemotePhoto({ src, alt, className = "" }: { src: string; alt: string; className?: string }) {
  const [failed, setFailed] = useState(false);
  return (
    <div className={`photo ${className}`}>
      {!failed && <img src={src} alt={alt} loading="lazy" decoding="async" onError={() => setFailed(true)} />}
    </div>
  );
}
