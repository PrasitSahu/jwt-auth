import { Link } from "react-router-dom";
import Textbox from "../../components/textbox";
import setTitle from "../../utils/setTitle";
import { useState } from "react";
import fetcher from "utils/fetcher";

const Signup = () => {
  setTitle("Signup");

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        fetcher.post("/auth/signup", {
          email,
          password
        })
        .then(res => console.log(JSON.stringify(res)))
        .catch(err => console.log(`error: ${err.code} | ${err.message}`))
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
            onChange={(e) => setPassword((e.target as HTMLInputElement).value)}
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
  );
};

export default Signup;
