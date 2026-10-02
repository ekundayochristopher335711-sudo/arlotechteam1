import { Photo, RemotePhoto } from "./Photo";
import { coverFor } from "../data/images";

export function Cover({ slug, image, alt, className = "", sizes }: { slug: string; image?: string; alt: string; className?: string; sizes?: string }) {
  if (image) return <RemotePhoto src={image} alt={alt} className={className} />;
  return <Photo name={coverFor(slug)} alt={alt} className={className} sizes={sizes} />;
}
