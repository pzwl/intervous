import express from "express";
import { getStreamToken } from "../controllers/chatControllers";
import { protectRoute } from "../middleware/protectRoute";
const router = express.Router();

router.get("/token" ,protectRoute, getStreamToken);

export default router;