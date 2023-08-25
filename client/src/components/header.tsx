import { useTheme, useUser } from "../hooks";
import { Link } from "react-router-dom";
import { MoonIcon, SunIcon } from "@heroicons/react/24/solid";
import Switcher from "./switcher";
import { FC } from "react";

const Header: FC = () => {
  const [user] = useUser();
  const [theme, setTheme] = useTheme();

  return (
    <header className="fixed w-full h-[4.6rem] border-b border-black dark:border-white flex flex-row justify-between px-20 items-center dark:bg-slate-900 bg-white">
      <p className="logo text-3xl dark:text-white text-black font-[cubano]">
        Auth.
      </p>
      <div className="flex flex-row gap-6 items-center">
        {user ? (
          `👋 Hello! ${user.username}`
        ) : (
          <Link to="/auth/login" className="text-black dark:text-white ">
            login
          </Link>
        )}
        <Switcher
          enabled={theme === "dark" ? true : false}
          onEnabled={() => {
            setTheme("dark");
          }}
          onDisabled={() => {
            setTheme("light");
          }}
          onStateIcon={<SunIcon className="h-6" />}
          offStateIcon={<MoonIcon className="h-6" />}
        />
      </div>
    </header>
  );
};

export default Header;
