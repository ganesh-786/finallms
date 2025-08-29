/*
  CourseManagement — Light Theme UI/UX Polished
  ------------------------------------------------
  This file contains:
  1) CourseManagementInitial         -> A first, professional light-theme UI/UX update
  2) Reflection: notes about potential issues and improvements
  3) CourseManagementOptimized       -> Final, optimized and accessible light-theme implementation

  Default export at bottom is CourseManagementOptimized.

  Notes:
  - Uses Tailwind utility classes for quick, production-ready styling.
  - Accessibility improvements: ARIA attributes, keyboard focus, visible focus rings.
  - Visual system: soft neutrals, Indigo primary, warm accents, gentle shadowing.
  - This file intentionally keeps CourseForm and LessonForm as external imports (you already have them).
*/

import React, { useState, useEffect, useRef } from "react";
import CourseForm from "../compoments/CourseForm";
import LessonForm from "../compoments/LessonForm";

/* -----------------------------
   1) Initial professional design
   ----------------------------- */
export const CourseManagementInitial = ({
  courses,
  onAddCourse,
  onUpdateCourse,
  onDeleteCourse,
  onAddLesson,
  onUpdateLesson,
  onDeleteLesson,
  theme,
}) => {
  const [showCourseForm, setShowCourseForm] = useState(false);
  const [editingCourse, setEditingCourse] = useState(null);
  const [selectedCourseId, setSelectedCourseId] = useState(null);
  const [showLessonForm, setShowLessonForm] = useState(false);
  const [editingLesson, setEditingLesson] = useState(null);

  const selectedCourse = courses.find(
    (c) => c.id === selectedCourseId || c._id === selectedCourseId
  );

  const handleNewCourseClick = () => {
    setEditingCourse(null);
    setShowCourseForm(true);
  };

  const handleEditCourseClick = (course) => {
    setEditingCourse(course);
    setShowCourseForm(true);
  };

  const handleSaveCourse = (courseData) => {
    if (editingCourse) {
      onUpdateCourse({ ...editingCourse, ...courseData });
    } else {
      onAddCourse(courseData);
    }
    setShowCourseForm(false);
    setEditingCourse(null);
  };

  const handleDeleteCourseClick = (courseId) => {
    onDeleteCourse(courseId);
    if (selectedCourseId === courseId) {
      setSelectedCourseId(null);
    }
  };

  const handleSelectCourseToManageLessons = (courseId) => {
    setSelectedCourseId(courseId);
    setEditingLesson(null);
    setShowLessonForm(false);
  };

  const handleNewLessonClick = () => {
    setEditingLesson(null);
    setShowLessonForm(true);
  };

  const handleEditLessonClick = (lesson) => {
    setEditingLesson(lesson);
    setShowLessonForm(true);
  };

  const handleSaveLesson = (lessonData) => {
    if (editingLesson) {
      onUpdateLesson(selectedCourseId, { ...editingLesson, ...lessonData });
    } else {
      onAddLesson(selectedCourseId, lessonData);
    }
    setShowLessonForm(false);
    setEditingLesson(null);
  };

  const handleDeleteLessonClick = (lessonId) => {
    onDeleteLesson(selectedCourseId, lessonId);
  };

  return (
    <div className="min-h-screen p-8 bg-gradient-to-b from-gray-50 via-white to-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-extrabold text-gray-900">
            Course Management
          </h2>
          <div className="flex items-center gap-3">
            <button
              onClick={handleNewCourseClick}
              className="inline-flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg shadow hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-300 transition"
              aria-label="Add new course"
            >
              Add Course
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.length > 0 ? (
            courses.map((course) => (
              <article
                key={course.id || course._id}
                className={`bg-white border border-gray-200 rounded-2xl p-5 shadow-sm flex flex-col justify-between hover:shadow-lg transition transform hover:-translate-y-0.5 focus-within:shadow-lg ${
                  selectedCourseId === (course.id || course._id)
                    ? "ring-2 ring-indigo-200"
                    : ""
                }`}
              >
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">
                    {course.title}
                  </h3>
                  <p className="text-sm text-gray-600 mb-3 line-clamp-3">
                    {course.description}
                  </p>
                </div>

                <div className="flex items-center justify-between mt-4">
                  <div className="text-sm text-gray-500">
                    Lessons:{" "}
                    {Array.isArray(course.lessons) ? course.lessons.length : 0}
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleEditCourseClick(course)}
                      className="px-3 py-1 rounded-md bg-yellow-400 text-gray-900 hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-200"
                      aria-label={`Edit ${course.title}`}
                    >
                      Edit
                    </button>
                    <button
                      onClick={() =>
                        handleDeleteCourseClick(course.id || course._id)
                      }
                      className="px-3 py-1 rounded-md bg-red-500 text-white hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-200"
                      aria-label={`Delete ${course.title}`}
                    >
                      Delete
                    </button>
                    <button
                      onClick={() =>
                        handleSelectCourseToManageLessons(
                          course.id || course._id
                        )
                      }
                      className="px-3 py-1 rounded-md bg-indigo-500 text-white hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-200"
                      aria-label={`Manage lessons for ${course.title}`}
                    >
                      Manage
                    </button>
                  </div>
                </div>
              </article>
            ))
          ) : (
            <p className="col-span-full text-center text-gray-500">
              No courses available.
            </p>
          )}
        </div>

        {/* Lessons Management */}
        {selectedCourse && (
          <section className="mt-12 bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-2xl font-bold text-gray-900">
                Manage Lessons — {selectedCourse.title}
              </h3>
              <button
                onClick={handleNewLessonClick}
                className="inline-flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg shadow hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-200"
              >
                Add Lesson
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {Array.isArray(selectedCourse.lessons) &&
              selectedCourse.lessons.length > 0 ? (
                selectedCourse.lessons.map((lesson) => (
                  <div
                    key={lesson.id || lesson._id}
                    className="p-4 bg-gray-50 rounded-lg"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="font-semibold text-gray-900">
                          {lesson.title}
                        </h4>
                        <p className="text-sm text-gray-600">
                          {lesson.subjectCategory || "General"}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEditLessonClick(lesson)}
                          className="px-2 py-1 rounded-md bg-yellow-400 text-gray-900 hover:bg-yellow-500"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() =>
                            handleDeleteLessonClick(lesson.id || lesson._id)
                          }
                          className="px-2 py-1 rounded-md bg-red-500 text-white hover:bg-red-600"
                        >
                          Delete
                        </button>
                      </div>
                    </div>

                    <div className="mt-3 text-sm text-gray-600">
                      <div>Topics: {lesson.topics?.join(", ")}</div>
                      <div>Materials: {lesson.materials?.join(", ")}</div>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-center text-gray-500">
                  No lessons available for this course.
                </p>
              )}
            </div>
          </section>
        )}

        {/* Forms (kept simple — these are your external components) */}
        {showCourseForm && (
          <CourseForm
            course={editingCourse}
            onSave={handleSaveCourse}
            onCancel={() => {
              setShowCourseForm(false);
              setEditingCourse(null);
            }}
          />
        )}

        {showLessonForm && (
          <LessonForm
            lesson={editingLesson}
            onSave={handleSaveLesson}
            onCancel={() => {
              setShowLessonForm(false);
              setEditingLesson(null);
            }}
          />
        )}
      </div>
    </div>
  );
};

/* -----------------------------
   2) Reflections / Potential issues
   -----------------------------
   - Modal accessibility: CourseForm and LessonForm must trap focus, be dismissible via Esc, and set aria-modal="true".
   - Performance: rendering many courses/lessons may need virtualization or pagination.
   - Unique keys: code relies on course.id || course._id — ensure consistent canonical id in the backend.
   - Line-clamp utilities: tailwind's line-clamp plugin must be available if used.
   - Delete confirmation: delete operations should show a confirmation / undo to prevent accidental data loss.
   - Internationalization: text strings are hard-coded — extract to i18n files.
   - Color contrast: verify text-on-background contrast with an accessibility tool; tweak if needed.

   Further UX ideas:
   - Add inline search + filter for courses (by title, subject, lesson count).
   - Add drag-and-drop lesson reordering with explicit affordances.
   - Add skeleton loading states for slow networks.
*/

/* -----------------------------
   3) Final optimized implementation
   (improves accessibility, extraction of repeated UI, keyboard affordances)
   ----------------------------- */

const Icon = ({ name, className = "w-4 h-4" }) => {
  // Minimal inline svg icons for clarity — expand as needed.
  switch (name) {
    case "edit":
      return (
        <svg
          className={className}
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden
        >
          <path d="M17.414 2.586a2 2 0 010 2.828l-9.9 9.9a1 1 0 01-.464.263l-4 1a1 1 0 01-1.213-1.213l1-4a1 1 0 01.263-.464l9.9-9.9a2 2 0 012.828 0z" />
        </svg>
      );
    case "trash":
      return (
        <svg
          className={className}
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden
        >
          <path
            fillRule="evenodd"
            d="M6 2a1 1 0 00-1 1v1H2v2h1v9a2 2 0 002 2h8a2 2 0 002-2V6h1V4h-3V3a1 1 0 00-1-1H6zm2 5a1 1 0 012 0v6a1 1 0 11-2 0V7zm4 0a1 1 0 10-2 0v6a1 1 0 102 0V7z"
            clipRule="evenodd"
          />
        </svg>
      );
    case "plus":
      return (
        <svg
          className={className}
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden
        >
          <path
            fillRule="evenodd"
            d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
            clipRule="evenodd"
          />
        </svg>
      );
    default:
      return null;
  }
};

const useClickOutside = (ref, handler) => {
  useEffect(() => {
    const listener = (e) => {
      if (!ref.current || ref.current.contains(e.target)) return;
      handler(e);
    };
    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);
    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [ref, handler]);
};

export const CourseManagementOptimized = ({
  courses = [],
  onAddCourse,
  onUpdateCourse,
  onDeleteCourse,
  onAddLesson,
  onUpdateLesson,
  onDeleteLesson,
}) => {
  const [showCourseForm, setShowCourseForm] = useState(false);
  const [editingCourse, setEditingCourse] = useState(null);
  const [selectedCourseId, setSelectedCourseId] = useState(null);
  const [showLessonForm, setShowLessonForm] = useState(false);
  const [editingLesson, setEditingLesson] = useState(null);
  const [search, setSearch] = useState("");

  // local refs for modal click-out and escape handling
  const courseModalRef = useRef(null);
  const lessonModalRef = useRef(null);

  const selectedCourse = courses.find(
    (c) => c && (c.id === selectedCourseId || c._id === selectedCourseId)
  );

  // Filter courses by search
  const filteredCourses = search.trim()
    ? courses.filter((c) =>
        c.title?.toLowerCase().includes(search.trim().toLowerCase())
      )
    : courses;

  useClickOutside(courseModalRef, () => {
    if (showCourseForm) {
      setShowCourseForm(false);
      setEditingCourse(null);
    }
  });

  useClickOutside(lessonModalRef, () => {
    if (showLessonForm) {
      setShowLessonForm(false);
      setEditingLesson(null);
    }
  });

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") {
        if (showCourseForm) {
          setShowCourseForm(false);
          setEditingCourse(null);
        }
        if (showLessonForm) {
          setShowLessonForm(false);
          setEditingLesson(null);
        }
      }
      if (e.key === "f" && (e.ctrlKey || e.metaKey)) {
        // quick-focus / open new course (Ctrl/Cmd + F) — example of keyboard shortcut
        e.preventDefault();
        setShowCourseForm(true);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [showCourseForm, showLessonForm]);

  const handleNewCourseClick = () => {
    setEditingCourse(null);
    setShowCourseForm(true);
  };

  const handleEditCourseClick = (course) => {
    setEditingCourse(course);
    setShowCourseForm(true);
  };

  const handleSaveCourse = (courseData) => {
    if (editingCourse) {
      onUpdateCourse({ ...editingCourse, ...courseData });
    } else {
      onAddCourse(courseData);
    }
    setShowCourseForm(false);
    setEditingCourse(null);
  };

  const handleDeleteCourseClick = (courseId) => {
    // UX: simple confirm (replace with custom modal for production)
    if (window.confirm("Delete this course? This action cannot be undone.")) {
      onDeleteCourse(courseId);
      if (selectedCourseId === courseId) setSelectedCourseId(null);
    }
  };

  const handleSelectCourseToManageLessons = (courseId) => {
    setSelectedCourseId(courseId);
    setEditingLesson(null);
    setShowLessonForm(false);
    // scroll course into view for context on mobile
    const el = document.querySelector(`[data-course-id='${courseId}']`);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  const handleNewLessonClick = () => {
    setEditingLesson(null);
    setShowLessonForm(true);
  };

  const handleEditLessonClick = (lesson) => {
    setEditingLesson(lesson);
    setShowLessonForm(true);
  };

  const handleSaveLesson = (lessonData) => {
    if (editingLesson) {
      onUpdateLesson(selectedCourseId, { ...editingLesson, ...lessonData });
    } else {
      onAddLesson(selectedCourseId, lessonData);
    }
    setShowLessonForm(false);
    setEditingLesson(null);
  };

  const handleDeleteLessonClick = (lessonId) => {
    if (window.confirm("Delete this lesson?")) {
      onDeleteLesson(selectedCourseId, lessonId);
    }
  };

  return (
    <div className="min-h-screen p-6 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-6xl mx-auto">
        <header className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-extrabold text-gray-900">
              Course Management
            </h1>
            <p className="text-sm text-gray-600 mt-1">
              Manage your course added🧐!
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden sm:block">
              <label htmlFor="courseSearch" className="sr-only">
                Search courses
              </label>
              <input
                id="courseSearch"
                placeholder="Search courses..."
                className="px-3 py-2 rounded-lg border border-gray-200 shadow-sm text-sm w-64 focus:outline-none focus:ring-2 focus:ring-indigo-200"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    // Focus first filtered course card if available
                    const first = document.querySelector("[data-course-id]");
                    if (first) first.focus();
                  }
                }}
                aria-label="Search courses by title"
              />
            </div>

            <button
              onClick={handleNewCourseClick}
              className="inline-flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-300"
              aria-label="Add new course"
              title="Add new course (Ctrl/Cmd+F)"
            >
              <Icon name="plus" className="w-4 h-4" />
              <span className="hidden sm:inline">New Course</span>
            </button>
          </div>
        </header>

        <main className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <section className="lg:col-span-2">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {filteredCourses.length ? (
                filteredCourses.map((course) => (
                  <article
                    data-course-id={course.id || course._id}
                    key={course.id || course._id}
                    tabIndex={0}
                    className={`bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-lg transform hover:-translate-y-0.5 transition focus:outline-none focus:ring-2 focus:ring-indigo-200 ${
                      selectedCourseId === (course.id || course._id)
                        ? "ring-2 ring-indigo-100"
                        : ""
                    }`}
                    onKeyDown={(e) => {
                      if (e.key === "Enter")
                        handleSelectCourseToManageLessons(
                          course.id || course._id
                        );
                    }}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">
                          {course.title}
                        </h3>
                        <p className="mt-1 text-sm text-gray-600 line-clamp-3">
                          {course.description}
                        </p>
                      </div>

                      <div className="flex flex-col items-end gap-3">
                        <div className="text-sm text-gray-500">
                          {Array.isArray(course.lessons)
                            ? course.lessons.length
                            : 0}{" "}
                          lessons
                        </div>

                        <div className="flex gap-2">
                          <button
                            onClick={() => handleEditCourseClick(course)}
                            className="p-2 rounded-md bg-yellow-400 text-gray-800 hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-200"
                            aria-label={`Edit ${course.title}`}
                          >
                            <Icon name="edit" />
                          </button>

                          <button
                            onClick={() =>
                              handleDeleteCourseClick(course.id || course._id)
                            }
                            className="p-2 rounded-md bg-red-500 text-white hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-200"
                            aria-label={`Delete ${course.title}`}
                          >
                            <Icon name="trash" />
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 flex gap-3">
                      <button
                        onClick={() =>
                          handleSelectCourseToManageLessons(
                            course.id || course._id
                          )
                        }
                        className="px-3 py-1 rounded-lg bg-indigo-50 text-indigo-700 text-sm font-medium hover:bg-indigo-100 focus:outline-none focus:ring-2 focus:ring-indigo-200"
                      >
                        Manage Lessons
                      </button>

                      <button
                        onClick={() =>
                          navigator.clipboard?.writeText(
                            window.location.href +
                              `#course-${course.id || course._id}`
                          )
                        }
                        className="px-3 py-1 rounded-lg border border-gray-200 text-sm text-gray-600 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-200"
                        title="Copy link to this course"
                      >
                        Share
                      </button>
                    </div>
                  </article>
                ))
              ) : (
                <div className="p-8 bg-white border border-dashed border-gray-200 rounded-2xl text-center">
                  <p className="text-gray-600">
                    {search.trim()
                      ? "No courses match your search."
                      : "No courses available yet. Create your first course to get started."}
                  </p>
                  {!search.trim() && (
                    <div className="mt-4">
                      <button
                        onClick={handleNewCourseClick}
                        className="px-4 py-2 rounded-lg bg-indigo-600 text-white"
                      >
                        Create course
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </section>

          {/* Right column: selected course quick info + actions */}
          <aside className="sticky top-6">
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
              {selectedCourse ? (
                <>
                  <h4 className="text-lg font-semibold text-gray-900">
                    {selectedCourse.title}
                  </h4>
                  <p className="text-sm text-gray-600 mt-2 line-clamp-4">
                    {selectedCourse.description}
                  </p>

                  <div className="mt-4 flex flex-col gap-2">
                    <button
                      onClick={() => setSelectedCourseId(null)}
                      className="text-sm text-gray-500 underline"
                    >
                      Close
                    </button>

                    <button
                      onClick={handleNewLessonClick}
                      className="mt-2 px-3 py-2 rounded-lg bg-indigo-600 text-white w-full"
                    >
                      + Add Lesson
                    </button>

                    <button
                      onClick={() => handleEditCourseClick(selectedCourse)}
                      className="mt-2 px-3 py-2 rounded-lg border border-gray-200 w-full"
                    >
                      Edit Course
                    </button>
                  </div>
                </>
              ) : (
                <div>
                  <h4 className="text-gray-900 font-medium">Select a course</h4>
                  <p className="text-sm text-gray-600 mt-2">
                    Click any course card to manage lessons and edit content.
                  </p>
                </div>
              )}
            </div>

            {/* Lessons list for selected course */}
            {selectedCourse && (
              <div className="mt-4 bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
                <h5 className="text-sm font-semibold text-gray-900">Lessons</h5>
                <div className="mt-3 flex flex-col gap-3">
                  {Array.isArray(selectedCourse.lessons) &&
                  selectedCourse.lessons.length > 0 ? (
                    selectedCourse.lessons.map((lesson) => (
                      <div
                        key={lesson.id || lesson._id}
                        className="flex items-center justify-between"
                      >
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {lesson.title}
                          </div>
                          <div className="text-xs text-gray-500">
                            {lesson.subjectCategory || "General"}
                          </div>
                        </div>

                        <div className="flex gap-2">
                          <button
                            onClick={() => handleEditLessonClick(lesson)}
                            className="px-2 py-1 rounded-md bg-yellow-400"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() =>
                              handleDeleteLessonClick(lesson.id || lesson._id)
                            }
                            className="px-2 py-1 rounded-md bg-red-500 text-white"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-sm text-gray-500">
                      No lessons yet — add one to get started.
                    </div>
                  )}
                </div>
              </div>
            )}
          </aside>
        </main>

        {/* Course Modal (wrapper for external CourseForm) */}
        {showCourseForm && (
          <div className="fixed inset-0 z-40 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/30" aria-hidden />
            <div
              ref={courseModalRef}
              role="dialog"
              aria-modal="true"
              className="relative w-full max-w-2xl mx-auto"
            >
              <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                <CourseForm
                  course={editingCourse}
                  onSave={handleSaveCourse}
                  onCancel={() => {
                    setShowCourseForm(false);
                    setEditingCourse(null);
                  }}
                />
              </div>
            </div>
          </div>
        )}

        {/* Lesson Modal */}
        {showLessonForm && (
          <div className="fixed inset-0 z-40 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/30" aria-hidden />
            <div
              ref={lessonModalRef}
              role="dialog"
              aria-modal="true"
              className="relative w-full max-w-xl mx-auto"
            >
              <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                <LessonForm
                  lesson={editingLesson}
                  onSave={handleSaveLesson}
                  onCancel={() => {
                    setShowLessonForm(false);
                    setEditingLesson(null);
                  }}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CourseManagementOptimized;
