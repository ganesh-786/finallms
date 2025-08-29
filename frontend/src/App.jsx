import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import HomePage from "./pages/Homepage";
import CourseDetail from "./pages/CourseDetail";
import CourseManagement from "./pages/CourseManagement";
import LessonDetail from "./pages/LessonDetail";

const App = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [view, setView] = useState("home"); // 'home', 'manage', 'courseDetail', 'lessonDetail'
  const [selectedCourseId, setSelectedCourseId] = useState(null);
  const [selectedLessonId, setSelectedLessonId] = useState(null);
  const [theme, setTheme] = useState("light"); // 'light' or 'dark'

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        setLoading(true);

        // First, fetch all courses
        const coursesResponse = await axios.get(
          "http://localhost:8000/api/courses"
        );
        const courses = coursesResponse.data.data;
        // Then, fetch lessons for each course
        const coursesWithLessons = await Promise.all(
          courses.map(async (course) => {
            try {
              const lessonsResponse = await axios.get(
                `http://localhost:8000/api/courses/${course._id}`
              );
              // Normalize lessons: if lessons is an object with a lessons array, flatten it
              let lessons = lessonsResponse.data.data;
              if (
                lessons &&
                typeof lessons === "object" &&
                Array.isArray(lessons.lessons)
              ) {
                lessons = lessons.lessons;
              } else if (!Array.isArray(lessons)) {
                lessons = [];
              }
              return {
                ...course,
                id: course._id,
                lessons,
              };
            } catch (error) {
              console.log(
                `Error fetching lessons for course ${course._id}:`,
                error
              );
              return {
                ...course,
                id: course._id,
                lessons: [],
              };
            }
          })
        );
        console.log(coursesWithLessons);
        setCourses(coursesWithLessons);
        toast.success("All courses and lessons successfully fetched!");
      } catch (error) {
        console.log("Error during Fetch", error);
        toast.error("Failed to fetch courses data");
      } finally {
        setLoading(false);
      }
    };
    fetchCourse();
  }, []);

  // Initial dummy data for courses and lessons

  // Functions to manage courses in the main App state (CRUD via API)
  const fetchAllCourses = async () => {
    try {
      setLoading(true);
      const coursesResponse = await axios.get(
        "http://localhost:8000/api/courses"
      );
      const courses = coursesResponse.data.data;
      const coursesWithLessons = await Promise.all(
        courses.map(async (course) => {
          try {
            const lessonsResponse = await axios.get(
              `http://localhost:8000/api/courses/${course._id}`
            );
            let lessons = lessonsResponse.data.data;
            if (
              lessons &&
              typeof lessons === "object" &&
              Array.isArray(lessons.lessons)
            ) {
              lessons = lessons.lessons;
            } else if (!Array.isArray(lessons)) {
              lessons = [];
            }
            return {
              ...course,
              id: course._id,
              lessons,
            };
          } catch (error) {
            return {
              ...course,
              id: course._id,
              lessons: [],
            };
          }
        })
      );
      setCourses(coursesWithLessons);
    } catch (error) {
      toast.error("Failed to fetch courses data");
    } finally {
      setLoading(false);
    }
  };

  const handleAddCourse = async (newCourse) => {
    try {
      setLoading(true);
      await axios.post("http://localhost:8000/api/courses", newCourse);
      toast.success("Course created!");
      await fetchAllCourses();
    } catch (error) {
      toast.error("Failed to create course");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateCourse = async (updatedCourse) => {
    try {
      setLoading(true);
      await axios.put(
        `http://localhost:8000/api/courses/${
          updatedCourse.id || updatedCourse._id
        }`,
        updatedCourse
      );
      toast.success("Course updated!");
      await fetchAllCourses();
    } catch (error) {
      toast.error("Failed to update course");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteCourse = async (courseId) => {
    try {
      setLoading(true);
      await axios.delete(`http://localhost:8000/api/courses/${courseId}`);
      toast.success("Course deleted!");
      await fetchAllCourses();
      if (selectedCourseId === courseId) {
        setSelectedCourseId(null);
        setSelectedLessonId(null);
        setView("home");
      }
    } catch (error) {
      toast.error("Failed to delete course");
    } finally {
      setLoading(false);
    }
  };

  // Functions to manage lessons for a specific course (CRUD via API)
  const handleAddLesson = async (courseId, newLesson) => {
    try {
      setLoading(true);
      await axios.post(
        `http://localhost:8000/api/courses/${courseId}/lessons`,
        newLesson
      );
      toast.success("Lesson created!");
      await fetchAllCourses();
    } catch (error) {
      toast.error("Failed to create lesson");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateLesson = async (courseId, updatedLesson) => {
    try {
      setLoading(true);
      await axios.put(
        `http://localhost:8000/api/courses/${courseId}/lessons/${
          updatedLesson.id || updatedLesson._id
        }`,
        updatedLesson
      );
      toast.success("Lesson updated!");
      await fetchAllCourses();
    } catch (error) {
      toast.error("Failed to update lesson");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteLesson = async (courseId, lessonId) => {
    try {
      setLoading(true);
      await axios.delete(
        `http://localhost:8000/api/courses/${courseId}/lessons/${lessonId}`
      );
      toast.success("Lesson deleted!");
      await fetchAllCourses();
      if (selectedCourseId === courseId && selectedLessonId === lessonId) {
        setSelectedLessonId(null);
        setView("courseDetail");
      }
    } catch (error) {
      toast.error("Failed to delete lesson");
    } finally {
      setLoading(false);
    }
  };

  // Navigation Handlers
  const handleViewCourse = (courseId) => {
    setSelectedCourseId(courseId);
    setSelectedLessonId(null); // Clear any selected lesson
    setView("courseDetail");
  };

  const handleBackToHome = () => {
    setSelectedCourseId(null);
    setSelectedLessonId(null);
    setView("home");
  };

  const handleViewLesson = (lessonId) => {
    setSelectedLessonId(lessonId);
    setView("lessonDetail");
  };

  const handleBackToCourse = () => {
    setSelectedLessonId(null);
    setView("courseDetail");
  };

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  const currentCourse = selectedCourseId
    ? courses.find(
        (c) => c.id === selectedCourseId || c._id === selectedCourseId
      )
    : null;
  const currentLesson =
    currentCourse && selectedLessonId
      ? currentCourse.lessons.find((l) => l.id === selectedLessonId)
      : null;

  // Dynamically render the current view component
  let ContentView;
  if (view === "home") {
    ContentView = (
      <HomePage courses={courses} onViewCourse={handleViewCourse} />
    );
  } else if (view === "manage") {
    ContentView = (
      <CourseManagement
        courses={courses}
        onAddCourse={handleAddCourse}
        onUpdateCourse={handleUpdateCourse}
        onDeleteCourse={handleDeleteCourse}
        onAddLesson={handleAddLesson}
        onUpdateLesson={handleUpdateLesson}
        onDeleteLesson={handleDeleteLesson}
        theme={theme}
      />
    );
  } else if (view === "courseDetail" && currentCourse) {
    ContentView = (
      <CourseDetail
        course={currentCourse}
        onBackToHome={handleBackToHome}
        onViewLesson={handleViewLesson}
      />
    );
  } else if (view === "lessonDetail" && currentLesson) {
    ContentView = (
      <LessonDetail
        lesson={currentLesson}
        onBackToCourse={handleBackToCourse}
      />
    );
  } else {
    // Default to home or a loading/error state if none match
    ContentView = (
      <HomePage courses={courses} onViewCourse={handleViewCourse} />
    );
  }

  return (
    <div
      className={`min-h-screen ${
        theme === "dark"
          ? "bg-gray-900 text-gray-100"
          : "bg-white text-gray-900"
      }`}
    >
      {/* Navigation Bar */}
      <nav
        className={`p-4 shadow-lg sticky top-0 z-40 ${
          theme === "dark" ? "bg-gray-800" : "bg-indigo-700"
        }`}
      >
        <div className="container mx-auto flex justify-between items-center flex-wrap gap-4">
          <div className="text-white text-3xl font-bold">GyaanSathi</div>
          <div className="flex items-center space-x-4 sm:space-x-6">
            <button
              onClick={() => setView("home")}
              className={`text-white px-5 py-2 rounded-lg text-lg font-medium transition duration-300 flex items-center ${
                view === "home"
                  ? "bg-indigo-600 shadow-md"
                  : "hover:bg-indigo-600"
              }`}
            >
              <svg
                className="w-5 h-5 mr-2"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path>
              </svg>
              Home
            </button>
            <button
              onClick={() => setView("manage")}
              className={`text-white px-5 py-2 rounded-lg text-lg font-medium transition duration-300 flex items-center ${
                view === "manage"
                  ? "bg-indigo-600 shadow-md"
                  : "hover:bg-indigo-600"
              }`}
            >
              <svg
                className="w-5 h-5 mr-2"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 00-.707-.293h-1a1 1 0 100 2h1a1 1 0 00.707-.293l.707-.707a1 1 0 00-1.414-1.414l-.707.707zM17 10a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464l-.707-.707a1 1 0 00-1.414 1.414l.707.707a1 1 0 001.414-1.414zm-.707 2.121A1 1 0 003 10a1 1 0 001 1h1a1 1 0 100-2H4a1 1 0 00-.707.293z"></path>
              </svg>
              Manage Content
            </button>
            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full bg-indigo-600 text-white hover:bg-indigo-500 transition duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-300"
              aria-label="Toggle dark/light mode"
            >
              {theme === "light" ? (
                // Sun icon for light mode
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 00-.707-.293h-1a1 1 0 100 2h1a1 1 0 00.707-.293l.707-.707a1 1 0 00-1.414-1.414l-.707.707zM17 10a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464l-.707-.707a1 1 0 00-1.414 1.414l.707.707a1 1 0 001.414-1.414zm-.707 2.121A1 1 0 003 10a1 1 0 001 1h1a1 1 0 100-2H4a1 1 0 00-.707.293z"></path>
                </svg>
              ) : (
                // Moon icon for dark mode
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M17.293 13.907A8.001 8.001 0 016.093 2.707a.5.5 0 00-.671.121A7.962 7.962 0 003 10c0 4.418 3.582 8 8 8a8.001 8.001 0 006.907-3.328.5.5 0 00-.121-.671z"></path>
                </svg>
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Conditional Rendering of Views */}
      {ContentView}
    </div>
  );
};

export default App;
