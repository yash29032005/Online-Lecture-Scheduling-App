import { Route, Routes } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "../components/SideBar";
import { useState } from "react";
import Courses from "../pages/Admin/Courses";
import Lectures from "../pages/Admin/Lectures";
import Instructors from "../pages/Admin/Instructors";
import Dashboard from "../pages/Dashboard";

const AdminLayout = () => {
  const adminMenu = [
    {
      title: "Dashboard",
      path: "/admin",
      icon: "📊",
    },
    {
      title: "Courses",
      icon: "📚",
      children: [{ title: "All Courses", path: "/admin/courses" }],
    },
    {
      title: "Lectures",
      icon: "🕒",
      children: [{ title: "All Lectures", path: "/admin/lectures" }],
    },
    {
      title: "Instructors",
      icon: "👨‍🏫",
      path: "/admin/instructors",
    },
  ];

  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="flex">
        <Sidebar menu={adminMenu} open={open} setOpen={setOpen} />
        <div className="flex flex-1 flex-col lg:ml-64">
          <Navbar open={open} setOpen={setOpen} />
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="courses" element={<Courses />} />
            <Route path="lectures" element={<Lectures />} />
            <Route path="instructors" element={<Instructors />} />
          </Routes>
        </div>
      </div>
    </>
  );
};

export default AdminLayout;
