import express from "express"
import aiCtrl from "../controllers/aiController.js"
import auth from "../middleware/auth.js"

const router = express.Router()

router.use(auth)

router.post("/ask", aiCtrl.askQuestion)

export default router 