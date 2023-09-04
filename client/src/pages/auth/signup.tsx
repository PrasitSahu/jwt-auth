import { Link, useNavigate } from "react-router-dom";
import Textbox from "../../components/textbox";
import setTitle from "../../utils/setTitle";
import { useState } from "react";
import { useAlert } from "hooks";

const Signup = () => {
  setTitle("Signup");
  const [, setInfo] = useAlert();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();

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
          fetch("/auth/signup", {
            method: "post",
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
                  navigate("/auth/login", { replace: true });
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
          className="container max-w-[460px] w-[90%] h-fit 
       absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
         flex flex-col py-6 p-16 gap-8"
        >
          <p className="self-center text-black dark:text-white text-3xl font-[cubano]">
            Signup
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
          <Textbox type="submit" />
          <p className="text-black dark:text-white">
            Already have an account?{" "}
            <Link to="/auth/login" className="">
              Login
            </Link>
          </p>
        </div>
      </form>
    </>
  );
};

export default Signup;
