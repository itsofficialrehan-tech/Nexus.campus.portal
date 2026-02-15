const express = require("express");
const router = express.Router();

const internships = [
    {
        id: 1,
        title: "Frontend Developer Intern",
        company: "TechNova",
        stipend: "₹8000 / month",
        duration: "3 Months"
    },
    {
        id: 2,
        title: "UI/UX Design Intern",
        company: "PixelCraft",
        stipend: "₹6000 / month",
        duration: "2 Months"
    },
    {
        id: 3,
        title: "Web Designer Intern",
        company: "WebVerse",
        stipend: "₹5000 / month",
        duration: "3 Months"
    }
];

let appliedInternships = [];

router.get("/", (req, res) => {
    res.json({
        message: "Internships fetched",
        data: internships
    });
});


router.post("/apply", (req, res) => {
    const { internshipId, studentId } = req.body;

    if (!internshipId || !studentId) {
        return res.status(400).json({ message: "internshipId & studentId required" });
    }

    const internship = internships.find(i => i.id === internshipId);
    if (!internship) {
        return res.status(404).json({ message: "Internship not found" });
    }

    appliedInternships.push({
        internshipId,
        studentId,
        title: internship.title,
        company: internship.company,
        status: "Applied"
    });

    res.json({
        message: "Internship applied successfully"
    });
});


router.get("/applied/:studentId", (req, res) => {
    const studentId = parseInt(req.params.studentId);

    const myApps = appliedInternships.filter(
        app => app.studentId === studentId
    );

    res.json({
        message: "My applied internships",
        data: myApps
    });
});

module.exports = router;