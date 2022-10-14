import { Link, NavLink, Outlet, useLoaderData } from "react-router-dom";
import { getPosts, LimitedPost } from "../../service/db";

export async function loader() {
  const posts = await getPosts();

  const limitedPosts: LimitedPost[] = posts.map((post) => ({
    id: post.id,
    title: post.title,
  }));

  return limitedPosts;
}

export default function Posts() {
  const posts = useLoaderData() as LimitedPost[];

  return (
    <section className="page">
      <header>
        <h2>Posts</h2>
        <NavLink to="add">+ Add new</NavLink>
      </header>

      <section className="column-2">
        <aside>
          <h3>List of all posts ({posts.length})</h3>
          <PostList posts={posts} />
        </aside>

        <Outlet />
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
          <NavLink to={post.id.toString()}>{post.title}</NavLink>
        </li>
      ))}
    </ul>
  );
}
