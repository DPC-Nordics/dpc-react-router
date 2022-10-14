import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "./index.css";
import Home from "./routes/home";
import Posts, { loader as postsLoader } from "./routes/posts";
import AddPost, { action as addPostAction } from "./routes/posts/add-post";
import PostsLadingPage from "./routes/posts/landing-page";
import PostDetails, {
  loader as postDetailsLoader,
  action as postDetailsAction,
  PostDetailsError,
} from "./routes/posts/post-details";
import Root, { RootError } from "./routes/root";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <RootError />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "posts",
        element: <Posts />,
        loader: postsLoader,
        children: [
          {
            index: true,
            element: <PostsLadingPage />,
          },
          {
            path: ":id",
            element: <PostDetails />,
            errorElement: <PostDetailsError />,
            loader: postDetailsLoader,
            action: postDetailsAction,
          },
          {
            path: "add",
            element: <AddPost />,
            action: addPostAction,
          },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
