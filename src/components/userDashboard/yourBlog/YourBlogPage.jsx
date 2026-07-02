import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import axios from "axios";
import { CloudOff, Edit, Globe, Trash2 } from "lucide-react";

import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

export function YourBlogPage() {
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteId, setDeleteId] = useState(null);
  const [publishData, setPublishData] = useState(null);

  useEffect(() => {
    const getOwnBlog = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`/blog/get-own-blogs`, {
          withCredentials: true,
        });

        if (res.data.success) {
          setBlogs(res.data.blogs || []);
        }
      } catch (error) {
        console.log(error);
        toast.error(
          error.response?.data?.message || "Failed to load your blogs.",
        );
      } finally {
        setLoading(false);
      }
    };

    getOwnBlog();
  }, []);

  const dateHandler = (index) => {
    const date = new Date(blogs[index].createdAt);
    const localDate = date.toLocaleDateString();
    return localDate;
  };

  const togglePublish = async (id, publish) => {
    try {
      const res = await axios.patch(
        `/blog/${id}?isPublished=${publish}`,
        null,
        { withCredentials: true },
      );
      if (res.data.success) {
        const updatedBlogData = blogs.map((blogItem) =>
          blogItem._id === id
            ? { ...blogItem, isPublished: publish }
            : blogItem,
        );
        setBlogs(updatedBlogData);
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(
        error.response?.data?.message || "Failed to update publish status.",
      );
    }
  };

  const deleteBlog = async (id) => {
    try {
      const res = await axios.delete(`/blog/delete/${id}`, {
        withCredentials: true,
      });
      if (res.data.success) {
        const updatedBlogData = blogs.filter(
          (blogItem) => blogItem?._id !== id,
        );
        setBlogs(updatedBlogData);
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("something went wrong!");
    }
  };

  return (
    <div className="pb-10 pt-20 md:ml-80 h-screen">
      <div className="max-w-6xl mx-auto mt-8 ">
        <Card className="w-full p-5 space-y-2 dark:bg-gray-800">
          <Table>
            <TableCaption>A list of your recent blogs.</TableCaption>
            <TableHeader className="overflow-x-auto">
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="text-center">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="overflow-x-auto ">
              {loading
                ? Array.from({ length: 4 }).map((_, rowIndex) => (
                    <TableRow key={rowIndex}>
                      <TableCell className="py-4">
                        <Skeleton className="h-4 w-32" />
                      </TableCell>
                      <TableCell>
                        <Skeleton className="h-4 w-20" />
                      </TableCell>
                      <TableCell>
                        <Skeleton className="h-6 w-16 rounded-full" />
                      </TableCell>
                      <TableCell>
                        <Skeleton className="h-4 w-16" />
                      </TableCell>
                      <TableCell className="text-center">
                        <Skeleton className="mx-auto h-6 w-6 rounded-full" />
                      </TableCell>
                    </TableRow>
                  ))
                : blogs?.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell className="flex gap-4 items-center">
                        <img
                          src={item.thumbnail}
                          alt=""
                          className="w-20 rounded-md hidden md:block"
                        />
                        <h1
                          className="hover:underline cursor-pointer w-30 md:w-full truncate"
                          onClick={() => navigate(`/blogs/${item._id}`)}
                        >
                          {item.title}
                        </h1>
                      </TableCell>
                      <TableCell>
                        <h2 className="w-15 md:w-full truncate">
                          {item.category}
                        </h2>
                      </TableCell>
                      <TableCell>
                        <span
                          className={`px-2 py-1 text-xs rounded-full ${item.isPublished ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-700"}`}
                        >
                          {item.isPublished ? "Published" : "Draft"}
                        </span>
                      </TableCell>
                      <TableCell>
                        <h2 className="w-12 md:w-full truncate">
                          {dateHandler(index)}
                        </h2>
                      </TableCell>
                      <TableCell className="text-center">
                        <DropdownMenu>
                          <DropdownMenuTrigger>
                            <BsThreeDotsVertical className="cursor-pointer" />
                          </DropdownMenuTrigger>
                          <DropdownMenuContent className="w-45">
                            <DropdownMenuItem
                              className="cursor-pointer"
                              onClick={() =>
                                navigate(`/dashboard/create-blog/${item._id}`)
                              }
                            >
                              <Edit />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              className="cursor-pointer flex items-center gap-2"
                              onClick={() => {
                                const nextState = !item.isPublished;

                                if (item.isPublished && nextState === false) {
                                  setPublishData({
                                    id: item._id,
                                    value: nextState,
                                  });
                                } else {
                                  togglePublish(item._id, nextState);
                                }
                              }}
                            >
                              {item.isPublished ? (
                                <>
                                  <CloudOff size={16} />
                                  Unpublish
                                </>
                              ) : (
                                <>
                                  <Globe size={16} />
                                  Publish
                                </>
                              )}
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              className="text-red-500 cursor-pointer"
                              onClick={() => setDeleteId(item._id)}
                            >
                              <Trash2 />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
            </TableBody>
          </Table>
        </Card>
      </div>

      <Dialog
        open={!!deleteId}
        onOpenChange={(open) => {
          if (!open) setDeleteId(null);
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Blog?</DialogTitle>
            <DialogDescription>
              You’re about to delete this Blog. This action cannot be reversed.
            </DialogDescription>
          </DialogHeader>

          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteId(null)}>
              Cancel
            </Button>
            <Button
              className="bg-red-600"
              onClick={() => {
                deleteBlog(deleteId);
                setDeleteId(null);
              }}
            >
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog
        open={!!publishData}
        onOpenChange={(open) => {
          if (!open) setPublishData(null);
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Unpublish Blog?</DialogTitle>
            <DialogDescription>
              This blog will become a draft and will not be visible to users.
            </DialogDescription>
          </DialogHeader>

          <DialogFooter>
            <Button variant="outline" onClick={() => setPublishData(null)}>
              Cancel
            </Button>
            <Button
              onClick={() => {
                togglePublish(publishData.id, publishData.value);
                setPublishData(null);
              }}
            >
              Unpublish
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
