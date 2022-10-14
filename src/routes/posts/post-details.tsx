import { useEffect, useRef } from "react";
import {
  ActionFunctionArgs,
  json,
  LoaderFunctionArgs,
  redirect,
  useFetcher,
  useLoaderData,
  useRouteError,
} from "react-router-dom";
import {
  getPost,
  getPostComments,
  Post,
  Comment,
  addComment,
} from "../../service/db";
import { formatDateTime } from "../helpers";

export async function loader({ params }: LoaderFunctionArgs) {
  const id = params.id;
  if (!id) return redirect("..");

  const post = await getPost(id);
  const comments = await getPostComments(id);

  if (!post || !post.id) throw new Error("Post not found");

  return json({ ...post, comments });
}

export async function action({ request, params }: ActionFunctionArgs) {
  const data = await request.formData();

  const postId = params.id || "";
  const name = data.get("name")?.toString().trim();
  const value = data.get("value")?.toString().trim();

  if (!postId || !name || !value)
    return json<{ error: string }>({ error: "Missing data" });

  await addComment({
    postId,
    name,
    value,
  });

  return redirect("/posts/" + params.id);
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
          <CommentForm />
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

// Components

function CommentForm() {
  const { Form, state, data: actionData } = useFetcher();
  const formRef = useRef<HTMLFormElement>(null);

  const isLoading = state !== "idle";

  useEffect(() => {
    if (!isLoading) formRef.current?.reset();
  }, [isLoading]);

  return (
    <Form method="post" ref={formRef}>
      <fieldset disabled={isLoading}>
        <legend>Add a comment</legend>
        <label>
          Name:
          <br />
          <input
            type="text"
            id="name"
            name="name"
            required
            placeholder="Your name"
          />
        </label>
        <label>
          Comment: <br />
          <input
            type="text"
            id="value"
            name="value"
            required
            placeholder="Your comment here..."
          />
        </label>

        <button type="submit">Add comment</button>
        {actionData?.error && <p className="error">{actionData.error}</p>}
      </fieldset>
    </Form>
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
