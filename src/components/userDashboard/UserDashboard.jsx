import { Sidebar } from "@/components/userDashboard/Sidebar";
import { Outlet } from "react-router-dom";

export const UserDashboard = () => {
  return (
    <div className=" flex bg-gray-300  dark:bg-gray-900">
      <Sidebar />
      <div className="flex-1">
        <Outlet />
      </div>
    </div>
  );
};
