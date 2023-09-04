import { Link, useLocation, useNavigate } from "react-router-dom";
import Textbox from "components/textbox";
import setTitle from "utils/setTitle";
import { useEffect, useState } from "react";
import { useAlert } from "hooks";

const Login = () => {
  setTitle("Login");
  const [, setInfo] = useAlert();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [login, setLogin] = useState<boolean>(false);
  const navigate = useNavigate();
  const location = useLocation();
  const query = new URLSearchParams(location.search);

  useEffect(() => {
    const redirect = query.get("redirect");
    if (login) {
      console.log(`/${redirect || ""}`);
      navigate(`/${redirect || ""}`, {
        replace: true,
      });
    }
  }, [login]);

  return (
    <>
      <div className="text-black dark:text-white pl-10 pt-4">
        <a
          onClick={() => {
            navigate(-1);
          }}
        >
          &larr; go back
        </a>
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          fetch("/auth/login", {
            method: "post",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email,
              password,
            }),
          })
            .then((res) => {
              res
                .json()
                .then((data) => {
                  if (!res.ok) throw new Error(data.message);

                  setInfo({
                    title: data.message,
                    type: "success",
                    show: true,
                  });
                  setLogin(true);
                })
                .catch((err) => {
                  setInfo({
                    title: err.message,
                    type: "error",
                    show: true,
                  });
                });
            })
            .catch((err) => {
              setInfo({
                title: err.message,
                type: "error",
                show: true,
              });
            });
        }}
      >
        <div
          className="container max-w-[460px] w-[90%]  h-fit   absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
         flex flex-col py-6 p-16 gap-8"
        >
          <p className="self-center text-black dark:text-white text-3xl font-[cubano]">
            Log In
          </p>
          <div className="flex flex-col">
            <label htmlFor="email" className="text-black dark:text-white">
              Email
            </label>
            <Textbox
              id="email"
              type="email"
              name="email"
              required={true}
              value={email}
              onChange={(e) => setEmail((e.target as HTMLInputElement).value)}
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="password" className="text-black dark:text-white">
              Password
            </label>
            <Textbox
              minLength={8}
              id="password"
              type="password"
              name="password"
              required={true}
              value={password}
              onChange={(e) =>
                setPassword((e.target as HTMLInputElement).value)
              }
            />
          </div>
          <Textbox
            type="submit"
            onClick={() => {
              setInfo({
                title: "login success",
                type: "success",
              });
            }}
          />
          <p className="text-black dark:text-white">
            Don't have an account?{" "}
            <Link to="/auth/signup" className="">
              Signup
            </Link>
          </p>
        </div>
      </form>
    </>
  );
};

export default Login;
