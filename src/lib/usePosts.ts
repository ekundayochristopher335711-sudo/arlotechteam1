import { useEffect, useState } from "react";
import { posts as staticPosts, type Post } from "../data/posts";

/** Static posts first (instant), then the live list from /api/posts.php when the server has one. */
export function usePosts() {
  const [posts, setPosts] = useState<Post[]>(staticPosts);
  useEffect(() => {
    fetch("/api/posts.php")
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data) && data.length) setPosts(data);
      })
      .catch(() => {});
  }, []);
  return posts;
}
