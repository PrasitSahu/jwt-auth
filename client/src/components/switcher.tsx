import { useState, ReactNode } from "react";

// types
interface props{
  onStateIcon?: String | ReactNode,
  offStateIcon?: String | ReactNode,
  enabled: Boolean,
  onEnabled: () => void,
  onDisabled: () => void
}


const Switcher = ({
  onStateIcon = "1",
  offStateIcon = "0",
  enabled = false,
  onEnabled,
  onDisabled,
}: props) => {
  const [state, setState] = useState(enabled);
  const handelClick = () => {
    setState(!state);
    if (!state) onEnabled();
    else onDisabled();
  };

  return (
    <div
      onClick={handelClick}
      className="w-10 h-10 rounded-full bg-white dark:bg-slate-900 flex justify-center items-center cursor-pointer text-black dark:text-white select-none"
    >
      {state ? onStateIcon : offStateIcon}
    </div>
  );
};

export default Switcher;
