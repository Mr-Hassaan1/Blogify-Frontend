import axios from "axios";
import userLogo from "@/assets/images/user.jpg";
import { toast } from "sonner";
import { useEffect, useState } from "react";

export const PopularAuthors = () => {
  const [popularUser, setPopularUser] = useState([]);

  useEffect(() => {
    let active = true;

    const getAllUsers = async () => {
      try {
        const res = await axios.get(
          `/user/all-users`,
        );

        if (active && res.data.success) {
          setPopularUser(res.data.users);
        }
      } catch (error) {
        toast.error(
          error.response?.data?.message ||
            error.message ||
            "Failed to load authors.",
        );
      }
    };

    getAllUsers();

    return () => {
      active = false;
    };
  }, []);
  return (
    <div>
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col space-y-4 items-center">
          <h1 className="text-3xl md:text-4xl font-bold pt-10 ">
            Popular Authors
          </h1>
          <hr className=" w-24 text-center border-2 border-red-500 rounded-full" />
        </div>
        <div className="flex items-center justify-around my-10 px-4 md:px-0">
          {popularUser?.slice(0, 3)?.map((user, index) => {
            return (
              <div key={index} className="flex flex-col gap-2 items-center">
                <img
                  src={user.photoUrl || userLogo}
                  alt="User-Profile"
                  className="rounded-full h-18 w-18 md:w-34 md:h-34"
                />
                <p className="font-semibold">
                  {user.firstName} {user.lastName}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

