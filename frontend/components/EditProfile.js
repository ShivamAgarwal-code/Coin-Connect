import React from "react";

const EditProfile = () => {
  return (
    <div className="w-100">
      <div className="font-serif text-xl font-extrabold sm:text-xl  py-6 bg-gradient-to-r from-purple-300 to-fuchsia-900 ">
        <span className="px-3"> Weave Cover Photo👋</span>
      </div>

      <div className="  ">
        <div className="post__avatarppd p-2 border-double border-red-500">
          <img
            className="w-20 h-20 -mt-6  rounded-full cursor-pointer ring-8 ring-purple-400"
            src={
              "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            }
            alt="Rounded avatarppd"
          />
        </div>
        <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-">
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="username"
            >
              Update BIO
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="username"
              type="text"
              placeholder="Username"
            />
          </div>

          <div className="flex items-center justify-between">
            <button
              className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;
