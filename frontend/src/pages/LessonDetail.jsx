import React from "react";

export function LessonDetailLightInitial({ lesson = {}, onBackToCourse }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-sky-50 to-indigo-50 p-6 font-sans text-slate-900">
      <div className="container mx-auto bg-white rounded-xl shadow-2xl p-8 lg:p-12 mb-8">
        <button
          onClick={onBackToCourse}
          aria-label="Back to course"
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
            />
          </svg>
          Back to Course
        </button>

        <h1 className="text-4xl lg:text-5xl font-extrabold text-gray-900 mb-6">
          {lesson.title}
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 mb-12">
          {/* Materials */}
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Materials</h2>
            {lesson.materials && lesson.materials.length > 0 ? (
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                {lesson.materials.map((material, index) => (
                  <li key={index} className="flex items-start">
                    <svg
                      className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-1"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4 4a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1-3a1 1 0 100 2h.01a1 1 0 100-2H7z"
                        clipRule="evenodd"
                      />
                    </svg>
                    {material.startsWith("http") ? (
                      <a
                        href={material}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline"
                      >
                        {material}
                      </a>
                    ) : (
                      <span>{material}</span>
                    )}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-600 italic">
                No materials provided for this lesson.
              </p>
            )}
          </div>

          {/* Topics */}
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Topics</h2>
            {lesson.topics && lesson.topics.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {lesson.topics.map((topic, index) => (
                  <span
                    key={index}
                    className="bg-indigo-100 text-indigo-800 text-sm font-medium px-3 py-1 rounded-full"
                  >
                    {topic}
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-gray-600 italic">
                No topics specified for this lesson.
              </p>
            )}
            <p className="text-lg text-gray-700 mt-4">
              <span className="font-semibold">Subject Category:</span>{" "}
              {lesson.subjectCategory || "N/A"}
            </p>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Lesson Content
          </h2>
          {lesson.content ? (
            <div className="prose prose-lg max-w-none">
              <p className="text-lg text-gray-800 leading-relaxed mb-6 whitespace-pre-wrap">
                {lesson.content}
              </p>
            </div>
          ) : (
            <p className="text-gray-600 italic">
              No content available for this lesson.
            </p>
          )}
        </div>
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

function Badge({ children }) {
  return (
    <span className="bg-amber-100 text-amber-800 text-sm font-medium px-3 py-1 rounded-full shadow-sm">
      {children}
    </span>
  );
}

function MaterialItem({ material }) {
  const isUrl = typeof material === "string" && material.startsWith("http");
  const label = isUrl ? material.replace(/^https?:\/\//, "") : material;
  return (
    <li className="flex items-start">
      <svg
        className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-1"
        fill="currentColor"
        viewBox="0 0 20 20"
        aria-hidden
      >
        <path
          fillRule="evenodd"
          d="M4 4a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1-3a1 1 0 100 2h.01a1 1 0 100-2H7z"
          clipRule="evenodd"
        />
      </svg>
      {isUrl ? (
        <a
          href={material}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:underline break-words max-w-[30rem] truncate block"
          title={material}
        >
          {label}
        </a>
      ) : (
        <span className="text-gray-800">{material}</span>
      )}
    </li>
  );
}

export default function LessonDetail({ lesson = {}, onBackToCourse }) {
  // Safe defaults
  const {
    title = "Untitled Lesson",
    materials = [],
    topics = [],
    subjectCategory = "N/A",
    content = "",
  } = lesson || {};

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-sky-50 to-indigo-50 p-6 font-sans text-slate-900">
      <main
        className="container mx-auto bg-white rounded-xl shadow-lg p-6 lg:p-10 mb-8"
        aria-labelledby="lesson-title"
      >
        <button
          onClick={onBackToCourse}
          aria-label="Back to course"
          className="inline-flex items-center text-indigo-600 hover:text-indigo-800 focus:outline-none focus:ring-2 focus:ring-indigo-200 rounded mb-6 font-semibold"
        >
          <IconBack />
          Back to Course
        </button>

        <h1
          id="lesson-title"
          className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 mb-4"
        >
          {title}
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <section aria-labelledby="materials-heading">
            <h2
              id="materials-heading"
              className="text-2xl font-semibold text-slate-800 mb-3"
            >
              Materials
            </h2>
            {materials && materials.length > 0 ? (
              <ul className="list-none space-y-3 text-gray-700">
                {materials.map((m, i) => (
                  <MaterialItem key={i} material={m} />
                ))}
              </ul>
            ) : (
              <p className="text-gray-600 italic">
                No materials provided for this lesson.
              </p>
            )}
          </section>

          <aside aria-labelledby="topics-heading">
            <h2
              id="topics-heading"
              className="text-2xl font-semibold text-slate-800 mb-3"
            >
              Topics
            </h2>
            {topics && topics.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {topics.map((topic, i) => (
                  <Badge key={i}>{topic}</Badge>
                ))}
              </div>
            ) : (
              <p className="text-gray-600 italic">
                No topics specified for this lesson.
              </p>
            )}

            <div className="mt-6 text-lg text-gray-700">
              <span className="font-semibold">Subject Category:</span>{" "}
              {subjectCategory}
            </div>
          </aside>
        </div>

        <article aria-labelledby="content-heading">
          <h2
            id="content-heading"
            className="text-2xl font-semibold text-slate-800 mb-4"
          >
            Lesson Content
          </h2>

          {content ? (
            <div className="prose prose-lg max-w-none">
              {/* preserve new lines */}
              {content.split("\n\n").map((block, idx) => (
                <p
                  key={idx}
                  className="text-lg text-slate-800 leading-relaxed whitespace-pre-wrap"
                >
                  {block}
                </p>
              ))}
            </div>
          ) : (
            <p className="text-gray-600 italic">
              No content available for this lesson.
            </p>
          )}
        </article>

        <footer className="mt-8 text-sm text-gray-600">
          <div>© {new Date().getFullYear()} Learning Platform</div>
          <div className="mt-1">
            Need to edit this lesson? Visit the Manage Content section.
          </div>
        </footer>
      </main>
    </div>
  );
}
