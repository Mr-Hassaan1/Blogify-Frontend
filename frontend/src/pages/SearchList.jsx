import BlogCard from "@/components/BlogCard";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

function SearchList() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const query = params.get("q");
  const { blog } = useSelector((store) => store.blog);

  console.log(blog);

  const filteredBlogs = (blog || []).filter(
    (b) =>
      b.title.toLowerCase().includes(query.toLowerCase()) ||
      b.subtitle.toLowerCase().includes(query.toLowerCase()) ||
      b.category.toLowerCase() === query.toLowerCase(),
  );

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="pt-32 h-screen">
      <div className="max-w-6xl mx-auto">
        <h2 className="mb-5">Search Results for: "{query}"</h2>

        <div className="grid grid-cols-3 gap-7 my-10">
          {filteredBlogs.map((blog, index) => (
            <BlogCard key={index} blog={blog} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default SearchList;
