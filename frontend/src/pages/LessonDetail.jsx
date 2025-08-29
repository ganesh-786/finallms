import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { getCourseById } from "../api/api";
import toast from "react-hot-toast";
import { ArrowLeft, Clock, ExternalLink, BookOpen, Tag } from "lucide-react";

const LessonDetail = () => {
  const { courseId, lessonId } = useParams();
  const navigate = useNavigate();
  const { token } = useContext(AuthContext);
  const [course, setCourse] = useState(null);
  const [lesson, setLesson] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCourseAndLesson();
  }, [courseId, lessonId, token]);

  const fetchCourseAndLesson = async () => {
    try {
      setLoading(true);
      const response = await getCourseById(courseId, token);
      if (response.success) {
        setCourse(response.data);
        const foundLesson = response.data.lessons?.find(l => l.id === lessonId);
        if (foundLesson) {
          setLesson(foundLesson);
        } else {
          toast.error("Lesson not found");
          navigate(`/courses/${courseId}`);
        }
      } else {
        toast.error("Course not found");
        navigate("/");
      }
    } catch (error) {
      console.error("Failed to fetch lesson:", error);
      toast.error("Failed to load lesson details");
      navigate("/");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (!lesson || !course) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Lesson Not Found</h2>
          <button
            onClick={() => navigate(`/courses/${courseId}`)}
            className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Back to Course
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-blue-50 to-indigo-50">
      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Navigation */}
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={() => navigate(`/courses/${courseId}`)}
            className="inline-flex items-center gap-2 text-indigo-600 hover:text-indigo-800 transition-colors font-medium"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Course
          </button>
          
          <div className="text-sm text-gray-500">
            <span className="font-medium">{course.title}</span>
            <span className="mx-2">•</span>
            <span>{lesson.title}</span>
          </div>
        </div>

        {/* Lesson Content */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
          {/* Lesson Header */}
          <div className="p-8 border-b border-gray-100">
            <div className="flex items-start justify-between mb-4">
              <h1 className="text-3xl font-bold text-gray-900 leading-tight">
                {lesson.title}
              </h1>
              
              {lesson.duration && (
                <div className="flex items-center gap-2 text-sm text-gray-600 bg-gray-50 px-3 py-2 rounded-lg">
                  <Clock className="w-4 h-4" />
                  <span>{lesson.duration} minutes</span>
                </div>
              )}
            </div>

            {/* Lesson Meta */}
            <div className="flex flex-wrap gap-4 text-sm text-gray-600">
              {lesson.subjectCategory && (
                <div className="flex items-center gap-2">
                  <Tag className="w-4 h-4" />
                  <span>{lesson.subjectCategory}</span>
                </div>
              )}
            </div>

            {/* Topics */}
            {lesson.topics && lesson.topics.length > 0 && (
              <div className="mt-4">
                <h3 className="text-sm font-medium text-gray-700 mb-2">Topics Covered:</h3>
                <div className="flex flex-wrap gap-2">
                  {lesson.topics.map((topic, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-indigo-50 text-indigo-700 rounded-full text-sm font-medium"
                    >
                      {topic}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Video Section */}
          {lesson.videoUrl && (
            <div className="p-8 border-b border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Lesson Video</h3>
              <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden">
                <iframe
                  src={lesson.videoUrl}
                  title={lesson.title}
                  className="w-full h-full"
                  allowFullScreen
                  onError={() => {
                    toast.error("Failed to load video");
                  }}
                />
              </div>
            </div>
          )}

          {/* Materials Section */}
          {lesson.materials && lesson.materials.length > 0 && (
            <div className="p-8 border-b border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-indigo-600" />
                Learning Materials
              </h3>
              <div className="space-y-3">
                {lesson.materials.map((material, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg border border-gray-100"
                  >
                    <div className="flex-shrink-0 w-8 h-8 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center text-sm font-medium">
                      {index + 1}
                    </div>
                    <div className="flex-grow">
                      {material.startsWith('http') ? (
                        <a
                          href={material}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-indigo-600 hover:text-indigo-800 transition-colors font-medium flex items-center gap-2"
                        >
                          <span className="truncate">{material}</span>
                          <ExternalLink className="w-4 h-4 flex-shrink-0" />
                        </a>
                      ) : (
                        <span className="text-gray-700 font-medium">{material}</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Lesson Content */}
          <div className="p-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Lesson Content</h3>
            {lesson.content ? (
              <div className="prose prose-lg max-w-none">
                <div className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                  {lesson.content}
                </div>
              </div>
            ) : (
              <div className="text-center py-8">
                <BookOpen className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">
                  No additional content available for this lesson.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Navigation to Next/Previous Lessons */}
        {course.lessons && course.lessons.length > 1 && (
          <div className="mt-8 flex justify-between">
            {(() => {
              const currentIndex = course.lessons.findIndex(l => l.id === lessonId);
              const prevLesson = currentIndex > 0 ? course.lessons[currentIndex - 1] : null;
              const nextLesson = currentIndex < course.lessons.length - 1 ? course.lessons[currentIndex + 1] : null;

              return (
                <>
                  <div>
                    {prevLesson && (
                      <button
                        onClick={() => navigate(`/courses/${courseId}/lessons/${prevLesson.id}`)}
                        className="flex items-center gap-2 text-indigo-600 hover:text-indigo-800 transition-colors font-medium"
                      >
                        <ArrowLeft className="w-4 h-4" />
                        Previous: {prevLesson.title}
                      </button>
                    )}
                  </div>
                  
                  <div>
                    {nextLesson && (
                      <button
                        onClick={() => navigate(`/courses/${courseId}/lessons/${nextLesson.id}`)}
                        className="flex items-center gap-2 text-indigo-600 hover:text-indigo-800 transition-colors font-medium"
                      >
                        Next: {nextLesson.title}
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </button>
                    )}
                  </div>
                </>
              );
            })()}
          </div>
        )}
      </div>
    </div>
  );
};

export default LessonDetail;