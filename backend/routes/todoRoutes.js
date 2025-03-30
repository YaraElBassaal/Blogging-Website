const express = require("express")
const router = express.Router()
const userController = require("../controllers/todoController")

router.post("/",userController.createTodo)
router.get("/",userController.getTodos)
router.put("/",userController.editTodo)
router.delete("/",userController.deleteTodo)

module.exports = router