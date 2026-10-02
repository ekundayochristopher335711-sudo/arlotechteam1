import {
  createContext,
  useContext,
  useEffect,
  useState,
  type AnchorHTMLAttributes,
  type MouseEvent,
  type ReactNode,
} from "react";

type Loc = { path: string; hash: string };

const LocationContext = createContext<Loc>({ path: "/", hash: "" });

function readLocation(): Loc {
  return {
    path: window.location.pathname.replace(/\/+$/, "") || "/",
    hash: window.location.hash,
  };
}

export function navigate(to: string) {
  const url = new URL(to, window.location.origin);
  window.history.pushState({}, "", url.pathname + url.search + url.hash);
  window.dispatchEvent(new PopStateEvent("popstate"));
}

export function Router({ children }: { children: ReactNode }) {
  const [loc, setLoc] = useState<Loc>(readLocation);

  useEffect(() => {
    const onChange = () => setLoc(readLocation());
    window.addEventListener("popstate", onChange);
    return () => window.removeEventListener("popstate", onChange);
  }, []);

  useEffect(() => {
    if (loc.hash) {
      const id = decodeURIComponent(loc.hash.slice(1));
      const timer = window.setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 60);
      return () => window.clearTimeout(timer);
    }
    window.scrollTo(0, 0);
  }, [loc.path, loc.hash]);

  return <LocationContext.Provider value={loc}>{children}</LocationContext.Provider>;
}

export function useLocation() {
  return useContext(LocationContext);
}

type LinkProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & { to: string };

const isExternal = (to: string) => /^(https?:|mailto:|tel:)/i.test(to);

export function Link({ to, onClick, children, ...rest }: LinkProps) {
  function handle(e: MouseEvent<HTMLAnchorElement>) {
    onClick?.(e);
    if (
      e.defaultPrevented ||
      e.button !== 0 ||
      e.metaKey ||
      e.ctrlKey ||
      e.shiftKey ||
      e.altKey ||
      rest.target === "_blank" ||
      isExternal(to)
    ) {
      return;
    }
    e.preventDefault();
    navigate(to);
  }
  return (
    <a href={to} onClick={handle} {...rest}>
      {children}
    </a>
  );
}

export function useIsActive(to: string) {
  const { path } = useLocation();
  return to === "/" ? path === "/" : path === to || path.startsWith(to + "/");
}
