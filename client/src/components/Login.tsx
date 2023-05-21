import { MdEmail } from "react-icons/md";
import { AiFillLock, AiFillFacebook, AiOutlineTwitter } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import signup from "../images/signup.jpg";
import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const loginhandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await fetch("https://mern-app-ewhe.onrender.com/signin", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });
      const data = await res.json();
      if (res.status === 200) {
        alert("login successfully");
        navigate("/");
      } else {
        alert("Invalid credential");
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div
        className="flex flex-row justify-between items-center shadow-xl p-16 rounded-md  
      "
      >
        <div className="flex flex-col items-center justify-center space-y-5">
          <figure>
            <img src={signup} alt="registration-image" className="h-64  " />
          </figure>
          <NavLink to="/register">Create an account</NavLink>
        </div>
        <form method="post" className="flex flex-col " onSubmit={loginhandler}>
          <h3 className="font-bold text-3xl my-5">Sign in</h3>
          <div className="flex items-center w-full relative">
            <label htmlFor="email" className="absolute mt-2">
              <MdEmail />
            </label>
            <input
              type="email"
              placeholder="Your email"
              name="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="text-md w-full  p-2 ps-6 outline-none border-b-2 mt-2 bg-transparent border-gray-300"
              autoComplete="off"
            />
          </div>

          <div className="flex items-center w-full relative">
            <label htmlFor="password" className="absolute mt-2">
              <AiFillLock />
            </label>
            <input
              type="password"
              placeholder="Password"
              name="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="text-md w-full  p-2 ps-6 outline-none border-b-2 mt-2 bg-transparent border-gray-300"
              autoComplete="off"
            />
          </div>

          <button
            type="submit"
            disabled={!email || !password}
            className="disabled:bg-gray-600 w-full p-4 bg-blue-400 rounded-md shadow-sm mt-4 text-xl font-semibold text-white hover:bg-blue-300"
          >
            Sign in
          </button>
          <div className="flex items-center space-x-2 mt-4">
            <span>or login with</span>
            <AiFillFacebook color="#3b5998" size={25} />
            <AiOutlineTwitter color="#00acee" size={25} />
            <FcGoogle size={25} />
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
