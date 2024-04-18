import './App.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Home from './modules/Pages/Home/Home';
import Login from './modules/Auth/Login/Login';

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: < Home/>
    },
    {
      path: "/login",
      element: <Login/>
    },
  ]);
  return (
    <RouterProvider router={router} />
  )
}

export default App
