import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from './components/Home.jsx'
import Courses from './components/Courses.jsx'
import Teetime from './components/Teetime.jsx';
import UserLogin from './components/UserLogin.jsx';
import CourseLogin from './components/CourseLogin.jsx';
const routes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/courses",
        element: <Courses />,
      },
      {
        path:"/teetimes/:id",
        element: <Teetime />
      },
      {
        path:"/userLogin",
        element: <UserLogin />
      },
      {
        path:"/courseLogin",
        element: <CourseLogin />
      }
    
    ]}
]);



ReactDOM.createRoot(document.getElementById("root")).render(<RouterProvider router={routes} />);

