import {
  createBrowserRouter,
  redirect,
  RouterProvider,
} from "react-router-dom";
import Home from "./pages";
import Dashboard from "./pages/dashboard";
import { useAlert, useUser } from "./hooks";
import Login from "./pages/auth/login";
import Signup from "./pages/auth/signup";
import Alert from "components/alert";

function App() {
  const [info, setInfo] = useAlert();
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
            if (!user) return redirect("/auth/login?redirect=dashboard");
            return null;
          },
        },
        {
          path: "auth",
          children: [
            {
              index: true,
              loader: () => {
                if (!user) return redirect("/auth/login");
                return redirect("dashboard");
              },
            },
            {
              path: "login",
              element: <Login />,
              index: true,
              loader: () => {
                if (user) return redirect("/dashboard");
                return null;
              },
            },
            {
              path: "signup",
              element: <Signup />,
              loader: () => {
                if (user) return redirect("/dashboard");
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
      <Alert info={info} setInfo={setInfo} />
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
