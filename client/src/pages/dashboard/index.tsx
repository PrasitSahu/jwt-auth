import Header from "../../components/header";
import setTitle from "../../utils/setTitle";
import Button from "components/button";
import { useEffect, useRef } from "react";
import { useAlert, useUser } from "hooks";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  setTitle("Dashboard");
  const [user, setUser] = useUser();
  const elRef = useRef<any>(null);
  const [, setInfo] = useAlert();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/auth", { replace: true });
    }
  }, [user]);

  function handelClick() {
    const p = elRef.current as HTMLElement;
    const privilaged = user.is_admin;

    privilaged
      ? p.classList.add("dark:text-green-600", "text-green-600")
      : p.classList.add("dark:text-red-600", "text-red-600");
    p.innerHTML = `You are ${privilaged ? "" : "not"} admin privilaged !`;
  }

  function handelLogout() {
    axios
      .delete("http://localhost:5400/auth/logout", { withCredentials: true })
      .then((res) => {
        setInfo({
          title: res.data.message,
          type: "success",
          show: true,
        });
        setUser(null);
      })
      .catch();
  }

  return (
    <>
      <Header />
      <div className="w-full h-full mt-[4.6rem] flex gap-4 justify-center items-center flex-col">
        <p className="dark:text-white">👋 Hello! {user?.username}</p>
        <p className="text-black dark:text-white">check privilages:</p>
        <div className="flex flex-row gap-4">
          <Button onClick={(e) => handelClick()}>Admin</Button>
          <Button onClick={(e) => handelLogout()}>logout</Button>
        </div>
        <p ref={elRef} className="status text-black dark:text-white"></p>
      </div>
    </>
  );
};

export default Dashboard;
