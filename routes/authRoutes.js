const { Router } = require('express');
const authController = require("../controller/authController")

const router = Router()

// Login
// router.get("/login", authController.login_get)
// router.post("/login", authController.login_post)

// // Sign Up
// router.get("/signup", authController.signup_get)
router.post("/signup", authController.signup_post)

module.exports = router


