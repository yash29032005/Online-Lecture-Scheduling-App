import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import axiosClient from "../utils/AxiosClient";

const Dashboard = () => {
  const { user } = useAuth();
  const isInstructor = user?.role === "instructor";

  const [currentDate, setCurrentDate] = useState(new Date());
  const [lectures, setLectures] = useState([]);

  // FETCH LECTURES
  useEffect(() => {
    const fetchLectures = async () => {
      try {
        const result = await axiosClient.get(
          `${import.meta.env.VITE_API_URL}/api/lecture`
        );

        let allLectures = result.data.lectures || [];

        if (isInstructor) {
          allLectures = allLectures.filter(
            (lec) => lec.instructorId?._id === user.id
          );
        }

        setLectures(allLectures);
      } catch (err) {
        console.log("Fetch Lectures Error:", err);
      }
    };

    fetchLectures();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // CALENDAR LOGIC
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const firstDay = new Date(year, month, 1).getDay();
  const totalDays = new Date(year, month + 1, 0).getDate();

  const prevMonth = () => setCurrentDate(new Date(year, month - 1, 1));
  const nextMonth = () => setCurrentDate(new Date(year, month + 1, 1));

  const dates = [];
  for (let x = 0; x < firstDay; x++) dates.push(null);
  for (let d = 1; d <= totalDays; d++) dates.push(d);

  // GROUP LECTURES BY DAY
  const lecturesByDate = {};
  lectures.forEach((lec) => {
    const d = new Date(lec.date);
    if (d.getFullYear() === year && d.getMonth() === month) {
      const day = d.getDate();
      if (!lecturesByDate[day]) lecturesByDate[day] = [];
      lecturesByDate[day].push(lec);
    }
  });

  return (
    <div className="min-h-[calc(100vh-70px)] bg-primary py-4 px-3 sm:px-8 text-white overflow-y-auto">
      <div className="font-bold text-xl sm:text-2xl mb-4 ms-2 sm:ms-4">
        {isInstructor ? "My Lecture Calendar" : "Lecture Calendar"}
      </div>

      <div className="p-4 bg-secondary rounded-lg shadow-lg">
        {/* Month Header */}
        <div className="flex   justify-between items-center gap-3 mb-4">
          <button
            className="px-4 py-2 bg-ternary rounded hover:bg-primary transition"
            onClick={prevMonth}
          >
            Prev
          </button>

          <h2 className="text-lg sm:text-2xl font-bold text-center">
            {monthNames[month]} {year}
          </h2>

          <button
            className="px-4 py-2 bg-ternary rounded hover:bg-primary transition"
            onClick={nextMonth}
          >
            Next
          </button>
        </div>

        {/* Week Days */}
        <div className="grid grid-cols-7 text-center font-semibold text-xs sm:text-sm mb-2">
          {days.map((d, i) => (
            <div key={i} className="py-2">
              {d}
            </div>
          ))}
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-7 gap-1 sm:gap-2 text-center">
          {dates.map((day, i) => (
            <div
              key={i}
              className={`min-h-20 sm:min-h-24 p-1 sm:p-2 rounded text-xs sm:text-sm border border-neutral-primary-soft ${
                day ? "bg-neutral-primary-soft hover:bg-ternary" : "opacity-0"
              }`}
            >
              {day}

              {/* Lecture Info */}
              {day && lecturesByDate[day] && (
                <div className="mt-1 space-y-1 text-left text-[9px] sm:text-xs">
                  {lecturesByDate[day].map((lec, index) => (
                    <div key={index} className="bg-black/40 p-1 rounded">
                      <p className="font-semibold">{lec.courseId?.name}</p>

                      {!isInstructor && (
                        <p className="text-gray-300">
                          {lec.instructorId?.name}
                        </p>
                      )}

                      <p className="text-gray-400">{lec.time}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
