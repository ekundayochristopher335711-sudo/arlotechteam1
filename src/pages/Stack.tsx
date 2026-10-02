import { useSEO } from "../lib/seo";
import { Layout, PageHead, CtaBand } from "../components/Layout";
import { stack } from "../data/site";

export default function Stack() {
  useSEO({
    title: "Tech Stack: Tools We Use to Build Websites",
    description:
      "The technologies Arlotech uses to build fast, reliable websites and web apps, including React, TypeScript, Tailwind CSS, and more.",
    path: "/infrastructure",
  });
  return (
    <Layout>
      <PageHead
        title="The tools we use to build your website."
        intro="Modern, reliable technologies that make your site fast, secure, and easy to maintain."
        photo="java"
        position="50% 50%"
      />
      <section className="section section--tight">
        <div className="container">
          <div className="stack">
            {stack.map((g) => (
              <div key={g.title} className="stack__group">
                <h2>{g.title}</h2>
                <ul className="chips chips--lg">
                  {g.items.map((i) => (
                    <li key={i}>{i}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="note">
            <h2>Why does the tech stack matter?</h2>
            <p>
              The tools we use directly affect how fast your site loads, how secure it is, and how easy it is to
              update later. We pick modern, battle-tested technologies, not the trendiest things, but what actually
              works best for your project. Every site we build loads fast, works on all devices, and is easy for us
              to maintain and improve over time.
            </p>
          </div>
        </div>
      </section>
      <CtaBand />
    </Layout>
  );
}
