import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { getCourses } from "../api/api";

const API_BASE = "http://localhost:8000/api";

const CourseManagement = () => {
  const { token } = useContext(AuthContext);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [showAdd, setShowAdd] = useState(false);
  const [newCourse, setNewCourse] = useState({
    title: "",
    description: "",
    imageUrl: "",
  });
  const [editCourseId, setEditCourseId] = useState(null);
  const [editCourse, setEditCourse] = useState({});
  const [expanded, setExpanded] = useState(null);
  const [lessonForms, setLessonForms] = useState({});

  useEffect(() => {
    fetchCourses();
    // eslint-disable-next-line
  }, []);

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

  // Add course
  const handleAddCourse = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setMessage("");
    try {
      const res = await fetch(`${API_BASE}/courses`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newCourse),
      });
      const data = await res.json();
      if (data.success) {
        setMessage("Course added!");
        setShowAdd(false);
        setNewCourse({ title: "", description: "", imageUrl: "" });
        fetchCourses();
      } else {
        setError(data.message || "Failed to add course");
      }
    } catch {
      setError("Failed to add course");
    }
    setLoading(false);
  };

  // Edit course
  const handleEditCourse = (course) => {
    setEditCourseId(course._id);
    setEditCourse({ ...course });
  };
  const handleUpdateCourse = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setMessage("");
    try {
      const res = await fetch(`${API_BASE}/courses/${editCourseId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(editCourse),
      });
      const data = await res.json();
      if (data.success) {
        setMessage("Course updated!");
        setEditCourseId(null);
        fetchCourses();
      } else {
        setError(data.message || "Failed to update course");
      }
    } catch {
      setError("Failed to update course");
    }
    setLoading(false);
  };

  // Delete course
  const handleDeleteCourse = async (id) => {
    if (!window.confirm("Delete this course?")) return;
    setLoading(true);
    setError("");
    setMessage("");
    try {
      const res = await fetch(`${API_BASE}/courses/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (data.success) {
        setMessage("Course deleted!");
        fetchCourses();
      } else {
        setError(data.message || "Failed to delete course");
      }
    } catch {
      setError("Failed to delete course");
    }
    setLoading(false);
  };

  // Lesson CRUD
  const handleLessonFormChange = (courseId, field, value) => {
    setLessonForms((prev) => ({
      ...prev,
      [courseId]: { ...prev[courseId], [field]: value },
    }));
  };
  const handleAddLesson = async (courseId, e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setMessage("");
    const lesson = lessonForms[courseId];
    try {
      const res = await fetch(`${API_BASE}/courses/${courseId}/lessons`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(lesson),
      });
      const data = await res.json();
      if (data.success) {
        setMessage("Lesson added!");
        setLessonForms((prev) => ({ ...prev, [courseId]: {} }));
        fetchCourses();
      } else {
        setError(data.message || "Failed to add lesson");
      }
    } catch {
      setError("Failed to add lesson");
    }
    setLoading(false);
  };
  const handleDeleteLesson = async (courseId, lessonId) => {
    if (!window.confirm("Delete this lesson?")) return;
    setLoading(true);
    setError("");
    setMessage("");
    try {
      const res = await fetch(
        `${API_BASE}/courses/${courseId}/lessons/${lessonId}`,
        {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const data = await res.json();
      if (data.success) {
        setMessage("Lesson deleted!");
        fetchCourses();
      } else {
        setError(data.message || "Failed to delete lesson");
      }
    } catch {
      setError("Failed to delete lesson");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-200 p-6">
      <h1 className="text-3xl font-bold text-blue-700 mb-6">
        Course Management
      </h1>
      {error && <div className="mb-4 text-red-500">{error}</div>}
      {message && <div className="mb-4 text-green-600">{message}</div>}
      <button
        className="mb-6 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        onClick={() => setShowAdd((v) => !v)}
      >
        {showAdd ? "Cancel" : "Add New Course"}
      </button>
      {showAdd && (
        <form
          onSubmit={handleAddCourse}
          className="bg-white p-4 rounded shadow mb-6 max-w-xl"
        >
          <input
            className="w-full mb-2 p-2 border rounded"
            placeholder="Title"
            value={newCourse.title}
            onChange={(e) =>
              setNewCourse({ ...newCourse, title: e.target.value })
            }
            required
          />
          <input
            className="w-full mb-2 p-2 border rounded"
            placeholder="Image URL"
            value={newCourse.imageUrl}
            onChange={(e) =>
              setNewCourse({ ...newCourse, imageUrl: e.target.value })
            }
            required
          />
          <textarea
            className="w-full mb-2 p-2 border rounded"
            placeholder="Description"
            value={newCourse.description}
            onChange={(e) =>
              setNewCourse({ ...newCourse, description: e.target.value })
            }
            required
          />
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            disabled={loading}
          >
            Add Course
          </button>
        </form>
      )}
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="space-y-6">
          {courses.map((course) => (
            <div key={course._id} className="bg-white rounded shadow p-4">
              {editCourseId === course._id ? (
                <form onSubmit={handleUpdateCourse} className="mb-4">
                  <input
                    className="w-full mb-2 p-2 border rounded"
                    value={editCourse.title}
                    onChange={(e) =>
                      setEditCourse({ ...editCourse, title: e.target.value })
                    }
                    required
                  />
                  <input
                    className="w-full mb-2 p-2 border rounded"
                    value={editCourse.imageUrl}
                    onChange={(e) =>
                      setEditCourse({ ...editCourse, imageUrl: e.target.value })
                    }
                    required
                  />
                  <textarea
                    className="w-full mb-2 p-2 border rounded"
                    value={editCourse.description}
                    onChange={(e) =>
                      setEditCourse({
                        ...editCourse,
                        description: e.target.value,
                      })
                    }
                    required
                  />
                  <button
                    className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 mr-2"
                    disabled={loading}
                  >
                    Save
                  </button>
                  <button
                    type="button"
                    className="bg-gray-400 text-white px-4 py-2 rounded"
                    onClick={() => setEditCourseId(null)}
                  >
                    Cancel
                  </button>
                </form>
              ) : (
                <>
                  <div className="flex justify-between items-center">
                    <div>
                      <h2 className="text-xl font-semibold text-blue-800">
                        {course.title}
                      </h2>
                      <p className="text-gray-600 mb-1">{course.description}</p>
                    </div>
                    <div>
                      <button
                        className="text-blue-600 mr-2"
                        onClick={() =>
                          setExpanded(
                            expanded === course._id ? null : course._id
                          )
                        }
                      >
                        {expanded === course._id
                          ? "Hide Lessons"
                          : "Show Lessons"}
                      </button>
                      <button
                        className="text-green-600 mr-2"
                        onClick={() => handleEditCourse(course)}
                      >
                        Edit
                      </button>
                      <button
                        className="text-red-600"
                        onClick={() => handleDeleteCourse(course._id)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </>
              )}
              {/* Lessons Section */}
              {expanded === course._id && (
                <div className="mt-4 border-t pt-4">
                  <h3 className="text-lg font-bold mb-2 text-blue-700">
                    Lessons
                  </h3>
                  <ul className="mb-2">
                    {course.lessons && course.lessons.length > 0 ? (
                      course.lessons.map((lesson) => (
                        <li
                          key={lesson.id}
                          className="flex justify-between items-center border-b py-2"
                        >
                          <span>{lesson.title}</span>
                          <button
                            className="text-red-500"
                            onClick={() =>
                              handleDeleteLesson(course._id, lesson.id)
                            }
                          >
                            Delete
                          </button>
                        </li>
                      ))
                    ) : (
                      <li className="text-gray-500">No lessons yet.</li>
                    )}
                  </ul>
                  <form
                    onSubmit={(e) => handleAddLesson(course._id, e)}
                    className="flex flex-col md:flex-row gap-2 mt-2"
                  >
                    <input
                      className="flex-1 p-2 border rounded"
                      placeholder="Lesson ID"
                      value={lessonForms[course._id]?.id || ""}
                      onChange={(e) =>
                        handleLessonFormChange(course._id, "id", e.target.value)
                      }
                      required
                    />
                    <input
                      className="flex-1 p-2 border rounded"
                      placeholder="Lesson Title"
                      value={lessonForms[course._id]?.title || ""}
                      onChange={(e) =>
                        handleLessonFormChange(
                          course._id,
                          "title",
                          e.target.value
                        )
                      }
                      required
                    />
                    <input
                      className="flex-1 p-2 border rounded"
                      placeholder="Subject Category"
                      value={lessonForms[course._id]?.subjectCategory || ""}
                      onChange={(e) =>
                        handleLessonFormChange(
                          course._id,
                          "subjectCategory",
                          e.target.value
                        )
                      }
                      required
                    />
                    <input
                      className="flex-1 p-2 border rounded"
                      placeholder="Duration (min)"
                      type="number"
                      value={lessonForms[course._id]?.duration || ""}
                      onChange={(e) =>
                        handleLessonFormChange(
                          course._id,
                          "duration",
                          e.target.value
                        )
                      }
                    />
                    <input
                      className="flex-1 p-2 border rounded"
                      placeholder="Video URL"
                      value={lessonForms[course._id]?.videoUrl || ""}
                      onChange={(e) =>
                        handleLessonFormChange(
                          course._id,
                          "videoUrl",
                          e.target.value
                        )
                      }
                    />
                    <button
                      className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                      disabled={loading}
                    >
                      Add Lesson
                    </button>
                  </form>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CourseManagement;
