const Course = require("../models/Course");
const { validationResult } = require("express-validator");

// Create a new course
const createCourse = async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: errors.array(),
      });
    }

    const { title, description, imageUrl } = req.body;

    // Check if course with same title already exists
    const existingCourse = await Course.findOne({ title });
    if (existingCourse) {
      return res.status(409).json({
        success: false,
        message: "Course with this title already exists",
      });
    }

    const newCourse = new Course({
      title,
      description,
      imageUrl,
      lessons: [], // Initialize with empty lessons array
    });

    const savedCourse = await newCourse.save();

    res.status(201).json({
      success: true,
      message: "Course created successfully",
      data: savedCourse,
    });
  } catch (error) {
    console.error("Create course error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

// Get all courses
const getAllCourses = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const courses = await Course.find()
      .select("title description imageUrl createdAt updatedAt")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Course.countDocuments();

    res.status(200).json({
      success: true,
      message: "Courses retrieved successfully",
      data: courses,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(total / limit),
        totalItems: total,
        itemsPerPage: limit,
      },
    });
  } catch (error) {
    console.error("Get courses error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

// Get a specific course with lessons
const getCourseById = async (req, res) => {
  try {
    const { id } = req.params;

    const course = await Course.findById(id);
    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Course retrieved successfully",
      data: course,
    });
  } catch (error) {
    console.error("Get course error:", error);
    if (error.name === "CastError") {
      return res.status(400).json({
        success: false,
        message: "Invalid course ID format",
      });
    }
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

// Add lesson to a course
const addLesson = async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: errors.array(),
      });
    }

    const { courseId } = req.params;
    const { id, title, materials, topics, subjectCategory } = req.body;

    // Find the course
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }

    // Check if lesson with same id already exists in this course
    const existingLesson = course.lessons.find((lesson) => lesson.id === id);
    if (existingLesson) {
      return res.status(409).json({
        success: false,
        message: "Lesson with this ID already exists in the course",
      });
    }

    // Create new lesson object
    const newLesson = {
      id,
      title,
      materials,
      topics,
      subjectCategory,
    };

    // Add lesson to course
    course.lessons.push(newLesson);

    // Save the updated course
    const updatedCourse = await course.save();

    res.status(200).json({
      success: true,
      message: "Lesson added successfully",
      data: updatedCourse,
    });
  } catch (error) {
    console.error("Add lesson error:", error);
    if (error.name === "CastError") {
      return res.status(400).json({
        success: false,
        message: "Invalid course ID format",
      });
    }
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

// Update a course
const updateCourse = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: errors.array(),
      });
    }

    const { id } = req.params;
    const { title, description, imageUrl } = req.body;

    const course = await Course.findById(id);
    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }

    // Check if another course with same title exists
    if (title && title !== course.title) {
      const existingCourse = await Course.findOne({ title, _id: { $ne: id } });
      if (existingCourse) {
        return res.status(409).json({
          success: false,
          message: "Course with this title already exists",
        });
      }
    }

    // Update fields
    if (title) course.title = title;
    if (description) course.description = description;
    if (imageUrl) course.imageUrl = imageUrl;

    const updatedCourse = await course.save();

    res.status(200).json({
      success: true,
      message: "Course updated successfully",
      data: updatedCourse,
    });
  } catch (error) {
    console.error("Update course error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

// Delete a course
const deleteCourse = async (req, res) => {
  try {
    const { id } = req.params;

    const course = await Course.findById(id);
    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }

    await Course.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "Course deleted successfully",
    });
  } catch (error) {
    console.error("Delete course error:", error);
    if (error.name === "CastError") {
      return res.status(400).json({
        success: false,
        message: "Invalid course ID format",
      });
    }
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

// Update a specific lesson
const updateLesson = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: errors.array(),
      });
    }

    const { courseId, lessonId } = req.params;
    const { title, materials, topics, subjectCategory } = req.body;

    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }

    const lessonIndex = course.lessons.findIndex(
      (lesson) => lesson.id === lessonId
    );
    if (lessonIndex === -1) {
      return res.status(404).json({
        success: false,
        message: "Lesson not found",
      });
    }

    // Update lesson fields
    if (title) course.lessons[lessonIndex].title = title;
    if (materials) course.lessons[lessonIndex].materials = materials;
    if (topics) course.lessons[lessonIndex].topics = topics;
    if (subjectCategory)
      course.lessons[lessonIndex].subjectCategory = subjectCategory;

    const updatedCourse = await course.save();

    res.status(200).json({
      success: true,
      message: "Lesson updated successfully",
      data: updatedCourse,
    });
  } catch (error) {
    console.error("Update lesson error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

// Delete a specific lesson
const deleteLesson = async (req, res) => {
  try {
    const { courseId, lessonId } = req.params;

    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }

    const lessonIndex = course.lessons.findIndex(
      (lesson) => lesson.id === lessonId
    );
    if (lessonIndex === -1) {
      return res.status(404).json({
        success: false,
        message: "Lesson not found",
      });
    }

    course.lessons.splice(lessonIndex, 1);
    const updatedCourse = await course.save();

    res.status(200).json({
      success: true,
      message: "Lesson deleted successfully",
      data: updatedCourse,
    });
  } catch (error) {
    console.error("Delete lesson error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

module.exports = {
  createCourse,
  getAllCourses,
  getCourseById,
  addLesson,
  updateCourse,
  deleteCourse,
  updateLesson,
  deleteLesson,
};
