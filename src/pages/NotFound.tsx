import { Link } from "../lib/router";
import { useSEO } from "../lib/seo";
import { Layout } from "../components/Layout";

export default function NotFound() {
  useSEO({ title: "Page not found", description: "This page could not be found.", path: "/404" });
  return (
    <Layout>
      <section className="section notfound">
        <div className="container container--narrow">
          <p className="notfound__code">404</p>
          <h1>We couldn't find that page.</h1>
          <p className="lead">The link may be old, or the page may have moved. Head back home or browse our work.</p>
          <div className="actions">
            <Link to="/" className="btn btn--primary btn--lg">
              Back to home
            </Link>
            <Link to="/work" className="btn btn--ghost btn--lg">
              See our work
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
