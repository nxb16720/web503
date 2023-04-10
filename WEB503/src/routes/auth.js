import express from "express";
import { get, getAll, remove, signin, signup, update } from "../controllers/auth";
const router = express.Router();

router.post("/signup", signup);
router.post("/signin", signin);
router.get("/users", getAll)
router.get("/users/:id", get)
router.delete("/users/:id", remove)
router.put("/users/:id", update)

export default router;