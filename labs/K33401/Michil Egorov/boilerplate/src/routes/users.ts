import express from "express"
import UserController from "../controllers/UserController"

const router = express.Router()

const controller = new UserController()

router.route("/:id")
  .get(controller.get)

export default router
