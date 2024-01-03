import express from "express";
import { User } from "../models/user.js";
import { getAllUsers, getUserDetails, register, specialFunc } from "../controllers/user.js";

const router = express.Router();

router.get("/all",getAllUsers);
router.post("/new",register);
router.get("/userid/special",specialFunc);
router.get("/userid/:id",getUserDetails);


export default router;