import React from "react";
import { useRef, useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";

const Manager = () => {
  const [form, setform] = useState({ site: "", username: "", password: "" });
  const [passwordArray, setPasswordArray] = useState([]);
  const ref = useRef();
  const passref = useRef();

  const showpassword = () => {
    if (ref.current.src.includes("icons/eye.png")) {
      passref.current.type = "text";
      ref.current.src = "icons/eyecross.png";
    } else {
      passref.current.type = "password";
      ref.current.src = "icons/eye.png";
    }
  };

  const copyText = (text) => {
    toast("Copied to Clickboard!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    navigator.clipboard.writeText(text);
  };

  useEffect(() => {
    let passwords = localStorage.getItem("passwords");
    if (passwords) {
      setPasswordArray(JSON.parse(passwords));
    }
  }, []);

  const savePassword = (params) => {
    if (
      form.site.length > 3 &&
      form.username.length > 3 &&
      form.password.length > 6 &&
      form.password.length != 0
    ) {
      setPasswordArray([...passwordArray, { ...form, id: uuidv4() }]);
      localStorage.setItem(
        "passwords",
        JSON.stringify([...passwordArray, { ...form, id: uuidv4() }])
      );
      setform({ site: "", username: "", password: "" });
      toast("Password Saved!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    } else {
      toast("Error : Password not saved!", {
        theme: "dark",
      });
    }

    // console.log([...passwordArray, form]);
  };
  const editPassword = (id) => {
    console.log("Editing Password with id -", id);
    setform(passwordArray.filter((i) => i.id === id)[0]);
    setPasswordArray(passwordArray.filter((item) => item.id !== id));

    // setPasswordArray([...passwordArray, {...form, id : uuidv4()}]);
    // localStorage.setItem("passwords", JSON.stringify([...passwordArray, {...form, id: uuidv4()}]));
    // console.log([...passwordArray, form]);
  };
  const deletePassword = (id) => {
    let c = confirm("Do you really want to delete this password?");
    if (c) {
      console.log("Deleting Password with id -", id);
      setPasswordArray(passwordArray.filter((item) => item.id !== id));
      localStorage.setItem(
        "passwords",
        JSON.stringify(passwordArray.filter((item) => item.id !== id))
      );
    }
    toast("Password Deleted", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
    // console.log([...passwordArray, form]);
  };

  const handleChange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-[85vh] flex flex-col pb-20">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <div className="back fixed inset-0 -z-10 h-full w-full min-h-screen bg-g border border-whitereen-50 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"></div>{" "}
      <div className="md:container md:mx-auto md:px-40 px-4 py-2 flex-grow">
        <h1 className="text-4xl font-bold text-center py-2">
          <span className="text-green-500">&lt;</span>
          Pass
          <span className="text-green-500">OP&gt;</span>
        </h1>
        <p className="text-green-900 text-lg text-center">
          Your Own Password Manager
        </p>
        <div className="flex flex-col gap-8 text-black items-center my-8">
          <input
            className="rounded-full border border-green-500 p-4 py-1 w-full"
            value={form.site}
            onChange={handleChange}
            placeholder="Enter Website URL : https://example.com"
            type="text"
            name="site"
            id="site"
          />
          <div className="flex md:gap-8 gap-5 w-full">
            <input
              className="rounded-full w-full border border-green-500 px-3 py-1"
              value={form.username}
              onChange={handleChange}
              placeholder="Enter Username"
              type="text"
              name="username"
              id="username"
            />
            <div className="relative md:w-sm w-full flex items-center ">
              <input
                ref={passref}
                className="rounded-full w-full border border-green-500 pl-3 py-1 "
                onChange={handleChange}
                value={form.password}
                placeholder="Password"
                type="password"
                name="password"
                id="pass"
              />
              <span
                className="absolute right-3 cursor-pointer"
                onClick={showpassword}
              >
                <img ref={ref} width={25} src="./icons/eye.png" alt="" />
              </span>
            </div>
          </div>
          <button
            onClick={savePassword}
            className="flex items-center gap-4 bg-green-400  border-green-700 w-fit text border px-5 py-1.5 rounded-full hover:bg-green-500 transition duration-300"
          >
            <lord-icon
              src="https://cdn.lordicon.com/jgnvfzqg.json"
              trigger="hover"
            ></lord-icon>
            Save
          </button>
        </div>

        <div className="passwords ">
          <h2 className="font-bold text-2xl py-4">Your Passwords</h2>
          {passwordArray.length === 0 && <div>No password to show</div>}
          {passwordArray.length != 0 && (
            <div className="overflow-x-auto">
              <table className="table-auto w-full text border border-white-center overflow-hidden rounded-md mb-8">
                <thead className="bg-green-800 text-white">
                  <tr>
                    <th className="py-2">Site</th>
                    <th className="py-2">Username</th>
                    <th className="py-2">Password</th>
                    <th className="py-2">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-green-100">
                  {passwordArray.map((item, index) => {
                    return (
                      <tr key={index}>
                        <td className="py-2 border border-white">
                          <div className="flex justify-between mx-5 items-center">
                            <a href={item.site} target="_blank">
                              {item.site}
                            </a>
                            <div
                              className="lordiconcopy size-7 cursor-pointer"
                              onClick={() => {
                                copyText(item.site);
                              }}
                            >
                              <lord-icon
                                style={{
                                  width: "25px",
                                  height: "25px",
                                  paddingTop: "3px",
                                  paddingLeft: "3px",
                                }}
                                src="https://cdn.lordicon.com/iykgtsbt.json"
                                trigger="hover"
                              ></lord-icon>
                            </div>
                          </div>
                        </td>
                        <td className="py-2 border border-white ">
                          <div className="flex justify-between mx-5 items-center">
                            <span>{item.username}</span>
                            <div
                              className="lordiconcopy size-7 cursor-pointer flex "
                              onClick={() => {
                                copyText(item.username);
                              }}
                            >
                              <lord-icon
                                style={{
                                  width: "25px",
                                  height: "25px",
                                  paddingTop: "3px",
                                  paddingLeft: "3px",
                                }}
                                src="https://cdn.lordicon.com/iykgtsbt.json"
                                trigger="hover"
                              ></lord-icon>
                            </div>
                          </div>
                        </td>
                        <td className="py-2 border border-white">
                          <div className="flex items-center justify-between mx-5">
                            <span>{"*".repeat(item.password.length)}</span>
                            <div
                              className="lordiconcopy size-7 cursor-pointer"
                              onClick={() => {
                                copyText(item.password);
                              }}
                            >
                              <lord-icon
                                style={{
                                  width: "25px",
                                  height: "25px",
                                  paddingTop: "3px",
                                  paddingLeft: "3px",
                                }}
                                src="https://cdn.lordicon.com/iykgtsbt.json"
                                trigger="hover"
                              ></lord-icon>
                            </div>
                          </div>
                        </td>
                        <td className="py-2 border border-white">
                          <div className="flex justify-center gap-5 ">
                            <span
                              className="cursor-pointer mx-1"
                              onClick={() => {
                                editPassword(item.id);
                              }}
                            >
                              <lord-icon
                                src="https://cdn.lordicon.com/gwlusjdu.json"
                                trigger="hover"
                                style={{ width: "25px", height: "25px" }}
                              ></lord-icon>
                            </span>
                            <span
                              className="cursor-pointer mx-1"
                              onClick={() => {
                                deletePassword(item.id);
                              }}
                            >
                              <lord-icon
                                src="https://cdn.lordicon.com/skkahier.json"
                                trigger="hover"
                                style={{ width: "25px", height: "25px" }}
                              ></lord-icon>
                            </span>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Manager;
