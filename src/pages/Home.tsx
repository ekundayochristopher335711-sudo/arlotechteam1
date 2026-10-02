import { useEffect, useState, type CSSProperties, type FormEvent } from "react";
import { Link } from "../lib/router";
import { useSEO } from "../lib/seo";
import { Layout, CtaBand, SectionHead } from "../components/Layout";
import { Photo } from "../components/Photo";
import { Icon } from "../components/Icon";
import { SitePreview } from "../components/SitePreview";
import { ProjectCard, ProjectDialog } from "../components/ProjectViews";
import { projects, type Project } from "../data/projects";
import { audiences, quickSteps, services, stats, team, type Review } from "../data/site";

export default function Home() {
  useSEO({
    title: "Web Design & Development Studio in Lagos, Nigeria",
    description:
      "Arlotech builds custom websites, web apps, and online stores for businesses worldwide. Based in Lagos, Nigeria. Get a free consultation today.",
    path: "/",
  });
  const [active, setActive] = useState<Project | null>(null);
  const [visibleReviews, setVisibleReviews] = useState<Review[]>([]);
  const [reviewStatus, setReviewStatus] = useState("");
  const [reviewSubmitting, setReviewSubmitting] = useState(false);
  const featured = projects.filter((p) => p.homepage).slice(0, 3);
  const heroCard = projects[1];

  useEffect(() => {
    let current = true;
    fetch("/api/reviews.php")
      .then((response) => (response.ok ? response.json() : Promise.reject()))
      .then((data) => {
        if (current && Array.isArray(data)) setVisibleReviews(data);
      })
      .catch(() => {});
    return () => {
      current = false;
    };
  }, []);

  async function handleReviewSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const target = event.currentTarget;
    const values = new FormData(target);
    setReviewSubmitting(true);
    setReviewStatus("");
    try {
      const response = await fetch("/api/reviews.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: values.get("name"),
          business: values.get("business"),
          rating: Number(values.get("rating")),
          quote: values.get("quote"),
          website: values.get("website"),
        }),
      });
      const result = await response.json().catch(() => null);
      if (!response.ok || result?.success !== true) {
        setReviewStatus(result?.error || "Could not submit your review. Please try again.");
        return;
      }
      target.reset();
      setReviewStatus("Thank you. Your review has been submitted for approval.");
    } catch {
      setReviewStatus("Could not submit your review. Please try again later.");
    } finally {
      setReviewSubmitting(false);
    }
  }

  return (
    <Layout>
      {/* Hero */}
      <section className="hero">
        <div className="container hero__grid">
          <div className="hero__copy">
            <p className="status">
              <span className="dot" /> Taking on new projects
            </p>
            <h1 className="hero__title">Websites that bring you customers.</h1>
            <p className="lead">
              Arlotech is a three-person design and development studio in Lagos. We build fast, mobile-first
              websites, online stores and web apps for businesses in Nigeria and abroad.
            </p>
            <div className="actions">
              <Link to="/contact#schedule" className="btn btn--primary btn--lg">
                Start a project
              </Link>
              <Link to="/work" className="btn btn--ghost btn--lg">
                See our work
              </Link>
            </div>
            <dl className="facts">
              {stats.map((s) => (
                <div key={s.label}>
                  <dt>{s.value}</dt>
                  <dd>{s.label}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="hero__visual">
            <div className="hero__frame">
              <Photo name="bridge" priority className="hero__photo" sizes="(min-width: 960px) 44vw, 92vw" position="50% 40%" />
              <div className="danfo-band" aria-hidden="true" />
            </div>
            <div className="hero__card" aria-hidden="true">
              <SitePreview project={heroCard} className="hero__card-preview" />
              <p>
                <strong>Recently launched</strong>
                {heroCard.title} · {heroCard.category}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Who we build for */}
      <section className="audiences" aria-label="Who we build for">
        <div className="container audiences__inner">
          <p>We've built for</p>
          <ul>
            {audiences.map((a) => (
              <li key={a}>{a}</li>
            ))}
          </ul>
        </div>
      </section>

      {/* Services */}
      <section className="section">
        <div className="container split">
          <div className="split__aside">
            <SectionHead
              title="Everything you need to build a strong online presence."
              text="From a brand new website to a fully custom web app, we handle design, development, and launch. You stay focused on running your business."
            />
            <Link to="/services" className="textlink">
              All services <Icon name="arrow" size={18} />
            </Link>
          </div>
          <ul className="rows">
            {services.map((s) => (
              <li key={s.title} className="row">
                <span className="row__icon">
                  <Icon name={s.icon} size={22} />
                </span>
                <div>
                  <h3>{s.title}</h3>
                  <p>{s.summary}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Work */}
      <section className="section section--white">
        <div className="container">
          <div className="section-split-head">
            <SectionHead title="Sites we've built." text="Open any project to see what we built and how it works." />
            <Link to="/work" className="textlink">
              View more projects <Icon name="arrow" size={18} />
            </Link>
          </div>
          <div className="pgrid pgrid--3">
            {featured.map((p) => (
              <ProjectCard key={p.title} project={p} onOpen={setActive} />
            ))}
          </div>
        </div>
      </section>

      {/* Client reviews */}
      <section className="reviews" aria-labelledby="reviews-title">
        <div className="container">
          <div className="reviews__head">
            <div>
              <p className="reviews__eyebrow">Client reviews</p>
              <h2 id="reviews-title">Good work, in their words.</h2>
            </div>
            <p className="reviews__intro">A few words from the people behind the projects.</p>
          </div>
          <div className="reviews__list">
            {visibleReviews.map((review) => (
              <article className="review" key={review.id}>
                <p className="review__quote">“{review.quote}”</p>
                {review.rating !== null && (
                  <div className="review__rating" role="img" aria-label={`${review.rating} out of 5 stars`}>
                    <span
                      className="review__stars"
                      style={{ "--rating-fill": `${review.rating * 20}%` } as CSSProperties}
                      aria-hidden="true"
                    >
                      ★★★★★
                    </span>
                    <span className="review__score">{review.rating.toFixed(1)} / 5</span>
                  </div>
                )}
                <div className="review__client">
                  {review.image && <img src={review.image} alt="" loading="lazy" width={56} height={56} />}
                  <div>
                    <h3>{review.name}</h3>
                    {review.business && <p>{review.business}</p>}
                  </div>
                </div>
              </article>
            ))}
          </div>
          <form className="review-form" onSubmit={handleReviewSubmit}>
            <div className="review-form__head">
              <h3>Share your experience</h3>
              <p>Reviews are checked before they appear on the site.</p>
            </div>
            <div className="review-form__fields">
              <label>
                Your name
                <input name="name" required maxLength={100} autoComplete="name" />
              </label>
              <label>
                Business <span>(optional)</span>
                <input name="business" maxLength={120} autoComplete="organization" />
              </label>
              <label>
                Your rating
                <select name="rating" defaultValue="5" required>
                  {[5, 4, 3, 2, 1].map((rating) => <option key={rating} value={rating}>{rating} out of 5 stars</option>)}
                </select>
              </label>
            </div>
            <label>
              Your review
              <textarea name="quote" required minLength={10} maxLength={1200} rows={4} />
            </label>
            <div className="review-form__trap" aria-hidden="true">
              <label>Leave this field empty<input name="website" tabIndex={-1} autoComplete="off" /></label>
            </div>
            {reviewStatus && <p className="review-form__status" role="status">{reviewStatus}</p>}
            <button className="btn btn--primary" type="submit" disabled={reviewSubmitting}>
              {reviewSubmitting ? "Submitting…" : "Submit review"}
            </button>
          </form>
        </div>
      </section>

      {/* Lagos band */}
      <section className="lagos">
        <Photo name="civic" className="lagos__photo" sizes="100vw" position="50% 60%" />
        <div className="lagos__shade" />
        <div className="container lagos__inner">
          <h2>Based in Lagos, working with clients worldwide.</h2>
          <p>
            We work remotely with businesses across Nigeria, Europe and Asia, providing clear updates at every step, so
            distance never gets in the way.
          </p>
        </div>
      </section>

      {/* How we work */}
      <section className="section">
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

      {/* Team */}
      <section className="section section--white">
        <div className="container">
          <SectionHead
            title="Three people, one focused team."
            text="We're a small studio, so you work directly with the people building your site, not an account manager who passes things along."
          />
          <div className="team">
            {team.map((m) => (
              <article key={m.name} className="member">
                <div className="member__photo">
                  <img src={m.image} alt={m.name} loading="lazy" width={489} height={565} />
                </div>
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
                <ul className="chips">
                  {m.skills.map((s) => (
                    <li key={s}>{s}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      <CtaBand />
      <ProjectDialog project={active} onClose={() => setActive(null)} />
    </Layout>
  );
}
