import { Link, Outlet, useLoaderData } from "react-router-dom";
import { getPosts, Post } from "../../service/db";

export async function loader() {
  const posts = await getPosts();

  return posts;
}

export default function Posts() {
  const posts = useLoaderData() as Post[];

  return (
    <section className="page">
      <header>
        <h2>Posts</h2>
        <Link to="add">+ Add new</Link>
      </header>

      <section className="column-2">
        <aside>
          <h3>List of all posts</h3>
          <PostList posts={posts} />
        </aside>

        <Outlet />
      </section>
    </section>
  );
}

function PostList({ posts }: { posts: Post[] }) {
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
