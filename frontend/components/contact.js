import React from "react";

const contact = () => {
  return (
    <div className="container my-24 px-6 mx-auto">
      <section className="mb-32 text-gray-800">
        <div className="flex flex-wrap">
          <div className="grow-0 shrink-0 basis-auto mb-6 md:mb-0 w-full md:w-6/12 px-3 lg:px-6">
            <h2 className="text-3xl font-medium mb-6">Contact Weave</h2>
            <p className="text-gray-500 mb-6 text-lg">
              Contact us to help you get the issue resolved.
            </p>
          </div>
          <div className="grow-0 shrink-0 basis-auto mb-12 md:mb-0 w-full md:w-6/12 px-3 lg:px-6 shadow-xl">
            <form>
              <h1 className="text-xl font-semibold py-2">Email</h1>
              <div className="form-group mb-6">
                <input
                  type="text"
                  className="form-control block
            w-full
            px-3
            py-1.5
            text-base
            font-normal
            text-gray-700
            bg-white bg-clip-padding
            border border-solid border-gray-300
            rounded-2xl
            transition
            ease-in-out
            m-0
            focus:text-gray-700 focus:bg-white focus:border-purple-600 focus:outline-none"
                  id="exampleInput7"
                  placeholder="Name"
                />
              </div>
              <div className="form-group mb-6">
                <h1 className="text-xl font-semibold py-2">Suject</h1>
                <input
                  type="text"
                  className="form-control block
            w-full
            px-3
            py-1.5
            text-base
            font-normal
            text-gray-700
            bg-white bg-clip-padding
            border border-solid border-gray-300
            rounded-2xl
            transition
            ease-in-out
            m-0
            focus:text-gray-700 focus:bg-white focus:border-purple-600 focus:outline-none"
                  id="exampleInput8"
                  placeholder="What happened?"
                />
              </div>
              <div className="form-group mb-6">
                <h1 className="text-xl font-semibold py-2">Message</h1>
                <textarea
                  className="
            form-control
            block
            w-full
            px-3
            py-1.5
            text-base
            font-normal
            text-gray-700
            bg-white bg-clip-padding
            border border-solid border-gray-300
            rounded-2xl
            transition
            ease-in-out
            m-0
            focus:text-gray-700 focus:bg-white focus:border-purple-600 focus:outline-none
          "
                  id="exampleFormControlTextarea13"
                  rows="3"
                  placeholder="Message"
                ></textarea>
              </div>

              <button
                type="submit"
                className="
              m-6
          w-16
          px-6
          py-2.5
          bg-purple-600
          text-white
          font-medium
          text-xs
          leading-tight
          uppercase
          rounded-xl
          shadow-md
          hover:bg-purple-700 hover:shadow-lg
          focus:bg-purple-700 focus:shadow-lg focus:outline-none focus:ring-0
          active:bg-purple-800 active:shadow-lg
          transition
          duration-150
          ease-in-out"
              >
                Send
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default contact;
