import { Router } from "express";
import { getRecords } from "../controllers/categoryController";

const router = Router();

router.get("/", getRecords);

export default router;

