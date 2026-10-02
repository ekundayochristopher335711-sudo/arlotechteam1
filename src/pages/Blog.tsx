import { useState } from "react";
import { Link } from "../lib/router";
import { useSEO } from "../lib/seo";
import { usePosts } from "../lib/usePosts";
import { categories } from "../data/posts";
import { Layout, PageHead, CtaBand } from "../components/Layout";
import { Cover } from "../components/Cover";
import { Icon } from "../components/Icon";

export default function Blog() {
  useSEO({
    title: "Blog: Insights, Ideas & Digital Growth",
    description:
      "Web design tips, SEO strategies, branding advice, AI tools, and technology trends to help your business grow online. By Arlotech.",
    path: "/blog",
  });
  const posts = usePosts();
  const [search, setSearch] = useState("");
  const [cat, setCat] = useState("All");

  const q = search.trim().toLowerCase();
  const featured = posts.find((p) => p.featured);
  const showFeatured = featured && cat === "All" && !q;
  const list = posts
    .filter((p) => !(showFeatured && p.slug === featured!.slug))
    .filter((p) => cat === "All" || p.category === cat)
    .filter((p) => !q || p.title.toLowerCase().includes(q) || p.excerpt.toLowerCase().includes(q));

  const [newsletter, setNewsletter] = useState("");
  function subscribe(e: React.FormEvent) {
    e.preventDefault();
    if (!newsletter) return;
    window.open(
      `mailto:contact@arlotech.com.ng?subject=${encodeURIComponent("Newsletter subscription")}&body=${encodeURIComponent("Please add me to the newsletter: " + newsletter)}`,
      "_self",
    );
  }

  return (
    <Layout>
      <PageHead
        title="Insights, ideas and digital growth."
        intro="Practical web design, SEO, branding, and technology guidance to help your business grow online."
      />
      <section className="section section--tight">
        <div className="container">
          <div className="blogbar">
            <label className="search">
              <Icon name="search" size={18} />
              <span className="sr-only">Search articles</span>
              <input type="search" placeholder="Search articles" value={search} onChange={(e) => setSearch(e.target.value)} />
            </label>
            <div className="filters" role="group" aria-label="Filter by category">
              {categories.map((c) => (
                <button key={c} type="button" className={`chip${cat === c ? " is-on" : ""}`} aria-pressed={cat === c} onClick={() => setCat(c)}>
                  {c}
                </button>
              ))}
            </div>
          </div>

          {showFeatured && featured && (
            <Link to={`/blog/${featured.slug}`} className="feature">
              <Cover slug={featured.slug} image={featured.image} alt={featured.title} className="feature__photo" sizes="(min-width: 960px) 50vw, 92vw" />
              <div className="feature__text">
                <span className="tag">Featured · {featured.category}</span>
                <h2>{featured.title}</h2>
                <p>{featured.excerpt}</p>
                <span className="meta">
                  <span><Icon name="user" size={14} /> {featured.author}</span>
                  <span><Icon name="clock" size={14} /> {featured.readTime}</span>
                  <span>{featured.date}</span>
                </span>
              </div>
            </Link>
          )}

          {list.length === 0 ? (
            <p className="empty">No articles match that. Try a different search or category.</p>
          ) : (
            <div className="pgrid pgrid--3">
              {list.map((p) => (
                <Link key={p.slug} to={`/blog/${p.slug}`} className="post">
                  <Cover slug={p.slug} image={p.image} alt={p.title} className="post__photo" sizes="(min-width: 960px) 30vw, 92vw" />
                  <span className="tag">{p.category}</span>
                  <h3>{p.title}</h3>
                  <p>{p.excerpt}</p>
                  <span className="meta">
                    <span><Icon name="clock" size={14} /> {p.readTime}</span>
                    <span>{p.date}</span>
                  </span>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="section section--white">
        <div className="container container--narrow news">
          <h2>Never miss an update</h2>
          <p>Get practical web design, SEO, and business tips delivered straight to your inbox.</p>
          <form onSubmit={subscribe}>
            <label className="sr-only" htmlFor="news-email">Your email address</label>
            <input id="news-email" type="email" required placeholder="Your email address" value={newsletter} onChange={(e) => setNewsletter(e.target.value)} />
            <button type="submit" className="btn btn--primary">Subscribe</button>
          </form>
        </div>
      </section>
      <CtaBand title="Ready to build something?" text="Whether you need a website, branding, SEO, or digital solutions, Arlotech is here to help your business grow." />
    </Layout>
  );
}
