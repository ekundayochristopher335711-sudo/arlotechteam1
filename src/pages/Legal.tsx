import { useSEO } from "../lib/seo";
import { Layout, PageHead } from "../components/Layout";

type Block = { title: string; body?: string; list?: string[] };

function LegalPage({ title, intro, path, blocks }: { title: string; intro: string; path: string; blocks: Block[] }) {
  useSEO({ title, description: intro, path });
  return (
    <Layout>
      <PageHead title={title} intro={intro} />
      <section className="section section--tight">
        <div className="container container--narrow legal">
          {blocks.map((b) => (
            <div key={b.title}>
              <h2>{b.title}</h2>
              {b.body && <p>{b.body}</p>}
              {b.list && (
                <ul>
                  {b.list.map((l) => (
                    <li key={l}>{l}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </section>
    </Layout>
  );
}

export function Privacy() {
  return (
    <LegalPage
      path="/privacy"
      title="Privacy policy"
      intro="We collect only what we need to respond to inquiries, and we process information securely as part of our project services."
      blocks={[
        {
          title: "Website scope",
          body: "This policy applies to personal information collected through the Arlotech website, including contact forms, briefing submissions, and inquiry messages submitted via the site.",
        },
        {
          title: "Information we collect",
          body: "We may collect contact details, project briefing information, and optional business metrics to scope proposals and deliver premium solutions.",
        },
        {
          title: "How we use data",
          list: [
            "To respond to briefs and schedule discovery sessions.",
            "To evaluate technical requirements and recommend solutions.",
            "To manage communication and improve our service delivery.",
          ],
        },
        {
          title: "Security and retention",
          body: "We protect data with industry-standard controls, encrypt communication, and retain information only for as long as necessary to support project work and client relationships.",
        },
      ]}
    />
  );
}

export function Terms() {
  return (
    <LegalPage
      path="/terms"
      title="Terms of service"
      intro="These terms apply to our planning, proposal, and delivery of product engineering and design services."
      blocks={[
        {
          title: "Website terms",
          body: "These terms apply to use of the Arlotech website, including contact forms, request submissions, and the information shared through our online inquiry process.",
        },
        {
          title: "Project engagements",
          body: "Engagements are scoped based on the information provided during the intake process and confirmed through our proposed delivery plan.",
        },
        {
          title: "Deliverables and ownership",
          body: "Deliverables are clearly defined in every proposal. Intellectual property and code ownership are transferred according to the project agreement. We retain the right to showcase non-confidential work in our portfolio.",
        },
        {
          title: "Payment and timelines",
          body: "Payment terms are agreed at engagement start. Timelines are based on the approved scope and may change if scope evolves beyond the original delivery plan.",
        },
      ]}
    />
  );
}
