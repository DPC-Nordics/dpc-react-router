import { NavLink, Outlet, useRouteError } from "react-router-dom";

export default function Root() {
  return (
    <>
      <header>
        <h1>
          <NavLink to="/">Welcome to DPC React Router Post App</NavLink>
        </h1>
        <nav>
          <NavLink to="posts">Posts</NavLink>
        </nav>
      </header>

      <Outlet />
    </>
  );
}

export function RootError() {
  const error: any = useRouteError();

  return (
    <div className="center error" style={{ flexDirection: "column" }}>
      <h2>Error {error.status}</h2>
      <p>{error?.statusText || error?.message}</p>
    </div>
  );
}
