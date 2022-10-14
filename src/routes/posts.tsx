import { Link } from "react-router-dom";
import { LimitedPost } from "../service/db";

export default function Posts() {
  return (
    <section className="page">
      <header>
        <h2>Posts</h2>
        <Link to="add">+ Add new</Link>
      </header>

      <section className="column-2">
        <aside>
          <h3>List of all posts</h3>
          <PostList posts={[]} />
        </aside>
      </section>
    </section>
  );
}

function PostList({ posts }: { posts: LimitedPost[] }) {
  if (posts.length === 0)
    return (
      <p>
        No posts yet. <Link to="add">Add new.</Link>
      </p>
    );

  return (
    <ul>
      {posts.map((post) => (
        <li key={post.id}>
          <Link to={post.id.toString()}>{post.title}</Link>
        </li>
      ))}
    </ul>
  );
}
