const mongoose = require("mongoose");

const lessonSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    materials: [
      {
        type: String,
        required: true,
      },
    ],
    topics: [
      {
        type: String,
        required: true,
      },
    ],
    subjectCategory: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { _id: false }
);

const courseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    maxLength: 200,
  },
  description: {
    type: String,
    required: true,
    trim: true,
    maxLength: 1000,
  },
  imageUrl: {
    type: String,
    required: true,
    validate: {
      validator: function (v) {
        return /^https?:\/\/.+/.test(v);
      },
      message: "Image URL must be a valid URL",
    },
  },
  lessons: [lessonSchema],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Update the updatedAt field before saving
courseSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model("Course", courseSchema);
