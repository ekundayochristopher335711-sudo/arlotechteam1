import { useState } from "react";
import { useSEO } from "../lib/seo";
import { Layout, PageHead } from "../components/Layout";
import { Icon } from "../components/Icon";
import { site } from "../data/site";

type Form = { name: string; company: string; type: string; budget: string; timeline: string; email: string; brief: string };
const empty: Form = { name: "", company: "", type: "", budget: "", timeline: "", email: "", brief: "" };

export default function Contact() {
  useSEO({
    title: "Contact Us: Hire a Web Designer in Lagos",
    description:
      "Get in touch with Arlotech for a free consultation. We build custom websites and web apps for businesses worldwide. Based in Lagos. Email: contact@arlotech.com.ng.",
    path: "/contact",
  });
  const [f, setF] = useState<Form>(empty);
  const [error, setError] = useState("");
  const set = (k: keyof Form) => (e: { target: { value: string } }) => setF({ ...f, [k]: e.target.value });

  const summary = () =>
    `Name: ${f.name}\nCompany: ${f.company}\nProject: ${f.type}\nBudget: ${f.budget}\nTimeline: ${f.timeline}\nEmail: ${f.email}\n\nDetails:\n${f.brief}`;

  function valid() {
    if (!f.name.trim() || !f.brief.trim()) {
      setError("Add your name and a few words about the project first.");
      return false;
    }
    setError("");
    return true;
  }

  function sendEmail() {
    if (!valid()) return;
    const subject = encodeURIComponent("New project enquiry from " + (f.name || "website"));
    window.open(`mailto:${site.email}?subject=${subject}&body=${encodeURIComponent(summary())}`, "_self");
  }

  function sendWhatsApp() {
    if (!valid()) return;
    window.open(`${site.whatsappUrl}?text=${encodeURIComponent("Hi Arlotech,\n\n" + summary())}`, "_blank", "noopener");
  }

  return (
    <Layout>
      <PageHead
        title="Tell us about your project. We'll reply within 24 hours."
        intro="Fill in the form and send it by email or WhatsApp. We'll respond with a plan and a quote. No commitment, no pressure."
        photo="boats"
        position="50% 55%"
      />
      <section className="section section--tight">
        <div className="container contact">
          <form id="schedule" className="form" onSubmit={(e) => e.preventDefault()} noValidate>
            <h2>Start a project</h2>
            <div className="form__row">
              <label>
                Your name
                <input value={f.name} onChange={set("name")} autoComplete="name" placeholder="Full name" />
              </label>
              <label>
                Company or brand
                <input value={f.company} onChange={set("company")} autoComplete="organization" placeholder="If you have one" />
              </label>
            </div>
            <label>
              What do you need?
              <input value={f.type} onChange={set("type")} placeholder="e.g. New website, redesign, online store, web app" />
            </label>
            <div className="form__row">
              <label>
                Budget (optional)
                <input value={f.budget} onChange={set("budget")} placeholder="e.g. $500 / ₦200k" />
              </label>
              <label>
                Timeline (optional)
                <input value={f.timeline} onChange={set("timeline")} placeholder="e.g. 2 weeks / 1 month" />
              </label>
            </div>
            <label>
              Your email
              <input type="email" value={f.email} onChange={set("email")} autoComplete="email" placeholder="you@example.com" />
            </label>
            <label>
              Tell us more about the project
              <textarea rows={5} value={f.brief} onChange={set("brief")} placeholder="What's the goal? Who is it for? Any sites you like?" />
            </label>
            {error && (
              <p className="form__error" role="alert">
                {error}
              </p>
            )}
            <div className="actions">
              <button type="button" className="btn btn--primary btn--lg" onClick={sendEmail}>
                <Icon name="mail" size={18} /> Send by email
              </button>
              <button type="button" className="btn btn--dark btn--lg" onClick={sendWhatsApp}>
                <Icon name="whatsapp" size={18} /> Send on WhatsApp
              </button>
            </div>
          </form>

          <aside className="contact__side">
            <div className="panel">
              <h2>What happens next?</h2>
              <ul className="ticks">
                <li>
                  <Icon name="check" size={16} />
                  We read your brief and get back to you within 24 hours.
                </li>
                <li>
                  <Icon name="check" size={16} />
                  We schedule a free call to talk through the project.
                </li>
                <li>
                  <Icon name="check" size={16} />
                  You get a clear plan and quote with no hidden costs.
                </li>
              </ul>
            </div>
            <div className="panel">
              <h2>Contact details</h2>
              <p>{site.location}</p>
              <p>
                <a className="textlink" href={`mailto:${site.email}`}>
                  {site.email}
                </a>
              </p>
              <p>
                <a className="textlink" href={site.whatsappUrl} target="_blank" rel="noreferrer">
                  WhatsApp {site.whatsappDisplay}
                </a>
              </p>
            </div>
          </aside>
        </div>
      </section>
    </Layout>
  );
}
