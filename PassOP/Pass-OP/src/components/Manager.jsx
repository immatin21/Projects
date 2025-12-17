import React, { useEffect, useRef, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";
import { useAuth0 } from "@auth0/auth0-react";
import Loading from "../components/Loading";

const Manager = () => {
  const { loginWithRedirect, user, isAuthenticated, isLoading } = useAuth0();

  const [form, setForm] = useState({ site: "", username: "", password: "" });
  const [passwordArray, setPasswordArray] = useState([]);

  const ref = useRef(null);
  const passref = useRef(null);

  const GetPassword = async () => {
    if (!user) return;

    const res = await fetch("/api/server", {
      headers: {
        "x-user-id": user.sub,
      },
    });

    const data = await res.json();
    setPasswordArray(data);
  };

  useEffect(() => {
    if (isAuthenticated && user) {
      GetPassword();
    }
  }, [isAuthenticated, user]);

  const savePassword = async () => {
    try {
      if (
        form.site.length > 3 &&
        form.username.length > 3 &&
        form.password.length > 6
      ) {
        const newPassword = { ...form, id: uuidv4() };

        const res = await fetch("/api/server", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-user-id": user.sub,
          },
          body: JSON.stringify(newPassword),
        });

        if (!res.ok) throw new Error();

        await GetPassword();
        setForm({ site: "", username: "", password: "" });

        toast("Password Saved!", { theme: "dark" });
      } else {
        toast("Check input requirements!", { theme: "dark" });
      }
    } catch {
      toast("Failed to save password", { theme: "dark" });
    }
  };

  const deletePassword = async (id) => {
    if (!confirm("Do you really want to delete this password?")) return;

    await fetch("/api/server", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "x-user-id": user.sub,
      },
      body: JSON.stringify({ id }),
    });

    await GetPassword();
    toast("Password Deleted", { theme: "dark" });
  };

  const copyText = (text) => {
    navigator.clipboard.writeText(text);
    toast("Copied to Clipboard!", { theme: "dark" });
  };

  const showpassword = () => {
    if (passref.current.type === "password") {
      passref.current.type = "text";
      ref.current.src = "/icons/eyecross.png";
    } else {
      passref.current.type = "password";
      ref.current.src = "/icons/eye.png";
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  if (isLoading) {
    return <Loading/>;
  }

if (!isAuthenticated) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-xl px-10 py-8 max-w-md w-full text-center border border-green-200 -mt-20">
        <h1 className="text-3xl font-bold mb-3 text-gray-800">
          Welcome to <span className="text-green-500">PassOP</span>
        </h1>

        <p className="text-gray-600 mb-6 leading-relaxed">
          A simple password manager to store and manage your credentials
          in one place, where your data is private and accessible only to you.
        </p>

        <div className="flex items-center justify-center mb-6">
          <div className="w-12 h-12 flex items-center justify-center rounded-full bg-green-100 text-green-600 text-xl font-bold">
            🔐
          </div>
        </div>

        <button
          onClick={() => loginWithRedirect({ connection: "github" })}
          className="w-full cursor-pointer hover:scale-105 bg-green-500 hover:bg-green-600 text-white font-medium py-2.5 rounded-lg transition duration-200 flex items-center justify-center gap-2"
        >
          <img
            src="/icons/github.svg"
            alt="GitHub"
            className="w-5 h-5 invert"
          />
          Continue with GitHub
        </button>

        <p className="text-xs text-gray-400 mt-4">
          Sign in to start using PassOP.
        </p>
      </div>
    </div>
  );
}



  return (
    <div className="min-h-screen flex flex-col">
      <ToastContainer theme="dark" />

      <div className="container mx-auto px-4 md:px-8 lg:px-16 xl:px-32 py-2 flex-grow">
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
          />

          <div className="flex gap-8 w-full">
            <input
              className="rounded-full w-full border border-green-500 p-4 py-1"
              value={form.username}
              onChange={handleChange}
              placeholder="Enter Username"
              type="text"
              name="username"
            />

            <div className="relative w-full flex items-center">
              <input
                ref={passref}
                className="rounded-full w-full border border-green-500 px-4 py-1"
                value={form.password}
                onChange={handleChange}
                placeholder="Enter Password"
                type="password"
                name="password"
              />
              <span className="absolute right-2 cursor-pointer">
                <img
                  ref={ref}
                  width={25}
                  src="/icons/eye.png"
                  onClick={showpassword}
                />
              </span>
            </div>
          </div>

          <button
            onClick={savePassword}
            className="bg-green-400 border-green-700 px-5 py-1.5 rounded-full hover:bg-green-500 transition"
          >
            Save
          </button>
        </div>

        <div className="passwords">
          <h2 className="font-bold text-2xl py-4">Your Passwords</h2>

          {passwordArray.length === 0 && <div>No password to show</div>}

          {passwordArray.length > 0 && (
            <div className="overflow-x-auto">
              <table className="table-auto w-full border rounded-md">
                <thead className="bg-green-800 text-white">
                  <tr>
                    <th className="py-2">Site</th>
                    <th className="py-2">Username</th>
                    <th className="py-2">Password</th>
                    <th className="py-2">Actions</th>
                  </tr>
                </thead>

                <tbody className="bg-green-100">
                  {passwordArray.map((item) => (
                    <tr key={item.id}>
                      <td className="py-2 border">
                        <div className="flex justify-between mx-5">
                          <a href={item.site} target="_blank">
                            {item.site}
                          </a>
                          <span
                            className="cursor-pointer"
                            onClick={() => copyText(item.site)}
                          >
                            📋
                          </span>
                        </div>
                      </td>

                      <td className="py-2 border">
                        <div className="flex justify-between mx-5">
                          {item.username}
                          <span
                            className="cursor-pointer"
                            onClick={() => copyText(item.username)}
                          >
                            📋
                          </span>
                        </div>
                      </td>

                      <td className="py-2 border">
                        <div className="flex justify-between mx-5">
                          {"*".repeat(item.password.length)}
                          <span
                            className="cursor-pointer"
                            onClick={() => copyText(item.password)}
                          >
                            📋
                          </span>
                        </div>
                      </td>

                      <td className="py-2 border text-center">
                        <button
                          className="text-red-600"
                          onClick={() => deletePassword(item.id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
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
