import React, { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import axiosClient from "../../../utils/AxiosClient";

const AddLectureModal = ({ open, onClose, setLectures }) => {
  const [courseId, setCourseId] = useState("");
  const [instructorId, setInstructorId] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [courses, setCourses] = useState([]);
  const [instructors, setInstructors] = useState([]);

  useEffect(() => {
    if (!open) return;

    const fetchData = async () => {
      try {
        const c = await axiosClient.get(
          `${import.meta.env.VITE_API_URL}/api/course`
        );
        const i = await axiosClient.get(
          `${import.meta.env.VITE_API_URL}/api/instructor`
        );

        setCourses(c.data.courses || []);
        setInstructors(i.data.instructors || []);
      } catch (error) {
        console.log("Fetch Courses Error:", error);
        toast.error(error?.response?.data?.message || "Something went wrong");
      }
    };

    fetchData();
  }, [open]);

  const handleSubmit = async () => {
    if (!courseId || !instructorId || !date || !time) {
      toast.error("All fields are required");
      return;
    }

    try {
      await axiosClient.post(
        `${import.meta.env.VITE_API_URL}/api/lecture/add`,
        {
          courseId,
          instructorId,
          date,
          time,
        }
      );

      toast.success("Lecture added");

      const updated = await axiosClient.get(
        `${import.meta.env.VITE_API_URL}/api/lecture`
      );
      setLectures(updated.data.lectures);

      onClose();
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong");
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">
      <div className="bg-secondary p-6 rounded-lg w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">Add Lecture</h2>

        <label className="text-sm">Course</label>
        <select
          value={courseId}
          onChange={(e) => setCourseId(e.target.value)}
          className="w-full bg-ternary p-2 rounded mb-3"
        >
          <option value="">-- Select Course --</option>
          {courses.map((c) => (
            <option key={c._id} value={c._id}>
              {c.name}
            </option>
          ))}
        </select>

        <label className="text-sm">Instructor</label>
        <select
          value={instructorId}
          onChange={(e) => setInstructorId(e.target.value)}
          className="w-full bg-ternary p-2 rounded mb-3"
        >
          <option value="">-- Select Instructor --</option>
          {instructors.map((i) => (
            <option key={i._id} value={i._id}>
              {i.name}
            </option>
          ))}
        </select>

        <div className="flex gap-3">
          <div className="w-1/2">
            <label className="text-sm">Date</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full bg-ternary p-2 rounded mb-3"
            />
          </div>

          <div className="w-1/2">
            <label className="text-sm">Time</label>
            <input
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="w-full bg-ternary p-2 rounded mb-3"
            />
          </div>
        </div>

        <div className="flex justify-end gap-3 mt-4">
          <button className="px-4 py-2 bg-gray-600 rounded" onClick={onClose}>
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-ternary rounded"
            onClick={handleSubmit}
          >
            Add Lecture
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddLectureModal;
