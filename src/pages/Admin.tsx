import React, { useEffect, useRef, useState } from "react";
import { useSEO } from "../lib/seo";
import { categories } from "../data/posts";
import { Icon } from "../components/Icon";
import { Logo } from "../components/Logo";
import { Link } from "../lib/router";
import type { Review } from "../data/site";

const API = "/api/posts.php";
const AUTH_API = "/api/auth.php";
const UPLOAD_API = "/api/upload.php";
const REVIEWS_API = "/api/reviews.php";

type Post = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  author: string;
  featured: boolean;
  image?: string;
  content: string[];
};

const today = () => new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });

const emptyPost = (): Post => ({
  slug: "",
  title: "",
  excerpt: "",
  category: "Web Design",
  date: today(),
  readTime: "5 min read",
  author: "Christopher S.",
  featured: false,
  image: "",
  content: [""],
});

export default function Admin() {
  const [password, setPassword] = useState("");
  const [authed, setAuthed] = useState(false);
  const [token, setToken] = useState("");
  const [posts, setPosts] = useState<Post[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [section, setSection] = useState<"posts" | "reviews">("posts");
  const [editing, setEditing] = useState<Post | null>(null);
  const [creating, setCreating] = useState(false);
  const [form, setForm] = useState<Post>(emptyPost());
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [uploading, setUploading] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  useSEO({ title: "Admin", description: "Blog admin panel", path: "/admin" });

  const headers = { "Content-Type": "application/json", Authorization: `Bearer ${token}` };

  async function fetchPosts() {
    try {
      const res = await fetch(API);
      const data = await res.json();
      setPosts(Array.isArray(data) ? data : []);
    } catch {
      setPosts([]);
    }
  }

  async function fetchReviews() {
    try {
      const res = await fetch(REVIEWS_API, { headers: { Authorization: `Bearer ${token}` } });
      if (!res.ok) throw new Error("Failed to load reviews");
      const data = await res.json();
      setReviews(Array.isArray(data) ? data : []);
    } catch {
      setReviews([]);
      setStatus("Could not load reviews.");
    }
  }

  useEffect(() => {
    if (authed) {
      fetchPosts();
      fetchReviews();
    }
  }, [authed]);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoginError("");
    setLoading(true);
    try {
      const res = await fetch(AUTH_API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      if (res.ok) {
        setToken(password);
        setAuthed(true);
      } else {
        setLoginError("Wrong password. Try again.");
      }
    } catch {
      setLoginError("Can't connect to server. Make sure you're on arlotech.com.ng.");
    }
    setLoading(false);
  }

  function logout() {
    setAuthed(false);
    setToken("");
    setPassword("");
  }

  function startCreate() {
    setEditing(null);
    setCreating(true);
    setForm(emptyPost());
    setStatus("");
    window.scrollTo(0, 0);
  }

  function startEdit(post: Post) {
    setCreating(false);
    setEditing(post);
    setForm({ ...post });
    setStatus("");
    window.scrollTo(0, 0);
  }

  function duplicatePost(post: Post) {
    setCreating(true);
    setEditing(null);
    setForm({ ...post, slug: "", title: `${post.title} (Copy)`, featured: false, date: today() });
    setStatus("");
    window.scrollTo(0, 0);
  }

  function cancel() {
    setCreating(false);
    setEditing(null);
    setStatus("");
  }

  function updateContent(index: number, value: string) {
    const updated = [...form.content];
    updated[index] = value;
    setForm({ ...form, content: updated });
  }

  const addParagraph = () => setForm({ ...form, content: [...form.content, ""] });
  const removeParagraph = (index: number) => {
    if (form.content.length <= 1) return;
    setForm({ ...form, content: form.content.filter((_, i) => i !== index) });
  };
  const wordCount = (paragraphs: string[]) => paragraphs.join(" ").split(/\s+/).filter(Boolean).length;

  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      setStatus("Image must be under 5MB.");
      return;
    }
    setUploading(true);
    setStatus("Uploading image...");
    const formData = new FormData();
    formData.append("image", file);
    formData.append("_token", token); // sent as a form field, avoids Authorization header issues on cPanel
    try {
      const res = await fetch(UPLOAD_API, { method: "POST", body: formData });
      if (res.ok) {
        const data = await res.json();
        setForm((prev) => ({ ...prev, image: data.url }));
        setStatus("Image uploaded!");
      } else {
        const err = await res.json();
        setStatus(err.error || "Upload failed.");
      }
    } catch {
      setStatus("Upload failed. Check your connection.");
    }
    setUploading(false);
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    if (!form.title.trim() || form.content.every((p) => !p.trim())) {
      setStatus("Title and at least one paragraph are required.");
      return;
    }
    setLoading(true);
    try {
      const payload = { ...form, content: form.content.filter((p) => p.trim()) };
      if (creating) {
        const res = await fetch(API, { method: "POST", headers, body: JSON.stringify(payload) });
        if (res.status === 401) { setStatus("Wrong password."); setLoading(false); return; }
        if (!res.ok) { setStatus("Failed to create post."); setLoading(false); return; }
        setStatus("Post published!");
      } else if (editing) {
        const res = await fetch(API, { method: "PUT", headers, body: JSON.stringify(payload) });
        if (res.status === 401) { setStatus("Wrong password."); setLoading(false); return; }
        if (!res.ok) { setStatus("Failed to update."); setLoading(false); return; }
        setStatus("Post updated!");
      }
      await fetchPosts();
      setCreating(false);
      setEditing(null);
    } catch {
      setStatus("Network error.");
    }
    setLoading(false);
  }

  async function handleDelete(slug: string) {
    try {
      const res = await fetch(API, { method: "DELETE", headers, body: JSON.stringify({ slug }) });
      if (!res.ok) {
        const error = await res.json().catch(() => null);
        setStatus(error?.error || `Failed to delete post (HTTP ${res.status}).`);
        return;
      }
      await fetchPosts();
      setDeleteConfirm(null);
      setStatus("Post deleted.");
    } catch {
      setStatus("Failed to delete.");
    }
  }

  async function moderateReview(review: Review, nextStatus: "approved" | "rejected") {
    try {
      const res = await fetch(REVIEWS_API, {
        method: "PUT",
        headers,
        body: JSON.stringify({ id: review.id, status: nextStatus }),
      });
      if (!res.ok) {
        const error = await res.json().catch(() => null);
        setStatus(error?.error || `Failed to update review (HTTP ${res.status}).`);
        return;
      }
      setStatus(nextStatus === "approved" ? "Review approved and published." : "Review rejected and hidden.");
      await fetchReviews();
    } catch {
      setStatus("Could not update review.");
    }
  }

  // ─── Login ───
  if (!authed) {
    return (
      <div className="admin admin--login">
        <form onSubmit={handleLogin} className="login">
          <Logo />
          <h1>Admin sign in</h1>
          <p>Manage blog posts and review submissions.</p>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required aria-label="Password" />
          {loginError && <p className="form__error" role="alert">{loginError}</p>}
          <button type="submit" disabled={loading} className="btn btn--primary btn--lg">
            {loading ? "Checking…" : "Sign in"}
          </button>
          <Link to="/" className="textlink">Back to website</Link>
        </form>
      </div>
    );
  }

  const isFormOpen = creating || editing;

  return (
    <div className="admin">
      <header className="admin__top">
        <div className="container admin__bar">
          <Logo />
          <div className="admin__actions">
            <Link to="/blog" className="btn btn--ghost btn--sm"><Icon name="eye" size={16} /> View blog</Link>
            <button type="button" className="btn btn--dark btn--sm" onClick={logout}><Icon name="logout" size={16} /> Log out</button>
          </div>
        </div>
      </header>

      <div className="container admin__main">
        {status && <p className="admin__status" role="status">{status}</p>}
        {!isFormOpen && (
          <div className="admin-tabs" aria-label="Admin sections">
            <button type="button" className={section === "posts" ? "is-active" : ""} onClick={() => setSection("posts")}>
              Blog posts <span>{posts.length}</span>
            </button>
            <button type="button" className={section === "reviews" ? "is-active" : ""} onClick={() => setSection("reviews")}>
              Reviews <span>{reviews.filter((review) => review.status === "pending").length} pending</span>
            </button>
          </div>
        )}

        {isFormOpen ? (
          <form onSubmit={handleSave} className="editor">
            <div className="editor__head">
              <h1>{creating ? "New post" : "Edit post"}</h1>
              <button type="button" className="btn btn--ghost btn--sm" onClick={cancel}><Icon name="x" size={16} /> Cancel</button>
            </div>

            <label>Title
              <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="Post title" />
            </label>
            <label>Excerpt
              <textarea rows={2} value={form.excerpt} onChange={(e) => setForm({ ...form, excerpt: e.target.value })} placeholder="One or two sentences shown on the blog list" />
            </label>

            <div className="form__row form__row--3">
              <label>Category
                <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}>
                  {categories.filter((c) => c !== "All").map((c) => <option key={c}>{c}</option>)}
                </select>
              </label>
              <label>Read time
                <input value={form.readTime} onChange={(e) => setForm({ ...form, readTime: e.target.value })} />
              </label>
              <label>Author
                <input value={form.author} onChange={(e) => setForm({ ...form, author: e.target.value })} />
              </label>
            </div>

            <div className="form__row">
              <label>Date
                <input value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} />
              </label>
              <label className="check">
                <input type="checkbox" checked={form.featured} onChange={(e) => setForm({ ...form, featured: e.target.checked })} />
                <Icon name="star" size={16} /> Feature this post on top of the blog
              </label>
            </div>

            <div className="uploader">
              <p><strong>Cover image</strong> (optional; a photo is chosen for you if left empty)</p>
              {form.image && <img src={form.image} alt="Cover preview" />}
              <div className="actions">
                <input ref={fileRef} type="file" accept="image/*" hidden onChange={handleImageUpload} />
                <button type="button" className="btn btn--ghost btn--sm" disabled={uploading} onClick={() => fileRef.current?.click()}>
                  <Icon name="upload" size={16} /> {uploading ? "Uploading…" : "Upload image"}
                </button>
                {form.image && (
                  <>
                    <button type="button" className="btn btn--ghost btn--sm" onClick={() => navigator.clipboard?.writeText(form.image || "")}><Icon name="copy" size={16} /> Copy URL</button>
                    <button type="button" className="btn btn--ghost btn--sm" onClick={() => setForm({ ...form, image: "" })}><Icon name="x" size={16} /> Remove</button>
                  </>
                )}
              </div>
            </div>

            <fieldset className="paras">
              <legend>Content · {wordCount(form.content)} words</legend>
              {form.content.map((para, i) => (
                <div key={i} className="para">
                  <textarea rows={4} value={para} onChange={(e) => updateContent(i, e.target.value)} placeholder={`Paragraph ${i + 1}`} aria-label={`Paragraph ${i + 1}`} />
                  <button type="button" className="iconbtn" onClick={() => removeParagraph(i)} aria-label={`Remove paragraph ${i + 1}`} disabled={form.content.length <= 1}><Icon name="trash" size={16} /></button>
                </div>
              ))}
              <button type="button" className="btn btn--ghost btn--sm" onClick={addParagraph}><Icon name="plus" size={16} /> Add paragraph</button>
            </fieldset>

            <div className="actions">
              <button type="submit" className="btn btn--primary btn--lg" disabled={loading}><Icon name="save" size={18} /> {loading ? "Saving…" : creating ? "Publish post" : "Save changes"}</button>
            </div>
          </form>
        ) : section === "reviews" ? (
          <section className="review-admin">
            <div className="editor__head">
              <div>
                <h1>Review submissions</h1>
                <p>Only approved reviews appear on the website.</p>
              </div>
              <span className="count">{reviews.filter((review) => review.status === "pending").length} pending</span>
            </div>
            {reviews.length === 0 ? (
              <p className="empty">No reviews to moderate.</p>
            ) : (
              <ul className="review-admin__list">
                {reviews.map((review) => (
                  <li key={review.id} className="review-admin__item">
                    <div className="review-admin__head">
                      <div>
                        <h2>{review.name}{review.business && ` · ${review.business}`}</h2>
                        <p>{review.rating?.toFixed(1) ?? "Unrated"} / 5 · {review.status}{review.createdAt ? ` · ${new Date(review.createdAt).toLocaleDateString()}` : ""}</p>
                      </div>
                      <span className={`review-admin__status review-admin__status--${review.status}`}>{review.status}</span>
                    </div>
                    <p className="review-admin__quote">“{review.quote}”</p>
                    <div className="review-admin__actions">
                      {review.status !== "approved" && (
                        <button type="button" className="btn btn--primary btn--sm" onClick={() => moderateReview(review, "approved")}>
                          Approve and publish
                        </button>
                      )}
                      {review.status !== "rejected" && (
                        <button type="button" className="btn btn--ghost btn--sm" onClick={() => moderateReview(review, "rejected")}>
                          {review.status === "approved" ? "Unpublish" : "Reject"}
                        </button>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </section>
        ) : (
          <>
            <div className="editor__head">
              <h1>Blog posts <span className="count">{posts.length}</span></h1>
              <button type="button" className="btn btn--primary" onClick={startCreate}><Icon name="plus" size={18} /> New post</button>
            </div>
            {posts.length === 0 ? (
              <p className="empty">No posts yet. Create your first one.</p>
            ) : (
              <ul className="plist">
                {posts.map((p) => (
                  <li key={p.slug}>
                    <div>
                      <h2>{p.featured && <Icon name="star" size={16} />} {p.title}</h2>
                      <p>{p.category} · {p.date} · {p.readTime}</p>
                    </div>
                    <div className="plist__actions">
                      <button type="button" className="iconbtn" onClick={() => startEdit(p)} aria-label={`Edit ${p.title}`}><Icon name="edit" size={16} /></button>
                      <button type="button" className="iconbtn" onClick={() => duplicatePost(p)} aria-label={`Duplicate ${p.title}`}><Icon name="copy" size={16} /></button>
                      {deleteConfirm === p.slug ? (
                        <>
                          <button type="button" className="btn btn--danger btn--sm" onClick={() => handleDelete(p.slug)}>Confirm delete</button>
                          <button type="button" className="btn btn--ghost btn--sm" onClick={() => setDeleteConfirm(null)}>Keep</button>
                        </>
                      ) : (
                        <button type="button" className="iconbtn" onClick={() => setDeleteConfirm(p.slug)} aria-label={`Delete ${p.title}`}><Icon name="trash" size={16} /></button>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </>
        )}
      </div>
    </div>
  );
}
