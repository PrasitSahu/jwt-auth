import Header from "../../components/header";
import setTitle from "../../utils/setTitle";
import { useUser } from "../../hooks";
import Button from "components/button";
import { useRef } from "react";

const Dashboard = () => {
  setTitle("Dashboard");
  const elRef = useRef(null);

  const [user] = useUser();

  function handelClick(type: string) {
    const privilaged = user?.is_admin;
    const p: Element = elRef.current!;
    p.classList.remove(
      "text-green-600",
      "dark:text-green-600",
      "text-red-600",
      "dark:text-red-600"
    );
    privilaged
      ? p.classList.add("text-green-600", "dark:text-green-600")
      : p.classList.add("text-red-600", "dark:text-red-600");
    p.innerHTML = `You are ${privilaged ? "" : "not"} admin privilaged !`;
  }

  return (
    <>
      <Header />
      <div className="w-full h-full mt-[4.6rem] border flex gap-4 justify-center items-center flex-col">
        <p className="dark:text-white">👋 Hello! {user?.username}</p>
        <p className="text-black dark:text-white">check privilages:</p>
        <div className="flex flex-row gap-4">
          <Button onClick={(e) => handelClick("admin")}>Admin</Button>
          <Button onClick={(e) => handelClick("user")}>User</Button>
        </div>
        <p ref={elRef} className="status text-black dark:text-white"></p>
      </div>
    </>
  );
};

export default Dashboard;
