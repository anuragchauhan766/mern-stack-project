import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const [login, setLogin] = useState<boolean>(false);
  const Authenticate = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_SERVER_BASE_URL}/about`, {
        method: "GET",
        credentials: "include",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      if (res.status !== 200) {
        console.error("server error");
        return;
      }
      await res.json();

      setLogin(true);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    Authenticate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  });
  const handleLogout = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    try {
      const res = await fetch(
        `${import.meta.env.VITE_SERVER_BASE_URL}/logout`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );
      const data = await res.json();
      if (data) {
        console.log(data);
        setLogin(false);
        navigate("/login");
      }
      if (res.status !== 200) {
        throw new Error("unwanted error");
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <nav className="flex flex-row items-center justify-between p-3 px-10 w-full  bg-gray-100">
      <NavLink to="/">
        <h1 className="text-2xl font-bold">
          <span className="text-blue-700">ANU</span>RAG
        </h1>
      </NavLink>
      <div className="">
        <ul className="flex items-center space-x-6 font-semibold text-md">
          <li className=" ">
            <NavLink
              to="/"
              style={({ isActive }) => ({
                color: isActive ? "#808080" : "",
              })}
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/about"
              style={({ isActive }) => ({
                color: isActive ? "#808080" : "",
              })}
            >
              About us
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/contact"
              style={({ isActive }) => ({
                color: isActive ? "#808080" : "",
              })}
            >
              Contact
            </NavLink>
          </li>
          {login ? (
            <li>
              <button type="button" onClick={handleLogout}>
                Logout
              </button>
            </li>
          ) : (
            <>
              <li>
                <NavLink
                  to="/login"
                  style={({ isActive }) => ({
                    color: isActive ? "#808080" : "",
                  })}
                >
                  Login
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/register"
                  style={({ isActive }) => ({
                    color: isActive ? "#808080" : "",
                  })}
                >
                  Register
                </NavLink>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
