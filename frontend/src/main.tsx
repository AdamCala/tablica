import React from 'react'
import ReactDOM from 'react-dom/client'
import RootPage from './routes/rootPage.tsx'
import NotFound from './routes/notFound.tsx';
import AuthPage from './routes/authPage.tsx';
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter([
    {
      path: "*",
      element: <NotFound />,
    },  
    {
      path: "/",
      element: <RootPage />,
      // loader: rootLoader,
    },
    {
      path: "/login",
      element: <AuthPage />,
    }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
