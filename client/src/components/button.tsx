import { ButtonProps } from "@types";

const Button = ({ children, ...props }: ButtonProps<any>) => {
  return (
    <button className="text-black dark:text-white border-2 w-fit p-2 
    rounded-md shadow-slate-900 dark:shadow-white 
    shadow-[5px_5px_0_0] bg-gray-300 dark:bg-slate-900 
    active:translate-x-[2px] active:translate-y-[2px] 
    active:shadow-[3px_3px_0_0]" {...props}>
      {children}
    </button>
  );
};

export default Button;
