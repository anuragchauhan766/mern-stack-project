import React, { useEffect, useState } from "react";
import { FcPhoneAndroid } from "react-icons/fc";
import { MdEmail, MdLocationOn } from "react-icons/md";
interface UserData {
  name: string;
  phone: string;
  profession?: string;
  email: string;
  message?: string;
}
function Contact() {
  const [userdata, setUserdata] = useState<UserData>({
    name: "",
    phone: "",
    profession: "",
    email: "",
    message: "",
  });
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
      const data = await res.json();
      setUserdata({
        ...userdata,
        name: data.name,
        phone: data.phone,
        email: data.email,
      });

      if (res.status !== 200) {
        console.error("server error");
      }
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    Authenticate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleInput = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    const name = e.target.name;
    const value = e.target.value;
    setUserdata({ ...userdata, [name]: value });
  };
  const submitform = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { name, email, phone, message } = userdata;
    const res = await fetch("http://localhost:3000/contact", {
      method: "POST",
      headers: {
        "content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        name,
        email,
        phone,
        message,
      }),
    });
    const data = await res.json();

    if (!data) {
      console.log("message not send");
    } else {
      alert("Message send successfully");
      setUserdata({ ...userdata, message: "" });
    }
  };
  return (
    <>
      <div className="flex flex-col items-center justify-center w-full space-y-8 mt-8">
        <div className="flex flex-row items-center space-x-10 w-3/4">
          <div className="flex flex-row items-center p-4 shadow-md w-1/3 space-x-4 rounded-md">
            <FcPhoneAndroid size={30} color="#4682b4" />
            <div className="flex flex-col ">
              <span className="font-semibold">Phone</span>
              +1223523462
            </div>
          </div>
          <div className="flex flex-row items-center p-4 shadow-md w-1/3 space-x-4 rounded-md">
            <MdEmail size={30} color="#4682b4" />
            <div className="flex flex-col ">
              <span className="font-semibold">Email</span>
              contact@anurag.com
            </div>
          </div>
          <div className="flex flex-row items-center p-4 shadow-md w-1/3 space-x-4 rounded-md">
            <MdLocationOn size={30} color="#4682b4" />
            <div className="flex flex-col ">
              <span className="font-semibold">Address</span>
              Delhi,India
            </div>
          </div>
        </div>
        <form
          action=""
          className="flex flex-col items-center p-12 rounded-md bg-gray-50 shadow-md space-y-8"
          onSubmit={submitform}
        >
          <div className="flex place-items-start w-full ">
            <h3 className="text-3xl font-bold">Get in Touch</h3>
          </div>
          <div className="flex items-center space-x-4 ">
            <input
              type="text"
              placeholder="Your Name"
              value={userdata?.name}
              name="name"
              onChange={handleInput}
              required
              className="text-md w-1/3  p-2 ps-6 outline-none border-2 bg-transparent border-gray-300 rounded-md"
            />
            <input
              type="email"
              placeholder="Your Email"
              value={userdata?.email}
              name="email"
              onChange={handleInput}
              className="text-md w-1/3  p-2 ps-6 outline-none border-2 bg-transparent border-gray-300 rounded-md"
              required
            />
            <input
              type="tel"
              placeholder="Your Phone Number"
              value={userdata?.phone}
              name="phone"
              onChange={handleInput}
              className="text-md w-1/3  p-2 ps-6 outline-none border-2 bg-transparent border-gray-300 rounded-md"
              pattern="[0-9]{10}"
              required
            />
          </div>
          <textarea
            name="message"
            value={userdata.message}
            onChange={handleInput}
            id="message"
            rows={5}
            className="w-full p-2 placeholder:text-gray-600 border-2 bg-transparent border-gray-300 rounded-lg"
            placeholder="Message"
          ></textarea>
          <div className="w-full">
            <button
              type="submit"
              className="w-1/4 p-4 bg-blue-400 rounded-md shadow-sm mt-4 text-xl font-semibold text-white hover:bg-blue-300"
            >
              Send Message
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default Contact;
