import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { enrollInCourse, unenrollFromCourse } from "../api/api";
import toast from "react-hot-toast";
import { Clock, Users, BookOpen, Star } from "lucide-react";

function CourseCard({ course, onViewCourse, onCourseUpdate }) {
  const { user, token, canManageCourses } = useContext(AuthContext);

  const handleEnrollment = async (e) => {
    e.stopPropagation();
    
    try {
      if (course.isEnrolled) {
        await unenrollFromCourse(course._id, token);
        toast.success("Successfully unenrolled from course");
      } else {
        await enrollInCourse(course._id, token);
        toast.success("Successfully enrolled in course");
      }
      
      if (onCourseUpdate) {
        onCourseUpdate();
      }
    } catch (error) {
      toast.error(error.message || "Failed to update enrollment");
    }
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty?.toLowerCase()) {
      case 'beginner': return 'bg-green-100 text-green-800';
      case 'intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg hover:border-gray-200 transition-all duration-300 transform hover:-translate-y-1 overflow-hidden flex flex-col group">
      {/* Course Image */}
      <div className="relative h-48 overflow-hidden bg-gray-50">
        <img
          src={
            course.imageUrl ||
            `https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&fit=crop`
          }
          alt={course.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = `https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&fit=crop`;
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

        {/* Course Stats */}
        <div className="absolute top-4 right-4 flex gap-2">
          <div className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full shadow-sm border border-white/20">
            <span className="text-sm font-medium text-gray-700 flex items-center gap-1">
              <BookOpen className="w-3 h-3" />
              {Array.isArray(course.lessons) ? course.lessons.length : 0}
            </span>
          </div>
          {course.enrolledCount > 0 && (
            <div className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full shadow-sm border border-white/20">
              <span className="text-sm font-medium text-gray-700 flex items-center gap-1">
                <Users className="w-3 h-3" />
                {course.enrolledCount}
              </span>
            </div>
          )}
        </div>

        {/* Enrollment Status */}
        {user && course.isEnrolled && (
          <div className="absolute top-4 left-4">
            <div className="bg-green-500 text-white px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1">
              <Star className="w-3 h-3" />
              Enrolled
            </div>
          </div>
        )}
      </div>

      {/* Course Content */}
      <div className="p-6 flex flex-col flex-grow">
        {/* Course Meta */}
        <div className="flex items-center gap-2 mb-3">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(course.difficulty)}`}>
            {course.difficulty || 'Beginner'}
          </span>
          {course.category && (
            <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium">
              {course.category}
            </span>
          )}
          {course.estimatedDuration > 0 && (
            <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {Math.round(course.estimatedDuration)}h
            </span>
          )}
        </div>

        {/* Course Title */}
        <h3 className="text-xl font-semibold text-gray-900 mb-3 line-clamp-2 leading-tight">
          {course.title}
        </h3>

        {/* Course Description */}
        <p className="text-gray-600 mb-4 flex-grow text-sm leading-relaxed line-clamp-3">
          {course.description}
        </p>

        {/* Course Creator */}
        {course.createdBy && (
          <div className="text-xs text-gray-500 mb-4">
            Created by {course.createdBy.username}
          </div>
        )}

        {/* Action Buttons */}
        <div className="mt-auto space-y-2">
          <button
            onClick={() => onViewCourse(course._id)}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 px-6 rounded-xl font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:ring-offset-1 shadow-sm hover:shadow-md flex items-center justify-center gap-2 group/btn"
          >
            <span>View Course</span>
            <svg
              className="w-4 h-4 transition-transform duration-200 group-hover/btn:translate-x-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </button>

          {/* Enrollment Button for Users */}
          {user && user.role === 'user' && course.isPublished && (
            <button
              onClick={handleEnrollment}
              className={`w-full py-2 px-4 rounded-lg font-medium transition-colors text-sm ${
                course.isEnrolled
                  ? 'bg-red-50 text-red-700 hover:bg-red-100 border border-red-200'
                  : 'bg-green-50 text-green-700 hover:bg-green-100 border border-green-200'
              }`}
            >
              {course.isEnrolled ? 'Unenroll' : 'Enroll Now'}
            </button>
          )}

          {/* Management Indicator */}
          {canManageCourses() && course.canEdit && (
            <div className="text-xs text-indigo-600 font-medium text-center">
              You can manage this course
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default CourseCard;