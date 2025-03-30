const express = require("express")
const router = express.Router()
const userController = require("../controllers/userController")

router.post("/register",userController.register)
router.post("/login",userController.login)
router.get("/",userController.getAllUsers)
router.delete("/",userController.deleteUser)
router.patch("/",userController.editUser)

module.exports = router