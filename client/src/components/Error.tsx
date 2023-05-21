import { NavLink } from "react-router-dom";

function Error() {
  return (
    <section className="bg-primary relative z-10 py-[120px]">
      <div className="container mx-auto">
        <div className="-mx-4 flex">
          <div className="w-full px-4">
            <div className="mx-auto max-w-[400px] text-center">
              <h2 className="mb-2 text-[50px] font-bold leading-none text-blue-500 sm:text-[80px] md:text-[100px]">
                404
              </h2>
              <h4 className="mb-3 text-[22px] font-semibold leading-tight text-black">
                Oops! That page can’t be found
              </h4>
              <p className="mb-8 text-lg text-black">
                The page you are looking for it maybe deleted
              </p>
              <NavLink
                to="/"
                className="hover:text-primary inline-block rounded-lg border border-white px-8 py-3 text-center text-base font-semibold text-white transition bg-blue-500 hover:bg-blue-400"
              >
                Go To Home
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Error;
