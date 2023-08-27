import { AlertType } from "@types";
import { useEffect, useState } from "react";

const Alert = ({ info, setInfo }: { info: AlertType; setInfo: any }) => {
  const [translate, setTranslate] = useState("translate-x-full");

  useEffect(() => {
    if (info.show) {
      setTranslate("");
      setTimeout(() => {
        setTranslate("translate-x-full");
        setInfo({
          ...info,
          show: false,
        });
      }, 2500);
    }
  }, [info]);

  return (
    <div
      className={`w-fit h-14  p-1 px-6 ${translate} transition-transform font-semibold text-black dark:text-white absolute right-0 bottom-6 z-[20] bg-white dark:bg-slate-900 rounded-l-md  flex justify-center items-center shadow-[5px_5px_0_0] border-2 border-r-0 ${
        info.type === "success"
          ? "border-green-600 shadow-green-600"
          : info.type === "error"
          ? "border-red-600 shadow-red-600"
          : "border-slate-900 dark:border-white shadow-slate-900 dark:shadow-white"
      }`}
    >
      <p>{info.title}</p>
    </div>
  );
};

export default Alert;
