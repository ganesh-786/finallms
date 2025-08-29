const express = require("express");
const { body, param } = require("express-validator");
const {
  createCourse,
  getAllCourses,
  getCourseById,
  addLesson,
  updateCourse,
  deleteCourse,
  updateLesson,
  deleteLesson,
} = require("../controllers/courseController");

const router = express.Router();

// Validation rules
const courseValidation = [
  body("title")
    .trim()
    .isLength({ min: 1, max: 200 })
    .withMessage("Title must be between 1 and 200 characters"),
  body("description")
    .trim()
    .isLength({ min: 1, max: 1000 })
    .withMessage("Description must be between 1 and 1000 characters"),
  body("imageUrl").isURL().withMessage("Image URL must be a valid URL"),
];

const lessonValidation = [
  body("id").trim().notEmpty().withMessage("Lesson ID is required"),
  body("title")
    .trim()
    .isLength({ min: 1, max: 200 })
    .withMessage("Title must be between 1 and 200 characters"),
  body("materials")
    .isArray({ min: 1 })
    .withMessage("Materials must be an array with at least one item"),
  body("materials.*")
    .trim()
    .notEmpty()
    .withMessage("Each material must be a non-empty string"),
  body("topics")
    .isArray({ min: 1 })
    .withMessage("Topics must be an array with at least one item"),
  body("topics.*")
    .trim()
    .notEmpty()
    .withMessage("Each topic must be a non-empty string"),
  body("subjectCategory")
    .trim()
    .notEmpty()
    .withMessage("Subject category is required"),
];

const mongoIdValidation = [
  param("courseId").isMongoId().withMessage("Invalid course ID"),
];

// Course routes
router.post("/", courseValidation, createCourse);
router.get("/", getAllCourses);
router.get(
  "/:id",
  param("id").isMongoId().withMessage("Invalid course ID"),
  getCourseById
);
router.put(
  "/:id",
  param("id").isMongoId().withMessage("Invalid course ID"),
  courseValidation,
  updateCourse
);
router.delete(
  "/:id",
  param("id").isMongoId().withMessage("Invalid course ID"),
  deleteCourse
);

// Lesson routes
router.post(
  "/:courseId/lessons",
  mongoIdValidation,
  lessonValidation,
  addLesson
);
router.put(
  "/:courseId/lessons/:lessonId",
  mongoIdValidation,
  lessonValidation,
  updateLesson
);
router.delete("/:courseId/lessons/:lessonId", mongoIdValidation, deleteLesson);

module.exports = router;
