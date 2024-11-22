import express from "express";
import * as AuthController from "../controllers/AuthController";
import { jwtVerify } from "../middleware/JWTverify";


const router = express.Router();

router.post("/signup", AuthController.signup);
router.post("/login", AuthController.login);
router.post("/shortURL", jwtVerify, AuthController.shortURL);
router.get("/:shortCode", AuthController.redirectShortURL);
router.get("/getURLs/:userId", jwtVerify, AuthController.getURLs);

export default router;
