import { useEffect, useState } from "react";
import { FaUserAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
interface UserData {
  name: string;
  phone: string;
  profession: string;
  email: string;
}
function About() {
  const navigate = useNavigate();
  const [activetab, setActivetab] = useState<number>(0);
  const [userdata, setUserdata] = useState<UserData>();
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
      setUserdata(data);

      if (res.status !== 200) {
        console.error("server error");
      }
    } catch (error) {
      console.log(error);
      navigate("/login");
    }
  };
  useEffect(() => {
    Authenticate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className="w-full h-screen flex justify-center items-center">
        <div className="grid grid-cols-6 grid-rows-2 shadow-xl p-16 rounded-md w-3/4">
          <div className="col-span-2">
            <FaUserAlt size={100} />
          </div>
          <div className="col-span-3 ">
            <h4 className="text-xl font-semibold">{userdata?.name}</h4>
            <p className="text-sm">{userdata?.profession}</p>
            <div className="flex items-center space-x-4 font-semibold">
              <button
                type="button"
                onClick={() => setActivetab(0)}
                className={`${
                  activetab === 0 ? `border-b-4 border-blue-600` : ""
                } p-2`}
              >
                About
              </button>
              <button
                type="button"
                onClick={() => setActivetab(1)}
                className={`${
                  activetab === 1 ? `border-b-4 border-blue-600` : ""
                } p-2 `}
              >
                TimeLine
              </button>
            </div>
          </div>
          <div className="col-span-1  ">
            <button
              type="button"
              className="bg-gray-100 rounded-xl p-1 font-medium"
            >
              edit profile
            </button>
          </div>
          <div className="col-span-2">
            <p>Web Developer</p>
            <p>C/C++</p>
            <p>React</p>
            <p>Nodejs</p>
            <p>Mongodb</p>
          </div>
          <div className="col-span-4">
            {activetab === 0 ? (
              <table className="w-full">
                <tbody>
                  <tr className="">
                    <td className=" font-semibold text-sm">User id</td>
                    <td className="text-blue-500">74297492793</td>
                  </tr>
                  <tr className="px-6 py-4">
                    <td className=" font-semibold text-sm ">Name</td>
                    <td className="text-blue-500">{userdata?.name}</td>
                  </tr>
                  <tr className="px-6 py-4">
                    <td className=" font-semibold text-sm">Email</td>
                    <td className="text-blue-500">{userdata?.email}</td>
                  </tr>
                  <tr className="px-6 py-4">
                    <td className=" font-semibold text-sm">Profession</td>
                    <td className="text-blue-500">{userdata?.profession}</td>
                  </tr>
                </tbody>
              </table>
            ) : (
              <div></div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default About;
