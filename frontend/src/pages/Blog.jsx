import BlogCard from "@/components/BlogCard";
import { Skeleton } from "@/components/ui/skeleton";
import { useEffect } from "react";
import axios from "axios";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { setBlog, setLoading } from "@/Redux/blogSlice";

const Blog = () => {
  const dispatch = useDispatch();
  const { blog, loading } = useSelector((store) => store.blog);

  useEffect(() => {
    const getAllPublishedBlogs = async () => {
      dispatch(setLoading(true));
      try {
        const res = await axios.get(
          `/blog/get-published-blogs`,
          { withCredentials: true },
        );
        if (res.data.success) {
          dispatch(setBlog(res.data.blogs));
        }
      } catch (error) {
        toast.error(error.response?.data?.message || error.message || "Unable to fetch blogs.");
      } finally {
        dispatch(setLoading(false));
      }
    };

    getAllPublishedBlogs();
  }, [dispatch]);

  return (
    <div className="pt-16">
      <div className="max-w-6xl mx-auto text-center flex flex-col space-y-4 items-center">
        <h1 className="text-4xl font-bold text-center pt-10 ">Our Blogs</h1>
        <hr className=" w-24 text-center border-2 border-red-500 rounded-full" />
      </div>
      <div className="max-w-6xl mx-auto grid gap-10 grid-cols-1 md:grid-cols-3 py-10 px-4 md:px-0">
        {loading
          ? Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className="rounded-2xl border border-gray-200 bg-white p-5 shadow-lg dark:border-gray-700 dark:bg-gray-800">
                <Skeleton className="h-40 w-full rounded-xl" />
                <Skeleton className="mt-4 h-4 w-3/4" />
                <Skeleton className="mt-3 h-4 w-full" />
                <Skeleton className="mt-3 h-4 w-2/3" />
                <Skeleton className="mt-6 h-10 w-28" />
              </div>
            ))
          : blog?.map((blogItem, index) => <BlogCard blog={blogItem} key={index} />)}
      </div>
    </div>
  );
};

export default Blog;
