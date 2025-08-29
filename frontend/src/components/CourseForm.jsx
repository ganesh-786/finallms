import React, { useState } from "react";
import { X } from "lucide-react";

const CourseForm = ({ course, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    title: course?.title || "",
    description: course?.description || "",
    imageUrl: course?.imageUrl || "",
    category: course?.category || "",
    difficulty: course?.difficulty || "Beginner",
    tags: course?.tags?.join(", ") || "",
    price: course?.price || 0,
    estimatedDuration: course?.estimatedDuration || 0,
  });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = "Title is required";
    } else if (formData.title.length > 200) {
      newErrors.title = "Title must be less than 200 characters";
    }

    if (!formData.description.trim()) {
      newErrors.description = "Description is required";
    } else if (formData.description.length > 1000) {
      newErrors.description = "Description must be less than 1000 characters";
    }

    if (!formData.imageUrl.trim()) {
      newErrors.imageUrl = "Image URL is required";
    } else if (!/^https?:\/\/.+/.test(formData.imageUrl)) {
      newErrors.imageUrl = "Please enter a valid URL";
    }

    if (formData.price < 0) {
      newErrors.price = "Price cannot be negative";
    }

    if (formData.estimatedDuration < 0) {
      newErrors.estimatedDuration = "Duration cannot be negative";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const courseData = {
      ...formData,
      tags: formData.tags
        .split(",")
        .map((tag) => tag.trim())
        .filter((tag) => tag),
    };

    onSave(courseData);
  };

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-xl border border-gray-100 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="px-8 pt-8 pb-6 border-b border-gray-100 sticky top-0 bg-white rounded-t-2xl">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-2xl font-semibold text-gray-900">
                {course ? "Edit Course" : "Create New Course"}
              </h3>
              <p className="text-sm text-gray-500 mt-1">
                {course
                  ? "Update your course information"
                  : "Fill in the details to create your course"}
              </p>
            </div>
            <button
              onClick={onCancel}
              className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Course Title *
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => handleChange("title", e.target.value)}
              className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all ${
                errors.title ? "border-red-300" : "border-gray-300"
              }`}
              placeholder="Enter course title..."
            />
            {errors.title && (
              <p className="text-red-500 text-sm mt-1">{errors.title}</p>
            )}
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description *
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => handleChange("description", e.target.value)}
              rows="4"
              className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all resize-none ${
                errors.description ? "border-red-300" : "border-gray-300"
              }`}
              placeholder="Describe what students will learn..."
            />
            {errors.description && (
              <p className="text-red-500 text-sm mt-1">{errors.description}</p>
            )}
          </div>

          {/* Image URL */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Cover Image URL *
            </label>
            <input
              type="url"
              value={formData.imageUrl}
              onChange={(e) => handleChange("imageUrl", e.target.value)}
              className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all ${
                errors.imageUrl ? "border-red-300" : "border-gray-300"
              }`}
              placeholder="https://example.com/image.jpg"
            />
            {errors.imageUrl && (
              <p className="text-red-500 text-sm mt-1">{errors.imageUrl}</p>
            )}

            {formData.imageUrl && !errors.imageUrl && (
              <div className="mt-3">
                <p className="text-xs text-gray-500 mb-2">Preview:</p>
                <img
                  src={formData.imageUrl}
                  alt="Course preview"
                  className="w-full h-32 object-cover rounded-lg border border-gray-200"
                  onError={(e) => {
                    e.target.style.display = "none";
                  }}
                />
              </div>
            )}
          </div>

          {/* Category and Difficulty */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category
              </label>
              <input
                type="text"
                value={formData.category}
                onChange={(e) => handleChange("category", e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                placeholder="e.g., Programming, Design..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Difficulty Level
              </label>
              <select
                value={formData.difficulty}
                onChange={(e) => handleChange("difficulty", e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
              >
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
              </select>
            </div>
          </div>

          {/* Tags */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tags
            </label>
            <input
              type="text"
              value={formData.tags}
              onChange={(e) => handleChange("tags", e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
              placeholder="Enter tags separated by commas..."
            />
            <p className="text-xs text-gray-500 mt-1">
              Separate multiple tags with commas
            </p>
          </div>

          {/* Price and Duration */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Price ($)
              </label>
              <input
                type="number"
                min="0"
                step="0.01"
                value={formData.price}
                onChange={(e) =>
                  handleChange("price", parseFloat(e.target.value) || 0)
                }
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Estimated Duration (hours)
              </label>
              <input
                type="number"
                min="0"
                step="0.5"
                value={formData.estimatedDuration}
                onChange={(e) =>
                  handleChange(
                    "estimatedDuration",
                    parseFloat(e.target.value) || 0
                  )
                }
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-6 border-t border-gray-100">
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 px-6 py-3 text-gray-700 bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded-xl font-medium transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-medium transition-colors"
            >
              {course ? "Update Course" : "Create Course"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CourseForm;
