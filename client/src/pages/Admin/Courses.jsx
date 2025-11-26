import React, { useState } from "react";
import { IoMdAdd } from "react-icons/io";
import AddCourseModal from "../Admin/Modals/AddCourseModal";
import { useEffect } from "react";
import { toast } from "react-hot-toast";
import { RiDeleteBin7Line } from "react-icons/ri";
import axiosClient from "../../utils/AxiosClient";

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [search, setSearch] = useState("");
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const result = await axiosClient.get(
          `${import.meta.env.VITE_API_URL}/api/course`
        );

        setCourses(result.data.courses);
      } catch (error) {
        console.log("Fetch Courses Error:", error);
        toast.error(error?.response?.data?.message || "Something went wrong");
      }
    };

    fetchCourses();
  }, []);

  // ---------- Pagination ----------
  const [page, setPage] = useState(1);
  const perPage = 4;

  const filteredCourses = courses.filter((course) =>
    course.name.toLowerCase().includes(search.toLowerCase())
  );

  const paginated = filteredCourses.slice((page - 1) * perPage, page * perPage);
  const totalPages = Math.ceil(courses.length / perPage);

  const handleDelete = async (id) => {
    try {
      const result = await axiosClient.delete(
        `${import.meta.env.VITE_API_URL}/api/course/delete/${id}`
      );
      toast.success(result.data.message);

      // Remove deleted course from UI
      setCourses((prev) => prev.filter((course) => course._id !== id));
    } catch (error) {
      console.log("Delete Course Error:", error);
      toast.error(error?.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="h-[calc(100vh-70px)] bg-primary py-4 px-8 text-white overflow-y-auto">
      <AddCourseModal
        open={openModal}
        onClose={() => {
          setOpenModal(false);
        }}
        setCourses={setCourses}
      />

      <div className="font-bold text-lg my-4 ms-4">COURSES</div>

      <div className="p-4 bg-secondary rounded-lg">
        {/* ---------- TOP BAR ---------- */}
        <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
          {/* Search */}
          <input
            type="text"
            className="bg-ternary px-3 py-2 rounded w-full"
            placeholder="Search courses..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          {/* Buttons */}
          <button
            className="px-4 py-2 bg-ternary rounded-md flex items-center gap-1"
            onClick={() => setOpenModal(true)}
          >
            <IoMdAdd className="text-lg" />
            Add
          </button>
        </div>

        {/* ---------- TABLE ---------- */}
        <div className="mt-6 overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-ternary text-center">
                <th className="px-4 py-2">No</th>
                <th className="px-4 py-2">Name</th>
                <th className="px-4 py-2">Level</th>
                <th className="px-4 py-2">Description</th>
                <th className="px-4 py-2">Action</th>
              </tr>
            </thead>

            <tbody>
              {paginated.map((course, i) => (
                <tr
                  key={i}
                  className="text-center hover:bg-neutral-primary-soft"
                >
                  <td className="px-4 py-2">{(page - 1) * perPage + i + 1}</td>
                  <td className="px-4 py-2">{course.name}</td>
                  <td className="px-4 py-2">{course.level}</td>
                  <td className="px-4 py-2">{course.description}</td>
                  <td className="px-4 py-2">
                    <button
                      onClick={() => handleDelete(course._id)}
                      className="px-4 py-2 bg-red-700 rounded"
                    >
                      <RiDeleteBin7Line />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* ---------- PAGINATION ---------- */}
        <div className="flex justify-center mt-4 gap-2">
          <button
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
            className="px-3 py-1 bg-ternary rounded disabled:opacity-50"
          >
            Prev
          </button>

          <span className="px-4 py-1">
            Page {page} / {totalPages}
          </span>

          <button
            disabled={page === totalPages}
            onClick={() => setPage(page + 1)}
            className="px-3 py-1 bg-ternary rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Courses;
