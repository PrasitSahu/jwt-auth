import { HTMLAttributes } from "react";

//
export type ThemeType = "light" | "dark";

// interfaces
export interface User {
  username: string;
  email: string;
  is_Loggedin: boolean;
  is_admin: boolean;
}

export interface TextBoxProps<T> extends HTMLAttributes<T> {
  type?: "text" | "password" | "search" | "submit" | "email";
  name?: string;
  id?: string;
  minLength?: number;
  maxLength?: number;
  required?: boolean;
  value?: string | number;
}

export interface ButtonProps<T> extends HTMLAttributes<T> {}

export interface ThemeContextType {
  theme: ThemeType;
  updateTheme: (theme: ThemeType) => void;
}

export interface Fetcher {
  get: (url: string) => Promise<{}>;
  post: (url: string, body: {}) => Promise<{}>;
}
