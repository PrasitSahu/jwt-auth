import {  TextBoxProps } from "../@types";

const Textbox = ({ type, ...props }: TextBoxProps<any>) => {
  if (type === "submit")
    return (
      <input
        className="text-black dark:text-white border-2 w-fit p-2 
    rounded-md shadow-slate-900 dark:shadow-white 
    shadow-[5px_5px_0_0] bg-gray-300 dark:bg-slate-900 
    active:translate-x-[2px] active:translate-y-[2px] 
    active:shadow-[3px_3px_0_0] cursor-pointer"
        type={type}
        {...props}
      />
    );
  return (
    <input
      className="focus:valid:border-green-600 focus:invalid:border-red-600 focus:invalid:text-red-600 dark:focus:valid:border-green-600 dark:focus:invalid:border-red-600 dark:focus:invalid:text-red-600 text-black dark:text-white bg-white dark:bg-slate-800 outline-none border border-black dark:border-white h-10 w-62 shadow-black dark:shadow-white valid:focus:shadow-green-600 invalid:focus:shadow-red-600 dark:valid:focus:shadow-green-600 dark:invalid:focus:shadow-red-600  shadow-[5px_5px_0_0] px-4"
      type={type}
      {...props}
      
    />
  );
};

export default Textbox;
