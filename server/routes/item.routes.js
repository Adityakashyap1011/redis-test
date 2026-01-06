import express from "express";
import { createItem, getItemById, updateItemById} from "../controllers/item.controller.js";
import rateLimiter from "../middleware/ratelimiter.js";

const router = express.Router();

router.post("/items", rateLimiter, createItem);

router.get("/items/:id", rateLimiter, getItemById);

router.post("/items/:id", rateLimiter, updateItemById);

export default router;
