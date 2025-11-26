import React, { useState } from "react";
import toast from "react-hot-toast";
import axiosClient from "../../../utils/AxiosClient";

export default function AddCourseModal({ open, onClose, setCourses }) {
  const [name, setName] = useState("");
  const [level, setLevel] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");

  if (!open) return null;

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const result = await axiosClient.post(
        `${import.meta.env.VITE_API_URL}/api/course/add`,
        { name, level, description, image }
      );
      toast.success(result.data.message);
      setCourses((prev) => [...prev, result.data.course]);
      setName("");
      setLevel("");
      setDescription("");
      setImage("");
      onClose();
    } catch (error) {
      console.log("Fetch Courses Error:", error);
      toast.error(error?.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
      <div className="bg-secondary p-6 rounded-lg w-[90%] max-w-lg text-white">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold mb-4">Add New Course</h2>
          <span onClick={onClose}>x</span>
        </div>

        <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Course Name"
            className="bg-ternary px-3 py-2 rounded"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <select
            className="bg-ternary px-3 py-2 rounded"
            value={level}
            onChange={(e) => setLevel(e.target.value)}
            required
          >
            <option value="">Select Level</option>
            <option value="Easy">Easy</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Hard">Hard</option>
          </select>

          <textarea
            placeholder="Description"
            className="bg-ternary px-3 py-2 rounded"
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          ></textarea>

          <input
            type="text"
            placeholder="Image URL"
            className="bg-ternary px-3 py-2 rounded"
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />

          <div className="flex justify-end gap-2 mt-2">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-600 px-4 py-2 rounded"
            >
              Cancel
            </button>
            <button type="submit" className="bg-primary px-4 py-2 rounded">
              Add Course
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
