import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />
    }
  ])
  return (
    <div className="App h-screen w-screen dark:bg-slate-900 bg-gray-200 relative">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
