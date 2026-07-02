import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Signup } from "@/pages/Signup";
import { Login } from "@/pages/Login";
import { Navbar } from "@/components/Navbar";
import { Home } from "@/pages/Home";
import { Blog } from "@/pages/Blog";
import { About } from "@/pages/About";
import { Dashboard } from "@/pages/Dashboard";
import { Profile } from "@/pages/Profile";
import { YourBlog } from "@/pages/YourBlog";
import { Comments } from "@/pages/Comments";
import { CreateUpdateBlog } from "@/pages/CreateUpdateBlog";
import { BlogView } from "@/pages/BlogView";
import { SearchList } from "@/pages/SearchList";
import { Footer } from "@/components/Footer";
import { ProtectedRoute } from "@/ProtectedRoutes/ProtectedRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <Navbar />
        <Home />
        <Footer />
      </>
    ),
  },
  {
    path: "/blogs",
    element: (
      <>
        <Navbar />
        <Blog />
        <Footer />
      </>
    ),
  },
  {
    path: "/about",
    element: (
      <>
        <Navbar />
        <About />
        <Footer />
      </>
    ),
  },
  {
    path: "/search",
    element: (
      <>
        <Navbar />
        <SearchList />
        <Footer />
      </>
    ),
  },
  {
    path: "/blogs/:blogId",
    element: (
      <>
        <Navbar />
        <ProtectedRoute>
          <BlogView />
        </ProtectedRoute>
      </>
    ),
  },
  {
    path: "/dashboard",
    element: (
      <>
        <Navbar />
        <ProtectedRoute>
          <Dashboard />
        </ProtectedRoute>
      </>
    ),
    children: [
      {
        path: "create-blog",
        element: (
          <>
            <CreateUpdateBlog />
          </>
        ),
      },
      {
        path: "create-blog/:blogId",
        element: (
          <>
            <CreateUpdateBlog />
          </>
        ),
      },
      {
        path: "your-blog",
        element: <YourBlog />,
      },
      {
        path: "comments",
        element: <Comments />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
    ],
  },
  {
    path: "/signup",
    element: (
      <>
        <Navbar />
        <Signup />
      </>
    ),
  },
  {
    path: "/login",
    element: (
      <>
        <Navbar />
        <Login />
      </>
    ),
  },
]);

const App = () => {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};

export default App;
