const express = require("express");
const router = express.Router();

const { verifyToken, allowRoles } = require("../middleware/auth.middleware");


router.get(
    "/my",
    verifyToken,
    allowRoles("student"),
    (req, res) => {
        res.json({
            message: "Student grievance list",
            user: req.user
        });
    }
);


router.get(
    "/all",
    verifyToken,
    allowRoles("admin"),
    (req, res) => {
        res.json({
            message: "All grievances (admin)",
            admin: req.user
        });
    }
);

module.exports = router;