import express from "express"
import todoCtrl from "../controllers/todoController.js"
import auth from "../middleware/auth.js"

const router = express.Router()

router.use(auth)

router.get("/", todoCtrl.getTodos)

router.post("/", todoCtrl.createTodo)

router.put("/:id", todoCtrl.updateTodo)

router.delete("/:id", todoCtrl.deleteTodo)

router.patch("/:id/toggle", todoCtrl.toggleTodo)

export default router 