// server.js
import express from "express";
import courses from "./course.js";

const app = express();
const PORT = 3000;

// Route: GET /departments/:dept/courses
app.get('/departments/:dept/courses', (req, res) => {
    const { dept } = req.params;
    const { level, minCredits, maxCredits, semester, instructor } = req.query;
  
    let filteredCourses = courses.filter(course => course.department === dept);
    if (level) {
        filteredCourses = filteredCourses.filter(course => course.level === level);
    }

    if (semester){
        filteredCourses = filteredCourses.filter(course => course.semester === semester);
    }

    if (instructor) {
        filteredCourses = filteredCourses.filter(course =>
            course.instructor.toLowerCase().includes(instructor.toLowerCase())
        );
    }


    const min = minCredits !== undefined ? Number(minCredits) : null;
    const max = maxCredits !== undefined  ? Number(maxCredits) : null;

    if (min !== null && max !== null && min > max) {
        return res.status(400).json({ error: "Invalid credits range" });
    }

    if (minCredits !== undefined && isNaN(Number(minCredits))) {
    return res.status(400).json({ error: "minCredits must be a number" });
    }

    if (maxCredits !== undefined && isNaN(Number(maxCredits))) {
        return res.status(400).json({ error: "maxCredits must be a number" });
    }

    if (min !== null) {
        filteredCourses = filteredCourses.filter(course => course.credits >= min);
    }

    if (max !== null) {
        filteredCourses = filteredCourses.filter(course => course.credits <= max);
    }
    
    if (filteredCourses.length === 0) {
        return res.json({
            result: [],
            meta: {
                total: 0,
                message: "No matching courses found"
            }
        });
    }

    res.json({
        result : filteredCourses,
        meta : {
            total: filteredCourses.length
        }
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
