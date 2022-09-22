const express = require("express")
const authRoutes = require('./routes/authRoutes')

require("./db/mongoose")

const app = express()
const port = process.env.PORT || 3000

// Middleware
app.use(express.static('public'))
app.use(express.json())
app.set("view engine", "ejs")

// routes
app.get("/", (req, res) => res.render("home"))
app.get("/error", (req, res) => res.render("404"))
app.use(authRoutes)

app.listen(port, () => console.log("Server is up at " + port))