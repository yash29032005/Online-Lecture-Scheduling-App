import React, { useState } from "react";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { RiDeleteBin7Line } from "react-icons/ri";
import axiosClient from "../../utils/AxiosClient";
import AddLectureModal from "./Modals/AddLectureModal";
import { IoMdAdd } from "react-icons/io";

const Lectures = () => {
  const [lectures, setLectures] = useState([]);
  const [search, setSearch] = useState("");
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    const fetchLectures = async () => {
      try {
        const result = await axiosClient.get(
          `${import.meta.env.VITE_API_URL}/api/lecture`
        );

        setLectures(result.data.lectures);
      } catch (error) {
        console.log("Fetch Courses Error:", error);
        toast.error(error?.response?.data?.message || "Something went wrong");
      }
    };

    fetchLectures();
  }, []);

  const [page, setPage] = useState(1);
  const perPage = 4;

  const filteredLectures = lectures.filter((lec) =>
    lec.courseId?.name?.toLowerCase().includes(search.toLowerCase())
  );

  const paginated = filteredLectures.slice(
    (page - 1) * perPage,
    page * perPage
  );
  const totalPages = Math.ceil(lectures.length / perPage);

  const handleDelete = async (id) => {
    try {
      const result = await axiosClient.delete(
        `${import.meta.env.VITE_API_URL}/api/lecture/delete/${id}`
      );

      toast.success(result.data.message);

      setLectures((prev) => prev.filter((lec) => lec._id !== id));
    } catch (error) {
      console.log("Delete Course Error:", error);
      toast.error(error?.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="h-[calc(100vh-70px)] bg-primary py-4 px-8 text-white overflow-y-auto">
      <AddLectureModal
        open={openModal}
        onClose={() => {
          setOpenModal(false);
        }}
        setLectures={setLectures}
      />
      <div className="font-bold text-lg my-4 ms-4">LECTURES</div>

      <div className="p-4 bg-secondary rounded-lg">
        <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
          <input
            type="text"
            className="bg-ternary px-3 py-2 rounded w-full"
            placeholder="Search lectures..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button
            className="px-4 py-2 bg-ternary rounded-md flex items-center gap-1"
            onClick={() => setOpenModal(true)}
          >
            <IoMdAdd className="text-lg" />
            Add
          </button>
        </div>

        <div className="mt-6 overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-ternary text-center">
                <th className="px-4 py-2">No</th>
                <th className="px-4 py-2">Course</th>
                <th className="px-4 py-2">Instructor</th>
                <th className="px-4 py-2">Date</th>
                <th className="px-4 py-2">Time</th>
                <th className="px-4 py-2">Created At</th>
                <th className="px-4 py-2">Action</th>
              </tr>
            </thead>

            <tbody>
              {paginated.map((lecture, i) => (
                <tr
                  key={i}
                  className="text-center hover:bg-neutral-primary-soft"
                >
                  <td className="px-4 py-2">{(page - 1) * perPage + i + 1}</td>
                  <td className="px-4 py-2">{lecture.courseId?.name}</td>
                  <td className="px-4 py-2">{lecture.instructorId?.name}</td>
                  <td className="px-4 py-2">{lecture.date}</td>
                  <td className="px-4 py-2">{lecture.time}</td>
                  <td className="px-4 py-2">
                    {new Date(lecture.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-2">
                    <button
                      onClick={() => handleDelete(lecture._id)}
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

export default Lectures;
