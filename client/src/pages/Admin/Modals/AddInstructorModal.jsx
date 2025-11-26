import React, { useState } from "react";
import toast from "react-hot-toast";
import axiosClient from "../../../utils/AxiosClient";

export default function AddInstructorModal({ open, onClose, setInstructors }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  if (!open) return null;

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const result = await axiosClient.post(
        `${import.meta.env.VITE_API_URL}/api/instructor/add`,
        { name, email, password }
      );
      toast.success(result.data.message);
      setInstructors((prev) => [...prev, result.data.instructor]);
      setName("");
      setEmail("");
      setPassword("");
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
          <h2 className="text-xl font-bold mb-4">Add New Instructor</h2>
          <span onClick={onClose}>x</span>
        </div>

        <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Instructor Name"
            className="bg-ternary px-3 py-2 rounded"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Email"
            className="bg-ternary px-3 py-2 rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="bg-ternary px-3 py-2 rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
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
              Add Instructor
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
