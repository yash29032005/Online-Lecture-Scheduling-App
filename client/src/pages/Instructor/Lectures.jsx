import React, { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { useAuth } from "../../context/AuthContext";
import axiosClient from "../../utils/AxiosClient";

const Lectures = () => {
  const { user } = useAuth();
  const instructorId = user?._id || user?.id;

  const [lectures, setLectures] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (!instructorId) return;

    const fetchMyLectures = async () => {
      try {
        const result = await axiosClient.get(
          `${
            import.meta.env.VITE_API_URL
          }/api/lecture/instructor/${instructorId}`
        );
        setLectures(result.data.lectures || []);
      } catch (error) {
        toast.error(error?.response?.data?.message || "Something went wrong");
      }
    };

    fetchMyLectures();
  }, [instructorId]);

  // ---------- Pagination ----------
  const [page, setPage] = useState(1);
  const perPage = 4;

  const filteredLectures = lectures.filter((lec) =>
    lec.courseId?.name?.toLowerCase().includes(search.toLowerCase())
  );

  const paginated = filteredLectures.slice(
    (page - 1) * perPage,
    page * perPage
  );

  const totalPages = Math.ceil(filteredLectures.length / perPage);

  return (
    <div className="h-[calc(100vh-70px)] bg-primary py-4 px-8 text-white overflow-y-auto">
      <div className="font-bold text-lg my-4 ms-4">MY LECTURES</div>

      <div className="p-4 bg-secondary rounded-lg">
        {/* ---------- TOP BAR ---------- */}
        <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
          <input
            type="text"
            className="bg-ternary px-3 py-2 rounded w-full"
            placeholder="Search by course name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* ---------- TABLE ---------- */}
        <div className="mt-6 overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-ternary text-center">
                <th className="px-4 py-2">No</th>
                <th className="px-4 py-2">Course</th>
                <th className="px-4 py-2">Date</th>
                <th className="px-4 py-2">Time</th>
                <th className="px-4 py-2">Assigned On</th>
              </tr>
            </thead>

            <tbody>
              {paginated.length > 0 ? (
                paginated.map((lecture, i) => (
                  <tr
                    key={lecture._id}
                    className="text-center hover:bg-neutral-primary-soft"
                  >
                    <td className="px-4 py-2">
                      {(page - 1) * perPage + i + 1}
                    </td>
                    <td className="px-4 py-2">{lecture.courseId?.name}</td>
                    <td className="px-4 py-2">{lecture.date}</td>
                    <td className="px-4 py-2">{lecture.time}</td>
                    <td className="px-4 py-2">
                      {new Date(lecture.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="5"
                    className="text-center py-6 text-gray-300 text-lg"
                  >
                    No lectures found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* ---------- PAGINATION ---------- */}
        {totalPages > 1 && (
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
        )}
      </div>
    </div>
  );
};

export default Lectures;
