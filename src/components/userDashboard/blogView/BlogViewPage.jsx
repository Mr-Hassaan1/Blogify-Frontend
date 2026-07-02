import { getBlogById, likeOrDislikeBlog } from "@/services/apis/blogApi";
import userLogo from "@/assets/images/user.jpg";
import { useEffect, useState } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Bookmark, MessageSquare, Share2 } from "lucide-react";
import { CommentBox } from "@/components/userDashboard/blogView/CommentBox";
import { FaHeart, FaRegHeart } from "react-icons/fa6";
import { setBlog } from "@/Redux/blogSlice";
import { toast } from "sonner";

export function BlogViewPage() {
  const params = useParams();
  const blogId = params.blogId;
  const { blog } = useSelector((store) => store.blog);
  const { user } = useSelector((store) => store.auth);
  const { comment } = useSelector((store) => store.comment);

  const cachedBlog = blog.find((item) => item._id === blogId) || null;
  const [blogData, setBlogData] = useState(() => cachedBlog || null);
  const [loading, setLoading] = useState(() => !cachedBlog);
  const [bookmarked, setBookmarked] = useState(false);
  const [showComments, setShowComments] = useState(false);

  const dispatch = useDispatch();

  const selectedBlog = cachedBlog || blogData;
  const liked = selectedBlog?.likes?.includes(user?._id) || false;
  const blogLike = selectedBlog?.likes?.length || 0;
  const commentCount =
    comment.length > 0 ? comment.length : selectedBlog?.comments?.length || 0;

  const likeOrDislikeHandler = async () => {
    if (!selectedBlog || !user) {
      return;
    }

    const previousLiked = liked;
    const previousBlogState = [...blog];

    const optimisticBlogData = blog.map((p) =>
      p._id === selectedBlog._id
        ? {
            ...p,
            likes: previousLiked
              ? (p.likes || []).filter((id) => id !== user._id)
              : [...new Set([...(p.likes || []), user._id])],
          }
        : p,
    );

    dispatch(setBlog(optimisticBlogData));

    try {
      const action = previousLiked ? "dislike" : "like";
      const res = await likeOrDislikeBlog(selectedBlog._id, action);

      if (!res.data.success) {
        throw new Error(res.data.message || "Unable to update like status.");
      }
    } catch (error) {
      dispatch(setBlog(previousBlogState));
      toast.error(
        error.response?.data?.message ||
          error.message ||
          "Something went wrong.",
      );
    }
  };

  const changeTimeFormat = (isoDate) => {
    const date = new Date(isoDate);
    const options = { day: "numeric", month: "long", year: "numeric" };
    const formattedDate = date.toLocaleDateString("en-GB", options);
    return formattedDate;
  };

  const handleShare = (blogId) => {
    const blogUrl = `${window.location.origin}/blogs/${blogId}`;

    if (navigator.share) {
      navigator
        .share({
          title: "Check out this blog!",
          text: "Read this amazing blog post.",
          url: blogUrl,
        })
        .then(() => console.log("Shared successfully"))
        .catch((err) => console.error("Error sharing:", err));
    } else {
      navigator.clipboard.writeText(blogUrl).then(() => {
        toast.success("Blog link copied to clipboard!");
      });
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (!blogId || cachedBlog) return;

    const fetchBlog = async () => {
      setLoading(true);
      try {
        const res = await getBlogById(blogId);

        if (res.data.success) {
          const fetchedBlog = res.data.blog;
          setBlogData(fetchedBlog);
          dispatch(setBlog([...blog, fetchedBlog]));
        }
      } catch (error) {
        console.log(error);
        toast.error(
          error.response?.data?.message || "Failed to load this blog.",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [blogId, blog, cachedBlog, dispatch]);

  if (loading || !selectedBlog) {
    return (
      <div className="pt-20 px-6 pb-10">
        <div className="mx-auto max-w-6xl space-y-6 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-10 w-3/4" />
          <div className="flex items-center gap-4">
            <Skeleton className="h-14 w-14 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-40" />
              <Skeleton className="h-4 w-28" />
            </div>
          </div>
          <Skeleton className="h-80 w-full rounded-xl" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-2/3" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-14">
      <div className="max-w-6xl mx-auto p-10">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to={"/"}>Home</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to={"/blogs"}>Blogs</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{selectedBlog.title}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        {/* Blog Header */}
        <div className="my-8">
          <h1 className="text-4xl font-bold tracking-tight mb-4">
            {selectedBlog.title}
          </h1>
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center space-x-4">
              <Avatar>
                <AvatarImage
                  src={selectedBlog.author.photoUrl || userLogo}
                  alt="Author"
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium">
                  {selectedBlog.author.firstName} {selectedBlog.author.lastName}
                </p>
                <p className="text-sm text-muted-foreground">
                  {selectedBlog.author.occupation}
                </p>
              </div>
            </div>
            <div className="text-sm text-muted-foreground">
              Published on {changeTimeFormat(selectedBlog.createdAt)} •
            </div>
          </div>
        </div>
        {/* Featured Image */}
        <div className="mb-8 rounded-lg overflow-hidden">
          <img
            src={selectedBlog?.thumbnail}
            alt="Next.js Development"
            width={1000}
            height={500}
            className="w-full object-cover"
          />
          <p className="text-sm text-muted-foreground mt-2 italic">
            {selectedBlog.subtitle}
          </p>
        </div>

        <p dangerouslySetInnerHTML={{ __html: selectedBlog.description }} />

        <div className="mt-10">
          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-8">
            <Badge variant="secondary">Storytelling</Badge>
            <Badge variant="secondary">Ideas</Badge>
            <Badge variant="secondary">Blogs</Badge>
            <Badge variant="secondary">Trends</Badge>
            <Badge variant="secondary">Insights</Badge>
          </div>

          {/* Engagement */}
          <div className="flex items-center justify-between border-y dark:border-gray-800 border-gray-300 py-4 mb-8">
            <div className="flex items-center space-x-4">
              <Button
                onClick={likeOrDislikeHandler}
                variant="ghost"
                size="sm"
                className="cursor-pointer flex items-center gap-1"
              >
                {liked ? (
                  <FaHeart size={"24"} className=" text-red-600" />
                ) : (
                  <FaRegHeart size={"24"} className=" hover:text-gray-600" />
                )}

                <span>{blogLike}</span>
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className=" cursor-pointer flex items-center gap-1"
                onClick={() => setShowComments((s) => !s)}
                aria-expanded={showComments}
              >
                <MessageSquare className="h-4 w-4" />
                <span>{commentCount} Comments</span>
              </Button>
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setBookmarked(!bookmarked)}
                className="cursor-pointer"
              >
                <Bookmark
                  className={`h-4 w-4 transition-colors ${
                    bookmarked
                      ? "fill-black text-black dark:fill-white dark:text-white"
                      : "text-gray-500"
                  }`}
                />
              </Button>
              <Button
                onClick={() => handleShare(selectedBlog._id)}
                variant="ghost"
                size="sm "
                className="cursor-pointer"
              >
                <Share2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
        {showComments && <CommentBox selectedBlog={selectedBlog} />}
      </div>
    </div>
  );
}
