import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import BlogCardList from "./BlogCardList";
import { useNavigate } from "react-router-dom";
import { setBlog, setLoading } from "@/Redux/blogSlice";
import axios from "axios";
import { toast } from "sonner";
import { Badge } from "./ui/badge";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Skeleton } from "./ui/skeleton";

const tags = [
  {
    category: "Blogging",
  },
  {
    category: "Life Style",
  },
  {
    category: "Digital Marketing",
  },
  {
    category: "Cooking",
  },
  {
    category: "Photography",
  },
  {
    category: "Traveling",
  },
  {
    category: "Sports",
  },
];

const RecentBlog = () => {
  const { blog, loading } = useSelector((store) => store.blog);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const getAllPublishedBlogs = async () => {
      dispatch(setLoading(true));
      try {
        const res = await axios.get(
          `blogify-backendpk.vercel.app/api/v1/blog/get-published-blogs`,
          { withCredentials: true },
        );
        if (res.data.success) {
          dispatch(setBlog(res.data.blogs));
        }
      } catch (error) {
        toast.error(error.response?.data?.message || error.message || "Unable to load recent blogs.");
      } finally {
        dispatch(setLoading(false));
      }
    };
    getAllPublishedBlogs();
  }, [dispatch]);

  return (
    <div className="bg-gray-100 dark:bg-gray-800 pb-16">
      <div className="max-w-6xl mx-auto flex flex-col items-center space-y-4 py-10 px-4 md:px-0">
        <h1 className="text-4xl md:text-5xl font-bold text-center">
          Recent Blogs
        </h1>
        <hr className="w-24 border-2 border-red-500 rounded-full" />
      </div>
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-8 px-4 md:px-0">
        <div className="flex-1">
          <div className="space-y-6">
            {loading
              ? Array.from({ length: 4 }).map((_, index) => (
                  <div key={index} className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-600 dark:bg-gray-700">
                    <div className="flex flex-col gap-6 md:flex-row">
                      <Skeleton className="h-56 w-full rounded-3xl md:w-72" />
                      <div className="flex-1 space-y-3">
                        <Skeleton className="h-6 w-2/3" />
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-5/6" />
                        <Skeleton className="h-10 w-28" />
                      </div>
                    </div>
                  </div>
                ))
              : blog?.slice(0, 4)?.map((blogItem, index) => <BlogCardList key={index} blog={blogItem} />)}
          </div>
        </div>

        <div className="hidden lg:block w-full lg:w-96 shrink-0 bg-white dark:bg-gray-700 rounded-3xl p-6 shadow-sm mt-2">
          <h2 className="text-2xl font-semibold">Popular categories</h2>
          <div className="mt-5 flex flex-wrap gap-3">
            {tags.map((item, index) => {
              return (
                <Badge
                  onClick={() => navigate(`/search?q=${item.category}`)}
                  key={index}
                  className="cursor-pointer"
                >
                  {item.category}
                </Badge>
              );
            })}
          </div>
          <div className="mt-8">
            <h2 className="text-xl font-semibold">Subscribe to Newsletter</h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
              Get the latest posts and updates delivered straight to your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 mt-5">
              <Input
                type="email"
                placeholder="Enter your email"
                className="flex h-12 w-full rounded-2xl border bg-gray-100 dark:bg-gray-800 px-3 text-sm text-gray-700 dark:text-gray-200"
              />
              <Button className="w-full mt-1 sm:w-auto cursor-pointer">Subscribe</Button>
            </div>
          </div>
          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-3">Suggested Blogs</h2>
            <ul className="space-y-3">
              {[
                "10 Tips to Master React",
                "Understanding Tailwind CSS",
                "Improve SEO in 2026",
                "Easy learn Express.js",
              ].map((title, idx) => (
                <li
                  key={idx}
                  className="text-sm dark:text-gray-100 hover:text-red-500 hover:underline transition-colors cursor-pointer"
                >
                  {title}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecentBlog;
