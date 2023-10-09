import express from "express";
import { login,users,register} from "../controllers/auth.js";
import {attend} from "../controllers/attend.js";

const router = express.Router();

router.get("/", users);
router.post("/login", login);   
router.post("/register", register);
router.post("/attend", attend);   
export default router;