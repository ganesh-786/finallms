import React from "react";

export function CourseDetailLightInitial({
  course = {},
  onBackToHome,
  onViewLesson,
}) {
  const lessons = Array.isArray(course.lessons) ? course.lessons : [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-sky-50 to-indigo-50 p-6 font-sans text-slate-900">
      <div className="container mx-auto bg-white rounded-xl shadow-2xl p-8 lg:p-12 mb-8">
        <button
          onClick={onBackToHome}
          aria-label="Back to all courses"
          className="inline-flex items-center text-indigo-600 hover:text-indigo-800 transition duration-200 mb-6 font-semibold"
        >
          <svg
            className="w-5 h-5 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            ></path>
          </svg>
          Back to All Courses
        </button>

        <div className="flex flex-col md:flex-row items-center md:items-start gap-8 mb-10">
          <div className="flex-shrink-0 w-full md:w-1/3 lg:w-1/4">
            <img
              src={course.imageUrl}
              alt={course.title}
              className="w-full h-auto object-cover rounded-xl shadow-md"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = `https://placehold.co/400x250/9CA3AF/FFFFFF?text=Image+Error`;
              }}
            />
          </div>
          <div className="flex-grow text-center md:text-left">
            <h1 className="text-4xl lg:text-5xl font-extrabold text-gray-900 mb-4">
              {course.title}
            </h1>
            <p className="text-lg text-gray-700 leading-relaxed">
              {course.description}
            </p>
          </div>
        </div>

        <h2 className="text-3xl font-bold text-gray-800 mb-6">
          Course Lessons
        </h2>
        {lessons.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {lessons.map((lesson) => (
              <div
                key={lesson.id || lesson._id}
                className="bg-gray-50 rounded-xl p-6 shadow-md border border-gray-100 flex flex-col justify-between"
              >
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {lesson.title}
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Topics:{" "}
                    {lesson.topics && lesson.topics.length > 0
                      ? lesson.topics.join(", ")
                      : "N/A"}
                  </p>
                </div>
                <button
                  onClick={() => onViewLesson(lesson.id || lesson._id)}
                  className="mt-4 bg-indigo-600 text-white py-2 px-5 rounded-lg shadow-md hover:bg-indigo-700 transition duration-200 focus:outline-none focus:ring-4 focus:ring-indigo-300 self-start"
                >
                  View Lesson
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-600 italic py-8">
            No lessons available for this course yet.
          </p>
        )}
      </div>
    </div>
  );
}

function IconBack({ className = "w-5 h-5 mr-2" }) {
  return (
    <svg
      className={className}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M10 19l-7-7m0 0l7-7m-7 7h18"
      />
    </svg>
  );
}

function LessonCard({ lesson = {}, onViewLesson }) {
  const { title = "Untitled Lesson", topics = [] } = lesson || {};
  const id = lesson.id || lesson._id;

  return (
    <article className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 flex flex-col justify-between hover:shadow-md transition-shadow">
      <div>
        <h3 className="text-lg font-semibold text-slate-900 mb-2">{title}</h3>
        <p className="text-sm text-slate-600 mb-4 truncate">
          {topics && topics.length > 0 ? topics.join(", ") : "N/A"}
        </p>
      </div>
      <div>
        <button
          onClick={() => onViewLesson(id)}
          className="inline-flex items-center gap-2 bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-200"
          aria-label={`View lesson ${title}`}
        >
          View Lesson
        </button>
      </div>
    </article>
  );
}

export default function CourseDetail({
  course = {},
  onBackToHome,
  onViewLesson,
}) {
  // Safe defaults
  const {
    title = "Untitled Course",
    description = "",
    imageUrl = "",
    lessons = [],
    level = null,
    duration = null,
    students = null,
  } = course || {};

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-sky-50 to-indigo-50 p-6 font-sans text-slate-900">
      <main
        className="container mx-auto bg-white rounded-xl shadow-lg p-6 lg:p-10 mb-8"
        aria-labelledby="course-title"
      >
        <button
          onClick={onBackToHome}
          aria-label="Back to all courses"
          className="inline-flex items-center text-indigo-600 hover:text-indigo-800 focus:outline-none focus:ring-2 focus:ring-indigo-200 rounded mb-6 font-semibold"
        >
          <IconBack />
          Back to All Courses
        </button>

        <div className="flex flex-col md:flex-row items-center md:items-start gap-8 mb-8">
          <div className="flex-shrink-0 w-full md:w-1/3 lg:w-1/4">
            <img
              src={
                imageUrl ||
                `https://placehold.co/640x400/E2E8F0/94A3B8?text=No+Image`
              }
              alt={title}
              loading="lazy"
              className="w-full h-auto object-cover rounded-xl shadow-md"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = `https://placehold.co/640x400/E2E8F0/94A3B8?text=Image+Error`;
              }}
            />
          </div>

          <div className="flex-grow text-center md:text-left">
            <h1
              id="course-title"
              className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 mb-3"
            >
              {title}
            </h1>
            <p className="text-base sm:text-lg text-slate-700 leading-relaxed mb-4 line-clamp-4">
              {description}
            </p>

            <div className="flex flex-wrap gap-4 items-center justify-center md:justify-start mt-2">
              {level && (
                <span className="bg-amber-100 text-amber-800 px-3 py-1 rounded-full text-sm font-medium">
                  {level}
                </span>
              )}
              {duration && (
                <span className="bg-sky-100 text-sky-800 px-3 py-1 rounded-full text-sm font-medium">
                  {duration}
                </span>
              )}
              {students !== null && (
                <span className="bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full text-sm font-medium">
                  {students} students
                </span>
              )}

              <button className="ml-2 inline-flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-200">
                Enroll
              </button>
            </div>
          </div>
        </div>

        <section aria-labelledby="lessons-heading">
          <h2
            id="lessons-heading"
            className="text-2xl font-bold text-slate-800 mb-4"
          >
            Course Lessons
          </h2>

          {Array.isArray(lessons) && lessons.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {lessons.map((lesson) => (
                <LessonCard
                  key={lesson.id || lesson._id}
                  lesson={lesson}
                  onViewLesson={onViewLesson}
                />
              ))}
            </div>
          ) : (
            <div className="bg-white border border-dashed border-gray-200 rounded-xl p-8 text-center">
              <p className="text-gray-600 italic">
                No lessons available for this course yet.
              </p>
              <p className="mt-3 text-sm text-gray-500">
                Visit Manage Content to add lessons or check back later.
              </p>
            </div>
          )}
        </section>

        <footer className="mt-8 text-sm text-gray-600">
          <div>© {new Date().getFullYear()} Learning Platform</div>
        </footer>
      </main>
    </div>
  );
}
