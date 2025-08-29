import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { getCourses } from "../api/api";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const { user, token } = useContext(AuthContext);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }
    fetchCourses();
    // eslint-disable-next-line
  }, [user]);

  const fetchCourses = async () => {
    setLoading(true);
    setError("");
    const res = await getCourses(token);
    if (res.success) {
      setCourses(res.data);
    } else {
      setError(res.message || "Failed to fetch courses");
    }
    setLoading(false);
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-amber-50 to-sky-50 p-8 font-sans text-slate-900">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold mb-6 text-slate-900">
          Welcome, {user.username}!
        </h1>
        <h2 className="text-2xl font-semibold mb-4">
          {user.role === "admin"
            ? "Admin Dashboard"
            : user.role === "manager"
            ? "Manager Dashboard"
            : "Your Dashboard"}
        </h2>
        {loading ? (
          <div className="text-center py-10 text-lg">Loading courses...</div>
        ) : error ? (
          <div className="text-center py-10 text-red-500">{error}</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses && courses.length > 0 ? (
              courses.map((course) => (
                <div
                  key={course.id || course._id}
                  className="bg-white rounded-xl shadow border p-6 flex flex-col hover:shadow-lg transition"
                >
                  <h3 className="text-lg font-bold mb-2 text-blue-700">
                    {course.title}
                  </h3>
                  <p className="text-gray-600 mb-2 line-clamp-2">
                    {course.description}
                  </p>
                  <div className="text-xs text-gray-400 mb-2">
                    {Array.isArray(course.lessons) ? course.lessons.length : 0}{" "}
                    lessons
                  </div>
                  <button
                    className="mt-auto bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                    onClick={() =>
                      navigate(`/courses/${course._id || course.id}`)
                    }
                  >
                    View Course
                  </button>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center py-10 text-slate-500">
                No courses found.
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
