import "./appHeader.scss";
import { NavLink, Outlet, useLoaderData, useLocation } from "react-router-dom";
import { useEffect } from "react";
import gsap from "gsap";

const AppHeader = () => {
  let location = useLocation();
  useEffect(() => {
    gsap.fromTo(".content", { opacity: 0, x: 300 }, { opacity: 1, x: 0 });
  }, [location]);

  return (
    <>
      <div className="app">
        <header className="app__header mainBlock">
          <h1 className="app__title">
            <NavLink to="/">
              <div className="title">
                <span>Marvel</span> information portal
              </div>
            </NavLink>
          </h1>
          <nav className="app__menu">
            <ul>
              <li>
                <NavLink
                  end
                  style={({ isActive }) =>
                    isActive ? { color: "#9F0013" } : undefined
                  }
                  to="/"
                >
                  Characters
                </NavLink>
              </li>
              /
              <li>
                <NavLink
                  style={({ isActive }) =>
                    isActive ? { color: "#9F0013" } : undefined
                  }
                  to="/comics"
                >
                  Comics
                </NavLink>
              </li>
            </ul>
          </nav>
        </header>
        <main>
          <Outlet />
        </main>
      </div>
    </>
  );
};

export default AppHeader;
