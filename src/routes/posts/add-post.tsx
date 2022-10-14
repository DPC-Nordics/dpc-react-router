import { useEffect, useRef } from "react";
import {
  Form,
  json,
  redirect,
  useActionData,
  ActionFunctionArgs,
} from "react-router-dom";
import { addPost } from "../../service/db";

export async function action({ request }: ActionFunctionArgs) {
  const data = await request.formData();

  const author = data.get("author")?.toString().trim();
  const title = data.get("title")?.toString().trim();
  const content = data.get("content")?.toString().trim();

  if (!author || !title || !content)
    return json<{ error: string }>({ error: "Missing data" });

  const newPost = await addPost({
    author,
    title,
    content,
  });

  return redirect("/posts/" + newPost.id);
}

export default function AddPost() {
  const actionData = useActionData() as { error: string };

  const ref = useRef<HTMLInputElement>(null);
  useEffect(() => {
    ref.current?.focus();
  }, []);

  return (
    <main>
      <h3>Add new post</h3>

      <Form method="post">
        <label htmlFor="title">
          Title:
          <br />
          <input
            ref={ref}
            type="text"
            id="title"
            name="title"
            required
            placeholder="Post title"
          />
        </label>
        <label htmlFor="author">
          Author:
          <br />
          <input
            type="text"
            id="author"
            name="author"
            required
            placeholder="Your name"
          />
        </label>
        <label htmlFor="content">
          Content:
          <br />
          <textarea
            id="content"
            name="content"
            required
            placeholder="Blog content..."
          />
        </label>

        <button type="submit">Add post</button>

        {actionData?.error && <p className="error">{actionData.error}</p>}
      </Form>
    </main>
  );
}
