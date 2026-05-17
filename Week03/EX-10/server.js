import express from "express";
import logger from "./logger.js";
import validateQuery from "./validateQuery.js";
import auth from "./auth.js";
import courses from "./course.js";
const app = express();


app.use(logger);
app.get("/departments/:dept/courses", validateQuery, (req, res) => {
  const dept = req.params.dept.toUpperCase();
  const { level, minCredits, maxCredits, semester, instructor } = req.query;
  let results = courses.filter((c) => c.department.toUpperCase() === dept);
  if (level) {
    results = results.filter((c) => c.level === level);
  }
  if (minCredits) {
    results = results.filter((c) => c.credits >= Number(minCredits));
  }
  if (maxCredits) {
    results = results.filter((c) => c.credits <= Number(maxCredits));
  }
  if (semester) {
    results = results.filter((c) => c.semester === semester);
  }
  if (instructor) {
    results = results.filter((c) =>
      c.instructor.toLowerCase().includes(instructor.toLowerCase())
    );
  }

  res.json({
    results: results,
    meta: { total: results.length },
  });
});

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});