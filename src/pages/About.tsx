import { Link } from "../lib/router";
import { useSEO } from "../lib/seo";
import { Layout, PageHead, SectionHead, CtaBand } from "../components/Layout";
import { site, team, values } from "../data/site";

export default function About() {
  useSEO({
    title: "About Us: Meet the Arlotech Team",
    description:
      "Arlotech is a team of three designers and developers based in Lagos, Nigeria. We build custom websites and web apps for businesses that want real results.",
    path: "/about",
  });
  return (
    <Layout>
      <PageHead
        title="A small team that takes your website seriously."
        intro="We're three designers and developers based in Lagos, Nigeria. We've been building websites for businesses around the world since 2022."
        photo="aerial"
        position="50% 50%"
      />

      <section className="section section--tight">
        <div className="container split">
          <div className="prose">
            <h2>Who we are</h2>
            <p>
              Arlotech started because we saw too many businesses stuck with websites that looked outdated, loaded
              slowly, or didn't reflect the quality of their actual work. We wanted to change that.
            </p>
            <p>
              We're a small studio with just three people, but that's a feature, not a bug. It means every project gets
              our full attention. When you hire us, you're not getting passed to a junior team. You get us.
            </p>
            <p>
              We've built sites for law practices, churches, restaurants, fashion brands, real estate companies and
              web apps for clients in Nigeria, Europe, and beyond. Every project is different and we approach each
              one that way.
            </p>
            <Link to="/contact#schedule" className="btn btn--primary btn--lg">
              Talk to us
            </Link>
          </div>
          <ul className="values">
            {values.map((v) => (
              <li key={v.title}>
                <h3>{v.title}</h3>
                <p>{v.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section section--white">
        <div className="container">
          <SectionHead title="The people behind your project." text="Three specialists, one focused team. When you work with Arlotech, you work with all of us." />
          <div className="bio-list">
            {team.map((m, i) => (
              <article key={m.name} className={`bio${i % 2 ? " bio--flip" : ""}`}>
                <div className="bio__photo">
                  <img src={m.image} alt={m.name} loading="lazy" width={489} height={565} />
                </div>
                <div className="bio__text">
                  <p className="member__role">{m.role}</p>
                  <h3>
                    {m.linkedin ? (
                      <a href={m.linkedin} target="_blank" rel="noreferrer">
                        {m.name}
                      </a>
                    ) : (
                      m.name
                    )}
                  </h3>
                  <p>{m.bio}</p>
                  <ul className="chips">
                    {m.skills.map((s) => (
                      <li key={s}>{s}</li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container two">
          <div className="panel">
            <h3>Based in Lagos, working worldwide</h3>
            <p>
              We're based in Lagos, Nigeria, but we work with clients across Europe, Asia, and beyond. All our work
              is done remotely and we communicate clearly at every step.
            </p>
            <a className="textlink" href={`mailto:${site.email}`}>
              {site.email}
            </a>
          </div>
          <div className="panel panel--accent">
            <h3>Ready to work together?</h3>
            <p>Tell us about your project and we'll get back to you within 24 hours. The first call is free and there's no pressure.</p>
            <div className="actions">
              <Link to="/contact#schedule" className="btn btn--dark">
                Start a project
              </Link>
              <Link to="/services" className="btn btn--ghost-dark">
                See our services
              </Link>
            </div>
          </div>
        </div>
      </section>
      <CtaBand />
    </Layout>
  );
}
