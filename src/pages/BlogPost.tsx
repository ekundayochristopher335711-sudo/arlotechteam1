import { useEffect } from "react";
import { Link, navigate } from "../lib/router";
import { useSEO } from "../lib/seo";
import { usePosts } from "../lib/usePosts";
import { Layout } from "../components/Layout";
import { Cover } from "../components/Cover";
import { Icon } from "../components/Icon";

export default function BlogPost({ slug }: { slug: string }) {
  const posts = usePosts();
  const index = posts.findIndex((p) => p.slug === slug);
  const post = posts[index];

  useSEO({
    title: post ? post.title : "Article not found",
    description: post ? post.excerpt : "This article could not be found.",
    path: `/blog/${slug}`,
  });

  useEffect(() => {
    // Only redirect once we know the full list; static posts are available immediately.
    if (index === -1) {
      const t = setTimeout(() => navigate("/blog"), 1200);
      return () => clearTimeout(t);
    }
  }, [index]);

  if (!post) {
    return (
      <Layout>
        <section className="section container container--narrow">
          <h1>Loading article…</h1>
        </section>
      </Layout>
    );
  }

  const prev = posts[index - 1];
  const next = posts[index + 1];

  return (
    <Layout>
      <article className="article">
        <div className="container container--narrow">
          <Link to="/blog" className="textlink back">
            <Icon name="arrowLeft" size={18} /> Back to blog
          </Link>
          <span className="tag">{post.category}</span>
          <h1>{post.title}</h1>
          <p className="meta meta--line">
            <span><Icon name="user" size={15} /> {post.author}</span>
            <span><Icon name="clock" size={15} /> {post.readTime}</span>
            <span>{post.date}</span>
          </p>
        </div>
        <div className="container article__cover">
          <Cover slug={post.slug} image={post.image} alt={post.title} className="article__photo" sizes="(min-width: 1200px) 1100px, 94vw" />
        </div>
        <div className="container container--narrow article__body">
          {post.content.map((para, i) => (
            <p key={i}>{para}</p>
          ))}

          <div className="panel panel--accent article__cta">
            <h3>Need help with this?</h3>
            <p>We can help you put these ideas into action. Let's talk about your project.</p>
            <Link to="/contact#schedule" className="btn btn--dark">
              Get in touch
            </Link>
          </div>

          <nav className="pager" aria-label="More articles">
            {prev ? (
              <Link to={`/blog/${prev.slug}`}>
                <span>Previous</span>
                {prev.title}
              </Link>
            ) : (
              <span />
            )}
            {next && (
              <Link to={`/blog/${next.slug}`} className="pager__next">
                <span>Next</span>
                {next.title}
              </Link>
            )}
          </nav>
        </div>
      </article>
    </Layout>
  );
}
