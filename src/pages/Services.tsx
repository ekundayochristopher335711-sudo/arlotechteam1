import { Link } from "../lib/router";
import { useSEO } from "../lib/seo";
import { Layout, PageHead, SectionHead, CtaBand } from "../components/Layout";
import { Icon } from "../components/Icon";
import { quickSteps, services } from "../data/site";

export default function Services() {
  useSEO({
    title: "Web Design & Development Services",
    description:
      "Website design, web app development, e-commerce stores, UI/UX design, SEO, and ongoing support. Based in Lagos, working with clients worldwide.",
    path: "/services",
  });
  return (
    <Layout>
      <PageHead
        title="Everything you need to build a strong online presence."
        intro="From a simple website to a full web app, we handle design, development, and launch. You stay focused on your business."
        photo="desk"
        position="50% 55%"
      />
      <section className="section section--tight">
        <div className="container">
          <div className="sgrid">
            {services.map((s) => (
              <article key={s.title} className="scard">
                <span className="row__icon">
                  <Icon name={s.icon} size={22} />
                </span>
                <h3>{s.title}</h3>
                <p>{s.summary}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--white">
        <div className="container">
          <SectionHead title="Simple process, no surprises." text="We keep things straightforward so you always know what's happening with your project." />
          <ol className="steps">
            {quickSteps.map((s, i) => (
              <li key={s.title}>
                <span className="steps__n">{i + 1}</span>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </li>
            ))}
          </ol>
          <Link to="/process" className="textlink">
            See the full process <Icon name="arrow" size={18} />
          </Link>
        </div>
      </section>
      <CtaBand title="Not sure where to start?" text="Book a free call and we'll help you figure out exactly what you need. No sales pitch, just honest advice." />
    </Layout>
  );
}
