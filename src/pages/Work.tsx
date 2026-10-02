import { useState } from "react";
import { useSEO } from "../lib/seo";
import { Layout, PageHead, CtaBand } from "../components/Layout";
import { ProjectCard, ProjectDialog } from "../components/ProjectViews";
import { projectGroups, projects, type Project } from "../data/projects";

export default function Work() {
  useSEO({
    title: "Our Work: Websites We've Built",
    description:
      "See the websites, web apps, and online stores Arlotech has built for businesses worldwide. Real projects across e-commerce, real estate, faith, legal and more.",
    path: "/work",
  });
  const [filter, setFilter] = useState<(typeof projectGroups)[number]>("All");
  const [active, setActive] = useState<Project | null>(null);
  const shown = projects.filter((p) => filter === "All" || p.group === filter);

  return (
    <Layout>
      <PageHead
        title="Every site we've built."
        intro={`${projects.length} real projects, with the thinking behind each build and details of what we delivered.`}
        photo="gradient"
        position="50% 45%"
      />
      <section className="section section--tight">
        <div className="container">
          <div className="filters" role="group" aria-label="Filter projects">
            {projectGroups.map((g) => (
              <button key={g} type="button" className={`chip${filter === g ? " is-on" : ""}`} aria-pressed={filter === g} onClick={() => setFilter(g)}>
                {g}
              </button>
            ))}
          </div>
          <div className="pgrid">
            {shown.map((p) => (
              <ProjectCard key={p.title} project={p} onOpen={setActive} />
            ))}
          </div>
        </div>
      </section>
      <CtaBand title="Want a site like these?" text="Tell us about your project. We'll get back to you within 24 hours." />
      <ProjectDialog project={active} onClose={() => setActive(null)} />
    </Layout>
  );
}
