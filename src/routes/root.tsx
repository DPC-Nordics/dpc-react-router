import { NavLink, useRouteError } from "react-router-dom";

export default function Root() {
  return (
    <>
      <header>
        <h1>Welcome to DPC React Router Post App</h1>
        <nav>
          <NavLink to="/">Home</NavLink>
          <NavLink to="posts">Posts</NavLink>
        </nav>
      </header>
    </>
  );
}

export function RootError() {
  const error: any = useRouteError();

  return (
    <div className="center error" style={{ flexDirection: "column" }}>
      {error?.status && <h2>Error {error.status}</h2>}
      {error?.statusText && <p>{error?.statusText}</p>}
    </div>
  );
}
