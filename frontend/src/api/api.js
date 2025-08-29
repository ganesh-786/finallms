// API utility for backend communication
const API_BASE = "http://localhost:8000/api";

export const register = async (data) => {
  const res = await fetch(`${API_BASE}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
};

export const login = async (data) => {
  const res = await fetch(`${API_BASE}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
};

export const getCourses = async (token) => {
  const res = await fetch(`${API_BASE}/courses`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.json();
};

export const enrollCourse = async (courseId, token) => {
  const res = await fetch(`${API_BASE}/courses/${courseId}/enroll`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.json();
};

// Add more as needed for course/lesson CRUD
