import {
  createBrowserRouter,
  redirect,
  RouterProvider,
} from "react-router-dom";
import Home from "./pages";
import Dashboard from "./pages/dashboard";
import { useUser } from "./hooks";
import Login from "./pages/auth/login";
import Signup from "./pages/auth/signup";

function App() {
  const [user] = useUser();
  const router = createBrowserRouter([
    {
      path: "/",
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: "dashboard",
          index: true,
          element: <Dashboard />,
          loader: async () => {
            if (!user) return redirect("/auth/login");
            return null;
          },
        },
        {
          path: "auth",
          children: [
            {
              index: true,
              loader: () => {
                return redirect("./login");
              },
            },
            {
              path: "login",
              element: <Login />,
              index: true,
              loader: () => {
                if (user?.is_Loggedin) return redirect("/dashboard");
                return null;
              },
            },
            {
              path: "signup",
              element: <Signup />,
              loader: () => {
                if (user?.is_Loggedin) redirect("/dashboard");
                return null;
              },
            },
          ],
        },
      ],
    },
  ]);

  return (
    <div className="App h-screen w-screen dark:bg-slate-900 bg-gray-200 overflow-x-hidden">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
