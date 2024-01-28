import express from "express"
import {register
,getMyProfile,login,logout} from "../controllers/user.js"
import { authentication } from "../middlewares/auth.js";
 const router=express.Router();

//  router.get("/all",getallusers)

router.post("/new",register)

router.post("/login",login)
router.get("/logout",logout)

router.get("/me",authentication,getMyProfile)



export default router;