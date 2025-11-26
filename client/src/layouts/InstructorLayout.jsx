import { Route, Routes } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "../components/SideBar";
import { useState } from "react";
import Lectures from "../pages/Instructor/Lectures";
import Dashboard from "../pages/Dashboard";

const InstructorLayout = () => {
  const instructorMenu = [
    {
      title: "Dashboard",
      path: "/instructor",
      icon: "📊",
    },
    {
      title: "My Lectures",
      icon: "📅",
      path: "/instructor/lectures",
    },
  ];

  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="flex">
        <Sidebar menu={instructorMenu} open={open} setOpen={setOpen} />
        <div className="flex flex-1 flex-col lg:ml-64">
          <Navbar open={open} setOpen={setOpen} />
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="lectures" element={<Lectures />} />
          </Routes>
        </div>
      </div>
    </>
  );
};

export default InstructorLayout;
