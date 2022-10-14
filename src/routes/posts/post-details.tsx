import {
  json,
  LoaderFunctionArgs,
  redirect,
  useLoaderData,
  useRouteError,
} from "react-router-dom";
import { getPost, getPostComments, Post, Comment } from "../../service/db";
import { formatDateTime } from "../helpers";

export async function loader({ params }: LoaderFunctionArgs) {
  const id = params.id;
  if (!id) return redirect("..");

  const post = await getPost(id);
  const comments = await getPostComments(id);

  if (!post || !post.id) throw new Error("Post not found");

  return json({ ...post, comments });
}

export default function PostDetails() {
  const post = useLoaderData() as Post;
  const { title, author, content, timestamp, comments = [] } = post;

  return (
    <main>
      <h3>{title}</h3>
      <address>
        - <strong>{author}</strong>{" "}
        <time>{formatDateTime(timestamp, "@ ")}</time>
      </address>
      <p>{content}</p>
      <hr />
      <section>
        <h4>Comments</h4>
        <div className="column-2">
          <CommentList comments={comments} />
        </div>
      </section>
    </main>
  );
}

export function PostDetailsError() {
  const error: any = useRouteError();

  return (
    <div className="center error" style={{ flexDirection: "column" }}>
      <h2>Post Error {error.status}</h2>
      <p>{error?.statusText || error?.message}</p>
    </div>
  );
}

function CommentList({ comments }: { comments: Comment[] }) {
  if (comments.length === 0) {
    return <p>No comments yet</p>;
  }

  return (
    <ul>
      {comments.map(({ id, name, value, timestamp }) => (
        <li key={id}>
          <blockquote>
            {value}
            <small>
              <address>
                - {name} <time>{formatDateTime(timestamp, "@ ")}</time>
              </address>
            </small>
          </blockquote>
        </li>
      ))}
    </ul>
  );
}
