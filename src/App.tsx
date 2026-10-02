import { lazy, Suspense } from "react";
import { useLocation } from "./lib/router";

import Home from "./pages/Home";

const About = lazy(() => import("./pages/About"));
const Services = lazy(() => import("./pages/Services"));
const Process = lazy(() => import("./pages/Process"));
const Stack = lazy(() => import("./pages/Stack"));
const Work = lazy(() => import("./pages/Work"));
const Blog = lazy(() => import("./pages/Blog"));
const BlogPost = lazy(() => import("./pages/BlogPost"));
const Contact = lazy(() => import("./pages/Contact"));
const Admin = lazy(() => import("./pages/Admin"));
const Privacy = lazy(() => import("./pages/Legal").then((m) => ({ default: m.Privacy })));
const Terms = lazy(() => import("./pages/Legal").then((m) => ({ default: m.Terms })));
const NotFound = lazy(() => import("./pages/NotFound"));

function Routes() {
  const { path } = useLocation();
  if (path === "/") return <Home />;
  if (path === "/about") return <About />;
  if (path === "/services") return <Services />;
  if (path === "/process") return <Process />;
  if (path === "/infrastructure") return <Stack />;
  if (path === "/work") return <Work />;
  if (path === "/blog") return <Blog />;
  if (path.startsWith("/blog/")) return <BlogPost slug={decodeURIComponent(path.slice(6))} />;
  if (path === "/contact") return <Contact />;
  if (path === "/admin") return <Admin />;
  if (path === "/privacy") return <Privacy />;
  if (path === "/terms") return <Terms />;
  return <NotFound />;
}

export default function App() {
  return (
    <Suspense fallback={<div className="boot" aria-busy="true" />}>
      <Routes />
    </Suspense>
  );
}
