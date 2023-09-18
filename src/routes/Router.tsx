import {createBrowserRouter, RouterProvider} from "react-router-dom";

const Router = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <h1>Hello, World!</h1>
    }
  ])

  return <RouterProvider router={router} />
}

export default Router;