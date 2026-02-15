const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const app = express();
const PORT = 5000;


app.use(cors());
app.use(express.json());


const JWT_SECRET = "nexus_super_secret_key";


const users = [
    {
        id: 1,
        role: "student",
        email: "student@nexus.com",
        password: bcrypt.hashSync("student123", 10)
    },
    {
        id: 2,
        role: "admin",
        email: "admin@nexus.com",
        password: bcrypt.hashSync("admin123", 10)
    },
    {
        id: 3,
        role: "staff",
        email: "staff@nexus.com",
        password: bcrypt.hashSync("staff123", 10)
    }
];

let grievances = [
    {
        id: 1,
        studentId: 1,
        title: "Hostel WiFi issue",
        status: "pending"
    }
];


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

/* ================== APPLIED INTERNSHIPS ================== */
let appliedInternships = [];

/* ================== LOGIN API ================== */
app.post("/api/auth/login", (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "Email & password required" });
    }

    const user = users.find(u => u.email === email);
    if (!user) {
        return res.status(401).json({ message: "Invalid credentials" });
    }

    const isMatch = bcrypt.compareSync(password, user.password);
    if (!isMatch) {
        return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
        { id: user.id, role: user.role },
        JWT_SECRET,
        { expiresIn: "1h" }
    );

    res.json({
        message: "Login successful",
        token,
        user: {
            id: user.id,
            role: user.role,
            email: user.email
        }
    });
});

/* ================== JWT VERIFY ================== */
function verifyToken(req, res, next) {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(403).json({ message: "Token missing" });
    }

    const token = authHeader.split(" ")[1];

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded;
        next();
    } catch {
        return res.status(401).json({ message: "Invalid or expired token" });
    }
}

/* ================== TEST ================== */
app.get("/api/protected", verifyToken, (req, res) => {
    res.json({ message: "Protected route working" });
});

/* ================== GRIEVANCE ================== */
app.get("/api/grievance/my", verifyToken, (req, res) => {
    if (req.user.role !== "student") {
        return res.status(403).json({ message: "Student access only" });
    }

    res.json(grievances.filter(g => g.studentId === req.user.id));
});

app.post("/api/grievance", verifyToken, (req, res) => {
    if (req.user.role !== "student") {
        return res.status(403).json({ message: "Student access only" });
    }

    const { title } = req.body;
    if (!title) return res.status(400).json({ message: "Title required" });

    grievances.push({
        id: grievances.length + 1,
        studentId: req.user.id,
        title,
        status: "pending"
    });

    res.json({ message: "Grievance submitted" });
});


app.get("/api/internships", verifyToken, (req, res) => {
    if (req.user.role !== "student") {
        return res.status(403).json({ message: "Student access only" });
    }

    res.json(internships);
});

app.post("/api/internships/apply", verifyToken, (req, res) => {
    if (req.user.role !== "student") {
        return res.status(403).json({ message: "Student access only" });
    }

    const { internshipId } = req.body;

    appliedInternships.push({
        studentId: req.user.id,
        internshipId
    });

    res.json({ message: "Applied successfully" });
});


app.get("/api/admin/grievances", verifyToken, (req, res) => {
    if (req.user.role !== "admin") {
        return res.status(403).json({ message: "Admin access only" });
    }

    res.json(grievances);
});

app.get("/api/admin/applied-internships", verifyToken, (req, res) => {
    if (req.user.role !== "admin") {
        return res.status(403).json({ message: "Admin access only" });
    }

    res.json(appliedInternships);
});


app.listen(PORT, () => {
    console.log(`🔥 Backend running on http://localhost:${PORT}`);
});