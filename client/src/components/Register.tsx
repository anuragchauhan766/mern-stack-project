import { BsFillPersonFill, BsFillTelephoneFill } from "react-icons/bs";
import { MdEmail, MdWork } from "react-icons/md";
import { AiFillLock, AiOutlineLock } from "react-icons/ai";
import signup from "../images/signup.jpg";
import { NavLink, useNavigate } from "react-router-dom";

import { useState } from "react";

interface User {
  name: string;
  phone: string;
  email: string;
  profession: string;
  password: string;
  cpassword: string;
}

function Register() {
  const navigate = useNavigate();
  const [user, setUser] = useState<User>({
    name: "",
    phone: "",
    email: "",
    profession: "",
    password: "",
    cpassword: "",
  });

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fieldName = e.target.name;
    const fieldValue = e.target.value;
    setUser({ ...user, [fieldName]: fieldValue });
  };
  const register = async (e: React.FormEvent<HTMLFormElement>) => {
    const { name, phone, email, profession, password } = user;
    e.preventDefault();
    try {
      const res = await fetch("https://mern-app-ewhe.onrender.com/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, phone, email, profession, password }),
      });

      if (res.status === 201) {
        const data = await res.json();
        console.log("successful");
        alert("Registration successfull");
        navigate("/login");
      } else {
        console.log("failed");
        alert("Registeration Failed with status " + res.status);
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
        <form method="POST" className="flex flex-col " onSubmit={register}>
          <h3 className="font-bold text-3xl my-5">Sign Up</h3>
          <div className="flex items-center w-full relative">
            <label htmlFor="name" className="absolute mt-2">
              <BsFillPersonFill />
            </label>
            <input
              type="text"
              placeholder="Your Name"
              name="name"
              id="name"
              value={user.name}
              onChange={handleInput}
              className="text-md w-full  p-2 ps-6 outline-none border-b-2 mt-2 bg-transparent border-gray-300"
              autoComplete="off"
              required
            />
          </div>
          <div className="flex items-center w-full relative">
            <label htmlFor="email" className="absolute mt-2">
              <MdEmail />
            </label>
            <input
              type="email"
              placeholder="Your email"
              name="email"
              id="email"
              value={user.email}
              onChange={handleInput}
              className="text-md w-full  p-2 ps-6 outline-none border-b-2 mt-2 bg-transparent border-gray-300"
              autoComplete="off"
              required
            />
          </div>
          <div className="flex items-center w-full relative">
            <label htmlFor="phone" className="absolute mt-2">
              <BsFillTelephoneFill />
            </label>
            <input
              type="tel"
              placeholder="Mobile Number"
              name="phone"
              id="phone"
              value={user.phone}
              onChange={handleInput}
              className="text-md w-full  p-2 ps-6 outline-none border-b-2 mt-2 bg-transparent border-gray-300"
              autoComplete="off"
              pattern="[0-9]{10}"
              required
            />
          </div>
          <div className="flex items-center w-full relative">
            <label htmlFor="profession" className="absolute mt-2">
              <MdWork />
            </label>
            <input
              type="text"
              placeholder="Profession"
              name="profession"
              id="profession"
              value={user.profession}
              onChange={handleInput}
              className="text-md w-full  p-2 ps-6 outline-none border-b-2 mt-2 bg-transparent border-gray-300"
              autoComplete="off"
              required
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
              value={user.password}
              onChange={handleInput}
              className="text-md w-full  p-2 ps-6 outline-none border-b-2 mt-2 bg-transparent border-gray-300"
              autoComplete="off"
              required
            />
          </div>
          <div className="flex items-center w-full relative">
            <label htmlFor="cpassword" className="absolute mt-2">
              <AiOutlineLock />
            </label>
            <input
              type="password"
              placeholder="Confirm Password"
              name="cpassword"
              id="cpassword"
              value={user.cpassword}
              onChange={handleInput}
              className="text-md w-full  p-2 ps-6 outline-none border-b-2 mt-2 bg-transparent border-gray-300"
              autoComplete="off"
              required
            />
          </div>
          <button
            type="submit"
            disabled={!user}
            className="w-full p-4 bg-blue-400 rounded-md shadow-sm mt-4 text-xl font-semibold text-white hover:bg-blue-300"
          >
            Register
          </button>
        </form>

        <div className="flex flex-col items-center justify-center space-y-5">
          <figure>
            <img src={signup} alt="registration-image" className="h-64  " />
          </figure>
          <NavLink to="/signin">Already Registerd?</NavLink>
        </div>
      </div>
    </div>
  );
}

export default Register;
