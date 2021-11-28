import express from 'express';
import { comment } from '../controller/comment.controller.js';
import { deleteTwit, getTwit, getTwits, sendTwit } from '../controller/twit.controller.js';
import { verifyUser } from '../middlewares/authentication.js';

const router = express.Router();

router.post("/", verifyUser, sendTwit)
router.get("/", verifyUser, getTwits)
router.get("/:id", verifyUser, getTwit)
router.post("/:id/comment", verifyUser, comment);
router.delete("/:id", verifyUser, deleteTwit)

export default router;