import React from "react";
import CourseCard from "../compoments/CourseCard";

export function HomePageLightInitial({ courses, onViewCourse }) {
  const safeCourses = Array.isArray(courses) ? courses : [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-amber-50 to-sky-50 p-8 font-sans relative text-slate-900">
      {/* Decorative Background Elements (light-only) */}
      <div
        aria-hidden
        className="absolute inset-0 overflow-hidden pointer-events-none"
      >
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-rose-100 to-yellow-100 rounded-full blur-3xl opacity-70"></div>
        <div className="absolute top-1/2 -left-32 w-64 h-64 bg-gradient-to-tr from-blue-100 to-cyan-100 rounded-full blur-2xl opacity-70"></div>
        <div className="absolute -bottom-32 right-1/4 w-96 h-96 bg-gradient-to-tl from-emerald-100 to-teal-100 rounded-full blur-3xl opacity-60"></div>
      </div>

      {/* Content Container */}
      <div className="relative z-10">
        {/* Header Section */}
        <header className="text-center mb-16">
          <div className="inline-block p-6 rounded-2xl bg-white/90 border border-slate-200 shadow-md mb-8">
            <h1 className="text-5xl sm:text-6xl font-extrabold text-slate-900 leading-tight mb-4">
              Welcome to Our Learning Platform
            </h1>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed">
              Discover a wide range of courses and start your learning journey
              today with our expertly crafted curriculum!
            </p>
          </div>

          {/* Feature Highlights */}
          <div className="flex justify-center gap-6 flex-wrap mt-6">
            <div className="flex items-center gap-2 px-4 py-2 bg-emerald-50 text-emerald-700 rounded-full text-sm font-medium border border-emerald-100">
              <span className="w-2 h-2 bg-emerald-600 rounded-full block" />{" "}
              Expert Instructors
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-violet-50 text-violet-700 rounded-full text-sm font-medium border border-violet-100">
              <span className="w-2 h-2 bg-violet-600 rounded-full block" />{" "}
              Interactive Learning
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-700 rounded-full text-sm font-medium border border-blue-100">
              <span className="w-2 h-2 bg-blue-600 rounded-full block" />{" "}
              Lifetime Access
            </div>
          </div>
        </header>

        {/* Courses Section */}
        <main className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-800 mb-4">
              Our Premium Courses
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-amber-400 to-sky-500 mx-auto rounded-full" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {safeCourses.length > 0 ? (
              safeCourses.map((course) => (
                <div
                  key={course.id || course._id}
                  className="transform transition-all duration-300 hover:scale-105"
                >
                  <CourseCard
                    course={{
                      ...course,
                      lessons: Array.isArray(course.lessons)
                        ? course.lessons
                        : [],
                    }}
                    onViewCourse={onViewCourse}
                  />
                </div>
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <div className="bg-white border border-slate-200 rounded-2xl p-10 shadow-sm">
                  <div className="w-16 h-16 bg-gradient-to-br from-amber-400 to-sky-500 rounded-full mx-auto mb-5 flex items-center justify-center">
                    <svg
                      className="w-8 h-8 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                      />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-slate-800 mb-3">
                    No Courses Available Yet
                  </h3>
                  <p className="text-slate-600 max-w-md mx-auto">
                    We're preparing amazing courses for you. Please check back
                    later or add some from the "Manage Content" section.
                  </p>
                </div>
              </div>
            )}
          </div>
        </main>

        {/* Stats Section */}
        <section className="mt-16 mb-12">
          <div className="rounded-3xl p-8 bg-gradient-to-r from-slate-900/5 to-amber-50/40 border border-slate-100">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div>
                <div className="text-3xl font-bold text-amber-600 mb-1">
                  10K+
                </div>
                <div className="text-slate-600">Active Learners</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-emerald-600 mb-1">
                  500+
                </div>
                <div className="text-slate-600">Expert Courses</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-sky-600 mb-1">95%</div>
                <div className="text-slate-600">Success Rate</div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer Section */}
        <footer className="text-center mt-8">
          <div className="bg-white/90 border border-slate-200 rounded-2xl p-6 shadow-sm">
            <p className="text-slate-600 text-sm">
              &copy; 2025 Learning Platform. All rights reserved. | Empowering
              minds, one course at a time.
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}

function BackgroundDecoration() {
  return (
    <div
      aria-hidden
      className="absolute inset-0 overflow-hidden pointer-events-none"
    >
      <div className="hidden sm:block absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-rose-100 to-amber-100 rounded-full blur-3xl opacity-80" />
      <div className="hidden md:block absolute top-1/2 -left-32 w-64 h-64 bg-gradient-to-tr from-blue-100 to-sky-100 rounded-full blur-2xl opacity-70" />
      <div className="absolute -bottom-28 right-1/4 w-72 h-72 sm:w-96 sm:h-96 bg-gradient-to-tl from-emerald-100 to-teal-100 rounded-full blur-2xl opacity-60" />
    </div>
  );
}

function CourseGrid({ courses = [], onViewCourse }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
      {courses.length > 0 ? (
        courses.map((course) => (
          <div
            key={course.id || course._id}
            className="transform transition-all duration-200 hover:scale-102 motion-safe:transition-transform"
          >
            <CourseCard
              course={{
                ...course,
                lessons: Array.isArray(course.lessons) ? course.lessons : [],
              }}
              onViewCourse={onViewCourse}
            />
          </div>
        ))
      ) : (
        <div className="col-span-full text-center py-12">
          <div className="bg-white border border-slate-200 rounded-2xl p-10 shadow-sm">
            <div className="w-16 h-16 bg-gradient-to-br from-amber-400 to-sky-500 rounded-full mx-auto mb-5 flex items-center justify-center">
              <svg
                className="w-8 h-8 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-slate-800 mb-3">
              No Courses Available Yet
            </h3>
            <p className="text-slate-600 max-w-md mx-auto">
              We're preparing amazing courses for you. Visit{" "}
              <a className="underline font-medium" href="/manage">
                Manage Content
              </a>{" "}
              to add courses or check again later.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default function HomePage({ courses, onViewCourse }) {
  const safeCourses = Array.isArray(courses) ? courses : [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-amber-50 to-sky-50 p-6 font-sans relative text-slate-900">
      <BackgroundDecoration />

      <div className="relative z-10 max-w-7xl mx-auto">
        <header className="text-center mb-12">
          <div className="inline-block p-6 rounded-2xl bg-white border border-slate-200 shadow-sm mb-6">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 leading-tight">
              Welcome to Our Learning Platform
            </h1>
            <p className="mt-3 text-base sm:text-lg text-slate-600 max-w-3xl mx-auto">
              Discover a wide range of courses and start your learning journey
              today with our expertly crafted curriculum.
            </p>
          </div>

          <div className="flex justify-center gap-4 flex-wrap mt-4">
            <Badge label="Expert Instructors" tone="emerald" />
            <Badge label="Interactive Learning" tone="violet" />
            <Badge label="Lifetime Access" tone="sky" />
          </div>
        </header>

        <main aria-labelledby="courses-heading">
          <div className="text-center mb-10">
            <h2
              id="courses-heading"
              className="text-2xl sm:text-3xl font-bold text-slate-800 mb-3"
            >
              Our Premium Courses
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-amber-400 to-sky-500 mx-auto rounded-full" />
          </div>

          <CourseGrid courses={safeCourses} onViewCourse={onViewCourse} />

          <section className="mt-12">
            <div className="rounded-2xl p-6 bg-white border border-slate-100 shadow-sm">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                <div>
                  <div className="text-2xl sm:text-3xl font-bold text-amber-600 mb-1">
                    10K+
                  </div>
                  <div className="text-slate-600">Active Learners</div>
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-bold text-emerald-600 mb-1">
                    500+
                  </div>
                  <div className="text-slate-600">Expert Courses</div>
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-bold text-sky-600 mb-1">
                    95%
                  </div>
                  <div className="text-slate-600">Success Rate</div>
                </div>
              </div>
            </div>
          </section>
        </main>

        <footer className="text-center mt-10 mb-6">
          <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
            <p className="text-slate-600 text-sm">
              &copy; 2025 Learning Platform. All rights reserved. | Empowering
              minds, one course at a time.
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}

function Badge({ label, tone = "sky" }) {
  const toneMap = {
    sky: "bg-sky-50 text-sky-700 border-sky-100",
    violet: "bg-violet-50 text-violet-700 border-violet-100",
    emerald: "bg-emerald-50 text-emerald-700 border-emerald-100",
  };

  return (
    <div
      className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium border ${
        toneMap[tone] || toneMap.sky
      }`}
    >
      <span
        className={`w-2 h-2 rounded-full block ${
          tone === "emerald"
            ? "bg-emerald-600"
            : tone === "violet"
            ? "bg-violet-600"
            : "bg-sky-600"
        }`}
      />
      {label}
    </div>
  );
}
