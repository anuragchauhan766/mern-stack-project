import { useEffect, useState } from "react";

function Home() {
  const [username, setUsername] = useState<string>("");
  const [show, setShow] = useState<boolean>(false);
  const Authenticate = async () => {
    try {
      const res = await fetch("http://localhost:3000/about", {
        method: "GET",
        credentials: "include",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();

      setUsername(data.name);
      setShow(true);

      if (res.status !== 200) {
        console.error("server error");
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    Authenticate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <div className="w-full h-screen absolute flex z-[-1] blur-sm">
        <div className="w-1/2 h-full bg-gradient-to-r from-blue-200 to-cyan-200 "></div>
        <div className="w-1/2 h-full "></div>
      </div>
      <div className="flex flex-col items-center justify-center w-full h-screen space-y-8 ">
        <p className="text-sm font-semibold text-blue-500">Welcome</p>
        <h1 className="text-5xl font-bold text-black">{username}</h1>
        <h2 className="text-5xl font-bold text-black">
          {show ? "Happy to see you back" : "We Are The Developers"}
        </h2>
      </div>
    </>
  );
}

export default Home;
