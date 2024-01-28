import express from "express";
import { authentication } from "../middlewares/auth.js";
import { newTask ,getMyTask, updateMyTask, deleteMyTask} from "../controllers/task.js";

const router =express.Router();

router.post("/new",authentication,newTask)
router.get("/all",authentication,getMyTask)

router.route("/:id").put(authentication,updateMyTask).delete(authentication,deleteMyTask)
export default router;
