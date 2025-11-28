import { Router } from "express";
import { getRecords } from "../controllers/brandController";

const router = Router();

router.get("/", getRecords);

export default router;

