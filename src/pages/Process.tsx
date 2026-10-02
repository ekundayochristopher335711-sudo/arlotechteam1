import { useSEO } from "../lib/seo";
import { Layout, PageHead, CtaBand } from "../components/Layout";
import { processSteps } from "../data/site";

export default function Process() {
  useSEO({
    title: "Our Process: How We Build Websites",
    description:
      "See how Arlotech designs and builds websites from the discovery call to launch. No surprises, just clear communication.",
    path: "/process",
  });
  return (
    <Layout>
      <PageHead
        title="How we take your project from idea to live website."
        intro="A simple, clear process with no jargon. You always know what's happening and what comes next."
        photo="code"
        position="50% 50%"
      />
      <section className="section section--tight">
        <div className="container">
          <ol className="timeline">
            {processSteps.map((s, i) => (
              <li key={s.title}>
                <span className="timeline__n">{i + 1}</span>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>
      <CtaBand title="Ready to start?" text="The first step is a free call. Tell us what you need and we'll take it from there." />
    </Layout>
  );
}
